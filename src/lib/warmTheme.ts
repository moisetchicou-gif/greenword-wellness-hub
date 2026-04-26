/**
 * Warm Theme — système de classes réutilisables (palette corail/terracotta + or).
 *
 * Source unique de vérité pour appliquer la charte chaleureuse à TOUT nouveau
 * composant sans dupliquer de CSS. Toutes les classes utilisées ici sont
 * définies dans `src/index.css` (utilitaires `.btn-warm`, `.bg-section-warm`,
 * `.text-gradient-warm`, `.badge-contrast`, `.badge-warm`, `.hover-warm-glow`,
 * `.shine-on-hover`, `.reveal-warm`, `.reveal-warm-section`, `.link-warm`)
 * ou directement dans `tailwind.config.ts` (tokens `coral`, `gold`, etc.).
 *
 * Usage :
 *   import { warm, warmCx } from "@/lib/warmTheme";
 *
 *   <button className={warm.button("primary", "lg")}>Acheter</button>
 *   <div className={warm.card("interactive")}>...</div>
 *   <section className={warm.section("strong")}>...</section>
 *   <span className={warm.badge("warm")}>Nouveau</span>
 *   <h2 className={warm.heading(2)}>Titre <span className={warm.textGradient}>premium</span></h2>
 *
 * Pour combiner avec d'autres classes : warmCx(warm.card("flat"), "p-8 mt-4")
 */

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Variants (les chaînes pointent vers des utilitaires existants)            */
/* -------------------------------------------------------------------------- */

export type ButtonVariant = "primary" | "ghost" | "outline" | "soft" | "dark";
export type ButtonSize = "sm" | "md" | "lg";
export type CardVariant = "flat" | "interactive" | "highlight" | "glass";
export type SectionVariant = "soft" | "strong" | "hero";
export type BadgeVariant = "warm" | "contrast" | "soft" | "outline";
export type IconWrapVariant = "coral" | "gold" | "primary" | "mixed";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide " +
  "transition-all duration-300 active:scale-[0.97] focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-coral/60 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-sm sm:text-base",
};

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  // Dégradé corail → gold (CTA principal)
  primary: "btn-warm shine-on-hover",
  // Transparent, hover halo corail
  ghost:
    "bg-transparent text-foreground hover:bg-coral/10 hover:text-coral",
  // Bordure corail, fond transparent
  outline:
    "border border-coral/40 text-coral bg-coral/5 hover:bg-coral/15 hover:border-coral/60",
  // Fond doux corail-soft
  soft:
    "bg-coral-soft text-accent hover:bg-coral/20 hover:shadow-md hover:shadow-coral/15",
  // Fond foncé accent (alternative premium)
  dark:
    "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25",
};

const CARD_BASE =
  "bg-card text-card-foreground rounded-2xl border border-border/60 overflow-hidden";

const CARD_VARIANTS: Record<CardVariant, string> = {
  flat: "shadow-sm",
  interactive:
    "hover-warm-glow group transition-all duration-500",
  highlight:
    "border-coral/30 bg-gradient-to-br from-coral/5 via-card to-gold/5 hover-warm-glow group",
  glass:
    "bg-card/80 backdrop-blur-md border-border/40 hover-warm-glow group",
};

const SECTION_VARIANTS: Record<SectionVariant, string> = {
  soft: "bg-section-warm",
  strong: "bg-section-warm-strong",
  hero: "bg-hero-warm",
};

const BADGE_BASE =
  "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide " +
  "text-[10px] sm:text-xs px-2.5 py-1";

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  warm: "badge-warm",
  contrast: "badge-contrast",
  soft: "bg-coral-soft text-accent border border-coral/20",
  outline: "border border-coral/40 text-coral bg-transparent",
};

const ICON_WRAP_BASE =
  "inline-flex items-center justify-center rounded-2xl shrink-0 " +
  "transition-transform duration-500 group-hover:scale-110";

const ICON_WRAP_VARIANTS: Record<IconWrapVariant, string> = {
  coral: "bg-coral/15 text-coral",
  gold: "bg-gold/15 text-gold",
  primary: "bg-primary/15 text-primary",
  mixed: "bg-gradient-to-br from-coral/20 to-gold/20 text-coral",
};

/* -------------------------------------------------------------------------- */
/*  API publique                                                              */
/* -------------------------------------------------------------------------- */

export const warm = {
  /** Bouton premium (CTA, action secondaire, etc.) */
  button(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
    return cn(BUTTON_BASE, BUTTON_SIZES[size], BUTTON_VARIANTS[variant]);
  },

  /** Carte (produit, témoignage, feature, etc.) */
  card(variant: CardVariant = "flat") {
    return cn(CARD_BASE, CARD_VARIANTS[variant]);
  },

  /** Fond de section harmonisé avec le hero */
  section(variant: SectionVariant = "soft") {
    return cn("relative overflow-hidden", SECTION_VARIANTS[variant]);
  },

  /** Badge / pastille */
  badge(variant: BadgeVariant = "warm") {
    return cn(BADGE_BASE, BADGE_VARIANTS[variant]);
  },

  /** Conteneur d'icône circulaire/rounded coloré */
  iconWrap(variant: IconWrapVariant = "coral", size: "sm" | "md" | "lg" = "md") {
    const sizes = { sm: "w-9 h-9", md: "w-12 h-12", lg: "w-14 h-14" };
    return cn(ICON_WRAP_BASE, ICON_WRAP_VARIANTS[variant], sizes[size]);
  },

  /** Lien souligné dégradé corail/gold au hover */
  link: "link-warm text-foreground hover:text-coral transition-colors duration-300",

  /** Texte avec dégradé corail → gold (utiliser sur <span>) */
  textGradient: "text-gradient-warm italic",

  /** Titre de section (h2) — utiliser avec <span className={warm.textGradient}> à l'intérieur */
  heading(level: 1 | 2 | 3 = 2) {
    const map = {
      1: "text-4xl sm:text-5xl lg:text-6xl font-display text-accent leading-tight",
      2: "text-3xl sm:text-4xl font-display text-accent leading-tight",
      3: "text-xl sm:text-2xl font-display text-accent leading-snug",
    };
    return map[level];
  },

  /** Eyebrow (petit label au-dessus d'un titre de section) */
  eyebrow: "text-coral text-xs font-semibold uppercase tracking-[0.2em]",

  /** Sous-titre / paragraphe descriptif sous un titre de section */
  lead: "text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed",

  /** Animation d'apparition (à coupler avec un IntersectionObserver) */
  reveal: "reveal-warm",
  revealSection: "reveal-warm-section",

  /** Halos / effets décoratifs (à placer en absolute dans une section relative) */
  blob: {
    coral: "absolute rounded-full bg-coral/10 blur-3xl animate-pulse-soft pointer-events-none",
    gold: "absolute rounded-full bg-gold/15 blur-3xl animate-pulse-soft pointer-events-none",
    primary: "absolute rounded-full bg-primary/10 blur-3xl animate-pulse-soft pointer-events-none",
  },

  /** Séparateur dégradé fin */
  divider: "h-px w-full bg-gradient-to-r from-transparent via-coral/40 to-transparent",

  /** Input de formulaire harmonisé */
  input:
    "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm " +
    "placeholder:text-muted-foreground/70 transition-all duration-300 " +
    "focus:outline-none focus:border-coral/60 focus:ring-2 focus:ring-coral/20",
} as const;

/** Helper pour combiner facilement les presets warm avec d'autres classes. */
export const warmCx = cn;
