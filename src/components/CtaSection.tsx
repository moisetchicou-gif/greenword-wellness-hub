const CtaSection = () => {
  return (
    <section id="commander" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-display">
          Prêt à transformer votre santé ?
        </h2>
        <p className="max-w-lg mx-auto opacity-90">
          Commandez dès aujourd'hui et recevez votre cure Greenword en 48h. 
          Satisfait ou remboursé pendant 30 jours.
        </p>
        <div className="pt-4">
          <a
            href="#"
            className="inline-block bg-card text-primary px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Commander maintenant — 39,90€
          </a>
        </div>
        <p className="text-xs opacity-70">Livraison gratuite • Paiement sécurisé • Sans engagement</p>
      </div>
    </section>
  );
};

export default CtaSection;
