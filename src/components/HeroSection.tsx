import heroProductPng from "@/assets/hero-product.png";
import heroProductWebp from "@/assets/hero-product.webp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, ShoppingBag, Briefcase, ArrowRight, Truck, ShieldCheck, Star, Users } from "lucide-react";

const HeroSection = () => {
  const { ref, visible } = useScrollReveal(0.05);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ backgroundColor: "hsl(80 28% 92%)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative">
        <div data-testid="hero-slogan" className="space-y-6 sm:space-y-7 text-center md:text-left">
          {/* Badge sauge avec étoile dorée */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase border border-primary/15 bg-secondary/80 text-accent backdrop-blur-sm shadow-sm transition-all duration-1000 ease-premium ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
            100% Naturel · Certifié Bio
          </div>

          {/* Titre serif élégant — noir profond, "validée" italique vert souligné or */}
          <h1
            className={`font-display text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.1] font-semibold text-foreground transition-all duration-1000 ease-premium ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"}`}
            style={{ transitionDelay: "200ms" }}
          >
            La puissance de la nature,{" "}
            <span className="italic font-medium text-primary relative inline-block">
              validée
              <span
                className={`absolute -bottom-1 left-0 h-[3px] rounded-full transition-all duration-1000 ease-premium ${visible ? "w-full" : "w-0"}`}
                style={{
                  transitionDelay: "800ms",
                  background: "linear-gradient(90deg, hsl(var(--gold)) 0%, hsl(var(--gold) / 0.6) 100%)",
                }}
              />
            </span>{" "}
            par la science.
          </h1>

          <p
            className={`text-foreground/75 text-base sm:text-lg max-w-lg leading-relaxed mx-auto md:mx-0 transition-all duration-1000 ease-premium ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "350ms" }}
          >
            Découvrez nos compléments alimentaires et produits de beauté formulés à partir d'ingrédients biologiques d'exception, pour un bien-être durable au quotidien.
          </p>

          {/* CTA — 2 parcours mis en avant : Achat / Business
              Visibles dès le 1er paint (pas de gating sur le scroll-reveal),
              animations GPU-only (transform/opacity), désactivées en motion-reduce. */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto justify-center md:justify-start animate-fade-in"
            style={{ animationDelay: "150ms", animationFillMode: "both" }}
          >
            {/* ACHAT — corail/gold, micro-bounce permanent */}
            <a
              href="#produits"
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full px-6 sm:px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_12px_28px_-10px_hsl(var(--coral)/0.65)] hover:shadow-[0_18px_40px_-10px_hsl(var(--coral)/0.85)] active:scale-[0.97] transition-shadow duration-300 will-change-transform animate-cta-bob motion-reduce:animate-none"
              style={{
                background: "linear-gradient(135deg, hsl(var(--coral)) 0%, hsl(var(--gold)) 100%)",
                transform: "translateZ(0)",
              }}
            >
              {/* Shine sweep — au hover uniquement (économe mobile) */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
              <ShoppingBag className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
              <span className="relative z-10">Faire un achat</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* BUSINESS — vert, halo doré pulsant + micro-bounce décalé */}
            <a
              href="#business"
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 sm:px-7 py-3.5 text-sm font-semibold tracking-wide shadow-[0_12px_28px_-10px_hsl(var(--primary)/0.6)] hover:shadow-[0_18px_40px_-10px_hsl(var(--primary)/0.8)] active:scale-[0.97] transition-shadow duration-300 will-change-transform animate-cta-bob-delay motion-reduce:animate-none"
              style={{ transform: "translateZ(0)" }}
            >
              {/* Halo doré (transform-only, pas de box-shadow animé) */}
              <span
                aria-hidden
                className="absolute -inset-0.5 rounded-full ring-2 ring-gold/70 animate-cta-halo motion-reduce:hidden pointer-events-none"
              />
              <Briefcase className="w-4 h-4 relative z-10 group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
              <span className="relative z-10">Lancer mon business</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Micro-relances : bénéfices clés + preuve sociale (boost CTR) */}
          <div
            className="pt-3 sm:pt-4 space-y-2.5 animate-fade-in"
            style={{ animationDelay: "350ms", animationFillMode: "both" }}
          >
            {/* Bénéfices */}
            <ul className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-foreground/75 font-medium">
              <li className="inline-flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                Livraison Abidjan 24 h
              </li>
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                Paiement Wave sécurisé
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                100 % naturel · Bio
              </li>
            </ul>

            {/* Preuve sociale */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1" aria-label="Note moyenne 4,9 sur 5">
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" strokeWidth={1.5} />
                  ))}
                </span>
                <strong className="text-accent font-semibold">4,9/5</strong>
              </span>
              <span className="text-muted-foreground hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Users className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                <span>
                  <strong className="text-accent font-semibold">+ 500 clients</strong> satisfaits en Côte d'Ivoire
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Visuel produit — bocal Green World qui flotte sur le même fond crème-sauge que le texte */}
        <div
          data-testid="hero-product"
          className={`flex justify-center transition-all ease-premium ${visible ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-md"}`}
          style={{ transitionDelay: "400ms", transitionDuration: "1200ms" }}
        >
          <picture>
            <source srcSet={heroProductWebp} type="image/webp" />
            <img
              src={heroProductPng}
              alt="Green World Prestige — bocal de gélules naturelles aux herbes fraîches"
              width={965}
              height={1000}
              fetchPriority="high"
              decoding="async"
              loading="eager"
              className="w-[200px] animate-float [filter:drop-shadow(0_1px_1.5px_hsl(80_25%_35%/0.16))_drop-shadow(0_7px_9px_hsl(80_28%_30%/0.13))_drop-shadow(0_18px_22px_hsl(80_30%_25%/0.10))]"
            />
          </picture>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
