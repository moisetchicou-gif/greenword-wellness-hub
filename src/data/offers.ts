import scannerImg from "@/assets/product-scanner-qrma.jpg";

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
];

export const getOfferBySlug = (slug: string): Offer | undefined =>
  offers.find((o) => o.slug === slug);
