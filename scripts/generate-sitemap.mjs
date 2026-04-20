/**
 * Génère public/sitemap.xml en listant :
 * - les pages statiques
 * - les fiches produit (/produit/:slug)
 * - les pages d'offre (/offre/:slug)
 *
 * Lancé automatiquement avant le build via le plugin Vite (vite.config.ts)
 * et exécutable manuellement avec : `node scripts/generate-sitemap.mjs`
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { register } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://greenworldprestige.lovable.app";

// Hook pour permettre d'importer les fichiers .ts/.tsx (qui importent des assets)
// On évite ça : on parse les fichiers data en lisant le source brut.
import { readFileSync } from "node:fs";

const slugify = (name) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// --- Extraction des slugs d'offres depuis src/data/offers.ts ---
const offersSrc = readFileSync(resolve(__dirname, "../src/data/offers.ts"), "utf8");
const offerSlugs = [...offersSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

// --- Extraction des noms de produits depuis src/data/products.ts ---
const productsSrc = readFileSync(resolve(__dirname, "../src/data/products.ts"), "utf8");
const productNames = [...productsSrc.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
const productSlugs = [...new Set(productNames.map(slugify))];

const today = new Date().toISOString().split("T")[0];

const staticPages = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/guide-pathologies", priority: "0.8", changefreq: "monthly" },
  { loc: "/cgv", priority: "0.3", changefreq: "yearly" },
  { loc: "/mentions-legales", priority: "0.3", changefreq: "yearly" },
  { loc: "/politique-confidentialite", priority: "0.3", changefreq: "yearly" },
];

const urls = [
  ...staticPages,
  ...offerSlugs.map((s) => ({ loc: `/offre/${s}`, priority: "0.9", changefreq: "weekly" })),
  ...productSlugs.map((s) => ({ loc: `/produit/${s}`, priority: "0.7", changefreq: "monthly" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const outDir = resolve(__dirname, "../public");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "sitemap.xml"), xml, "utf8");

console.log(
  `✓ sitemap.xml généré (${urls.length} URLs : ${staticPages.length} statiques, ${offerSlugs.length} offres, ${productSlugs.length} produits)`,
);
