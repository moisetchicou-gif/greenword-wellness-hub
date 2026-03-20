import { Star } from "lucide-react";
import { useState } from "react";

const ivorianFirstNames = ["Adjoua","Kouassi","Sékou","Awa","Marie-Jeanne","Drissa","Fatou","Issouf","Aminata","Jean-Baptiste","Mariam","Lacina","Rokia","Mamadou","Clarisse","Ibrahim","Salimata","Yves","Fatoumata","Abdoulaye","Pascale","Oumar","Aïcha","Noël","Bintou","Lassina","Rachelle","Koffi","Naminata","Serge","Djénéba","Moussa","Hortense","Bakary","Sandrine","Adama","Colette","Souleymane","Pélagie","Yacouba","Estelle","Tiemoko","Léontine","Karim","Véronique","Sidiki","Élodie","Daouda","Thérèse","Youssouf","Béatrice","Ali","Chantal","Lamine","Joséphine","Ousmane","Carine","Ladji","Rosalie","Madou","Louise","Fofana","Germaine","Diomandé","Sylvie","Konaté","Monique","Diakité","Patricia","Sanogo","Bernadette","Bamba","Jacqueline","Traoré","Suzanne","Camara","Delphine","Diabaté","Nadège","Keita","Charlène","Touré","Brigitte","Soro","Murielle","Coulibaly","Catherine","Dagnogo","Marie-Claire","Ouédraogo","Anne-Marie","Konan","Madeleine","Meïté","Hélène","Silué","Marguerite","Doumbia","Élisabeth","Sylla","Eugénie"];
const ivorianLastNames = ["Koné","Yao","Ouattara","Touré","Brou","Coulibaly","Diabaté","Traoré","Konaté","Aka","Cissé","Dembélé","Sanogo","Diallo","N'Guessan","Bamba","Kouadio","Soro","Sangaré","Ehui","Fofana","Koffi","Adou","Achi","Tanoh","Gnahoré","Assi","Aké","Kra","Dié","Gbagbo","Goba","Guédé","Tape","Zadi","Blé","Doué","Guéi","Djè","Loba","Dago","Boa","Gnéba","Kakou","Séry","Gnangnan","Yéo","Méité","Silué","Dagnogo"];
const cities = ["Abidjan","Bouaké","Yamoussoukro","San-Pédro","Korhogo","Daloa","Man","Gagnoa","Divo","Soubré","Grand-Bassam","Abengourou","Séguéla","Bondoukou","Odienné","Ferkessédougou"];

