import { Star, Quote } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ivorianFirstNames = ["Adjoua","Kouassi","Sékou","Awa","Marie-Jeanne","Drissa","Fatou","Issouf","Aminata","Jean-Baptiste","Mariam","Lacina","Rokia","Mamadou","Clarisse","Ibrahim","Salimata","Yves","Fatoumata","Abdoulaye","Pascale","Oumar","Aïcha","Noël","Bintou","Lassina","Rachelle","Koffi","Naminata","Serge","Djénéba","Moussa","Hortense","Bakary","Sandrine","Adama","Colette","Souleymane","Pélagie","Yacouba","Estelle","Tiemoko","Léontine","Karim","Véronique","Sidiki","Élodie","Daouda","Thérèse","Youssouf"];
const ivorianLastNames = ["Koné","Yao","Ouattara","Touré","Brou","Coulibaly","Diabaté","Traoré","Konaté","Aka","Cissé","Dembélé","Sanogo","Diallo","N'Guessan","Bamba","Kouadio","Soro","Sangaré","Ehui","Fofana","Koffi","Adou","Achi","Tanoh"];
const cities = ["Abidjan","Bouaké","Yamoussoukro","San-Pédro","Korhogo","Daloa","Man","Gagnoa"];

const fiveStarTexts = [
  "Depuis que j'utilise Green World Prestige, je me sens pleine d'énergie chaque matin !",
  "La qualité des ingrédients se ressent immédiatement. Toute ma famille l'utilise.",
  "Mon bien-être général s'est nettement amélioré en quelques semaines.",
  "Très bon produit, je le recommande vivement à tous mes proches.",
  "Excellent complément alimentaire ! Je ne peux plus m'en passer.",
  "La meilleure décision santé que j'ai prise cette année.",
  "Je recommande Green World Prestige à 100%. Résultats visibles en 2 semaines.",
  "Produit de qualité supérieure. Je suis client fidèle depuis 1 an.",
  "J'ai retrouvé une énergie que je n'avais plus depuis des années.",
  "Le meilleur investissement pour ma santé. Qualité irréprochable.",
  "Green World Prestige a transformé ma routine santé.",
  "Ma tension artérielle s'est stabilisée grâce à Green World Prestige.",
  "Ma peau est plus belle et plus lumineuse depuis ce produit.",
  "Je dors mieux, j'ai plus d'énergie. Green World Prestige change la vie !",
  "Produit fiable et efficace. Je suis un ambassadeur convaincu.",
  "Ma glycémie est mieux contrôlée. Merci Green World Prestige !",
  "Mon cholestérol a baissé significativement.",
  "Qualité premium à un prix accessible. Rare de trouver ça.",
  "Les compléments Green World Prestige sont les meilleurs que j'ai jamais essayés.",
  "Ma mère de 70 ans utilise Green World Prestige et se sent rajeunie.",
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
  "Mon père utilise Green World Prestige et ses résultats se sont améliorés.",
  "Je recommande ce produit à mes collègues.",
  "Ma digestion s'est améliorée. Je vais continuer.",
  "Produit correct, livraison rapide. Je suis satisfait.",
  "Ma femme et moi utilisons Green World Prestige ensemble. Bon produit.",
  "Les résultats sont progressifs mais bien réels.",
  "Je me sens mieux depuis que j'ai commencé Green World Prestige.",
  "Bon produit naturel, je fais confiance à la marque.",
];

const threeStarTexts = [
  "Produit correct mais les effets prennent du temps à se manifester.",
  "Pas mal, mais je m'attendais à des résultats plus rapides.",
  "Le goût n'est pas terrible mais le produit semble efficace.",
  "Résultats moyens pour l'instant, je vais persévérer.",
  "Correct dans l'ensemble, rapport qualité-prix acceptable.",
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
  addTestimonials(fiveStarTexts, 5, 220);
  addTestimonials(fourStarTexts, 4, 280);
  addTestimonials(threeStarTexts, 3, 5);
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

const TestimonialCard = ({ t, index }: { t: { name: string; city: string; text: string; rating: number }; index: number }) => {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`bg-card/85 backdrop-blur-md border border-border/40 rounded-2xl p-6 hover-warm-glow hover-tilt relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Quote className="absolute top-4 right-4 w-6 h-6 text-coral/30" />
      <StarRating rating={t.rating} />
      <p className="text-foreground text-sm leading-relaxed mt-3 italic">"{t.text}"</p>
      <div className="mt-4 pt-3 border-t border-coral/15">
        <p className="font-semibold text-xs text-accent">{t.name}</p>
        <p className="text-[11px] text-muted-foreground">{t.city}, Côte d'Ivoire</p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<number | null>(null);
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);

  const filtered = filter !== null ? testimonials.filter((t) => t.rating === filter) : testimonials;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const displayed = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section id="avis" className="py-24 bg-section-warm-strong relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-coral/15 blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full bg-gold/15 blur-3xl animate-pulse-soft" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div ref={headerRef} className={`text-center mb-12 space-y-4 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-coral text-xs font-semibold uppercase tracking-[0.2em]">Témoignages</p>
          <h2 className="text-3xl sm:text-4xl text-accent">
            Ce que disent nos <span className="italic text-gradient-warm">clients</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            {testimonials.length} avis · Note moyenne : <span className="font-semibold text-accent">{avgRating}/5</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => { setFilter(null); setPage(0); }}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${filter === null ? "btn-warm shine-on-hover" : "bg-card/80 backdrop-blur border border-border/50 text-foreground hover:border-coral/40 hover:text-coral"}`}>
            Tous ({testimonials.length})
          </button>
          {[5, 4, 3].map((r) => (
            <button key={r} onClick={() => { setFilter(r); setPage(0); }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1 ${filter === r ? "btn-warm shine-on-hover" : "bg-card/80 backdrop-blur border border-border/50 text-foreground hover:border-coral/40 hover:text-coral"}`}>
              {r} <Star className="w-3 h-3 fill-current" /> ({testimonials.filter((t) => t.rating === r).length})
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} index={i} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button disabled={page === 0} onClick={() => setPage(page - 1)}
              className="px-5 py-2.5 rounded-full text-xs font-medium glass hover:bg-secondary disabled:opacity-30 transition-all duration-300">
              ← Précédent
            </button>
            <span className="text-xs text-muted-foreground px-3 font-medium">
              {page + 1} / {totalPages}
            </span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}
              className="px-5 py-2.5 rounded-full text-xs font-medium glass hover:bg-secondary disabled:opacity-30 transition-all duration-300">
              Suivant →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
