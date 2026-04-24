import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Redirection canonique vers le domaine .com en production.
// On évite les environnements de preview/édition Lovable et le développement local.
(() => {
  if (typeof window === "undefined") return;
  const { hostname, pathname, search, hash, protocol } = window.location;
  const CANONICAL_HOST = "greenworldprestige.com";

  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".local");
  const isLovablePreview =
    hostname.includes("id-preview--") ||
    hostname.endsWith(".lovableproject.com");
  const isPublishedLovable = hostname.endsWith(".lovable.app");
  const isCanonical = hostname === CANONICAL_HOST || hostname === `www.${CANONICAL_HOST}`;

  // Force HTTPS sur le domaine canonique
  if (isCanonical && protocol === "http:") {
    window.location.replace(`https://${hostname}${pathname}${search}${hash}`);
    return;
  }

  // Redirige uniquement depuis le domaine .lovable.app publié (pas le preview)
  if (isPublishedLovable && !isLovablePreview && !isLocal) {
    window.location.replace(`https://${CANONICAL_HOST}${pathname}${search}${hash}`);
    return;
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
