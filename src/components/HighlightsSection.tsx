import { Leaf, ShieldCheck, Truck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Highlight = {
  icon: typeof Leaf;
  title: string;
  description: string;
  /** Tokens utilisés pour styliser la carte (corail / gold / primary) */
  accent: "coral" | "gold" | "primary";
};

const highlights: Highlight[] = [
  {
    icon: Leaf,
    title: "100% Naturel",
    description:
      "Des formules à base de plantes biologiques sélectionnées avec soin, sans additifs synthétiques.",
    accent: "primary",
  },
  {
    icon: ShieldCheck,
    title: "Qualité certifiée",
    description:
      "Tous nos produits sont testés et certifiés selon des standards internationaux exigeants.",
    accent: "coral",
  },
  {
    icon: Truck,
    title: "Livraison Côte d'Ivoire",
    description:
      "Recevez vos compléments sous 24 à 48h à Abidjan et dans les principales villes du pays.",
    accent: "gold",
  },
];

const ACCENT_STYLES: Record<
  Highlight["accent"],
  { card: string; icon: string; iconBg: string; ring: string }
> = {
  coral: {
    card: "from-coral/10 via-card to-coral/5 border-coral/30 hover:shadow-coral/25",
    icon: "text-coral",
    iconBg: "bg-gradient-to-br from-coral/25 to-coral/10",
    ring: "ring-coral/30",
  },
  gold: {
    card: "from-gold/10 via-card to-gold/5 border-gold/30 hover:shadow-gold/25",
    icon: "text-gold",
    iconBg: "bg-gradient-to-br from-gold/25 to-gold/10",
    ring: "ring-gold/30",
  },
  primary: {
    card: "from-primary/10 via-card to-primary/5 border-primary/30 hover:shadow-primary/25",
    icon: "text-primary",
    iconBg: "bg-gradient-to-br from-primary/25 to-primary/10",
    ring: "ring-primary/30",
  },
};

const HighlightsSection = () => {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section
      ref={ref}
      aria-labelledby="highlights-heading"
      className="relative overflow-hidden py-16 sm:py-20 bg-section-warm"
    >
      {/* Halos décoratifs */}
      <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-coral/15 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-gold/15 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
          {/* Visuel illustratif */}
          <div
            className={`relative flex justify-center transition-all duration-1000 ease-premium ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-coral/20 via-gold/15 to-primary/20 rounded-full blur-3xl scale-90" />
            <img
              src={benefitsIllustration}
              alt="Illustration aquarelle de plantes médicinales et ingrédients naturels"
              width={896}
              height={896}
              loading="lazy"
              decoding="async"
              className="relative z-10 w-56 sm:w-72 lg:w-full max-w-md drop-shadow-2xl animate-float"
            />
          </div>

          {/* Texte + cartes */}
          <div className="space-y-8">
            <header
              className={`space-y-3 text-center lg:text-left transition-all duration-1000 ease-premium ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-coral text-xs font-semibold uppercase tracking-[0.22em]">
                Pourquoi nous choisir
              </p>
              <h2
                id="highlights-heading"
                className="text-3xl sm:text-4xl font-display text-accent leading-tight"
              >
                Un engagement{" "}
                <span className="italic text-gradient-warm">authentique</span>
                <br className="hidden sm:block" />
                pour votre bien-être
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed">
                Trois promesses simples qui guident chacun de nos produits, de
                la sélection des plantes à la livraison chez vous.
              </p>
            </header>

            <ul className="grid sm:grid-cols-3 gap-4 sm:gap-5">
              {highlights.map(({ icon: Icon, title, description, accent }, i) => {
                const styles = ACCENT_STYLES[accent];
                return (
                  <li
                    key={title}
                    className={`group relative bg-gradient-to-br ${styles.card} border rounded-2xl p-5 sm:p-6 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-xl hover:ring-2 ${styles.ring} ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${200 + i * 120}ms` }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className={`w-6 h-6 ${styles.icon}`} strokeWidth={2} />
                    </div>
                    <h3 className="font-display text-base sm:text-lg text-accent mb-1.5 leading-snug">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
