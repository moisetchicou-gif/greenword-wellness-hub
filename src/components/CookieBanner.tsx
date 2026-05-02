import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "gw-cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Léger délai pour laisser le LCP passer avant d'afficher la bannière
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom duration-500"
      role="dialog"
      aria-label="Consentement cookies"
    >
      <div className="bg-card/98 backdrop-blur-md border border-border/70 rounded-2xl shadow-xl p-3.5 sm:p-4 flex items-start gap-3">
        <p className="text-xs sm:text-sm text-muted-foreground flex-1 leading-relaxed">
          Nous utilisons uniquement des cookies techniques essentiels au fonctionnement du site.{" "}
          <Link to="/politique-confidentialite" className="text-primary hover:underline font-medium whitespace-nowrap">
            En savoir plus
          </Link>
        </p>
        <div className="flex flex-col gap-1.5 shrink-0">
          <button
            onClick={handleAccept}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity active:scale-[0.97]"
          >
            Accepter
          </button>
          <button
            onClick={handleDecline}
            className="px-3.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Refuser
          </button>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Fermer"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border border-border/70 shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
