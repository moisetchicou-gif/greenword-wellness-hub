export interface Pathology {
  name: string;
  description: string;
  productIds: number[];
  category: PathologyCategory;
}

export type PathologyCategory =
  | "Cardiovasculaire"
  | "Dermatologie"
  | "Digestif"
  | "Immunité & Infections"
  | "Neurologie & Mental"
  | "Os & Articulations"
  | "Santé féminine"
  | "Santé masculine"
  | "Métabolisme"
  | "Respiratoire"
  | "Yeux & Vision"
  | "Autres";

export const pathologyCategories: PathologyCategory[] = [
  "Cardiovasculaire",
  "Dermatologie",
  "Digestif",
  "Immunité & Infections",
  "Neurologie & Mental",
  "Os & Articulations",
  "Santé féminine",
  "Santé masculine",
  "Métabolisme",
  "Respiratoire",
  "Yeux & Vision",
  "Autres",
];

export const pathologies: Pathology[] = [
  // === Cardiovasculaire ===
  {
    name: "AVC (maladie cardiovasculaire)",
    description: "Accident cérébro-vasculaire : lésion du cerveau due à l'interruption de l'apport en sang.",
    productIds: [18, 5, 31, 20, 34, 11, 32, 37, 10],
    category: "Cardiovasculaire",
  },
  {
    name: "Hypertension artérielle",
    description: "Pression artérielle anormalement élevée dans les vaisseaux sanguins.",
    productIds: [31, 18, 17, 2, 32, 37, 10],
    category: "Cardiovasculaire",
  },
  {
    name: "Cholestérol",
    description: "Substances grasses présentes dans l'organisme provenant des aliments, en excès dans le sang.",
    productIds: [2, 31, 73, 43, 34, 35],
    category: "Cardiovasculaire",
  },
  {
    name: "Hémorroïdes",
    description: "Gonflement et inflammation des veines du rectum et de l'anus provoquant gêne et saignements.",
    productIds: [64, 35, 16, 15, 10, 37, 15],
    category: "Cardiovasculaire",
  },

  // === Dermatologie ===
  {
    name: "Acné",
    description: "Maladie de la peau se manifestant par des boutons et brûlures cutanées.",
    productIds: [57, 86, 10, 8, 86],
    category: "Dermatologie",
  },
  {
    name: "Eczéma",
    description: "Inflammation chronique de la peau provoquant des démangeaisons et rougeurs.",
    productIds: [5, 8, 34, 10, 40],
    category: "Dermatologie",
  },
  {
    name: "Candidose",
    description: "Apparition de champignons sur certaines zones du corps : appareil génital, peau.",
    productIds: [1, 57, 6, 53, 55, 16],
    category: "Dermatologie",
  },
  {
    name: "Cellulite",
    description: "Dépôt de graisse sous la peau. Peau bosselée et capitonnée sur les cuisses, hanches, fesses et ventre.",
    productIds: [43, 34, 21],
    category: "Dermatologie",
  },
  {
    name: "Chute de cheveux",
    description: "Perte de cheveux totale ou partielle.",
    productIds: [31, 8, 86],
    category: "Dermatologie",
  },

  // === Digestif ===
  {
    name: "Constipation",
    description: "Difficulté à évacuer les selles, moins de trois fois par semaine.",
    productIds: [22, 34, 16, 64, 13, 35],
    category: "Digestif",
  },
  {
    name: "Diverticulite",
    description: "Inflammation ou infection de petits sacs du tube digestif, fréquente avec l'âge.",
    productIds: [8, 16, 42, 15, 35],
    category: "Digestif",
  },
  {
    name: "RGO / Reflux gastrique",
    description: "Reflux gastro-œsophagien : remontée des aliments et acides de l'estomac dans l'œsophage.",
    productIds: [51, 64, 10],
    category: "Digestif",
  },
  {
    name: "IBS / Colopathie",
    description: "Troubles intestinaux provoquant maux de ventre, gaz, diarrhées et constipation.",
    productIds: [64, 15, 22, 35],
    category: "Digestif",
  },
  {
    name: "Foie gras (stéatose hépatique)",
    description: "Accumulation de graisse dans le foie.",
    productIds: [77, 41, 34, 10],
    category: "Digestif",
  },
  {
    name: "Calculs biliaires",
    description: "Dépôts durs dans le liquide de la vésicule biliaire.",
    productIds: [77, 34, 64, 10],
    category: "Digestif",
  },
  {
    name: "Hernie hiatale",
    description: "Compression du diaphragme par une partie de l'estomac qui s'enfonce dans la cavité thoracique.",
    productIds: [16, 17, 8, 31, 11],
    category: "Digestif",
  },

  // === Immunité & Infections ===
  {
    name: "Allergies",
    description: "L'organisme ne supporte pas certaines substances généralement inoffensives.",
    productIds: [10],
    category: "Immunité & Infections",
  },
  {
    name: "Rhume",
    description: "Infection virale courante touchant le nez et la gorge.",
    productIds: [10, 8],
    category: "Immunité & Infections",
  },
  {
    name: "Infection de la vessie",
    description: "Cystite : bactéries pénétrant dans l'urètre et la vessie, causant inflammation et infection.",
    productIds: [9, 16, 42, 8, 10],
    category: "Immunité & Infections",
  },
  {
    name: "Infection de l'oreille",
    description: "Infection du conduit auditif causée par des bactéries ou champignons.",
    productIds: [16, 29, 8, 9],
    category: "Immunité & Infections",
  },
  {
    name: "Paludisme",
    description: "Maladie provoquée par le parasite Plasmodium, transmise par piqûre de moustique infectée.",
    productIds: [65, 16, 10],
    category: "Immunité & Infections",
  },
  {
    name: "Cancer",
    description: "Maladie où des cellules anormales se divisent de façon incontrôlable et détruisent les tissus du corps.",
    productIds: [5, 34, 17, 23, 8, 86],
    category: "Immunité & Infections",
  },
  {
    name: "Tuberculose",
    description: "Maladie infectieuse bactérienne grave touchant principalement les poumons.",
    productIds: [16, 39, 34, 5, 8],
    category: "Immunité & Infections",
  },

  // === Neurologie & Mental ===
  {
    name: "Alzheimer",
    description: "Affection cérébrale qui détruit lentement la mémoire et les facultés de réflexion.",
    productIds: [80, 86, 37, 30, 31, 46, 59, 83],
    category: "Neurologie & Mental",
  },
  {
    name: "Anxiété / Stress",
    description: "État psychique causé par la crainte d'un danger, impactant le quotidien.",
    productIds: [80, 86, 37, 30, 31, 46, 59, 83],
    category: "Neurologie & Mental",
  },
  {
    name: "Dépression",
    description: "Trouble mental caractérisé par un état dépressif persistant et une perte d'intérêt pour les activités.",
    productIds: [80, 30, 40, 37],
    category: "Neurologie & Mental",
  },
  {
    name: "Parkinson",
    description: "Trouble du système nerveux affectant les mouvements et entraînant des tremblements.",
    productIds: [37, 80, 31, 9],
    category: "Neurologie & Mental",
  },
  {
    name: "Maux de tête",
    description: "Sensation douloureuse dans une partie de la tête, d'intensité variable.",
    productIds: [38, 30, 31],
    category: "Neurologie & Mental",
  },

  // === Os & Articulations ===
  {
    name: "Arthrite",
    description: "Inflammation d'une ou plusieurs articulations provoquant douleurs et raideurs.",
    productIds: [49, 86, 36, 8],
    category: "Os & Articulations",
  },
  {
    name: "Mal de dos",
    description: "Gêne physique dans la colonne vertébrale ou le dos, de légère à intense.",
    productIds: [29, 11, 8, 31],
    category: "Os & Articulations",
  },
  {
    name: "Ostéoporose",
    description: "Maladie provoquant la fragilité des os qui deviennent cassants.",
    productIds: [86, 31, 84, 36],
    category: "Os & Articulations",
  },
  {
    name: "Fibromyalgie",
    description: "Douleurs musculaires diffuses et fatigue chronique.",
    productIds: [31, 49, 9, 10],
    category: "Os & Articulations",
  },

  // === Santé féminine ===
  {
    name: "Fibromes utérins",
    description: "Tumeurs non cancéreuses dans l'utérus pouvant se développer pendant l'âge de procréer.",
    productIds: [60, 31, 17, 34, 10],
    category: "Santé féminine",
  },
  {
    name: "Infertilité",
    description: "Absence de grossesse après 12 à 24 mois de rapports réguliers sans contraception.",
    productIds: [60, 42, 17, 25, 8, 19, 63, 36],
    category: "Santé féminine",
  },
  {
    name: "Libido femme",
    description: "Baisse du désir sexuel féminin liée aux sécrétions hormonales des ovaires.",
    productIds: [8, 63, 86, 25, 70],
    category: "Santé féminine",
  },
  {
    name: "Ménopause / Péri-ménopause",
    description: "Période de changements hormonaux marquant la fin des cycles menstruels chez la femme (45-55 ans).",
    productIds: [16, 19, 63, 60],
    category: "Santé féminine",
  },

  // === Santé masculine ===
  {
    name: "Libido homme",
    description: "Baisse du désir sexuel masculin, pouvant survenir lors de périodes de fatigue.",
    productIds: [8, 12, 75, 86, 11, 25, 69],
    category: "Santé masculine",
  },

  // === Métabolisme ===
  {
    name: "Diabète",
    description: "Trouble de l'assimilation des glucides avec présence de sucre dans le sang et les urines.",
    productIds: [7, 34, 15, 23],
    category: "Métabolisme",
  },
  {
    name: "Fatigue chronique",
    description: "Fatigue profonde, troubles du sommeil et douleurs aggravés par l'effort physique.",
    productIds: [37, 10, 9, 17],
    category: "Métabolisme",
  },
  {
    name: "Hypothyroïdie",
    description: "La glande thyroïde ne produit pas suffisamment d'hormones thyroïdiennes.",
    productIds: [75, 5, 11],
    category: "Métabolisme",
  },
  {
    name: "Anémie",
    description: "Insuffisance de globules rouges dans le sang.",
    productIds: [15, 86, 9, 53, 8, 36],
    category: "Métabolisme",
  },

  // === Respiratoire ===
  {
    name: "Asthme",
    description: "Affection des bronches se manifestant par une gêne respiratoire et des crises de suffocation.",
    productIds: [9, 42, 16, 39, 17, 20],
    category: "Respiratoire",
  },
  {
    name: "Bronchite",
    description: "Inflammation de la muqueuse des bronches qui transportent l'air vers et depuis les poumons.",
    productIds: [42, 10],
    category: "Respiratoire",
  },

  // === Yeux & Vision ===
  {
    name: "Cataracte / Glaucome / Myopie",
    description: "Perte de transparence du cristallin, souvent liée au vieillissement, affectant la vision.",
    productIds: [31, 33, 37, 8, 53, 10, 1],
    category: "Yeux & Vision",
  },
];
