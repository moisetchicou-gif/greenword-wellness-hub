const PromoBanner2 = () => {
  return (
    <section className="py-10 bg-gradient-to-r from-accent/20 to-primary/10">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-3">
          <p className="text-primary text-sm font-medium uppercase tracking-widest">
            Produits naturels
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Commandez aujourd'hui vos produits Green World !
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Disponible sur Abidjan et dans toutes les grandes villes de Côte d'Ivoire.
          </p>
          <a
            href="#commander"
            className="inline-block mt-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
          >
            Commander maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner2;
