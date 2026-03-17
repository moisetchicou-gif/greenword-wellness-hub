import { Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  { name: "Adjoua Koné", city: "Abidjan", text: "Depuis que j'utilise Greenword, je me sens pleine d'énergie chaque matin. Un produit vraiment exceptionnel !", rating: 5 },
  { name: "Kouassi Yao", city: "Bouaké", text: "La qualité des ingrédients se ressent immédiatement. Toute ma famille l'utilise.", rating: 5 },
  { name: "Sékou Ouattara", city: "Yamoussoukro", text: "En tant que sportif, Greenword a dépassé toutes mes attentes !", rating: 5 },
  { name: "Awa Touré", city: "San-Pédro", text: "Mon bien-être général s'est nettement amélioré en quelques semaines.", rating: 5 },
  { name: "Marie-Jeanne Brou", city: "Korhogo", text: "Greenword m'aide à rester en forme et active. Merci infiniment !", rating: 5 },
  { name: "Drissa Coulibaly", city: "Abidjan", text: "Très bon produit, je le recommande vivement à tous mes proches.", rating: 5 },
  { name: "Fatou Diabaté", city: "Daloa", text: "Je suis agréablement surprise par les résultats. Mon sommeil s'est amélioré.", rating: 5 },
  { name: "Issouf Traoré", city: "Man", text: "Produit naturel et efficace. Je me sens beaucoup mieux depuis que je l'utilise.", rating: 5 },
  { name: "Aminata Konaté", city: "Gagnoa", text: "Excellent complément alimentaire ! Je ne peux plus m'en passer.", rating: 5 },
  { name: "Jean-Baptiste Aka", city: "Abidjan", text: "La meilleure décision santé que j'ai prise cette année.", rating: 5 },
  { name: "Mariam Cissé", city: "Bouaké", text: "Bon produit dans l'ensemble. J'ai remarqué une amélioration de mon énergie.", rating: 4 },
  { name: "Lacina Dembélé", city: "Abidjan", text: "Très satisfait, même si le goût pourrait être amélioré. Les effets sont réels.", rating: 4 },
  { name: "Rokia Sanogo", city: "Korhogo", text: "Je l'utilise depuis 2 mois. Résultats positifs mais j'aurais aimé plus de rapidité.", rating: 4 },
  { name: "Mamadou Diallo", city: "San-Pédro", text: "Bon rapport qualité-prix. Mon médecin m'a confirmé une amélioration de mes analyses.", rating: 4 },
  { name: "Clarisse N'Guessan", city: "Yamoussoukro", text: "Produit de qualité. J'enlève une étoile pour le délai de livraison.", rating: 4 },
  { name: "Ibrahim Koné", city: "Daloa", text: "Bons résultats sur ma digestion. Je recommande avec une petite réserve sur le prix.", rating: 4 },
  { name: "Salimata Bamba", city: "Abidjan", text: "Mes articulations me font moins mal. Produit efficace, emballage à revoir.", rating: 4 },
  { name: "Yves Kouadio", city: "Bouaké", text: "Bon complément, j'ai plus d'énergie au travail. Manque juste un guide d'utilisation clair.", rating: 4 },
  { name: "Fatoumata Soro", city: "Man", text: "Je suis contente des résultats. Le produit est bon mais un peu cher.", rating: 4 },
  { name: "Abdoulaye Sangaré", city: "Gagnoa", text: "Quatre étoiles car le produit est bon, mais la taille du flacon est petite.", rating: 4 },
  { name: "Pascale Ehui", city: "Abidjan", text: "Résultats corrects après un mois. Je m'attendais à mieux vu les promesses.", rating: 4 },
  { name: "Oumar Fofana", city: "Abidjan", text: "Produit pas mal. J'ai senti une légère amélioration de mon énergie.", rating: 4 },
];

const ITEMS_PER_PAGE = 9;

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<number | null>(null);

  const filtered = filter !== null ? testimonials.filter((t) => t.rating === filter) : testimonials;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const displayed = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);

  const handleFilter = (r: number | null) => {
    setFilter(r);
    setPage(0);
  };

  return (
    <section id="avis" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl text-foreground">
            Ce que disent nos <span className="text-primary">clients</span>
          </h2>
          <p className="text-muted-foreground">
            {testimonials.length} avis · Note moyenne : <span className="font-semibold text-primary">{avgRating}/5</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => handleFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === null ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-primary/10"
            }`}
          >
            Tous ({testimonials.length})
          </button>
          {[5, 4].map((r) => (
            <button
              key={r}
              onClick={() => handleFilter(r)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                filter === r ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-primary/10"
              }`}
            >
              {r} <Star className="w-3 h-3 fill-current" /> ({testimonials.filter((t) => t.rating === r).length})
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-6 border border-border">
              <div className="mb-4">
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.city}, Côte d'Ivoire</p>
              </div>
              <StarRating rating={t.rating} />
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">"{t.text}"</p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-card border border-border text-foreground disabled:opacity-40 hover:bg-primary/10 transition-colors"
            >
              ← Précédent
            </button>
            <span className="text-sm text-muted-foreground px-3">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-card border border-border text-foreground disabled:opacity-40 hover:bg-primary/10 transition-colors"
            >
              Suivant →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
