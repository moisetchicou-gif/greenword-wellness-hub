import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type CtaAction = {
  label: string;
  /** Icône optionnelle affichée à gauche du label (lucide-react). */
  icon?: LucideIcon;
  /** Emoji ou caractère affiché à gauche du label (alternative à `icon`). */
  emoji?: string;
} & (
  | { to: string; href?: never; external?: never }
  | { href: string; to?: never; external?: boolean }
);

export type WarmCtaCardProps = {
  /** Eyebrow affiché en majuscules au-dessus du titre. */
  eyebrow: string;
  /** Titre principal de la carte. */
  title: ReactNode;
  /** Sous-titre / description. */
  description?: ReactNode;
  /** Icône lucide-react affichée dans le médaillon central. */
  icon?: LucideIcon;
  /** Emoji affiché dans le médaillon (alternative à `icon`). */
  emoji?: string;
  /** Bouton principal. */
  action: CtaAction;
  /** Classes additionnelles sur le wrapper externe. */
  className?: string;
};

/**
 * Carte CTA réutilisable alignée sur la palette warm de la page d'accueil.
 * Structure : eyebrow corail + médaillon icône/emoji + titre avec accent
 * "text-gradient-warm" + description + bouton .btn-warm.
 *
 * Utiliser pour tout encart promotionnel inline (entre sections / en pied
 * de section) afin de garantir une identité visuelle cohérente.
 */
const WarmCtaCard = ({
  eyebrow,
  title,
  description,
  icon: Icon,
  emoji,
  action,
  className = "",
}: WarmCtaCardProps) => {
  const buttonInner = (
    <>
      {action.icon ? (
        <action.icon
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={2.2}
        />
      ) : action.emoji ? (
        <span className="text-base leading-none">{action.emoji}</span>
      ) : null}
      <span>{action.label}</span>
    </>
  );

  // Style canonique aligné sur CtaSection / IntroOffers :
  // gap-2, px-8 py-3.5, font-medium, tracking-wide, focus ring conforme.
  const buttonClass =
    "group inline-flex items-center gap-2 mt-5 px-8 py-3.5 rounded-full btn-warm shine-on-hover text-sm font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden bg-gradient-to-br from-coral/10 via-card to-gold/10 rounded-2xl border border-coral/30 p-8 sm:p-10 text-center hover-warm-glow">
        {/* Halos décoratifs cohérents avec les sections warm */}
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-coral/15 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-gold/15 blur-[90px] pointer-events-none" />

        <div className="relative space-y-3">
          <p className="text-coral text-xs font-semibold uppercase tracking-[0.22em]">
            {eyebrow}
          </p>

          {(Icon || emoji) && (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-coral/25 to-gold/20 flex items-center justify-center mx-auto animate-pulse-soft ring-1 ring-coral/30">
              {Icon ? (
                <Icon className="w-6 h-6 text-coral" strokeWidth={2} />
              ) : (
                <span className="text-2xl" aria-hidden="true">
                  {emoji}
                </span>
              )}
            </div>
          )}

          <h3 className="text-2xl sm:text-3xl font-display text-accent leading-tight">
            {title}
          </h3>

          {description && (
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {action.to ? (
            <Link to={action.to} className={buttonClass}>
              {buttonInner}
            </Link>
          ) : (
            <a
              href={action.href}
              className={buttonClass}
              {...(action.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {buttonInner}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarmCtaCard;
