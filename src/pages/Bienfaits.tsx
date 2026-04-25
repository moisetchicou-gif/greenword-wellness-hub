import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FeaturesSection from "@/components/FeaturesSection";

const Bienfaits = () => {
  const siteUrl = "https://greenworldprestige.com";
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Nos bienfaits — Tous les produits Green World Prestige"
        description="Découvrez les bienfaits détaillés de chaque complément alimentaire naturel Green World Prestige : énergie, immunité, détox, beauté, vitalité et bien plus."
        canonical={siteUrl + "/bienfaits"}
      />
      <Navbar />
      <main className="flex-1 pt-20 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 pt-8 pb-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-display text-accent mb-3">
            Nos <span className="italic text-primary">bienfaits</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Retrouvez tous les bienfaits, produit par produit, de la gamme Green World Prestige.
          </p>
        </div>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Bienfaits;