const fiveStarTexts = [
  "Depuis que j'utilise Green World, je me sens pleine d'énergie chaque matin. Un produit vraiment exceptionnel !",
  "La qualité des ingrédients se ressent immédiatement. Toute ma famille l'utilise.",
  "En tant que sportif, Green World a dépassé toutes mes attentes !",
  "Mon bien-être général s'est nettement amélioré en quelques semaines.",
  "Green World m'aide à rester en forme et active. Merci infiniment !",
  "Très bon produit, je le recommande vivement à tous mes proches.",
  "Je suis agréablement surprise par les résultats. Mon sommeil s'est amélioré.",
  "Produit naturel et efficace. Je me sens beaucoup mieux depuis que je l'utilise.",
  "Excellent complément alimentaire ! Je ne peux plus m'en passer.",
  "La meilleure décision santé que j'ai prise cette année.",
  "Mon médecin a constaté une nette amélioration de mes analyses sanguines.",
  "Je recommande Green World à 100%. Résultats visibles en 2 semaines.",
  "Mes douleurs articulaires ont considérablement diminué. Merci Green World !",
  "Produit de qualité supérieure. Je suis client fidèle depuis 1 an.",
  "Ma famille entière utilise Green World. Nous sommes tous satisfaits.",
  "J'ai retrouvé une énergie que je n'avais plus depuis des années.",
  "Le meilleur investissement pour ma santé. Qualité irréprochable.",
  "Après 3 mois d'utilisation, les résultats sont spectaculaires.",
  "Green World a transformé ma routine santé. Je ne reviendrai jamais en arrière.",
  "Service client excellent et produits de qualité. Parfait !",
  "Ma tension artérielle s'est stabilisée grâce à Green World.",
  "Produit miracle pour ma digestion. Fini les ballonnements !",
  "Je suis impressionné par la rapidité des résultats. Bravo !",
  "Mon immunité s'est renforcée, je tombe moins souvent malade.",
  "Excellente qualité, livraison rapide. Tout est parfait.",
  "Green World m'a aidé à perdre du poids naturellement.",
  "Ma peau est plus belle et plus lumineuse depuis que j'utilise ce produit.",
  "Je dors mieux, j'ai plus d'énergie. Green World change la vie !",
  "Produit fiable et efficace. Je suis un ambassadeur convaincu.",
  "Les bienfaits sont réels et durables. Excellent produit naturel.",
  "Ma glycémie est mieux contrôlée. Merci Green World !",
  "Produit formidable pour la santé masculine. Je recommande à tous les hommes.",
  "Mon cholestérol a baissé significativement. Les résultats parlent d'eux-mêmes.",
  "Je suis reconnaissant d'avoir découvert Green World. Un vrai trésor de santé.",
  "Qualité premium à un prix accessible. Rare de trouver ça.",
  "Ma femme et moi utilisons Green World quotidiennement. Nous sommes en pleine forme.",
  "Les compléments Green World sont les meilleurs que j'ai jamais essayés.",
  "Service impeccable et produits authentiques. Je suis totalement satisfait.",
  "Grâce à Green World, j'ai pu reprendre le sport après des mois d'arrêt.",
  "Produit exceptionnel qui tient ses promesses. Rare de nos jours.",
  "Mon système immunitaire n'a jamais été aussi fort. Merci Green World.",
  "Après des années de problèmes digestifs, Green World m'a soulagé.",
  "La qualité est constante à chaque commande. Très professionnel.",
  "Je prends Green World depuis 6 mois. Ma santé s'est transformée.",
  "Produit naturel sans effets secondaires. C'est exactement ce que je cherchais.",
  "Ma mère de 70 ans utilise Green World et se sent rajeunie.",
  "Livraison rapide et produit conforme. Service 5 étoiles.",
  "Les analyses de mon père se sont améliorées grâce à Green World.",
  "Un produit qui vaut chaque franc CFA dépensé. Investissement santé.",
  "Je suis kinésithérapeute et je recommande Green World à mes patients.",
  "Ma fatigue chronique a disparu. Green World est un miracle.",
  "Produit testé et approuvé par toute ma communauté.",
  "Les résultats sont au-delà de mes espérances. Incroyable !",
  "Green World est devenu indispensable dans mon quotidien.",
  "Je n'ai plus besoin de certains médicaments grâce à Green World.",
  "Mes reins fonctionnent mieux depuis que je prends ce complément.",
  "Produit de confiance que je recommande les yeux fermés.",
  "Ma vitalité est revenue. Green World est mon secret santé.",
  "Excellent rapport qualité-prix pour un produit aussi efficace.",
  "Je suis médecin et je valide la qualité des ingrédients Green World.",
];

