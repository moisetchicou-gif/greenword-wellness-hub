import bannerPerson from "@/assets/banner-person.jpeg";

const PromoBanner = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary-foreground/30 shrink-0">
            <img
              src={bannerPerson}
              alt="Ambassadeur Greenword"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left space-y-3">
            <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-widest">
              Offre spéciale
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
              -20% sur votre première commande !
            </h3>
            <p className="text-primary-foreground/80 max-w-lg">
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
      </div>
    </section>
  );
};

export default PromoBanner;
