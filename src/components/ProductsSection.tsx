const ProductsSection = () => {
  const placeholders = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Produit ${i + 1}`,
    description: "Description du produit à venir",
  }));

  return (
    <section id="produits" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl text-foreground">
            Nos <span className="text-primary">Produits</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez notre gamme complète de compléments alimentaires naturels Green World.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholders.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="aspect-square bg-secondary/50 flex items-center justify-center">
                <div className="text-center space-y-2 text-muted-foreground">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <p className="text-sm">Image à venir</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-display text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>
                <a
                  href="#commander"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity mt-2"
                >
                  Commander
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
