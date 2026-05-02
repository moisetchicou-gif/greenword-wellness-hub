import { ArrowRight, ShoppingBag, Briefcase } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { warm, warmCx } from "@/lib/warmTheme";

/**
 * Sélecteur de parcours mis en avant à l'ouverture du site :
 * propose au visiteur de choisir entre "Faire un achat" ou "Lancer un business".
 */
const PathSelector = () => {
  const { ref, visible } = useScrollReveal(0.1);

  const cards = [
    {
      key: "achat",
      icon: ShoppingBag,
      eyebrow: "Pour ma santé",
      title: "Je veux faire un achat",
      description:
        "Découvrez plus de 80 compléments naturels Green World Prestige. Livraison rapide partout en Côte d'Ivoire.",
      cta: "Voir la boutique",
      href: "#produits",
      iconVariant: "coral" as const,
    },
    {
      key: "business",
      icon: Briefcase,
      eyebrow: "Opportunité MLM",
      title: "Je veux lancer mon business",
      description:
        "Devenez distributeur indépendant Green World, générez des revenus complémentaires et bénéficiez de bonus, voyages et voitures.",
      cta: "Découvrir l'opportunité",
      href: "#business",
      iconVariant: "gold" as const,
    },
  ];

  return (
    <section
      id="choisir-mon-parcours"
      ref={ref}
      className={warmCx(warm.section("strong"), "py-16 sm:py-20")}
    >
      <div className={warm.blob.coral + " w-72 h-72 -top-20 -right-20"} />
      <div className={warm.blob.gold + " w-60 h-60 -bottom-16 -left-16"} />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div
          className={`text-center mb-10 sm:mb-12 space-y-3 sm:space-y-4 ${warm.revealSection} ${visible ? "is-visible" : ""}`}
        >
          <p className={warm.eyebrow}>Que souhaitez-vous faire ?</p>
          <h2 className={warm.heading(2)}>
            Choisissez <span className={warm.textGradient}>votre parcours</span>
          </h2>
          <p className={warm.lead}>
            Que vous cherchiez à améliorer votre bien-être ou à saisir une vraie opportunité, Green World Prestige vous accompagne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 max-w-5xl mx-auto">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <a
                key={c.key}
                href={c.href}
                className={warmCx(
                  warm.card("highlight"),
                  "p-6 sm:p-8 flex flex-col gap-5 hover:-translate-y-1",
                  warm.reveal,
                  visible ? "is-visible" : "",
                )}
                style={{ transitionDelay: `${i * 120}ms`, animationDelay: `${i * 120 + 200}ms` }}
              >
                <div className="flex items-center gap-4">
                  <span className={warm.iconWrap(c.iconVariant, "lg")}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
                  </span>
                  <div>
                    <p className={warm.eyebrow}>{c.eyebrow}</p>
                    <h3 className="text-xl sm:text-2xl font-display text-accent leading-snug mt-1">
                      {c.title}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed flex-1">
                  {c.description}
                </p>

                <span className={warmCx(warm.button("primary", "md"), "self-start")}>
                  {c.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PathSelector;
