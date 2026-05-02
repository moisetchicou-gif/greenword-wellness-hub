import heroProductPng from "@/assets/hero-product.png";
import heroProductWebp from "@/assets/hero-product.webp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, ArrowDown } from "lucide-react";

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
