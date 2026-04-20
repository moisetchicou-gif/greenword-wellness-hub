import scannerImg from "@/assets/product-scanner-qrma.jpg";
import detoxImg from "@/assets/product-detoxin-pad.jpg";

export interface OfferTestimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
}

export interface OfferFaq {
  q: string;
  a: string;
}

export interface OfferStep {
  title: string;
  description: string;
}

export interface Offer {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  priceNum: number;
  image: string;
  video?: string;
  highlights: string[];
  benefits: string[];
  steps: OfferStep[];
  duration: string;
  forWhom: string;
  testimonials: OfferTestimonial[];
  faq: OfferFaq[];
}

export const offers: Offer[] = [
  {
    id: 1001,
    slug: "scanner-qrma",
    name: "Scanner QRMA",
    tagline: "Bilan de santé express",
    shortDescription:
      "Analyse rapide et complète de votre état de santé en quelques minutes grâce à la technologie QRMA.",
    longDescription:
      "Le Scanner QRMA (Quantum Resonance Magnetic Analyzer) est un dispositif d'analyse non-invasif qui évalue l'état de plus de 40 systèmes du corps humain en quelques minutes. En captant les fréquences électromagnétiques émises par vos cellules, il fournit un rapport détaillé sur la santé de vos organes, votre niveau de toxines, vos carences en vitamines et minéraux, et vos déséquilibres énergétiques. Une approche moderne, douce et complète pour faire le point sur votre santé.",
    price: "5 000 FCFA",
    priceNum: 5000,
    image: scannerImg,
    video: "/videos/scanner-qrma.mp4",
    highlights: [
      "+40 systèmes analysés",
      "Résultats en 5 minutes",
      "Rapport personnalisé",
      "Indolore & non-invasif",
    ],
    benefits: [
      "Analyse multi-organes (foie, reins, cœur, poumons, etc.)",
      "Détection précoce des déséquilibres",
      "Évaluation du niveau de stress et de fatigue",
      "Identification des carences en vitamines et minéraux",
      "Conseils personnalisés en compléments alimentaires",
    ],
    steps: [
      { title: "Accueil & questionnaire", description: "Brève évaluation de vos antécédents et de votre mode de vie." },
      { title: "Connexion du scanner", description: "Vous tenez simplement le capteur dans la main pendant 1 à 2 minutes." },
      { title: "Analyse des fréquences", description: "Le scanner mesure les ondes électromagnétiques de vos cellules." },
      { title: "Rapport & conseils", description: "Explication des résultats et recommandations naturelles adaptées." },
    ],
    duration: "Environ 15 à 20 minutes",
    forWhom:
      "Toute personne souhaitant faire un bilan rapide de sa santé, prévenir des déséquilibres, ou suivre l'évolution d'une cure de compléments alimentaires.",
    testimonials: [
      {
        name: "Aïcha K.",
        city: "Abidjan",
        rating: 5,
        text: "J'étais sceptique au début, mais le scanner a détecté exactement les problèmes digestifs dont je souffrais depuis des mois. Les recommandations sont précises.",
      },
      {
        name: "Jean-Baptiste M.",
        city: "Yamoussoukro",
        rating: 5,
        text: "Pour 5 000 FCFA, c'est un excellent investissement. J'ai compris pourquoi je me sentais fatigué en permanence : carence en vitamine D et stress oxydatif.",
      },
      {
        name: "Fatou D.",
        city: "Bouaké",
        rating: 4,
        text: "Rapide, indolore et très instructif. Le rapport est très détaillé. J'ai commandé les compléments recommandés et je vois déjà la différence.",
      },
    ],
    faq: [
      {
        q: "Le scanner est-il douloureux ?",
        a: "Pas du tout. Vous tenez simplement un capteur dans votre main, l'analyse est totalement indolore et non-invasive.",
      },
      {
        q: "Combien de temps dure l'analyse ?",
        a: "L'analyse en elle-même prend environ 2 minutes. Avec l'explication des résultats, comptez 15 à 20 minutes au total.",
      },
      {
        q: "Le scanner remplace-t-il un médecin ?",
        a: "Non. Le QRMA est un outil de prévention et d'orientation. Il ne remplace en aucun cas un diagnostic médical professionnel.",
      },
      {
        q: "Puis-je le faire enceinte ou avec un pacemaker ?",
        a: "Le scanner n'est pas recommandé pour les femmes enceintes ni les personnes portant un pacemaker. Demandez conseil avant.",
      },
    ],
  },
  {
    id: 1002,
    slug: "magic-detoxin-pad",
    name: "Magic Detoxin Pad",
    tagline: "Détox en une nuit",
    shortDescription:
      "Patchs détoxifiants à appliquer sous les pieds pour éliminer les toxines pendant votre sommeil.",
    longDescription:
      "Le Magic Detoxin Pad utilise les principes de la réflexologie plantaire combinés à des ingrédients naturels (vinaigre de bambou, tourmaline, chitosane) pour absorber les toxines accumulées dans votre organisme. Appliqués avant le coucher, les patchs travaillent toute la nuit et ressortent au matin foncés, signe visible de l'élimination des impuretés. Une cure régulière améliore le sommeil, réduit la fatigue chronique et booste votre énergie au quotidien.",
    price: "5 000 FCFA",
    priceNum: 5000,
    image: detoxImg,
    video: "/videos/detox-pad.mp4",
    highlights: [
      "Action pendant le sommeil",
      "Ingrédients 100% naturels",
      "Effet visible dès la 1ʳᵉ nuit",
      "Sans effet secondaire",
    ],
    benefits: [
      "Élimine les toxines accumulées",
      "Améliore la qualité du sommeil",
      "Réduit la fatigue chronique",
      "Soulage les douleurs articulaires légères",
      "Booste l'énergie et la vitalité",
      "Renforce le système immunitaire",
    ],
    steps: [
      { title: "Nettoyage des pieds", description: "Lavez et séchez soigneusement la plante de vos pieds avant l'application." },
      { title: "Application du patch", description: "Collez un patch sous chaque pied, le côté adhésif vers la peau." },
      { title: "Nuit réparatrice", description: "Gardez les patchs toute la nuit (8 heures recommandées)." },
      { title: "Constatation au matin", description: "Retirez les patchs : leur couleur foncée témoigne des toxines absorbées." },
    ],
    duration: "1 application par nuit, cure de 7 à 14 jours",
    forWhom:
      "Personnes fatiguées, stressées, exposées à la pollution ou à une mauvaise alimentation. Idéal en cure de changement de saison ou après des excès.",
    testimonials: [
      {
        name: "Mariam T.",
        city: "Abidjan",
        rating: 5,
        text: "Dès la première nuit, j'ai été choquée de voir les patchs aussi foncés au réveil ! Après une semaine, je dors mieux et je me sens beaucoup plus légère.",
      },
      {
        name: "Koffi A.",
        city: "San-Pédro",
        rating: 5,
        text: "Je travaille beaucoup et j'étais épuisé en permanence. Une cure de 10 jours et mon énergie est revenue. Je recommande à tous.",
      },
      {
        name: "Sandrine B.",
        city: "Cocody",
        rating: 4,
        text: "Très bon produit pour le prix. J'ai remarqué une amélioration de mon sommeil et moins de douleurs aux jambes le matin.",
      },
    ],
    faq: [
      {
        q: "Combien de temps dure une cure ?",
        a: "Une cure complète dure 7 à 14 jours, à raison d'un patch par pied chaque nuit. À renouveler tous les 2 à 3 mois.",
      },
      {
        q: "Pourquoi les patchs sont-ils foncés au matin ?",
        a: "C'est le signe visible de l'absorption des toxines (métaux lourds, déchets métaboliques) à travers la peau de vos pieds.",
      },
      {
        q: "Y a-t-il des effets secondaires ?",
        a: "Aucun effet secondaire connu. Les ingrédients sont 100% naturels. Évitez en cas de plaie ouverte sur les pieds.",
      },
      {
        q: "Peut-on l'utiliser enceinte ?",
        a: "Par précaution, demandez conseil à un professionnel de santé avant utilisation pendant la grossesse ou l'allaitement.",
      },
    ],
  },
];

export const getOfferBySlug = (slug: string): Offer | undefined =>
  offers.find((o) => o.slug === slug);
