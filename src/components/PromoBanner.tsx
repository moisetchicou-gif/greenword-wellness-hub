const PromoBanner = () => {
  return (
    <section className="py-12 relative overflow-hidden" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--coral)) 0%, hsl(var(--primary)) 60%, hsl(var(--gold)) 100%)" }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(0 0% 100% / 0.4) 0%, transparent 40%)" }} />
      <div className="container mx-auto px-6 relative">
        <div className="text-center space-y-3">
          <p className="text-white/90 text-sm font-medium uppercase tracking-widest">
            Offre spéciale
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
            -20% sur votre première commande !
          </h3>
          <p className="text-white/90 max-w-lg mx-auto">
            Rejoignez des milliers d'Ivoiriens qui font confiance à Green World Prestige pour leur bien-être quotidien.
          </p>
          <a
            href="#commander"
            className="inline-block mt-2 bg-card text-coral px-8 py-3 rounded-full font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300 shine-on-hover"
          >
            J'en profite maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
