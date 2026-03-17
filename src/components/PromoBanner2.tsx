import bannerPerson from "@/assets/banner-person.jpeg";

const PromoBanner2 = () => {
  return (
    <section className="py-10 bg-gradient-to-r from-accent/20 to-primary/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          <div className="text-center md:text-left space-y-3 flex-1">
            <p className="text-primary text-sm font-medium uppercase tracking-widest">
              Livraison gratuite
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Commandez aujourd'hui, recevez demain !
            </h3>
            <p className="text-muted-foreground max-w-lg">
              Livraison express disponible sur Abidjan et dans toutes les grandes villes de Côte d'Ivoire.
            </p>
            <a
              href="#commander"
              className="inline-block mt-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Commander — 24 900 FCFA
            </a>
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-primary/20 shrink-0">
            <img
              src={bannerPerson}
              alt="Client Greenword"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner2;
