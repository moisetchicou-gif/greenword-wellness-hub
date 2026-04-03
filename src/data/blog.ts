export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    slug: "bienfaits-complements-alimentaires-naturels",
    title: "Les bienfaits des compléments alimentaires naturels sur votre santé",
    excerpt: "Découvrez pourquoi les compléments alimentaires d'origine naturelle sont essentiels pour combler les carences nutritionnelles et renforcer votre système immunitaire.",
    content: `Les compléments alimentaires naturels jouent un rôle crucial dans le maintien d'une bonne santé. Contrairement aux produits synthétiques, ils sont issus de plantes, fruits et minéraux naturels, ce qui permet une meilleure absorption par l'organisme.

## Pourquoi choisir le naturel ?

Notre alimentation moderne, souvent transformée, ne fournit pas toujours tous les nutriments dont notre corps a besoin. Les compléments naturels viennent combler ces carences de manière douce et efficace.

## Les principaux avantages

- **Meilleure biodisponibilité** : Les nutriments naturels sont mieux reconnus et absorbés par le corps.
- **Moins d'effets secondaires** : Les formulations naturelles réduisent les risques d'effets indésirables.
- **Action synergique** : Les composés naturels travaillent ensemble pour des résultats optimaux.
- **Respect de l'organisme** : Pas de surcharge hépatique liée aux additifs chimiques.

## Comment bien les choisir ?

Privilégiez les marques certifiées, avec des ingrédients traçables et des dosages étudiés. Green World propose depuis 1994 des compléments répondant à ces critères d'excellence.`,
    category: "Bien-être",
    date: "2026-03-28",
    readTime: "4 min",
    image: "🌿",
  },
  {
    id: "2",
    slug: "renforcer-systeme-immunitaire-naturellement",
    title: "Comment renforcer votre système immunitaire naturellement",
    excerpt: "Des astuces simples et des solutions naturelles pour booster vos défenses immunitaires au quotidien, surtout en période de changement de saison.",
    content: `Un système immunitaire fort est votre meilleure protection contre les maladies. Voici comment le renforcer de manière 100% naturelle.

## L'alimentation, votre premier allié

Une alimentation riche en fruits, légumes et protéines de qualité fournit les vitamines et minéraux essentiels à vos défenses immunitaires.

## Les super-aliments à privilégier

- **Spiruline** : Riche en protéines et antioxydants, elle stimule la production de cellules immunitaires.
- **Gingembre** : Anti-inflammatoire puissant, il aide à combattre les infections.
- **Propolis** : Antibactérien naturel qui protège les voies respiratoires.
- **Vitamine C naturelle** : Présente dans l'acérola et le camu-camu.

## Le rôle du sommeil

Dormir 7 à 8 heures par nuit permet à votre corps de produire les cytokines nécessaires à la lutte contre les infections.

## L'exercice physique modéré

30 minutes d'activité physique par jour améliorent la circulation des cellules immunitaires dans l'organisme.`,
    category: "Immunité",
    date: "2026-03-20",
    readTime: "5 min",
    image: "🛡️",
  },
  {
    id: "3",
    slug: "detox-naturelle-guide-complet",
    title: "Guide complet de la détox naturelle : purifiez votre organisme",
    excerpt: "Apprenez à nettoyer votre organisme des toxines accumulées grâce à des méthodes naturelles éprouvées et des compléments ciblés.",
    content: `La détoxification naturelle aide votre corps à éliminer les toxines accumulées au fil du temps. Voici un guide complet pour une cure détox réussie.

## Pourquoi faire une détox ?

Notre environnement nous expose quotidiennement à des polluants, pesticides et additifs alimentaires. Le foie, les reins et le système digestif ont parfois besoin d'un coup de pouce.

## Les organes clés de la détox

- **Le foie** : Principal organe de filtration, il transforme les toxines pour les rendre éliminables.
- **Les reins** : Ils filtrent le sang et éliminent les déchets via l'urine.
- **Les intestins** : Un microbiote sain facilite l'élimination des toxines.

## Programme détox en 7 jours

1. **Jour 1-2** : Hydratation intensive (2L d'eau + tisanes)
2. **Jour 3-4** : Alimentation légère (légumes verts, fruits)
3. **Jour 5-7** : Introduction de compléments détox ciblés

## Les plantes détox essentielles

Le chardon-marie, l'artichaut et le radis noir sont vos meilleurs alliés pour soutenir la fonction hépatique.`,
    category: "Détox",
    date: "2026-03-12",
    readTime: "6 min",
    image: "✨",
  },
  {
    id: "4",
    slug: "gestion-stress-solutions-naturelles",
    title: "Gérer le stress au quotidien : solutions naturelles efficaces",
    excerpt: "Le stress chronique affecte votre santé. Découvrez les plantes adaptogènes et techniques naturelles pour retrouver calme et sérénité.",
    content: `Le stress chronique est un fléau moderne qui affecte aussi bien la santé mentale que physique. Heureusement, la nature offre des solutions puissantes.

## Les effets du stress sur la santé

- Affaiblissement du système immunitaire
- Troubles digestifs
- Problèmes de sommeil
- Risques cardiovasculaires accrus

## Les plantes adaptogènes

Ces plantes aident l'organisme à s'adapter au stress :

- **Ashwagandha** : Réduit le cortisol de 30% selon les études.
- **Rhodiola** : Améliore la résistance au stress et la concentration.
- **Ginseng** : Booste l'énergie tout en calmant le système nerveux.

## Techniques de relaxation

- **Respiration profonde** : 5 minutes, 3 fois par jour
- **Méditation** : 10 minutes le matin pour commencer
- **Marche en nature** : L'effet thérapeutique de la forêt est scientifiquement prouvé

## Compléments anti-stress

Le magnésium, les vitamines B et les oméga-3 sont essentiels pour un système nerveux apaisé.`,
    category: "Bien-être",
    date: "2026-03-05",
    readTime: "5 min",
    image: "🧘",
  },
  {
    id: "5",
    slug: "sante-digestive-microbiote",
    title: "Santé digestive : l'importance du microbiote intestinal",
    excerpt: "Votre intestin est votre deuxième cerveau. Découvrez comment prendre soin de votre microbiote pour une santé optimale.",
    content: `Le microbiote intestinal, composé de milliards de bactéries, joue un rôle fondamental dans votre santé globale.

## Le microbiote, un organe à part entière

Avec plus de 100 000 milliards de bactéries, votre intestin influence :
- La digestion et l'absorption des nutriments
- Le système immunitaire (70% des cellules immunitaires y résident)
- L'humeur et le bien-être mental
- Le métabolisme énergétique

## Signes d'un microbiote déséquilibré

- Ballonnements fréquents
- Fatigue chronique
- Infections à répétition
- Troubles de l'humeur

## Comment restaurer son microbiote

### Probiotiques
Les probiotiques sont des bactéries bénéfiques qui renforcent la flore intestinale. On les trouve dans les aliments fermentés (yaourt, kéfir, choucroute).

### Prébiotiques
Les prébiotiques nourrissent les bonnes bactéries. Sources : ail, oignon, banane, asperge.

### Compléments ciblés
Des formulations spécifiques combinent souches probiotiques et prébiotiques pour un effet optimal sur la santé digestive.`,
    category: "Digestion",
    date: "2026-02-25",
    readTime: "5 min",
    image: "🌱",
  },
  {
    id: "6",
    slug: "energie-naturelle-combattre-fatigue",
    title: "Retrouver son énergie naturellement : combattre la fatigue",
    excerpt: "Fatigué en permanence ? Découvrez les causes de la fatigue chronique et les solutions naturelles pour retrouver vitalité et dynamisme.",
    content: `La fatigue chronique touche des millions de personnes. Avant de recourir à des stimulants artificiels, explorons les solutions naturelles.

## Les causes fréquentes de la fatigue

- Carences en fer, vitamine B12 ou vitamine D
- Mauvaise qualité du sommeil
- Stress et surmenage
- Alimentation déséquilibrée
- Sédentarité

## Solutions naturelles anti-fatigue

### La spiruline
Super-aliment par excellence, elle apporte fer, protéines et vitamines B en grande quantité.

### Le guarana
Source naturelle de caféine à libération progressive, il donne de l'énergie sans les pics et chutes du café.

### La gelée royale
Riche en nutriments essentiels, elle revitalise l'organisme en profondeur.

## Habitudes énergisantes

- **Hydratation** : La déshydratation est une cause majeure de fatigue
- **Micro-siestes** : 20 minutes suffisent pour recharger les batteries
- **Exposition au soleil** : 15 minutes par jour pour la vitamine D
- **Exercice matinal** : Booste l'énergie pour toute la journée`,
    category: "Énergie",
    date: "2026-02-18",
    readTime: "4 min",
    image: "⚡",
  },
];
