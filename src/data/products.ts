import productBetaCarotene from "@/assets/product-beta-carotene.jpg";
import productLipidCare from "@/assets/product-lipid-care-tea.jpg";
import productKidney from "@/assets/product-kidney-tonifying.jpg";
import productProstacre from "@/assets/product-prostacre.jpg";
import productAPower from "@/assets/product-a-power.jpg";
import productAntiAging from "@/assets/product-anti-aging.webp";
import productGlucoblock from "@/assets/product-glucoblock.jpg";
import productZincAdulte from "@/assets/product-zinc-adulte.png";
import productCordyceps from "@/assets/product-cordyceps.webp";
import productKudingTea from "@/assets/product-kuding-tea.jpg";
import productPinePollen from "@/assets/product-pine-pollen.jpg";
import productVigeurCapsule from "@/assets/product-vigeur-capsule.webp";
import productClear from "@/assets/product-clear.jpg";
import productNutriplant from "@/assets/product-nutriplant.jpg";
import productProSlimTea from "@/assets/product-pro-slim-tea-2.jpg";
import productPlaceholder from "@/assets/product-placeholder.jpg";
import productSoyPower from "@/assets/product-soy-power.jpg";
import productBreastCareTea from "@/assets/product-breast-care-tea.jpg";
import productUterusCleansing from "@/assets/product-uterus-cleansing.jpg";
import productBreastCareCapsule from "@/assets/product-breast-care-capsule.webp";
import productOvaryNutrition from "@/assets/product-ovary-nutrition.webp";
import productNapkinNight from "@/assets/product-napkin-night.jpg";
import productIntestineCleansing from "@/assets/product-intestine-cleansing.webp";
import productBalsamPear from "@/assets/product-balsam-pear.jpg";
import productSpirulina from "@/assets/product-spirulina.jpg";
import productMealCellulose from "@/assets/product-meal-cellulose.jpg";
import productTourmalineFlask from "@/assets/product-tourmaline-flask.jpg";
import productCompoundCalciumC from "@/assets/product-compound-calcium-c.webp";
import productCompoundCalciumA from "@/assets/product-compound-calcium-a.jpg";
import productGoldenKnight from "@/assets/product-golden-knight.webp";
import productSilverEva from "@/assets/product-silver-eva.webp";
import productPantyLiner from "@/assets/product-panty-liner.jpg";
import productNapkinDay from "@/assets/product-napkin-day.jpg";
import productBloodCleanse from "@/assets/product-blood-cleanse.jpg";
import productGanodermaCoffee from "@/assets/product-ganoderma-coffee.webp";
import productBlueberryCoffee from "@/assets/product-blueberry-coffee.webp";
import productClearLungTea from "@/assets/product-clear-lung-tea.webp";
import productJinpureTea from "@/assets/product-jinpure-tea.jpg";
import productJinpureCapsule from "@/assets/product-jinpure-capsule.jpg";
import productMultivitaminEnfants from "@/assets/product-multivitamin-enfants.jpg";
import productMultivitaminAdultes from "@/assets/product-multivitamin-adultes.jpg";
import productCalciumEnfants from "@/assets/product-calcium-enfants.webp";
import productCalciumAdultes from "@/assets/product-calcium-adultes.webp";
import productZincEnfants from "@/assets/product-zinc-enfants.jpg";
import productOliveSoap from "@/assets/product-olive-soap.webp";
import productPropolis from "@/assets/product-propolis.jpg";
import productGanoderma from "@/assets/product-ganoderma.webp";
import productCardioPower from "@/assets/product-cardio-power.webp";
import productGinsengRhs from "@/assets/product-ginseng-rhs.jpg";
import productProteinPowder from "@/assets/product-protein-powder.jpg";
import productSoybeanLecithin from "@/assets/product-soybean-lecithin.jpg";
import productDeepSeaFishOil from "@/assets/product-deep-sea-fish-oil.webp";
import productGarlicOil from "@/assets/product-garlic-oil.jpg";
import productEyeCare from "@/assets/product-eye-care.jpg";
import productChitosan from "@/assets/product-chitosan.jpg";
import productAloeVera from "@/assets/product-aloe-vera.jpg";
import productCompoundMarrow from "@/assets/product-compound-marrow.webp";
import productGinkgoBiloba from "@/assets/product-ginkgo-biloba.jpg";
import productBrainCare from "@/assets/product-brain-care.jpg";
import productRoyalJelly from "@/assets/product-royal-jelly.jpg";
import productHepatsure from "@/assets/product-hepatsure.jpg";
import productParashield from "@/assets/product-parashield.jpg";
import productSlimming from "@/assets/product-slimming.jpg";
import productSuperNutrition from "@/assets/product-super-nutrition.webp";
import productCoq10 from "@/assets/product-coq10.jpg";
import productBoneCarePlaster from "@/assets/product-bone-care-plaster.webp";
import productDiasure from "@/assets/product-diasure.webp";
import productJointHealth from "@/assets/product-joint-health.webp";
import productVitaminC from "@/assets/product-vitamin-c.jpg";
import productGastricHealth from "@/assets/product-gastric-health.webp";
import productDetoxinPad from "@/assets/product-detoxin-pad.jpg";
import productBlueberryJuice from "@/assets/product-blueberry-juice.jpg";
import productBlueberryEnzymes from "@/assets/product-blueberry-enzymes.jpg";
import productVitaminE from "@/assets/product-vitamin-e.webp";
import productVitaminD from "@/assets/product-vitamin-d.webp";
import productMnm from "@/assets/product-mnm.webp";
import productMalaPower from "@/assets/product-mala-power.jpg";
import productSeCapsule from "@/assets/product-se-capsule.jpg";
import productGrapeSeed from "@/assets/product-grape-seed.webp";
import productLivergen from "@/assets/product-livergen.jpg";
import productAnxietyStress from "@/assets/product-anxiety-stress.jpg";
import productProbiotics from "@/assets/product-probiotics.jpg";
import productAntiAddiction from "@/assets/product-anti-addiction.jpg";
import productBlueberryConcentrate from "@/assets/product-blueberry-concentrate.jpg";

