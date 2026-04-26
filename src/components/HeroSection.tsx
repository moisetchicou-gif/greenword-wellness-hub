import heroProduct from "@/assets/hero-product.webp";
import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";
import { Sparkles, ArrowDown } from "lucide-react";

const HeroSection = () => {
  const { ref, visible } = useScrollReveal(0.05);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-hero-warm"
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-coral/15 blur-[80px] animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gold/15 blur-[100px] animate-pulse-soft" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[90px] animate-pulse-soft" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-[120px]" />

      {/* Rotating decorative ring */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/[0.06] animate-rotate-slow hidden lg:block" />
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/[0.05] animate-rotate-slow hidden lg:block" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center relative">
        <div className="space-y-6 sm:space-y-8 text-center md:text-left">
          <div
            className={`inline-flex items-center gap-2 badge-contrast px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest uppercase transition-all duration-1000 ease-premium ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold animate-bounce-gentle" />
            100% Naturel · Certifié Bio
          </div>
          <h1
            className={`text-3xl sm:text-4xl lg:text-[3.75rem] leading-[1.15] text-accent transition-all duration-1000 ease-premium ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"}`}
            style={{ transitionDelay: "200ms" }}
          >
            La puissance de la nature,{" "}
            <span className="italic text-gradient-warm relative">
              validée
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-coral via-gold to-primary rounded-full transition-all duration-1000 ease-premium ${visible ? "w-full" : "w-0"}`} style={{ transitionDelay: "800ms" }} />
            </span>{" "}
            par la science.
          </h1>
          <p
            className={`text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed mx-auto md:mx-0 transition-all duration-1000 ease-premium ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "350ms" }}
          >
            Découvrez nos compléments alimentaires et produits de beauté formulés à partir d'ingrédients biologiques d'exception,
            pour un bien-être durable au quotidien.
          </p>
          <div
            className={`flex flex-wrap gap-3 sm:gap-4 pt-2 justify-center md:justify-start transition-all duration-1000 ease-premium ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "500ms" }}
          >
            <a
              href="#produits"
              className="group btn-warm shine-on-hover px-8 py-3.5 rounded-full font-medium text-sm tracking-wide relative"
            >
              <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm">
                Découvrir la boutique
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </span>
            </a>
            <a
              href="/bienfaits"
              className="border-2 border-coral/40 text-accent bg-card/70 backdrop-blur px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-gradient-to-r hover:from-coral hover:to-gold hover:text-coral-foreground hover:border-transparent transition-all duration-500 hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]"
            >
              Nos bienfaits
            </a>
          </div>
        </div>
        <div
          className={`flex justify-center transition-all ease-premium ${visible ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[0.85] blur-md"}`}
          style={{ transitionDelay: "400ms", transitionDuration: "1200ms" }}
        >
          <div className="relative">
            {/* Glow behind product */}
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[60px] scale-75 animate-glow" />
            <img
              src={heroProduct}
              alt="Produit Green World Prestige — Complément alimentaire naturel"
              width={384}
              height={384}
              fetchPriority="high"
              decoding="async"
              className="w-48 sm:w-72 md:w-96 drop-shadow-2xl relative z-10 animate-float"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "1200ms" }}>
        <span className="text-muted-foreground text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce-gentle" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
