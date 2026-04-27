import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";

/**
 * Contrôle visuel : le fond derrière le bocal Green World doit rester
 * STRICTEMENT uniforme avec le fond derrière le slogan, sur tous les écrans.
 *
 * Méthode :
 *  1. On échantillonne ~30 pixels de fond dans chaque zone (slogan / produit)
 *     en se concentrant sur les bords des conteneurs (loin du texte / du bocal)
 *     pour ne capter QUE la couleur de fond.
 *  2. On calcule la couleur moyenne RGB de chaque échantillon.
 *  3. On vérifie que les deux moyennes sont identiques à ±3 unités près sur
 *     chaque canal (tolérance pour l'antialiasing / le rendu sub-pixel).
 *
 * Le test est exécuté sur 5 viewports représentatifs (mobile → grand écran).
 */

const VIEWPORTS = [
  { name: "mobile-portrait", width: 375, height: 812 },
  { name: "mobile-landscape", width: 414, height: 896 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 720 },
  { name: "desktop-xl", width: 1920, height: 1080 },
] as const;

const RGB_TOLERANCE = 3; // unités sur 0-255, par canal

type Rgb = { r: number; g: number; b: number };

function avgColor(samples: Rgb[]): Rgb {
  const n = samples.length;
  return {
    r: Math.round(samples.reduce((s, p) => s + p.r, 0) / n),
    g: Math.round(samples.reduce((s, p) => s + p.g, 0) / n),
    b: Math.round(samples.reduce((s, p) => s + p.b, 0) / n),
  };
}

function pixelAt(png: PNG, x: number, y: number): Rgb {
  const idx = (png.width * y + x) << 2;
  return { r: png.data[idx], g: png.data[idx + 1], b: png.data[idx + 2] };
}

/**
 * Échantillonne des pixels SUR LES BORDS d'une zone (haut, bas, gauche, droite),
 * loin du contenu central (texte / bocal). Évite ainsi de capter du texte ou
 * des éléments graphiques.
 */
function sampleBorderPixels(
  png: PNG,
  box: { x: number; y: number; width: number; height: number },
  pageWidth: number,
  pageHeight: number,
): Rgb[] {
  const samples: Rgb[] = [];
  const margin = 4; // pixels depuis le bord intérieur de la box
  const stepsPerSide = 8;

  // Bord supérieur
  for (let i = 1; i <= stepsPerSide; i++) {
    const x = Math.round(box.x + (box.width * i) / (stepsPerSide + 1));
    const y = Math.round(box.y + margin);
    if (x >= 0 && x < pageWidth && y >= 0 && y < pageHeight) {
      samples.push(pixelAt(png, x, y));
    }
  }
  // Bord inférieur
  for (let i = 1; i <= stepsPerSide; i++) {
    const x = Math.round(box.x + (box.width * i) / (stepsPerSide + 1));
    const y = Math.round(box.y + box.height - margin);
    if (x >= 0 && x < pageWidth && y >= 0 && y < pageHeight) {
      samples.push(pixelAt(png, x, y));
    }
  }
  // Coins gauche/droite (zones où il n'y a ni texte ni bocal)
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
      if (x >= 0 && x < pageWidth && y >= 0 && y < pageHeight) {
        samples.push(pixelAt(png, x, y));
      }
    }
  }
  return samples;
}

for (const vp of VIEWPORTS) {
  test(`Fond uniforme entre slogan et produit @ ${vp.name} (${vp.width}x${vp.height})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });

    // Désactive toutes les animations / transitions pour figer le rendu
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      `,
    });

    await page.goto("/", { waitUntil: "networkidle" });

    // S'assure que le hero est complètement rendu
    const slogan = page.getByTestId("hero-slogan");
    const product = page.getByTestId("hero-product");
    await slogan.waitFor({ state: "visible" });
    await product.waitFor({ state: "visible" });
    // Attente supplémentaire pour le chargement de l'image hero
    await page.waitForLoadState("networkidle");

    const sloganBox = await slogan.boundingBox();
    const productBox = await product.boundingBox();
    expect(sloganBox, `Slogan invisible @ ${vp.name}`).not.toBeNull();
    expect(productBox, `Produit invisible @ ${vp.name}`).not.toBeNull();

    // Capture la page entière sans le bocal lui-même
    const screenshot = await page.screenshot({ fullPage: false, type: "png" });
    const png = PNG.sync.read(Buffer.from(screenshot));

    const sloganSamples = sampleBorderPixels(
      png,
      sloganBox!,
      png.width,
      png.height,
    );
    const productSamples = sampleBorderPixels(
      png,
      productBox!,
      png.width,
      png.height,
    );

    expect(sloganSamples.length).toBeGreaterThan(10);
    expect(productSamples.length).toBeGreaterThan(10);

    const sloganAvg = avgColor(sloganSamples);
    const productAvg = avgColor(productSamples);

    const dr = Math.abs(sloganAvg.r - productAvg.r);
    const dg = Math.abs(sloganAvg.g - productAvg.g);
    const db = Math.abs(sloganAvg.b - productAvg.b);

    const message =
      `[${vp.name}] Slogan rgb(${sloganAvg.r},${sloganAvg.g},${sloganAvg.b}) ` +
      `vs Produit rgb(${productAvg.r},${productAvg.g},${productAvg.b}) ` +
      `→ écart Δ(${dr},${dg},${db}), tolérance ±${RGB_TOLERANCE}`;

    expect(dr, message).toBeLessThanOrEqual(RGB_TOLERANCE);
    expect(dg, message).toBeLessThanOrEqual(RGB_TOLERANCE);
    expect(db, message).toBeLessThanOrEqual(RGB_TOLERANCE);
  });
}
