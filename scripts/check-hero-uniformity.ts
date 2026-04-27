/**
 * Contrôle visuel : le fond derrière le bocal Green World doit rester
 * STRICTEMENT uniforme avec celui derrière le slogan, sur tous les écrans.
 *
 * Lance Chromium headless via Playwright, ouvre le hero sur 5 viewports,
 * échantillonne ~30 pixels de fond dans chaque zone (slogan + produit) et
 * vérifie que la couleur moyenne RGB est identique à ±3 unités près.
 *
 * Usage : bun run scripts/check-hero-uniformity.ts [--url http://...]
 *         (par défaut : sert le dossier ./dist sur un port libre, à condition
 *         que `bun run build` ait été exécuté au préalable)
 *
 * Sortie : exit code 0 si tous les viewports passent, 1 sinon.
 */
import { chromium, type Browser, type Page } from "playwright";
import { PNG } from "pngjs";
import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const VIEWPORTS = [
  { name: "mobile-portrait", width: 375, height: 812 },
  { name: "mobile-landscape", width: 414, height: 896 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 720 },
  { name: "desktop-xl", width: 1920, height: 1080 },
] as const;

const RGB_TOLERANCE = 3;

type Rgb = { r: number; g: number; b: number };

function pixelAt(png: PNG, x: number, y: number): Rgb {
  const idx = (png.width * y + x) << 2;
  return { r: png.data[idx], g: png.data[idx + 1], b: png.data[idx + 2] };
}

function avgColor(samples: Rgb[]): Rgb {
  const n = samples.length;
  return {
    r: Math.round(samples.reduce((s, p) => s + p.r, 0) / n),
    g: Math.round(samples.reduce((s, p) => s + p.g, 0) / n),
    b: Math.round(samples.reduce((s, p) => s + p.b, 0) / n),
  };
}

function sampleBorderPixels(
  png: PNG,
  box: { x: number; y: number; width: number; height: number },
): Rgb[] {
  const samples: Rgb[] = [];
  const margin = 4;
  const stepsPerSide = 8;
  const inside = (x: number, y: number) =>
    x >= 0 && x < png.width && y >= 0 && y < png.height;

  for (let i = 1; i <= stepsPerSide; i++) {
    const x = Math.round(box.x + (box.width * i) / (stepsPerSide + 1));
    const yTop = Math.round(box.y + margin);
    const yBot = Math.round(box.y + box.height - margin);
    if (inside(x, yTop)) samples.push(pixelAt(png, x, yTop));
    if (inside(x, yBot)) samples.push(pixelAt(png, x, yBot));
  }
  for (let i = 1; i <= 4; i++) {
    const yTop = Math.round(box.y + (box.height * i) / 10);
    const yBot = Math.round(box.y + box.height - (box.height * i) / 10);
    const xL = Math.round(box.x + margin);
    const xR = Math.round(box.x + box.width - margin);
    for (const [x, y] of [
      [xL, yTop],
      [xR, yTop],
      [xL, yBot],
      [xR, yBot],
    ] as const) {
      if (inside(x, y)) samples.push(pixelAt(png, x, y));
    }
  }
  return samples;
}

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

function startStaticServer(rootDir: string): Promise<{ url: string; close: () => Promise<void> }> {
  const root = resolve(rootDir);
  const server = createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let filePath = normalize(join(root, urlPath));
      if (!filePath.startsWith(root)) {
        res.writeHead(403); res.end(); return;
      }
      let stat;
      try { stat = statSync(filePath); } catch { stat = null; }
      if (!stat || stat.isDirectory()) {
        // SPA fallback → index.html
        filePath = join(root, "index.html");
      }
      res.writeHead(200, { "content-type": MIME[extname(filePath)] || "application/octet-stream" });
      createReadStream(filePath).pipe(res);
    } catch (e) {
      res.writeHead(500); res.end(String(e));
    }
  });
  return new Promise((resolveFn) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      resolveFn({
        url: `http://127.0.0.1:${port}`,
        close: () => new Promise<void>((r) => server.close(() => r())),
      });
    });
  });
}

