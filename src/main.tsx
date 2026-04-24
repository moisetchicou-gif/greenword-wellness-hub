import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { getCanonicalRedirectUrl } from "./lib/canonicalRedirect";

// Redirection canonique vers le domaine .com en production.
if (typeof window !== "undefined") {
  const target = getCanonicalRedirectUrl(window.location);
  if (target) {
    window.location.replace(target);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