export type Category =
  | "Tous les produits"
  | "Compléments de santé"
  | "Thés & Boissons"
  | "Soins féminins"
  | "Soins masculins"
  | "Enfants & Famille"
  | "Beauté & Hygiène"
  | "Engrais Bio";

export const categories: Category[] = [
  "Tous les produits",
  "Compléments de santé",
  "Thés & Boissons",
  "Soins féminins",
  "Soins masculins",
  "Enfants & Famille",
  "Beauté & Hygiène",
  "Engrais Bio",
];

export interface Product {
  id: number;
  name: string;
  image: string;
  benefits: string[];
  price: string;
  priceNum: number;
  /** Ancien prix affiché barré (optionnel) — uniquement pour les produits en promo */
  oldPrice?: string;
  oldPriceNum?: number;
  /** Pourcentage de réduction (ex: 20 pour -20%) */
  discount?: number;
  category: Category;
  bv: number;
  posologie?: string;
  conseils?: string;
}

export const products: Product[] = [
  // ===== COMPLÉMENTS DE SANTÉ =====
  { id: 1, name: "Beta-Carotene", image: productBetaCarotene, benefits: ["Apport en vitamine A", "Prévient le cancer"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20, posologie: "2 capsules à chaque fois, 2 fois par jour.", conseils: "Les personnes qui ont l'intention de prévenir les troubles oculaires causés par les attaques radicales. Hommes atteints de troubles de la prostate tels que la prostatite, l'hyperplasie bénigne de la prostate et le cancer de la prostate." },
  { id: 5, name: "A-Power Capsule", image: productAPower, benefits: ["Soutient le traitement du cancer", "Renforce l'immunité"], price: "28 600 FCFA", priceNum: 28600, category: "Compléments de santé", bv: 40, posologie: "1 à 2 gélules à chaque fois, 1 à 2 fois par jour.", conseils: "Pour les personnes dont l'immunité est compromise, les troubles immunitaires ou le VIH/SIDA." },
  { id: 7, name: "Glucoblock", image: productGlucoblock, benefits: ["Régule la glycémie", "Soutient la fonction pancréatique"], price: "12 900 FCFA", priceNum: 12900, category: "Compléments de santé", bv: 18, posologie: "2 capsules à chaque fois, 1 fois par jour.", conseils: "Pour ceux qui ont une glycémie élevée ou le diabète." },
  { id: 9, name: "Cordyceps Plus Capsule", image: productCordyceps, benefits: ["Augmente l'énergie et la vitalité", "Régule le système immunitaire"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20, posologie: "1 à 2 gélules à chaque fois, 1 à 2 fois par jour.", conseils: "Pour les personnes dont l'immunité est compromise ou en sous-état de santé. Pour les personnes souffrant de fatigue chronique. Pour les personnes atteintes de cancers et de maladies respiratoires ou rénales chroniques." },
  { id: 15, name: "Spirulina Plus Capsule", image: productSpirulina, benefits: ["Riche en nutriments essentiels", "Favorise la digestion et la détox"], price: "15 015 FCFA", priceNum: 15015, category: "Compléments de santé", bv: 21 },
  { id: 16, name: "Propolis Plus Capsule", image: productPropolis, benefits: ["Anti-inflammatoire naturel", "Renforce les défenses immunitaires"], price: "19 305 FCFA", priceNum: 19305, category: "Compléments de santé", bv: 27, posologie: "1 à 2 gélules à chaque fois, 1 à 2 fois par jour.", conseils: "Pour les personnes dont l'immunité est compromise, ou celles qui sont physiquement faibles ou sujettes au rhume ou à la grippe. Pour les personnes souffrant d'infections chroniques (infection bactérienne, fongique ou virale)." },
  { id: 17, name: "Ganoderma Plus Capsule", image: productGanoderma, benefits: ["Renforce l'immunité", "Soutient la santé respiratoire"], price: "16 445 FCFA", priceNum: 16445, oldPrice: "20 600 FCFA", oldPriceNum: 20600, discount: 20, category: "Compléments de santé", bv: 23, posologie: "1 à 2 gélules à chaque fois, 1 à 2 fois par jour.", conseils: "Pour ceux qui viennent de terminer une chimio ou une radiothérapie et les personnes souffrant de maladies hépatiques chroniques." },
  { id: 18, name: "Cardio Power Capsule", image: productCardioPower, benefits: ["Protège le système cardiovasculaire", "Régule la tension artérielle"], price: "13 585 FCFA", priceNum: 13585, category: "Compléments de santé", bv: 19, posologie: "1 à 2 gélules à chaque fois, 1 à 2 fois par jour.", conseils: "Pour les adultes souffrant de maladies cardiovasculaires, d'hypertension ou d'hyperlipidémie. Ce produit améliore l'apport sanguin au cerveau et au cœur." },
  { id: 20, name: "Ginseng RHs Capsule", image: productGinsengRhs, benefits: ["Puissant anti-cancer", "Stimule le système immunitaire"], price: "27 170 FCFA", priceNum: 27170, category: "Compléments de santé", bv: 38, posologie: "1 à 2 gélules à chaque fois, 1 à 2 fois par jour.", conseils: "Pour ceux qui ont une immunité compromise. Pour toutes personnes qui souffrent de maladies respiratoires chroniques ou de fatigue chronique." },
  { id: 25, name: "Protein Powder", image: productProteinPowder, benefits: ["Source de protéines végétales", "Favorise la croissance musculaire"], price: "25 025 FCFA", priceNum: 25025, category: "Compléments de santé", bv: 35, posologie: "1-2 cuillères à soupe à chaque fois, 1-2 fois par jour.", conseils: "Pour ceux qui ont besoin d'un apport suffisant en protéines, comme les enfants, les adolescents, les femmes enceintes et les personnes âgées. Pour ceux qui sont physiquement inaptes ou en convalescence." },
  { id: 30, name: "Soybean Lecithin", image: productSoybeanLecithin, benefits: ["Soutient la santé cérébrale", "Régule le cholestérol"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20, posologie: "1 à 2 gélules par jour.", conseils: "Pour les personnes souffrant d'hypertension artérielle, d'hyperlipidémie et d'hyperglycémie. Pour ceux qui ont l'intention de prévenir les maladies cérébro- ou cardiovasculaires. Pour ceux qui ont l'intention d'améliorer la mémoire ou de prévenir la démence sénile." },
  { id: 31, name: "Deep Sea Fish Oil", image: productDeepSeaFishOil, benefits: ["Riche en Oméga-3", "Protège le cœur et le cerveau"], price: "17 875 FCFA", priceNum: 17875, oldPrice: "21 000 FCFA", oldPriceNum: 21000, discount: 15, category: "Compléments de santé", bv: 25, posologie: "1 à 2 gélules par jour.", conseils: "Pour les personnes atteintes de maladies cérébrales ou cardiovasculaires. Pour les personnes souffrant de perte de mémoire ou de démence sénile. Pour les personnes souffrant d'hypertension, d'hyperlipidémie et d'hyperglycémie." },
  { id: 32, name: "Garlic Oil Softgel", image: productGarlicOil, benefits: ["Antibactérien naturel", "Renforce l'immunité"], price: "16 088 FCFA", priceNum: 16088, category: "Compléments de santé", bv: 22.5, posologie: "1-2 gélules à chaque fois, 2 fois par jour.", conseils: "Pour les personnes souffrantes d'hypertension, d'hyperlipidémie et d'hyperglycémie. Pour les personnes atteintes de maladies cérébrovasculaires ou cardiovasculaires. Pour les personnes souffrant de gastrite, de diarrhée ou d'infection du tube digestif." },
  { id: 33, name: "Eye Care Softgel", image: productEyeCare, benefits: ["Protège la vision", "Prévient la dégénérescence maculaire"], price: "20 020 FCFA", priceNum: 20020, oldPrice: "25 000 FCFA", oldPriceNum: 25000, discount: 20, category: "Compléments de santé", bv: 28, posologie: "2 capsules à chaque fois, 1 fois par jour.", conseils: "Pour ceux qui ont des troubles de la vue." },
  { id: 34, name: "Chitosan Capsule", image: productChitosan, benefits: ["Absorbe les graisses", "Favorise la perte de poids"], price: "17 160 FCFA", priceNum: 17160, category: "Compléments de santé", bv: 24, posologie: "2 capsules à chaque fois, 2 fois par jour. Prendre deux heures avant ou après la prise d'autres médicaments ou produits de santé naturels. Boire une quantité suffisante d'eau.", conseils: "Pour ceux qui suivent un programme de contrôle du poids. Pour les personnes ayant des taux élevés de lipides sanguins et de glycémie. Pour les personnes atteintes d'hépatite chronique et de cirrhose du foie. Pour ceux qui ont des cancers." },
  { id: 35, name: "Aloe Vera Plus Capsule", image: productAloeVera, benefits: ["Détoxifie l'organisme", "Soutient la digestion"], price: "15 015 FCFA", priceNum: 15015, category: "Compléments de santé", bv: 21, posologie: "2 capsules à chaque fois, une fois par jour.", conseils: "Bon pour la désintoxication. Pour les adultes souffrant de constipation, de diarrhée chronique ou d'infections." },
  { id: 36, name: "Compound Marrow Powder", image: productCompoundMarrow, benefits: ["Renforce les os et articulations", "Nourrit la moelle osseuse"], price: "18 590 FCFA", priceNum: 18590, category: "Compléments de santé", bv: 26 },
  { id: 37, name: "Ginkgo Biloba", image: productGinkgoBiloba, benefits: ["Améliore la circulation cérébrale", "Renforce la mémoire"], price: "16 088 FCFA", priceNum: 16088, category: "Compléments de santé", bv: 22.5, posologie: "2 capsules à chaque fois, une fois par jour.", conseils: "Pour ceux qui ont une pression artérielle élevée, des lipides sanguins élevés et une viscosité sanguine élevée. Pour prévenir les maladies liées à l'âge et retarder la sénilité." },
  { id: 38, name: "Brain Care Capsule", image: productBrainCare, benefits: ["Stimule les fonctions cognitives", "Protège les neurones"], price: "22 880 FCFA", priceNum: 22880, category: "Compléments de santé", bv: 32 },
  { id: 40, name: "Royal Jelly Softgel", image: productRoyalJelly, benefits: ["Revitalise l'organisme", "Anti-fatigue naturel"], price: "13 228 FCFA", priceNum: 13228, category: "Compléments de santé", bv: 18.5, posologie: "1 à 2 gélules à chaque fois, 2 fois par jour.", conseils: "Pour ceux qui sont physiquement faibles, avec une immunité compromise. Pour les femmes avec une diminution des oestrogènes et celles en péri- ou post-ménopause. Pour ceux qui ont une glycémie élevée. Pour les femmes qui veulent avoir une peau ferme et saine." },
  { id: 41, name: "Hepatsure Capsule", image: productHepatsure, benefits: ["Protège et régénère le foie", "Détoxifie l'organisme"], price: "18 590 FCFA", priceNum: 18590, category: "Compléments de santé", bv: 26, posologie: "2 capsules à chaque fois, 2 fois par jour.", conseils: "Pour ceux qui boivent excessivement. Pour ceux qui veillent régulièrement tard. Pour ceux qui ont des maladies du foie telles que la stéatose hépatique, l'hépatite chronique, la cirrhose du foie. Pour les personnes atteintes de maladies de la vésicule biliaire." },
  { id: 42, name: "Parashield", image: productParashield, benefits: ["Antiparasitaire naturel", "Protège le système digestif"], price: "10 725 FCFA", priceNum: 10725, category: "Compléments de santé", bv: 15, posologie: "2 à 3 gélules à chaque fois, deux fois par jour. Prendre avant les repas.", conseils: "Pour les enfants souffrant de malnutrition, de retard de croissance, de manque d'appétit et de douleurs périombilicales. Pour les adultes dont la nourriture ou l'eau est infestée par des parasites tels que les vers ronds, les ankylostomes, les trichocéphales, les oxyures et les amibes." },
  { id: 43, name: "Slimming Capsule", image: productSlimming, benefits: ["Favorise la perte de poids", "Accélère le métabolisme"], price: "20 020 FCFA", priceNum: 20020, category: "Compléments de santé", bv: 28, posologie: "1 à 2 capsules à chaque fois, une fois par jour. Prendre après le petit-déjeuner.", conseils: "Pour ceux qui suivent un programme de contrôle du poids. Pour ceux qui ont des lipides sanguins élevés. Pour les personnes obèses." },
  { id: 44, name: "Super Nutrition", image: productSuperNutrition, benefits: ["Nutrition complète", "Renforce l'immunité globale"], price: "32 890 FCFA", priceNum: 32890, category: "Compléments de santé", bv: 46 },
  { id: 46, name: "CoQ-10 Capsule", image: productCoq10, benefits: ["Protège le cœur", "Antioxydant puissant"], price: "19 305 FCFA", priceNum: 19305, category: "Compléments de santé", bv: 27 },
  { id: 47, name: "Bone Care Plaster", image: productBoneCarePlaster, benefits: ["Soulage les douleurs articulaires", "Patch anti-inflammatoire"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20 },
  { id: 48, name: "Diasure Capsule", image: productDiasure, benefits: ["Régule la glycémie", "Soutient le pancréas"], price: "12 870 FCFA", priceNum: 12870, category: "Compléments de santé", bv: 18 },
  { id: 49, name: "Joint Health Capsule", image: productJointHealth, benefits: ["Renforce les articulations", "Soulage les douleurs articulaires"], price: "20 020 FCFA", priceNum: 20020, category: "Compléments de santé", bv: 28, posologie: "2 gélules à chaque fois, deux fois par jour, de préférence avec un repas.", conseils: "Pour ceux qui ont des blessures articulaires. Pour ceux qui ont des maladies articulaires dégénératives telles que l'arthrose." },
  { id: 50, name: "Vitamin C Tablet", image: productVitaminC, benefits: ["Renforce l'immunité", "Puissant antioxydant"], price: "8 580 FCFA", priceNum: 8580, category: "Compléments de santé", bv: 12, posologie: "Adultes : 2 comprimés à chaque fois, une fois par jour. Enfants : 1 comprimé à chaque fois, une fois par jour.", conseils: "Ce produit est utilisé pour tout âge." },
  { id: 51, name: "Gastric Health Tablet", image: productGastricHealth, benefits: ["Soulage les troubles gastriques", "Protège la muqueuse stomacale"], price: "11 440 FCFA", priceNum: 11440, category: "Compléments de santé", bv: 16, posologie: "2 comprimés à chaque fois, deux fois par jour. Mâchez de préférence les comprimés.", conseils: "Pour ceux qui souffrent de dyspepsie ou de manque d'appétit. Pour les gros buveurs ou ceux qui prennent des médicaments depuis longtemps. Pour ceux qui ont des troubles gastriques chroniques." },
  { id: 52, name: "Magic Detoxin Pad", image: productDetoxinPad, benefits: ["Détoxification par les pieds", "Élimine les toxines"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20 },
  { id: 53, name: "Blueberry Juice", image: productBlueberryJuice, benefits: ["Riche en antioxydants", "Protège la vision"], price: "15 730 FCFA", priceNum: 15730, category: "Compléments de santé", bv: 22, posologie: "1-2 sachet(s) par jour.", conseils: "Les personnes qui veulent garder la beauté et la jeunesse. Les personnes qui veulent améliorer l'immunité." },
  { id: 54, name: "Blueberry Enzymes", image: productBlueberryEnzymes, benefits: ["Favorise la digestion", "Riche en enzymes naturelles"], price: "15 730 FCFA", priceNum: 15730, category: "Compléments de santé", bv: 22, posologie: "2 comprimés, 3 fois par jour.", conseils: "Les personnes atteintes de pseudo myopie. Pour ceux qui utilisent les yeux de manière intensive, comme les étudiants, le personnel de bureau. Les gens comptent sur une bonne vision nocturne, comme les conducteurs, les pilotes ou les marins." },
  { id: 57, name: "Vitamin E Capsule", image: productVitaminE, benefits: ["Antioxydant puissant", "Protège la peau et les cellules"], price: "16 445 FCFA", priceNum: 16445, category: "Compléments de santé", bv: 23 },
  { id: 58, name: "Vitamin D Capsule", image: productVitaminD, benefits: ["Renforce les os", "Soutient l'immunité"], price: "16 445 FCFA", priceNum: 16445, category: "Compléments de santé", bv: 23 },
  { id: 59, name: "MNM Capsule", image: productMnm, benefits: ["Anti-âge cellulaire avancé", "Régénération cellulaire premium"], price: "125 125 FCFA", priceNum: 125125, category: "Compléments de santé", bv: 175 },
  { id: 64, name: "Meal Cellulose", image: productMealCellulose, benefits: ["Riche en fibres alimentaires", "Favorise le transit intestinal"], price: "18 590 FCFA", priceNum: 18590, category: "Compléments de santé", bv: 26, posologie: "1-2 gélules à chaque fois, une fois par jour. Boire assez d'eau.", conseils: "Pour tous les groupes d'âge." },
  { id: 65, name: "Mala Power", image: productMalaPower, benefits: ["Booste l'énergie naturelle", "Soutient la vitalité quotidienne"], price: "10 725 FCFA", priceNum: 10725, category: "Compléments de santé", bv: 15 },
  { id: 66, name: "Tourmaline Flask", image: productTourmalineFlask, benefits: ["Eau alcaline et purifiée", "Améliore l'hydratation cellulaire"], price: "35 750 FCFA", priceNum: 35750, category: "Compléments de santé", bv: 50 },
  { id: 67, name: "Compound Calcium C", image: productCompoundCalciumC, benefits: ["Renforce les os", "Apport en calcium et vitamine C"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20 },
  { id: 68, name: "Compound Calcium A", image: productCompoundCalciumA, benefits: ["Calcium enrichi en vitamine A", "Prévient l'ostéoporose"], price: "15 730 FCFA", priceNum: 15730, category: "Compléments de santé", bv: 22 },
  { id: 73, name: "Blood Cleanse Capsule", image: productBloodCleanse, benefits: ["Purifie le sang", "Améliore la circulation sanguine"], price: "20 020 FCFA", priceNum: 20020, category: "Compléments de santé", bv: 28 },
  { id: 75, name: "SE Capsule", image: productSeCapsule, benefits: ["Apport en sélénium", "Antioxydant et anti-cancer"], price: "8 580 FCFA", priceNum: 8580, category: "Compléments de santé", bv: 12 },
  { id: 76, name: "Grape Seed Extract", image: productGrapeSeed, benefits: ["Puissant antioxydant", "Protège les vaisseaux sanguins"], price: "17 875 FCFA", priceNum: 17875, category: "Compléments de santé", bv: 25, posologie: "2 capsules à chaque fois, une fois par jour.", conseils: "Pour ceux qui ont besoin de prévenir les dommages de la rétine par les rayons UV causés par des activités de plein air ou de travail prolongées. Pour ceux qui ont besoin d'une protection antioxydante pour retarder le processus de vieillissement." },
  { id: 77, name: "Livergen Capsule", image: productLivergen, benefits: ["Régénère les cellules du foie", "Protège contre les hépatites"], price: "19 305 FCFA", priceNum: 19305, category: "Compléments de santé", bv: 27 },
  { id: 80, name: "Anxiety & Stress Relief", image: productAnxietyStress, benefits: ["Réduit le stress et l'anxiété", "Favorise le sommeil réparateur"], price: "17 160 FCFA", priceNum: 17160, category: "Compléments de santé", bv: 24, posologie: "1-2 capsules à chaque fois, une fois par jour.", conseils: "Les personnes après 60 ans qui ont l'intention de prévenir les maladies neurodégénératives. Personnes souffrant d'insomnie ou de mauvaise qualité de sommeil. Personnes anxieuses ou dépressives. Personnes stressées. Les personnes qui ont l'intention d'améliorer la fonction cognitive." },
  { id: 81, name: "Probiotics Powder", image: productProbiotics, benefits: ["Restaure la flore intestinale", "Renforce la digestion"], price: "17 875 FCFA", priceNum: 17875, category: "Compléments de santé", bv: 25 },
  { id: 82, name: "Anti-Addiction Capsule", image: productAntiAddiction, benefits: ["Aide au sevrage tabagique/alcoolique", "Détoxifie l'organisme"], price: "25 025 FCFA", priceNum: 25025, category: "Compléments de santé", bv: 35, posologie: "1 à 2 gélules deux fois par jour.", conseils: "Ce produit soulage et aide à traiter les complications lors de la désintoxication. Pour ceux qui boivent excessivement. Pour ceux qui prennent des médicaments pendant une période prolongée." },
  { id: 83, name: "Blueberry Concentrate", image: productBlueberryConcentrate, benefits: ["Super concentré d'antioxydants", "Protège la vision et le cerveau"], price: "60 775 FCFA", priceNum: 60775, category: "Compléments de santé", bv: 85 },

  // ===== THÉS & BOISSONS =====
  { id: 2, name: "Lipid Care Tea", image: productLipidCare, benefits: ["Abaisse le taux de lipides", "Améliore l'endurance"], price: "10 010 FCFA", priceNum: 10010, category: "Thés & Boissons", bv: 14, posologie: "1-2 sachet(s) à chaque fois, 2-3 fois par jour.", conseils: "Personnes ayant des taux élevés de lipides sanguins. Personnes en surpoids ou obèses. Personnes atteintes de stéatose hépatique, de maladie coronarienne ou de diabète." },
  { id: 10, name: "Kuding Plus Tea", image: productKudingTea, benefits: ["Détoxifie l'organisme", "Réduit l'inflammation"], price: "8 580 FCFA", priceNum: 8580, category: "Thés & Boissons", bv: 12, posologie: "1-3 sachet(s) par jour.", conseils: "Pour les personnes ayant des niveaux élevés de lipides sanguins ou de tension artérielle, des maux de gorge ou des maux de tête, sujettes au rhume ou à la grippe." },
  { id: 11, name: "Pine Pollen Tea", image: productPinePollen, benefits: ["Stimule la vitalité", "Riche en nutriments essentiels"], price: "10 010 FCFA", priceNum: 10010, category: "Thés & Boissons", bv: 14, posologie: "1-2 sachet(s) par jour.", conseils: "Pour les personnes dont l'immunité est compromise et la fatigue chronique. Ce thé favorise la santé hormonale, tant chez les hommes que chez les femmes. Toutes les tranches d'âges peuvent l'utiliser." },
  { id: 21, name: "Pro-slim Tea", image: productProSlimTea, benefits: ["Favorise la perte de poids", "Accélère le métabolisme"], price: "8 580 FCFA", priceNum: 8580, category: "Thés & Boissons", bv: 12, posologie: "1-2 sachet(s) par jour.", conseils: "Les personnes qui souhaitent contrôler leur poids corporel. Toutes personnes en surpoids ou obèses. Ce thé t'aide à perdre du ventre." },
  { id: 22, name: "Intestine Cleansing Tea", image: productIntestineCleansing, benefits: ["Nettoie les intestins", "Favorise un transit sain"], price: "9 295 FCFA", priceNum: 9295, category: "Thés & Boissons", bv: 13, posologie: "1-2 sachets par jour. Le même sachet sert environ 5 tasses (environ un demi-litre) de thé.", conseils: "Pour toutes personnes qui souffrent de constipation. Pour ceux qui souffrent d'intoxication." },
  { id: 23, name: "Balsam Pear Tea", image: productBalsamPear, benefits: ["Régule la glycémie", "Améliore la circulation"], price: "9 295 FCFA", priceNum: 9295, category: "Thés & Boissons", bv: 13, posologie: "1 sachet par jour. Le même sachet sert environ 5 tasses (environ un demi-litre) de thé.", conseils: "Pour ceux dont le taux de sucre ou de lipides sanguins est élevé. Toutes personnes qui veulent contrôler leur poids corporel. Bon pour les personnes en surpoids ou obèses." },
  { id: 27, name: "Ganoderma Coffee", image: productGanodermaCoffee, benefits: ["Café enrichi en Ganoderma", "Booste l'énergie et l'immunité"], price: "12 870 FCFA", priceNum: 12870, category: "Thés & Boissons", bv: 18, posologie: "1-2 sachet(s) par jour.", conseils: "Les personnes qui ont besoin de se rafraîchir ou de se revitaliser. Les personnes qui ont besoin de contrôler leur poids. Les personnes qui souffrent de fatigue chronique." },
  { id: 28, name: "Blueberry Coffee", image: productBlueberryCoffee, benefits: ["Café enrichi aux myrtilles", "Riche en antioxydants"], price: "12 870 FCFA", priceNum: 12870, category: "Thés & Boissons", bv: 18, posologie: "1-2 sachet(s) par jour. Mettez 1 sachet de poudre et mélangez-le avec 150 ml d'eau chaude.", conseils: "Ce café est très efficace pour les femmes ménopausées ou post-ménopausées. Personnes suivant un régime." },
  { id: 39, name: "Clear Lung Tea", image: productClearLungTea, benefits: ["Nettoie les poumons", "Soulage les voies respiratoires"], price: "10 010 FCFA", priceNum: 10010, category: "Thés & Boissons", bv: 14, posologie: "1-2 sachet(s) par jour.", conseils: "Les gens qui fument. Les personnes qui travaillent ou vivent dans des endroits pollués par la fumée ou la poussière. Les personnes atteintes de maladies respiratoires chroniques telles que la toux chronique, la bronchite, l'asthme, l'emphysème." },
  { id: 78, name: "Jinpure Tea", image: productJinpureTea, benefits: ["Détoxifie le foie et les reins", "Purifie le sang"], price: "9 295 FCFA", priceNum: 9295, category: "Thés & Boissons", bv: 13, posologie: "1-2 sachet(s) par jour.", conseils: "Bon pour les adultes qui veulent prévenir le rhume, la grippe ou le COVID-19. Pour toutes personnes qui souhaitent développer une immunité saine." },
  { id: 79, name: "Jinpure Capsule", image: productJinpureCapsule, benefits: ["Détoxification profonde", "Protège le foie"], price: "15 730 FCFA", priceNum: 15730, category: "Thés & Boissons", bv: 22, posologie: "2 capsules à chaque fois, deux fois par jour.", conseils: "Adultes qui veulent prévenir le rhume, la grippe ou le COVID-19. Personnes qui souhaitent développer une immunité saine." },

  // ===== SOINS FÉMININS =====
  { id: 19, name: "Soy Power Capsule", image: productSoyPower, benefits: ["Équilibre hormonal féminin", "Soulage les symptômes de la ménopause"], price: "12 870 FCFA", priceNum: 12870, category: "Soins féminins", bv: 18 },
  { id: 24, name: "Breast Care Tea", image: productBreastCareTea, benefits: ["Soutient la santé mammaire", "Équilibre hormonal naturel"], price: "10 725 FCFA", priceNum: 10725, category: "Soins féminins", bv: 15, posologie: "1-3 sachet(s) par jour.", conseils: "Pour la prévention et le soulagement des troubles du sein tels que l'hyperplasie des glandes mammaires et les tumeurs du sein." },
  { id: 29, name: "Kidney Tonifying Women", image: productKidney, benefits: ["Renforce la fonction rénale féminine", "Optimise la détox rénale"], price: "21 450 FCFA", priceNum: 21450, category: "Soins féminins", bv: 30, posologie: "3 à 4 gélules, deux à trois fois par jour.", conseils: "Pour les femmes péri- ou post-ménopausées. Pour les femmes souffrant de douleurs aux jambes et à la taille ou de fatigue. Pour les femmes aux menstruations irrégulières. Pour les femmes ayant des relations sexuelles compromises." },
  { id: 60, name: "Uterus Cleansing", image: productUterusCleansing, benefits: ["Nettoie et protège l'utérus", "Prévient les infections gynécologiques"], price: "22 880 FCFA", priceNum: 22880, category: "Soins féminins", bv: 32 },
  { id: 62, name: "Breast Care Capsule", image: productBreastCareCapsule, benefits: ["Protège la santé mammaire", "Prévient les kystes mammaires"], price: "21 450 FCFA", priceNum: 21450, category: "Soins féminins", bv: 30 },
  { id: 63, name: "Ovary Nutrition", image: productOvaryNutrition, benefits: ["Nourrit et protège les ovaires", "Régule le cycle menstruel"], price: "17 160 FCFA", priceNum: 17160, category: "Soins féminins", bv: 24, posologie: "1 à 2 gélules à chaque fois, 1 à 2 fois par jour. Ne convient pas aux femmes enceintes, aux mères allaitantes et aux personnes allergiques aux ingrédients.", conseils: "Pour les femmes qui souhaitent améliorer leur état de peau ou leur qualité de vie sexuelle. Femmes atteintes du syndrome post-ménopausique." },
  { id: 71, name: "Panty Liner", image: productPantyLiner, benefits: ["Protection quotidienne", "Hygiène féminine naturelle"], price: "1 560 FCFA", priceNum: 1560, category: "Soins féminins", bv: 2 },
  { id: 72, name: "Napkin Day Use", image: productNapkinDay, benefits: ["Serviette hygiénique jour", "Confort et protection optimale"], price: "3 100 FCFA", priceNum: 3100, category: "Soins féminins", bv: 4 },
  { id: 74, name: "Napkin Night Use", image: productNapkinNight, benefits: ["Serviette hygiénique nuit", "Protection longue durée"], price: "3 100 FCFA", priceNum: 3100, category: "Soins féminins", bv: 4 },

  // ===== SOINS MASCULINS =====
  { id: 3, name: "Kidney Tonifying Man", image: productKidney, benefits: ["Renforce les reins", "Optimise la vitalité masculine"], price: "21 450 FCFA", priceNum: 21450, category: "Soins masculins", bv: 30, posologie: "3 à 4 gélules, deux à trois fois par jour.", conseils: "Pour les hommes souffrant de douleurs aux jambes et aux lombaires ou de baisse de libido. Pour les hommes d'âge moyen ou âgés." },
  { id: 4, name: "ProstaSure Capsule", image: productProstacre, benefits: ["Prévient et soulage la prostate", "Diminue les envies fréquentes d'uriner"], price: "23 595 FCFA", priceNum: 23595, category: "Soins masculins", bv: 33 },
  { id: 12, name: "Vig Power Capsule", image: productVigeurCapsule, benefits: ["Renforce la vitalité masculine", "Améliore l'endurance"], price: "18 590 FCFA", priceNum: 18590, category: "Soins masculins", bv: 26 },
  { id: 69, name: "Golden Knight", image: productGoldenKnight, benefits: ["Stimule la vitalité masculine", "Renforce la performance"], price: "12 870 FCFA", priceNum: 12870, category: "Soins masculins", bv: 18 },

  // ===== ENFANTS & FAMILLE =====
  { id: 8, name: "Zinc Adulte", image: productZincAdulte, benefits: ["Renforce le système immunitaire", "Favorise la santé de la peau"], price: "11 440 FCFA", priceNum: 11440, category: "Soins masculins", bv: 16 },
  { id: 26, name: "Multi-vitamin Enfants", image: productMultivitaminEnfants, benefits: ["Apport complet en vitamines", "Favorise la croissance"], price: "6 078 FCFA", priceNum: 6078, category: "Enfants & Famille", bv: 8.5 },
  { id: 84, name: "Multi-vitamin Adultes", image: productMultivitaminAdultes, benefits: ["Apport quotidien en vitamines", "Renforce la vitalité"], price: "16 445 FCFA", priceNum: 16445, category: "Compléments de santé", bv: 23, posologie: "1 à 2 comprimés par jour.", conseils: "Ce produit est utilisé pour tout âge." },
  { id: 85, name: "Calcium Enfants", image: productCalciumEnfants, benefits: ["Renforce les os en croissance", "Favorise le développement"], price: "8 608 FCFA", priceNum: 8608, category: "Enfants & Famille", bv: 12 },
  { id: 86, name: "Calcium Adultes", image: productCalciumAdultes, benefits: ["Prévient l'ostéoporose", "Renforce les os et les dents"], price: "15 730 FCFA", priceNum: 15730, category: "Enfants & Famille", bv: 22, posologie: "1-2 capsules à chaque fois, une fois par jour.", conseils: "Pour tous les groupes d'âges, en particulier les adolescents, les femmes ménopausées et les personnes âgées qui ont besoin d'un apport en calcium plus élevé." },
  { id: 87, name: "Zinc Enfants", image: productZincEnfants, benefits: ["Renforce l'immunité de l'enfant", "Favorise la croissance"], price: "6 435 FCFA", priceNum: 6435, category: "Enfants & Famille", bv: 9 },

  // ===== BEAUTÉ & HYGIÈNE =====
  { id: 6, name: "Anti-Aging Capsule", image: productAntiAging, benefits: ["Combat le vieillissement cellulaire", "Protège contre les radicaux libres"], price: "22 880 FCFA", priceNum: 22880, category: "Beauté & Hygiène", bv: 32, posologie: "2 capsules à chaque fois, une fois par jour.", conseils: "L'essence végétale de ce produit régule le métabolisme, renforce l'immunité, améliore l'auto-guérison des tissus et neutralise les radicaux libres qui endommagent les tissus, retardant ainsi le processus de vieillissement." },
  { id: 13, name: "Clear", image: productClear, benefits: ["Élimine la constipation chronique", "Favorise un transit intestinal sain"], price: "7 500 FCFA", priceNum: 7500, category: "Compléments de santé", bv: 7.5 },
  { id: 55, name: "Olive Soap", image: productOliveSoap, benefits: ["Savon hydratant naturel", "Nourrit et protège la peau"], price: "1 560 FCFA", priceNum: 1560, category: "Beauté & Hygiène", bv: 2 },
  { id: 70, name: "Silver Eva", image: productSilverEva, benefits: ["Soin féminin premium", "Hydratation et protection"], price: "12 155 FCFA", priceNum: 12155, category: "Beauté & Hygiène", bv: 17 },

  // ===== ENGRAIS BIO =====
  { id: 14, name: "Nutriplant Organic", image: productNutriplant, benefits: ["Améliore la qualité et le rendement", "Agriculture 100% biologique"], price: "21 450 FCFA", priceNum: 21450, category: "Engrais Bio", bv: 30 },
];