interface CheckResult {
  viewport: string;
  passed: boolean;
  slogan: Rgb;
  product: Rgb;
  delta: Rgb;
}

async function runCheck(page: Page, baseUrl: string, vp: typeof VIEWPORTS[number]): Promise<CheckResult> {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto(baseUrl + "/", { waitUntil: "networkidle" });

  // Désactive animations et transitions (rendu déterministe)
  await page.addStyleTag({
    content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
  });

  await page.locator('[data-testid="hero-slogan"]').waitFor({ state: "visible" });
  await page.locator('[data-testid="hero-product"]').waitFor({ state: "visible" });
  await page.waitForTimeout(300); // stabilisation post-CSS injection

  const sloganBox = await page.locator('[data-testid="hero-slogan"]').boundingBox();
  const productBox = await page.locator('[data-testid="hero-product"]').boundingBox();
  if (!sloganBox || !productBox) {
    throw new Error(`Boundingbox manquant @ ${vp.name}`);
  }

  const buf = await page.screenshot({ fullPage: false, type: "png" });
  const png = PNG.sync.read(buf);

  const sloganSamples = sampleBorderPixels(png, sloganBox);
  const productSamples = sampleBorderPixels(png, productBox);
  if (sloganSamples.length < 10 || productSamples.length < 10) {
    throw new Error(`Échantillons insuffisants @ ${vp.name}`);
  }

  const slogan = avgColor(sloganSamples);
  const product = avgColor(productSamples);
  const delta: Rgb = {
    r: Math.abs(slogan.r - product.r),
    g: Math.abs(slogan.g - product.g),
    b: Math.abs(slogan.b - product.b),
  };

  const passed = delta.r <= RGB_TOLERANCE && delta.g <= RGB_TOLERANCE && delta.b <= RGB_TOLERANCE;
  return { viewport: vp.name, passed, slogan, product, delta };
}

async function main() {
  const argUrl = process.argv.find((a) => a.startsWith("--url="))?.slice(6);
  let baseUrl = argUrl || "";
  let stopServer: (() => Promise<void>) | null = null;
  if (!baseUrl) {
    const srv = await startStaticServer("dist");
    baseUrl = srv.url;
    stopServer = srv.close;
    console.log(`▸ Serveur statique : ${baseUrl} (dossier ./dist)`);
  } else {
    console.log(`▸ Cible : ${baseUrl}`);
  }

  let browser: Browser | null = null;
  let exitCode = 0;
  try {
    browser = await chromium.launch();
    const ctx = await browser.newContext({ deviceScaleFactor: 1 });
    const page = await ctx.newPage();

    console.log(`\n🎯 Tolérance RGB : ±${RGB_TOLERANCE} unités par canal\n`);
    const results: CheckResult[] = [];
    for (const vp of VIEWPORTS) {
      const r = await runCheck(page, baseUrl, vp);
      results.push(r);
      const icon = r.passed ? "✅" : "❌";
      console.log(
        `${icon} [${r.viewport.padEnd(18)}] slogan rgb(${r.slogan.r},${r.slogan.g},${r.slogan.b}) ` +
        `vs produit rgb(${r.product.r},${r.product.g},${r.product.b}) ` +
        `→ Δ(${r.delta.r},${r.delta.g},${r.delta.b})`,
      );
    }
    const failed = results.filter((r) => !r.passed);
    console.log(`\n${results.length - failed.length}/${results.length} viewports OK`);
    if (failed.length > 0) {
      console.error(`\n❌ Échec : fond non uniforme sur ${failed.map((f) => f.viewport).join(", ")}`);
      exitCode = 1;
    } else {
      console.log("\n✅ Fond strictement uniforme entre slogan et produit sur tous les écrans testés.");
    }
  } finally {
    if (browser) await browser.close();
    if (stopServer) await stopServer();
  }
  process.exit(exitCode);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
