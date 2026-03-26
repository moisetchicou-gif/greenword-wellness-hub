import productBetaCarotene from "@/assets/product-beta-carotene.jpg";
import productLipidCare from "@/assets/product-lipid-care-tea.jpg";
import productKidney from "@/assets/product-kidney-tonifying.jpg";
import productProstacre from "@/assets/product-prostacre.jpg";
import productAPower from "@/assets/product-a-power.jpg";
import productAntiAging from "@/assets/product-anti-aging.jpg";
import productGlucoblock from "@/assets/product-glucoblock.jpg";
import productZincAdulte from "@/assets/product-zinc-adulte.png";
import productCordyceps from "@/assets/product-cordyceps.jpg";
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
import productOvaryNutrition from "@/assets/product-ovary-nutrition.jpg";
import productNapkinNight from "@/assets/product-napkin-night.jpg";
import productIntestineCleansing from "@/assets/product-intestine-cleansing.png";
import productBalsamPear from "@/assets/product-balsam-pear.jpg";
import productSpirulina from "@/assets/product-spirulina.jpg";
import productMealCellulose from "@/assets/product-meal-cellulose.jpg";
import productTourmalineFlask from "@/assets/product-tourmaline-flask.jpg";
import productCompoundCalciumC from "@/assets/product-compound-calcium-c.jpg";
import productCompoundCalciumA from "@/assets/product-compound-calcium-a.jpg";
import productGoldenKnight from "@/assets/product-golden-knight.jpg";
import productSilverEva from "@/assets/product-silver-eva.jpg";
import productPantyLiner from "@/assets/product-panty-liner.jpg";
import productNapkinDay from "@/assets/product-napkin-day.jpg";
import productBloodCleanse from "@/assets/product-blood-cleanse.jpg";
import productGanodermaCoffee from "@/assets/product-ganoderma-coffee.jpg";
import productBlueberryCoffee from "@/assets/product-blueberry-coffee.jpg";
import productClearLungTea from "@/assets/product-clear-lung-tea.webp";
import productJinpureTea from "@/assets/product-jinpure-tea.jpg";
import productJinpureCapsule from "@/assets/product-jinpure-capsule.jpg";
import productMultivitaminEnfants from "@/assets/product-multivitamin-enfants.jpg";
import productMultivitaminAdultes from "@/assets/product-multivitamin-adultes.jpg";
import productCalciumEnfants from "@/assets/product-calcium-enfants.jpg";
import productCalciumAdultes from "@/assets/product-calcium-adultes.jpg";
import productZincEnfants from "@/assets/product-zinc-enfants.jpg";
import productOliveSoap from "@/assets/product-olive-soap.webp";
import productPropolis from "@/assets/product-propolis.jpg";
import productGanoderma from "@/assets/product-ganoderma.jpg";
import productCardioPower from "@/assets/product-cardio-power.png";
import productGinsengRhs from "@/assets/product-ginseng-rhs.jpg";
import productProteinPowder from "@/assets/product-protein-powder.jpg";
import productSoybeanLecithin from "@/assets/product-soybean-lecithin.jpg";
import productDeepSeaFishOil from "@/assets/product-deep-sea-fish-oil.jpg";
import productGarlicOil from "@/assets/product-garlic-oil.jpg";
import productEyeCare from "@/assets/product-eye-care.jpg";
import productChitosan from "@/assets/product-chitosan.jpg";
import productAloeVera from "@/assets/product-aloe-vera.jpg";
import productCompoundMarrow from "@/assets/product-compound-marrow.jpg";
import productGinkgoBiloba from "@/assets/product-ginkgo-biloba.jpg";
import productBrainCare from "@/assets/product-brain-care.jpg";
import productRoyalJelly from "@/assets/product-royal-jelly.jpg";
import productHepatsure from "@/assets/product-hepatsure.jpg";
import productParashield from "@/assets/product-parashield.jpg";
import productSlimming from "@/assets/product-slimming.jpg";
import productSuperNutrition from "@/assets/product-super-nutrition.jpg";
import productCoq10 from "@/assets/product-coq10.jpg";
import productBoneCarePlaster from "@/assets/product-bone-care-plaster.webp";
import productDiasure from "@/assets/product-diasure.jpg";
import productJointHealth from "@/assets/product-joint-health.webp";
import productVitaminC from "@/assets/product-vitamin-c.jpg";
import productGastricHealth from "@/assets/product-gastric-health.jpg";
import productDetoxinPad from "@/assets/product-detoxin-pad.jpg";
import productBlueberryJuice from "@/assets/product-blueberry-juice.jpg";
import productBlueberryEnzymes from "@/assets/product-blueberry-enzymes.jpg";
import productVitaminE from "@/assets/product-vitamin-e.webp";

