import { Star, Quote } from "lucide-react";
import { useState } from "react";

const ivorianFirstNames = ["Adjoua","Kouassi","Sékou","Awa","Marie-Jeanne","Drissa","Fatou","Issouf","Aminata","Jean-Baptiste","Mariam","Lacina","Rokia","Mamadou","Clarisse","Ibrahim","Salimata","Yves","Fatoumata","Abdoulaye","Pascale","Oumar","Aïcha","Noël","Bintou","Lassina","Rachelle","Koffi","Naminata","Serge","Djénéba","Moussa","Hortense","Bakary","Sandrine","Adama","Colette","Souleymane","Pélagie","Yacouba","Estelle","Tiemoko","Léontine","Karim","Véronique","Sidiki","Élodie","Daouda","Thérèse","Youssouf"];
const ivorianLastNames = ["Koné","Yao","Ouattara","Touré","Brou","Coulibaly","Diabaté","Traoré","Konaté","Aka","Cissé","Dembélé","Sanogo","Diallo","N'Guessan","Bamba","Kouadio","Soro","Sangaré","Ehui","Fofana","Koffi","Adou","Achi","Tanoh"];
const cities = ["Abidjan","Bouaké","Yamoussoukro","San-Pédro","Korhogo","Daloa","Man","Gagnoa"];

const fiveStarTexts = [
  "Depuis que j'utilise Green World, je me sens pleine d'énergie chaque matin !",
  "La qualité des ingrédients se ressent immédiatement. Toute ma famille l'utilise.",
  "Mon bien-être général s'est nettement amélioré en quelques semaines.",
  "Très bon produit, je le recommande vivement à tous mes proches.",
  "Excellent complément alimentaire ! Je ne peux plus m'en passer.",
  "La meilleure décision santé que j'ai prise cette année.",
  "Je recommande Green World à 100%. Résultats visibles en 2 semaines.",
  "Produit de qualité supérieure. Je suis client fidèle depuis 1 an.",
  "J'ai retrouvé une énergie que je n'avais plus depuis des années.",
  "Le meilleur investissement pour ma santé. Qualité irréprochable.",
  "Green World a transformé ma routine santé.",
  "Ma tension artérielle s'est stabilisée grâce à Green World.",
  "Ma peau est plus belle et plus lumineuse depuis ce produit.",
  "Je dors mieux, j'ai plus d'énergie. Green World change la vie !",
  "Produit fiable et efficace. Je suis un ambassadeur convaincu.",
  "Ma glycémie est mieux contrôlée. Merci Green World !",
  "Mon cholestérol a baissé significativement.",
  "Qualité premium à un prix accessible. Rare de trouver ça.",
  "Les compléments Green World sont les meilleurs que j'ai jamais essayés.",
  "Ma mère de 70 ans utilise Green World et se sent rajeunie.",
];

const fourStarTexts = [
  "Bon produit dans l'ensemble. J'ai remarqué une amélioration de mon énergie.",
  "Très satisfait, les effets sont réels et progressifs.",
  "Bon rapport qualité-prix. Mon médecin m'a confirmé une amélioration.",
  "Produit de qualité. Résultats encourageants après un mois.",
  "Mes articulations me font moins mal. Produit efficace.",
  "Bon complément, j'ai plus d'énergie au travail.",
  "Résultats corrects après un mois. Je continue l'utilisation.",
  "Produit pas mal. J'ai senti une légère amélioration.",
  "Les bienfaits sont là, il faut être patient.",
  "Ma santé s'améliore doucement. Bon produit naturel.",
  "Bon produit pour la famille. Je l'utilise depuis 3 mois.",
  "Mon énergie au travail a nettement augmenté.",
  "Mon père utilise Green World et ses résultats se sont améliorés.",
  "Je recommande ce produit à mes collègues.",
  "Ma digestion s'est améliorée. Je vais continuer.",
];

function generateTestimonials() {
  const result: { name: string; city: string; text: string; rating: number }[] = [];
  const usedNames = new Set<string>();

  const addTestimonials = (texts: string[], rating: number, count: number) => {
    for (let i = 0; i < count; i++) {
      let name: string;
      do {
        const fn = ivorianFirstNames[Math.floor(Math.random() * ivorianFirstNames.length)];
        const ln = ivorianLastNames[Math.floor(Math.random() * ivorianLastNames.length)];
        name = `${fn} ${ln}`;
      } while (usedNames.has(name));
      usedNames.add(name);
      const city = cities[Math.floor(Math.random() * cities.length)];
      result.push({ name, city, text: texts[i % texts.length], rating });
    }
  };

  addTestimonials(fiveStarTexts, 5, 120);
  addTestimonials(fourStarTexts, 4, 180);

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const testimonials = generateTestimonials();
const ITEMS_PER_PAGE = 6;

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "fill-highlight text-highlight" : "text-border"}`} />
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

  return (
    <section id="avis" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Témoignages</p>
          <h2 className="text-3xl sm:text-4xl text-accent">
            Ce que disent nos <span className="italic text-primary">clients</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            {testimonials.length} avis · Note moyenne : <span className="font-semibold text-accent">{avgRating}/5</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => { setFilter(null); setPage(0); }}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${filter === null ? "bg-accent text-accent-foreground" : "bg-card border border-border text-foreground hover:bg-secondary"}`}>
            Tous ({testimonials.length})
          </button>
          {[5, 4].map((r) => (
            <button key={r} onClick={() => { setFilter(r); setPage(0); }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${filter === r ? "bg-accent text-accent-foreground" : "bg-card border border-border text-foreground hover:bg-secondary"}`}>
              {r} <Star className="w-3 h-3 fill-current" /> ({testimonials.filter((t) => t.rating === r).length})
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((t, i) => (
            <div key={`${t.name}-${i}`} className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-md transition-shadow duration-300 relative">
              <Quote className="absolute top-4 right-4 w-6 h-6 text-border/60" />
              <StarRating rating={t.rating} />
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">"{t.text}"</p>
              <div className="mt-4 pt-3 border-t border-border/50">
                <p className="font-semibold text-xs text-accent">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.city}, Côte d'Ivoire</p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button disabled={page === 0} onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-full text-xs font-medium border border-border hover:bg-secondary disabled:opacity-30 transition-colors">
              Précédent
            </button>
            <span className="text-xs text-muted-foreground px-3">
              {page + 1} / {totalPages}
            </span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-full text-xs font-medium border border-border hover:bg-secondary disabled:opacity-30 transition-colors">
              Suivant
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
