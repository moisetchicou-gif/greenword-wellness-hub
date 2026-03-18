import heroProduct from "@/assets/hero-product.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(160deg, hsl(120 20% 98%) 0%, hsl(130 30% 94%) 50%, hsl(140 25% 90%) 100%)" }}
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-up">
          <span className="inline-block bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            100% Naturel
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground">
            Votre santé,{" "}
            <span className="text-primary">naturellement</span> préservée.
          </h1>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            Découvrez nos compléments alimentaires formulés à partir d'ingrédients biologiques, 
            pour un bien-être durable au quotidien.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#commander"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg"
              style={{ boxShadow: "0 8px 32px -8px hsl(145 63% 32% / 0.25)" }}
            >
              Découvrir
            </a>
            <a
              href="#bienfaits"
              className="border border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              En savoir plus
            </a>
          </div>
        </div>
        <div className="flex justify-center animate-float">
          <img
            src={heroProduct}
            alt="Produit Green World - Complément alimentaire naturel"
            className="w-72 sm:w-96 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