export type Category =
  | "Compléments de santé"
  | "Thés & Boissons"
  | "Soins féminins"
  | "Soins masculins"
  | "Enfants & Famille"
  | "Beauté & Hygiène"
  | "Engrais Bio";

export const categories: Category[] = [
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
  category: Category;
  bv: number;
}

export const products: Product[] = [
  // ===== COMPLÉMENTS DE SANTÉ =====
  { id: 1, name: "Beta-Carotene", image: productBetaCarotene, benefits: ["Apport en vitamine A", "Prévient le cancer"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20 },
  { id: 5, name: "A-Power Capsule", image: productAPower, benefits: ["Soutient le traitement du cancer", "Renforce l'immunité"], price: "28 600 FCFA", priceNum: 28600, category: "Compléments de santé", bv: 40 },
  { id: 7, name: "Glucoblock", image: productGlucoblock, benefits: ["Régule la glycémie", "Soutient la fonction pancréatique"], price: "12 900 FCFA", priceNum: 12900, category: "Compléments de santé", bv: 18 },
  { id: 9, name: "Cordyceps Plus Capsule", image: productCordyceps, benefits: ["Augmente l'énergie et la vitalité", "Régule le système immunitaire"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20 },
  { id: 15, name: "Spirulina Plus Capsule", image: productSpirulina, benefits: ["Riche en nutriments essentiels", "Favorise la digestion et la détox"], price: "15 015 FCFA", priceNum: 15015, category: "Compléments de santé", bv: 21 },
  { id: 16, name: "Propolis Plus Capsule", image: productPropolis, benefits: ["Anti-inflammatoire naturel", "Renforce les défenses immunitaires"], price: "19 305 FCFA", priceNum: 19305, category: "Compléments de santé", bv: 27 },
  { id: 17, name: "Ganoderma Plus Capsule", image: productGanoderma, benefits: ["Renforce l'immunité", "Soutient la santé respiratoire"], price: "16 445 FCFA", priceNum: 16445, category: "Compléments de santé", bv: 23 },
  { id: 18, name: "Cardio Power Capsule", image: productCardioPower, benefits: ["Protège le système cardiovasculaire", "Régule la tension artérielle"], price: "13 585 FCFA", priceNum: 13585, category: "Compléments de santé", bv: 19 },
  { id: 20, name: "Ginseng RHs Capsule", image: productGinsengRhs, benefits: ["Puissant anti-cancer", "Stimule le système immunitaire"], price: "27 170 FCFA", priceNum: 27170, category: "Compléments de santé", bv: 38 },
  { id: 25, name: "Protein Powder", image: productProteinPowder, benefits: ["Source de protéines végétales", "Favorise la croissance musculaire"], price: "25 025 FCFA", priceNum: 25025, category: "Compléments de santé", bv: 35 },
  { id: 30, name: "Soybean Lecithin", image: productSoybeanLecithin, benefits: ["Soutient la santé cérébrale", "Régule le cholestérol"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20 },
  { id: 31, name: "Deep Sea Fish Oil", image: productDeepSeaFishOil, benefits: ["Riche en Oméga-3", "Protège le cœur et le cerveau"], price: "17 875 FCFA", priceNum: 17875, category: "Compléments de santé", bv: 25 },
  { id: 32, name: "Garlic Oil Softgel", image: productGarlicOil, benefits: ["Antibactérien naturel", "Renforce l'immunité"], price: "16 088 FCFA", priceNum: 16088, category: "Compléments de santé", bv: 22.5 },
  { id: 33, name: "Eye Care Softgel", image: productEyeCare, benefits: ["Protège la vision", "Prévient la dégénérescence maculaire"], price: "20 020 FCFA", priceNum: 20020, category: "Compléments de santé", bv: 28 },
  { id: 34, name: "Chitosan Capsule", image: productChitosan, benefits: ["Absorbe les graisses", "Favorise la perte de poids"], price: "17 160 FCFA", priceNum: 17160, category: "Compléments de santé", bv: 24 },
  { id: 35, name: "Aloe Vera Plus Capsule", image: productAloeVera, benefits: ["Détoxifie l'organisme", "Soutient la digestion"], price: "15 015 FCFA", priceNum: 15015, category: "Compléments de santé", bv: 21 },
  { id: 36, name: "Compound Marrow Powder", image: productCompoundMarrow, benefits: ["Renforce les os et articulations", "Nourrit la moelle osseuse"], price: "18 590 FCFA", priceNum: 18590, category: "Compléments de santé", bv: 26 },
  { id: 37, name: "Ginkgo Biloba", image: productGinkgoBiloba, benefits: ["Améliore la circulation cérébrale", "Renforce la mémoire"], price: "16 088 FCFA", priceNum: 16088, category: "Compléments de santé", bv: 22.5 },
  { id: 38, name: "Brain Care Capsule", image: productBrainCare, benefits: ["Stimule les fonctions cognitives", "Protège les neurones"], price: "22 880 FCFA", priceNum: 22880, category: "Compléments de santé", bv: 32 },
  { id: 40, name: "Royal Jelly Softgel", image: productRoyalJelly, benefits: ["Revitalise l'organisme", "Anti-fatigue naturel"], price: "13 228 FCFA", priceNum: 13228, category: "Compléments de santé", bv: 18.5 },
  { id: 41, name: "Hepatsure Capsule", image: productHepatsure, benefits: ["Protège et régénère le foie", "Détoxifie l'organisme"], price: "18 590 FCFA", priceNum: 18590, category: "Compléments de santé", bv: 26 },
  { id: 42, name: "Parashield", image: productParashield, benefits: ["Antiparasitaire naturel", "Protège le système digestif"], price: "10 725 FCFA", priceNum: 10725, category: "Compléments de santé", bv: 15 },
  { id: 43, name: "Slimming Capsule", image: productSlimming, benefits: ["Favorise la perte de poids", "Accélère le métabolisme"], price: "20 020 FCFA", priceNum: 20020, category: "Compléments de santé", bv: 28 },
  { id: 44, name: "Super Nutrition", image: productSuperNutrition, benefits: ["Nutrition complète", "Renforce l'immunité globale"], price: "32 890 FCFA", priceNum: 32890, category: "Compléments de santé", bv: 46 },
  { id: 46, name: "CoQ-10 Capsule", image: productCoq10, benefits: ["Protège le cœur", "Antioxydant puissant"], price: "19 305 FCFA", priceNum: 19305, category: "Compléments de santé", bv: 27 },
  { id: 47, name: "Bone Care Plaster", image: productBoneCarePlaster, benefits: ["Soulage les douleurs articulaires", "Patch anti-inflammatoire"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20 },
  { id: 48, name: "Diasure Capsule", image: productDiasure, benefits: ["Régule la glycémie", "Soutient le pancréas"], price: "12 870 FCFA", priceNum: 12870, category: "Compléments de santé", bv: 18 },
  { id: 49, name: "Joint Health Capsule", image: productJointHealth, benefits: ["Renforce les articulations", "Soulage les douleurs articulaires"], price: "20 020 FCFA", priceNum: 20020, category: "Compléments de santé", bv: 28 },
  { id: 50, name: "Vitamin C Tablet", image: productVitaminC, benefits: ["Renforce l'immunité", "Puissant antioxydant"], price: "8 580 FCFA", priceNum: 8580, category: "Compléments de santé", bv: 12 },
  { id: 51, name: "Gastric Health Tablet", image: productGastricHealth, benefits: ["Soulage les troubles gastriques", "Protège la muqueuse stomacale"], price: "11 440 FCFA", priceNum: 11440, category: "Compléments de santé", bv: 16 },
  { id: 52, name: "Magic Detoxin Pad", image: productDetoxinPad, benefits: ["Détoxification par les pieds", "Élimine les toxines"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20 },
  { id: 53, name: "Blueberry Juice", image: productBlueberryJuice, benefits: ["Riche en antioxydants", "Protège la vision"], price: "15 730 FCFA", priceNum: 15730, category: "Compléments de santé", bv: 22 },
  { id: 54, name: "Blueberry Enzymes", image: productBlueberryEnzymes, benefits: ["Favorise la digestion", "Riche en enzymes naturelles"], price: "15 730 FCFA", priceNum: 15730, category: "Compléments de santé", bv: 22 },
  { id: 57, name: "Vitamin E Capsule", image: productVitaminE, benefits: ["Antioxydant puissant", "Protège la peau et les cellules"], price: "16 445 FCFA", priceNum: 16445, category: "Compléments de santé", bv: 23 },
  { id: 58, name: "Vitamin D Capsule", image: productPlaceholder, benefits: ["Renforce les os", "Soutient l'immunité"], price: "16 445 FCFA", priceNum: 16445, category: "Compléments de santé", bv: 23 },
  { id: 59, name: "MNM Capsule", image: productPlaceholder, benefits: ["Anti-âge cellulaire avancé", "Régénération cellulaire premium"], price: "125 125 FCFA", priceNum: 125125, category: "Compléments de santé", bv: 175 },
  { id: 64, name: "Meal Cellulose", image: productMealCellulose, benefits: ["Riche en fibres alimentaires", "Favorise le transit intestinal"], price: "18 590 FCFA", priceNum: 18590, category: "Compléments de santé", bv: 26 },
  { id: 65, name: "Mala Power", image: productPlaceholder, benefits: ["Booste l'énergie naturelle", "Soutient la vitalité quotidienne"], price: "10 725 FCFA", priceNum: 10725, category: "Compléments de santé", bv: 15 },
  { id: 66, name: "Tourmaline Flask", image: productTourmalineFlask, benefits: ["Eau alcaline et purifiée", "Améliore l'hydratation cellulaire"], price: "35 750 FCFA", priceNum: 35750, category: "Compléments de santé", bv: 50 },
  { id: 67, name: "Compound Calcium C", image: productCompoundCalciumC, benefits: ["Renforce les os", "Apport en calcium et vitamine C"], price: "14 300 FCFA", priceNum: 14300, category: "Compléments de santé", bv: 20 },
  { id: 68, name: "Compound Calcium A", image: productCompoundCalciumA, benefits: ["Calcium enrichi en vitamine A", "Prévient l'ostéoporose"], price: "15 730 FCFA", priceNum: 15730, category: "Compléments de santé", bv: 22 },
  { id: 73, name: "Blood Cleanse Capsule", image: productBloodCleanse, benefits: ["Purifie le sang", "Améliore la circulation sanguine"], price: "20 020 FCFA", priceNum: 20020, category: "Compléments de santé", bv: 28 },
  { id: 75, name: "SE Capsule", image: productPlaceholder, benefits: ["Apport en sélénium", "Antioxydant et anti-cancer"], price: "8 580 FCFA", priceNum: 8580, category: "Compléments de santé", bv: 12 },
  { id: 76, name: "Grape Seed Extract", image: productPlaceholder, benefits: ["Puissant antioxydant", "Protège les vaisseaux sanguins"], price: "17 875 FCFA", priceNum: 17875, category: "Compléments de santé", bv: 25 },
  { id: 77, name: "Livergen Capsule", image: productPlaceholder, benefits: ["Régénère les cellules du foie", "Protège contre les hépatites"], price: "19 305 FCFA", priceNum: 19305, category: "Compléments de santé", bv: 27 },
  { id: 80, name: "Anxiety & Stress Relief", image: productPlaceholder, benefits: ["Réduit le stress et l'anxiété", "Favorise le sommeil réparateur"], price: "17 160 FCFA", priceNum: 17160, category: "Compléments de santé", bv: 24 },
  { id: 81, name: "Probiotics Powder", image: productPlaceholder, benefits: ["Restaure la flore intestinale", "Renforce la digestion"], price: "17 875 FCFA", priceNum: 17875, category: "Compléments de santé", bv: 25 },
  { id: 82, name: "Anti-Addiction Capsule", image: productPlaceholder, benefits: ["Aide au sevrage tabagique/alcoolique", "Détoxifie l'organisme"], price: "25 025 FCFA", priceNum: 25025, category: "Compléments de santé", bv: 35 },
  { id: 83, name: "Blueberry Concentrate", image: productPlaceholder, benefits: ["Super concentré d'antioxydants", "Protège la vision et le cerveau"], price: "60 775 FCFA", priceNum: 60775, category: "Compléments de santé", bv: 85 },

  // ===== THÉS & BOISSONS =====
  { id: 2, name: "Lipid Care Tea", image: productLipidCare, benefits: ["Abaisse le taux de lipides", "Améliore l'endurance"], price: "10 010 FCFA", priceNum: 10010, category: "Thés & Boissons", bv: 14 },
  { id: 10, name: "Kuding Plus Tea", image: productKudingTea, benefits: ["Détoxifie l'organisme", "Réduit l'inflammation"], price: "8 580 FCFA", priceNum: 8580, category: "Thés & Boissons", bv: 12 },
  { id: 11, name: "Pine Pollen Tea", image: productPinePollen, benefits: ["Stimule la vitalité", "Riche en nutriments essentiels"], price: "10 010 FCFA", priceNum: 10010, category: "Thés & Boissons", bv: 14 },
  { id: 21, name: "Pro-slim Tea", image: productProSlimTea, benefits: ["Favorise la perte de poids", "Accélère le métabolisme"], price: "8 580 FCFA", priceNum: 8580, category: "Thés & Boissons", bv: 12 },
  { id: 22, name: "Intestine Cleansing Tea", image: productIntestineCleansing, benefits: ["Nettoie les intestins", "Favorise un transit sain"], price: "9 295 FCFA", priceNum: 9295, category: "Thés & Boissons", bv: 13 },
  { id: 23, name: "Balsam Pear Tea", image: productBalsamPear, benefits: ["Régule la glycémie", "Améliore la circulation"], price: "9 295 FCFA", priceNum: 9295, category: "Thés & Boissons", bv: 13 },
  { id: 27, name: "Ganoderma Coffee", image: productGanodermaCoffee, benefits: ["Café enrichi en Ganoderma", "Booste l'énergie et l'immunité"], price: "12 870 FCFA", priceNum: 12870, category: "Thés & Boissons", bv: 18 },
  { id: 28, name: "Blueberry Coffee", image: productBlueberryCoffee, benefits: ["Café enrichi aux myrtilles", "Riche en antioxydants"], price: "12 870 FCFA", priceNum: 12870, category: "Thés & Boissons", bv: 18 },
  { id: 39, name: "Clear Lung Tea", image: productClearLungTea, benefits: ["Nettoie les poumons", "Soulage les voies respiratoires"], price: "10 010 FCFA", priceNum: 10010, category: "Thés & Boissons", bv: 14 },
  { id: 78, name: "Jinpure Tea", image: productJinpureTea, benefits: ["Détoxifie le foie et les reins", "Purifie le sang"], price: "9 295 FCFA", priceNum: 9295, category: "Thés & Boissons", bv: 13 },
  { id: 79, name: "Jinpure Capsule", image: productJinpureCapsule, benefits: ["Détoxification profonde", "Protège le foie"], price: "15 730 FCFA", priceNum: 15730, category: "Thés & Boissons", bv: 22 },

  // ===== SOINS FÉMININS =====
  { id: 19, name: "Soy Power Capsule", image: productSoyPower, benefits: ["Équilibre hormonal féminin", "Soulage les symptômes de la ménopause"], price: "12 870 FCFA", priceNum: 12870, category: "Soins féminins", bv: 18 },
  { id: 24, name: "Breast Care Tea", image: productBreastCareTea, benefits: ["Soutient la santé mammaire", "Équilibre hormonal naturel"], price: "10 725 FCFA", priceNum: 10725, category: "Soins féminins", bv: 15 },
  { id: 29, name: "Kidney Tonifying Women", image: productKidney, benefits: ["Renforce la fonction rénale féminine", "Optimise la détox rénale"], price: "21 450 FCFA", priceNum: 21450, category: "Soins féminins", bv: 30 },
  { id: 60, name: "Uterus Cleansing", image: productUterusCleansing, benefits: ["Nettoie et protège l'utérus", "Prévient les infections gynécologiques"], price: "22 880 FCFA", priceNum: 22880, category: "Soins féminins", bv: 32 },
  { id: 62, name: "Breast Care Capsule", image: productBreastCareCapsule, benefits: ["Protège la santé mammaire", "Prévient les kystes mammaires"], price: "21 450 FCFA", priceNum: 21450, category: "Soins féminins", bv: 30 },
  { id: 63, name: "Ovary Nutrition", image: productOvaryNutrition, benefits: ["Nourrit et protège les ovaires", "Régule le cycle menstruel"], price: "17 160 FCFA", priceNum: 17160, category: "Soins féminins", bv: 24 },
  { id: 71, name: "Panty Liner", image: productPantyLiner, benefits: ["Protection quotidienne", "Hygiène féminine naturelle"], price: "1 560 FCFA", priceNum: 1560, category: "Soins féminins", bv: 2 },
  { id: 72, name: "Napkin Day Use", image: productNapkinDay, benefits: ["Serviette hygiénique jour", "Confort et protection optimale"], price: "3 100 FCFA", priceNum: 3100, category: "Soins féminins", bv: 4 },
  { id: 74, name: "Napkin Night Use", image: productNapkinNight, benefits: ["Serviette hygiénique nuit", "Protection longue durée"], price: "3 100 FCFA", priceNum: 3100, category: "Soins féminins", bv: 4 },

  // ===== SOINS MASCULINS =====
  { id: 3, name: "Kidney Tonifying Man", image: productKidney, benefits: ["Renforce les reins", "Optimise la vitalité masculine"], price: "21 450 FCFA", priceNum: 21450, category: "Soins masculins", bv: 30 },
  { id: 4, name: "ProstaSure Capsule", image: productProstacre, benefits: ["Prévient et soulage la prostate", "Diminue les envies fréquentes d'uriner"], price: "23 595 FCFA", priceNum: 23595, category: "Soins masculins", bv: 33 },
  { id: 12, name: "Vig Power Capsule", image: productVigeurCapsule, benefits: ["Renforce la vitalité masculine", "Améliore l'endurance"], price: "18 590 FCFA", priceNum: 18590, category: "Soins masculins", bv: 26 },
  { id: 69, name: "Golden Knight", image: productGoldenKnight, benefits: ["Stimule la vitalité masculine", "Renforce la performance"], price: "12 870 FCFA", priceNum: 12870, category: "Soins masculins", bv: 18 },

  // ===== ENFANTS & FAMILLE =====
  { id: 8, name: "Zinc Adulte", image: productZincAdulte, benefits: ["Renforce le système immunitaire", "Favorise la santé de la peau"], price: "11 440 FCFA", priceNum: 11440, category: "Enfants & Famille", bv: 16 },
  { id: 26, name: "Multi-vitamin Enfants", image: productMultivitaminEnfants, benefits: ["Apport complet en vitamines", "Favorise la croissance"], price: "6 078 FCFA", priceNum: 6078, category: "Enfants & Famille", bv: 8.5 },
  { id: 84, name: "Multi-vitamin Adultes", image: productMultivitaminAdultes, benefits: ["Apport quotidien en vitamines", "Renforce la vitalité"], price: "16 445 FCFA", priceNum: 16445, category: "Enfants & Famille", bv: 23 },
  { id: 85, name: "Calcium Enfants", image: productCalciumEnfants, benefits: ["Renforce les os en croissance", "Favorise le développement"], price: "8 608 FCFA", priceNum: 8608, category: "Enfants & Famille", bv: 12 },
  { id: 86, name: "Calcium Adultes", image: productCalciumAdultes, benefits: ["Prévient l'ostéoporose", "Renforce les os et les dents"], price: "15 730 FCFA", priceNum: 15730, category: "Enfants & Famille", bv: 22 },
  { id: 87, name: "Zinc Enfants", image: productZincEnfants, benefits: ["Renforce l'immunité de l'enfant", "Favorise la croissance"], price: "6 435 FCFA", priceNum: 6435, category: "Enfants & Famille", bv: 9 },

  // ===== BEAUTÉ & HYGIÈNE =====
  { id: 6, name: "Anti-Aging Capsule", image: productAntiAging, benefits: ["Combat le vieillissement cellulaire", "Protège contre les radicaux libres"], price: "22 880 FCFA", priceNum: 22880, category: "Beauté & Hygiène", bv: 32 },
  { id: 13, name: "Clear (Dentifrice)", image: productClear, benefits: ["Prévient les caries et blanchit les dents", "Élimine la mauvaise haleine"], price: "5 363 FCFA", priceNum: 5363, category: "Beauté & Hygiène", bv: 7.5 },
  { id: 55, name: "Olive Soap", image: productOliveSoap, benefits: ["Savon hydratant naturel", "Nourrit et protège la peau"], price: "1 560 FCFA", priceNum: 1560, category: "Beauté & Hygiène", bv: 2 },
  { id: 70, name: "Silver Eva", image: productSilverEva, benefits: ["Soin féminin premium", "Hydratation et protection"], price: "12 155 FCFA", priceNum: 12155, category: "Beauté & Hygiène", bv: 17 },

  // ===== ENGRAIS BIO =====
  { id: 14, name: "Nutriplant Organic", image: productNutriplant, benefits: ["Améliore la qualité et le rendement", "Agriculture 100% biologique"], price: "21 450 FCFA", priceNum: 21450, category: "Engrais Bio", bv: 30 },
];
