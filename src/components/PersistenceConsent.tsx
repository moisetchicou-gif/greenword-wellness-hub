import { useEffect, useState } from "react";
import { Save, X, Check } from "lucide-react";
import {
  isPersistenceAllowed,
  setPersistenceAllowed,
  clearAllPersistedData,
} from "@/hooks/usePersistentState";

type Variant = "banner" | "inline";

interface PersistenceConsentProps {
  /**
   * - `banner` : encart compact destiné aux formulaires (par-dessus un champ).
   * - `inline` : version réduite (case à cocher seule) à intégrer dans une UI existante.
   */
  variant?: Variant;
  /** Texte secondaire facultatif décrivant ce qui sera mémorisé. */
  description?: string;
  className?: string;
}

/**
 * Bannière d'opt-in pour la persistance locale (RGPD).
 * Tant qu'elle n'est pas acceptée, aucun champ n'est sauvegardé sur l'appareil.
 * Le choix est mémorisé sous `gw.persistence.consent.v1`.
 */
const PersistenceConsent = ({
  variant = "banner",
  description = "Mémoriser mes informations sur cet appareil pour ne pas avoir à les ressaisir (30 jours, supprimable à tout moment).",
  className = "",
}: PersistenceConsentProps) => {
  const [allowed, setAllowed] = useState<boolean>(() => isPersistenceAllowed());

  // Écoute les changements (depuis un autre composant ou un autre onglet).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const refresh = () => setAllowed(isPersistenceAllowed());
    const onCustom = () => refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === "gw.persistence.consent.v1") refresh();
    };
    window.addEventListener("gw:persistence-consent", onCustom);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("gw:persistence-consent", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggle = (next: boolean) => {
    setPersistenceAllowed(next);
    setAllowed(next);
    if (!next) clearAllPersistedData();
  };

  if (variant === "inline") {
    return (
      <label
        className={`flex items-start gap-2 cursor-pointer select-none text-[11px] text-muted-foreground ${className}`}
      >
        <input
          type="checkbox"
          checked={allowed}
          onChange={(e) => toggle(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 rounded border-border accent-primary cursor-pointer shrink-0"
        />
        <span className="leading-snug">{description}</span>
      </label>
    );
  }

  return (
    <div
      role="region"
      aria-label="Préférence de mémorisation"
      className={`rounded-lg border ${
        allowed ? "border-primary/30 bg-primary/5" : "border-border/60 bg-card/50"
      } px-3 py-2.5 text-[11px] ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
            allowed ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
          }`}
          aria-hidden="true"
        >
          {allowed ? <Check className="w-3 h-3" strokeWidth={3} /> : <Save className="w-3 h-3" />}
        </span>
        <div className="flex-1 leading-snug">
          <p className="font-semibold text-accent text-[12px]">
            {allowed ? "Mémorisation activée" : "Mémoriser mes informations ?"}
          </p>
          <p className="text-muted-foreground mt-0.5">{description}</p>
        </div>
        {allowed ? (
          <button
            type="button"
            onClick={() => toggle(false)}
            className="shrink-0 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Désactiver la mémorisation et supprimer les informations enregistrées"
          >
            <X className="w-3 h-3" />
            Effacer
          </button>
        ) : (
          <button
            type="button"
            onClick={() => toggle(true)}
            className="shrink-0 inline-flex items-center justify-center bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-primary/90 transition-colors"
          >
            Activer
          </button>
        )}
      </div>
    </div>
  );
};

export default PersistenceConsent;
