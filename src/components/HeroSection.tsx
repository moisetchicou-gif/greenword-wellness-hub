import heroProduct from "@/assets/hero-product.png";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        background: "linear-gradient(165deg, hsl(40 33% 99%) 0%, hsl(28 38% 95%) 40%, hsl(152 18% 92%) 100%)",
      }}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm text-accent px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border border-highlight/50 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            100% Naturel · Certifié Bio
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.15] text-accent animate-fade-up" style={{ animationDelay: "0.1s" }}>
            La puissance de la nature,{" "}
            <span className="italic text-primary">validée</span> par la science.
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Découvrez nos compléments alimentaires et produits de beauté formulés à partir d'ingrédients biologiques d'exception,
            pour un bien-être durable au quotidien.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#produits"
              className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:opacity-90 transition-opacity shadow-lg"
              style={{ boxShadow: "0 8px 32px -8px hsl(163 33% 18% / 0.3)" }}
            >
              Découvrir la boutique
            </a>
            <a
              href="#bienfaits"
              className="border border-accent/20 text-accent px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              Nos bienfaits
            </a>
          </div>
        </div>
        <div className="flex justify-center animate-float">
          <img
            src={heroProduct}
            alt="Produit Green World — Complément alimentaire naturel"
            className="w-72 sm:w-96 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
