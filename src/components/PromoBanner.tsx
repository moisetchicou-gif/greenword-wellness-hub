const PromoBanner = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-3">
          <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-widest">
            Offre spéciale
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
            -20% sur votre première commande !
          </h3>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">
            Rejoignez des milliers d'Ivoiriens qui font confiance à Greenword pour leur bien-être quotidien.
          </p>
          <a
            href="#commander"
            className="inline-block mt-2 bg-card text-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
          >
            J'en profite maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
