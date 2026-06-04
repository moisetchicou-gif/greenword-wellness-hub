import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { execSync } from "node:child_process";
import { componentTagger } from "lovable-tagger";

// Plugin qui régénère public/sitemap.xml avant le build de production.
const sitemapPlugin = (): Plugin => ({
  name: "generate-sitemap",
  apply: "build",
  buildStart() {
    try {
      execSync("node scripts/generate-sitemap.mjs", { stdio: "inherit" });
    } catch (err) {
      console.warn("[sitemap] génération échouée :", err);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (/react-dom|react-router|\/react\//.test(id)) return "react-vendor";
            if (id.includes("@tanstack")) return "query-vendor";
          }
        },
      },
    },
  },
}));