const fourStarTexts = [
  "Bon produit dans l'ensemble. J'ai remarqué une amélioration de mon énergie.",
  "Très satisfait, même si le goût pourrait être amélioré. Les effets sont réels.",
  "Je l'utilise depuis 2 mois. Résultats positifs mais j'aurais aimé plus de rapidité.",
  "Bon rapport qualité-prix. Mon médecin m'a confirmé une amélioration de mes analyses.",
  "Produit de qualité. J'enlève une étoile pour le délai de livraison.",
  "Bons résultats sur ma digestion. Je recommande avec une petite réserve sur le prix.",
  "Mes articulations me font moins mal. Produit efficace, emballage à revoir.",
  "Bon complément, j'ai plus d'énergie au travail. Manque juste un guide d'utilisation clair.",
  "Je suis contente des résultats. Le produit est bon mais un peu cher.",
  "Quatre étoiles car le produit est bon, mais la taille du flacon est petite.",
  "Résultats corrects après un mois. Je m'attendais à mieux vu les promesses.",
  "Produit pas mal. J'ai senti une légère amélioration de mon énergie.",
  "Bon produit, je continue de l'utiliser. La livraison a pris un peu de temps.",
  "Résultats satisfaisants sur ma santé. Le prix reste un peu élevé.",
  "Je suis globalement satisfait. Les effets sont progressifs mais réels.",
  "Produit efficace, j'aurais aimé des sachets individuels pour voyager.",
  "Ma santé s'améliore doucement. Bon produit, packaging basique.",
  "Les bienfaits sont là, mais il faut être patient. Bon produit quand même.",
  "Quatre étoiles méritées. Le produit est bon, manque juste plus de saveur.",
  "Résultats positifs sur ma tension. Je recommande malgré un prix un peu élevé.",
  "Bon produit naturel. Seul bémol : le temps pour voir les premiers résultats.",
  "Je suis satisfait dans l'ensemble. La notice en français serait un plus.",
  "Efficace pour ma digestion. J'enlève une étoile car le goût est amer.",
  "Produit correct qui fait le travail. Livraison un peu longue à Bouaké.",
  "Bonne qualité d'ingrédients. Manque une version pour enfants.",
  "Je recommande ce produit. Mon seul regret est de ne pas l'avoir découvert plus tôt.",
  "Bon complément alimentaire. Quatre étoiles pour le rapport qualité/efficacité.",
  "Mon énergie a augmenté notablement. Petit bémol sur la taille des gélules.",
  "Satisfait du produit, la livraison était rapide cette fois-ci.",
  "Green World est un bon produit, mais j'aimerais plus de variétés de thé.",
  "Résultats encourageants après 6 semaines. Je vais continuer.",
  "Bon produit, je le prends tous les jours. L'emballage pourrait être plus pratique.",
  "Ma femme adore ce produit. Seul point négatif : rupture de stock fréquente.",
  "Je suis content des résultats. Service client réactif.",
  "Produit bien pour la santé. J'aurais aimé plus d'informations sur l'emballage.",
  "Quatre étoiles bien méritées. Produit sérieux et efficace.",
  "Bons résultats sur mon cholestérol. Le goût est acceptable.",
  "Produit recommandé par un ami. Je confirme son efficacité.",
  "Bon achat, je vais renouveler ma commande le mois prochain.",
  "Satisfaisant dans l'ensemble. La posologie pourrait être plus claire.",
  "Green World m'a aidé à mieux gérer mon stress au quotidien.",
  "Bon produit pour la famille. Je l'utilise depuis 3 mois avec satisfaction.",
  "Les résultats sont là, il faut juste de la patience. Je recommande.",
  "Produit fiable, je fais confiance à Green World pour ma santé.",
  "Mon énergie au travail a nettement augmenté. Bon investissement.",
  "Je suis satisfaite, le produit tient ses promesses. Bravo à l'équipe.",
  "Bonne qualité, bon service. Je retire une étoile pour le packaging.",
  "Mon père utilise Green World et ses résultats médicaux se sont améliorés.",
  "Produit correct et naturel. Le goût est un peu fort mais ça passe.",
  "Je recommande Green World à mes collègues. Résultats encourageants.",
  "Bon produit pour renforcer l'immunité. Ma famille l'adore.",
  "Résultats visibles après un mois. Je suis agréablement surpris.",
  "Le produit est bon, j'aurais aimé un format voyage plus pratique.",
  "Ma digestion s'est améliorée. Bon produit, je vais continuer.",
  "Quatre étoiles car le produit est efficace mais un peu cher.",
  "Je suis satisfait de mon achat. Green World est un bon choix santé.",
  "Produit de bonne qualité. Les effets sont progressifs mais réels.",
  "Mon médecin approuve ce complément. Résultats satisfaisants.",
  "Bon produit naturel, je le recommande à tous ceux qui veulent prendre soin d'eux.",
  "Green World m'accompagne au quotidien. Bon investissement pour la santé.",
  "Produit bien formulé. J'aurais aimé plus d'informations sur les ingrédients.",
  "Résultats positifs après 2 mois d'utilisation. Je suis content.",
  "Le produit fait son effet. Bon rapport qualité-prix dans l'ensemble.",
  "Ma femme et moi sommes satisfaits. Nous recommandons Green World.",
  "Bon produit, livraison correcte. Je mets 4 étoiles avec plaisir.",
  "Les compléments Green World sont de bonne qualité. Je suis fidèle.",
  "Produit intéressant pour la santé. Les résultats sont encourageants.",
  "Je suis content de mon choix. Green World est un produit sérieux.",
  "Bon complément pour la santé. Je le prends chaque matin sans faute.",
  "Ma santé générale s'est améliorée. Merci Green World pour ce produit.",
  "Produit correct, service client à l'écoute. Je recommande.",
  "Les bienfaits sont réels. Un très bon produit que je recommande vivement.",
  "Bon produit que j'utilise depuis plusieurs semaines. Résultats progressifs.",
  "Je suis content d'avoir découvert Green World. Mon énergie est revenue.",
  "Produit de qualité accessible. Quatre étoiles bien méritées.",
  "Mon système digestif fonctionne mieux. Bon produit naturel.",
  "Green World est un bon allié santé. Je le recommande à mon entourage.",
  "Produit satisfaisant. Je vais renouveler ma commande prochainement.",
  "Résultats positifs sur mon bien-être général. Bon choix.",
  "Je suis satisfait de la qualité. Un bon produit pour la santé au quotidien.",
  "Bon produit, je le conseille. Les effets se font sentir après quelques semaines.",
  "Ma mère est satisfaite de Green World. Elle se sent mieux au quotidien.",
  "Produit fiable et de bonne qualité. Je donne quatre étoiles sans hésiter.",
  "Les compléments sont bons. J'aurais aimé plus de saveurs disponibles.",
  "Bon produit pour la vitalité. Je le prends régulièrement avec satisfaction.",
  "Résultats encourageants sur ma santé. Green World est un bon investissement.",
  "Je suis content du produit. La qualité est au rendez-vous.",
  "Produit naturel et efficace. Quatre étoiles pour la qualité globale.",
  "Mon frère et moi utilisons Green World. Nous sommes satisfaits des résultats.",
  "Bon complément alimentaire. Je le recommande pour une meilleure santé.",
  "Le produit est bien. Service de livraison amélioré par rapport à ma dernière commande.",
  "Green World tient ses promesses. Je suis un client satisfait.",
  "Produit de bonne facture. Les résultats sont visibles après quelques semaines.",
  "Je recommande Green World. Bon produit pour toute la famille.",
  "Ma santé s'améliore grâce à Green World. Bon investissement santé.",
  "Produit correct et naturel. Je suis satisfait de mon achat.",
  "Les effets sont réels et durables. Bon produit que je recommande.",
  "Je donne quatre étoiles à Green World. Produit sérieux et efficace.",
  "Bon produit pour la santé. Mon médecin est satisfait de mes progrès.",
  "Green World m'aide au quotidien. Je suis reconnaissant pour ce produit.",
  "Produit de qualité avec des résultats tangibles. Je recommande vivement.",
];

function generateTestimonials() {
  const result: { name: string; city: string; text: string; rating: number }[] = [];
  const usedNames = new Set<string>();

  const addTestimonials = (texts: string[], rating: number) => {
    texts.forEach((text) => {
      let name: string;
      do {
        const firstName = ivorianFirstNames[Math.floor(Math.random() * ivorianFirstNames.length)];
        const lastName = ivorianLastNames[Math.floor(Math.random() * ivorianLastNames.length)];
        name = `${firstName} ${lastName}`;
      } while (usedNames.has(name));
      usedNames.add(name);
      const city = cities[Math.floor(Math.random() * cities.length)];
      result.push({ name, city, text, rating });
    });
  };

  const repeat = (arr: string[], count: number) => {
    const out: string[] = [];
    for (let i = 0; i < count; i++) out.push(arr[i % arr.length]);
    return out;
  };

  addTestimonials(repeat(fiveStarTexts, 120), 5);
  addTestimonials(repeat(fourStarTexts, 180), 4);

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

const testimonials = generateTestimonials();

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
          {displayed.map((t, i) => (
            <div key={`${t.name}-${i}`} className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow duration-300">
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
