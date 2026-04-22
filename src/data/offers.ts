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
    slug: "detox-bains-de-pieds-ioniques",
    name: "Détox — bains de pieds ioniques",
    tagline: "Détox par les pieds",
    shortDescription:
      "Séance de détox douce par bain de pieds ionique pour favoriser l'élimination des toxines et la sensation de légèreté.",
    longDescription:
      "Le bain de pieds ionique est une méthode de bien-être non-invasive qui consiste à placer les pieds dans une eau tiède activée par un dispositif ionique. La séance aide à détendre le corps, stimuler la circulation et accompagner naturellement les processus d'élimination. C'est une solution simple, relaxante et accessible pour les personnes qui souhaitent prendre soin de leur équilibre, réduire la sensation de fatigue et commencer une routine de détox en douceur.",
    price: "5 000 FCFA",
    priceNum: 5000,
    image: detoxImg,
    highlights: [
      "Séance relaxante",
      "Méthode non-invasive",
      "Détox par les pieds",
      "Accompagnement personnalisé",
    ],
    benefits: [
      "Aide à soutenir l'élimination naturelle des toxines",
      "Procure une sensation de légèreté et de détente",
      "Favorise le bien-être général après une période de fatigue",
      "Moment relaxant pour les pieds et le corps",
      "Conseils personnalisés pour prolonger les effets de la séance",
    ],
    steps: [
      { title: "Accueil & échange", description: "Court entretien sur vos besoins, votre fatigue et vos habitudes de bien-être." },
      { title: "Installation", description: "Vous placez les pieds dans une bassine d'eau tiède préparée pour la séance ionique." },
      { title: "Séance détox", description: "Le dispositif ionique accompagne la détox pendant que vous restez confortablement installé." },
      { title: "Conseils", description: "Recommandations simples d'hydratation et de routine naturelle après la séance." },
    ],
    duration: "Environ 20 à 30 minutes",
    forWhom:
      "Toute personne souhaitant une séance de détente, une sensation de légèreté ou un accompagnement bien-être naturel. Déconseillé aux femmes enceintes, aux porteurs de pacemaker et aux personnes ayant une plaie ouverte aux pieds.",
    testimonials: [
      {
        name: "Nadia K.",
        city: "Abidjan",
        rating: 5,
        text: "La séance m'a beaucoup détendue. J'ai ressenti mes jambes plus légères et j'ai apprécié les conseils donnés après le bain.",
      },
      {
        name: "Serge A.",
        city: "Cocody",
        rating: 5,
        text: "Très bonne découverte. C'est simple, relaxant et l'équipe prend le temps d'expliquer le déroulement.",
      },
      {
        name: "Mariame T.",
        city: "Marcory",
        rating: 4,
        text: "Un vrai moment de détente. Je recommande pour commencer une cure bien-être en douceur.",
      },
    ],
    faq: [
      {
        q: "La séance est-elle douloureuse ?",
        a: "Non. Vous gardez simplement les pieds dans une eau tiède pendant la séance. C'est une méthode douce et relaxante.",
      },
      {
        q: "Combien de temps dure un bain de pieds ionique ?",
        a: "La séance dure généralement 20 à 30 minutes, avec un court échange avant et des conseils après.",
      },
      {
        q: "Faut-il boire de l'eau après la séance ?",
        a: "Oui, il est recommandé de bien s'hydrater après la séance pour accompagner naturellement l'organisme.",
      },
      {
        q: "Y a-t-il des contre-indications ?",
        a: "La séance est déconseillée aux femmes enceintes, aux personnes portant un pacemaker et en cas de plaie ouverte ou infection au niveau des pieds.",
      },
    ],
  },
];

export const getOfferBySlug = (slug: string): Offer | undefined =>
  offers.find((o) => o.slug === slug);
