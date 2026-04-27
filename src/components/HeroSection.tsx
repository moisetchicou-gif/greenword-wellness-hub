import heroProduct from "@/assets/hero-product.webp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, ArrowDown } from "lucide-react";

const HeroSection = () => {
  const { ref, visible } = useScrollReveal(0.05);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-hero-warm"
    >
      {/* Halos décoratifs — verts & dorés très doux, ambiance zen */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-primary/15 blur-[100px] animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-[28rem] h-[28rem] rounded-full bg-gold/15 blur-[120px] animate-pulse-soft" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.05] blur-[120px]" />

      {/* Anneaux décoratifs subtils */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/[0.07] animate-rotate-slow hidden lg:block" />
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/[0.08] animate-rotate-slow hidden lg:block" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative">
        <div className="space-y-6 sm:space-y-7 text-center md:text-left">
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

          {/* CTA — vert plein + outline or */}
          <div
            className={`flex flex-wrap gap-3 sm:gap-4 pt-2 justify-center md:justify-start transition-all duration-1000 ease-premium ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "500ms" }}
          >
            <a
              href="#produits"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 sm:px-8 py-3.5 rounded-full font-medium text-sm tracking-wide shadow-[0_10px_28px_-10px_hsl(var(--primary)/0.55)] hover:shadow-[0_14px_36px_-10px_hsl(var(--primary)/0.65)] hover:bg-primary/95 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97]"
            >
              Découvrir la boutique
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </a>
            <a
              href="/bienfaits"
              className="inline-flex items-center justify-center border-2 border-gold/60 text-accent bg-card/60 backdrop-blur px-7 sm:px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-gold hover:text-gold-foreground hover:border-gold transition-all duration-400 hover:shadow-lg hover:shadow-gold/25 active:scale-[0.97]"
            >
              Nos bienfaits
            </a>
          </div>
        </div>

        {/* Visuel produit — pot + plantes (image générée) */}
        <div
          className={`flex justify-center transition-all ease-premium ${visible ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[0.85] blur-md"}`}
          style={{ transitionDelay: "400ms", transitionDuration: "1200ms" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/8 rounded-full blur-[80px] scale-90 animate-glow" />
            <div className="absolute inset-0 bg-gold/10 rounded-full blur-[60px] scale-75" style={{ animationDelay: "1.5s" }} />
            <img
              src={heroProduct}
              alt="Green World Prestige — pot de gélules naturelles entouré de plantes fraîches"
              width={520}
              height={520}
              fetchPriority="high"
              decoding="async"
              className="w-64 sm:w-80 md:w-[440px] lg:w-[480px] relative z-10 drop-shadow-[0_25px_45px_hsl(155_38%_16%/0.18)] animate-float"
            />
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "1200ms" }}>
        <span className="text-muted-foreground text-[10px] uppercase tracking-[0.25em] font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce-gentle" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
