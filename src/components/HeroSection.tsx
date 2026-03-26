import heroProduct from "@/assets/hero-product.png";
import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";
import { Sparkles, ArrowDown } from "lucide-react";

const HeroSection = () => {
  const { ref, visible } = useScrollReveal(0.05);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        background: "linear-gradient(165deg, hsl(40 33% 99%) 0%, hsl(28 38% 95%) 40%, hsl(152 18% 92%) 100%)",
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-highlight/20 blur-3xl animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center relative">
        <div className="space-y-6 sm:space-y-8 text-center md:text-left">
          <div
            className={`inline-flex items-center gap-2 glass text-accent px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest uppercase transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-bounce-gentle" />
            100% Naturel · Certifié Bio
          </div>
          <h1
            className={`text-3xl sm:text-4xl lg:text-[3.75rem] leading-[1.15] text-accent transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "150ms" }}
          >
            La puissance de la nature,{" "}
            <span className="italic text-primary relative">
              validée
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/30 rounded-full" />
            </span>{" "}
            par la science.
          </h1>
          <p
            className={`text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed mx-auto md:mx-0 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms" }}
          >
            Découvrez nos compléments alimentaires et produits de beauté formulés à partir d'ingrédients biologiques d'exception,
            pour un bien-être durable au quotidien.
          </p>
          <div
            className={`flex flex-wrap gap-3 sm:gap-4 pt-2 justify-center md:justify-start transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "450ms" }}
          >
            <a
              href="#produits"
              className="group bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              style={{ boxShadow: "0 8px 32px -8px hsl(163 33% 18% / 0.3)" }}
            >
              <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm">
                Découvrir la boutique
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a
              href="#bienfaits"
              className="border border-accent/20 text-accent px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-accent hover:text-accent-foreground transition-all duration-500 hover:shadow-lg"
            >
              Nos bienfaits
            </a>
          </div>
        </div>
        <div
          className={`flex justify-center transition-all duration-1000 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="relative">
            {/* Glow behind product */}
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-75 animate-glow" />
            <img
              src={heroProduct}
              alt="Produit Green World — Complément alimentaire naturel"
              className="w-48 sm:w-72 md:w-96 drop-shadow-2xl relative z-10 animate-float"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-gentle">
        <span className="text-muted-foreground text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce-gentle" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
