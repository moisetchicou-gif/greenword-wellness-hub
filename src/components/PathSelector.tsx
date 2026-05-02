import { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag, Briefcase, X, Sparkles } from "lucide-react";
import { warm, warmCx } from "@/lib/warmTheme";

const STORAGE_KEY = "gw-path-selector-seen";

/**
 * Modale de bienvenue affichée à l'arrivée sur le site.
 * Propose 2 parcours mis en avant : Faire un achat OU Lancer un business.
 * S'affiche une fois par session (sessionStorage) avec animations attractives.
 */
const PathSelector = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ouverture auto ~700ms après le premier rendu (laisse le hero apparaître)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch { /* ignore */ }
    const t = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => setMounted(true));
    }, 700);
    return () => clearTimeout(t);
  }, []);

  // Lock scroll quand ouverte + Escape pour fermer
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setMounted(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
    setTimeout(() => setOpen(false), 250);
  };

  const handleChoose = (href: string) => {
    close();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  if (!open) return null;

  const cards = [
    {
      key: "achat",
      icon: ShoppingBag,
      eyebrow: "Pour ma santé",
      title: "Faire un achat",
      description: "80+ compléments naturels. Livraison rapide en Côte d'Ivoire.",
      cta: "Voir la boutique",
      href: "#produits",
      iconVariant: "coral" as const,
    },
    {
      key: "business",
      icon: Briefcase,
      eyebrow: "Opportunité MLM",
      title: "Lancer mon business",
      description: "Devenez distributeur Green World. Bonus, voyages, voitures.",
      cta: "Découvrir l'opportunité",
      href: "#business",
      iconVariant: "gold" as const,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="path-selector-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop blur */}
      <button
        aria-label="Fermer"
        onClick={close}
        className="absolute inset-0 bg-accent/70 backdrop-blur-sm"
      />

      {/* Container modale */}
      <div
        className={`relative w-full max-w-3xl bg-card rounded-3xl shadow-2xl border border-coral/20 overflow-hidden transition-all duration-500 ease-out ${
          mounted ? "scale-100 translate-y-0 opacity-100" : "scale-90 translate-y-6 opacity-0"
        }`}
      >
        {/* Halos animés */}
        <div className={warm.blob.coral + " w-64 h-64 -top-24 -right-20"} />
        <div className={warm.blob.gold + " w-52 h-52 -bottom-20 -left-16"} />

        {/* Bouton fermer */}
        <button
          onClick={close}
          aria-label="Fermer la fenêtre"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 rounded-full bg-card/90 hover:bg-coral hover:text-white border border-border/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-6 sm:p-10">
          {/* En-tête */}
          <div className="text-center mb-6 sm:mb-8 space-y-2 sm:space-y-3">
            <span
              className={warmCx(warm.badge("warm"), "animate-pulse-soft")}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Bienvenue chez Green World
            </span>
            <h2
              id="path-selector-title"
              className={warm.heading(2)}
            >
              Que souhaitez-vous <span className={warm.textGradient}>faire aujourd'hui</span> ?
            </h2>
            <p className={warm.lead}>
              Choisissez votre parcours pour qu'on vous accompagne au mieux.
            </p>
          </div>

          {/* 2 cartes choix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.key}
                  onClick={() => handleChoose(c.href)}
                  className={warmCx(
                    warm.card("highlight"),
                    "group p-5 sm:p-6 text-left flex flex-col gap-4 cursor-pointer",
                    "hover:-translate-y-1.5 hover:shadow-2xl hover:border-coral/50",
                    "transition-all duration-500 ease-out",
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                  style={{ transitionDelay: `${200 + i * 120}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span
                      className={warmCx(
                        warm.iconWrap(c.iconVariant, "lg"),
                        "group-hover:rotate-6 group-hover:scale-110",
                      )}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={warm.eyebrow}>{c.eyebrow}</p>
                      <h3 className="text-lg sm:text-xl font-display text-accent leading-snug mt-1">
                        {c.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {c.description}
                  </p>

                  <span
                    className={warmCx(
                      warm.button("primary", "md"),
                      "self-start group-hover:gap-3",
                    )}
                  >
                    {c.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground/70 mt-6">
            Vous pourrez explorer librement le site ensuite.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PathSelector;
