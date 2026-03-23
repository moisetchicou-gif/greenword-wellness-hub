import { useEffect, useRef, useState } from "react";
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

const productBenefits = [
  { name: "Beta-Carotene", image: productBetaCarotene, benefits: ["Source naturelle de vitamine A", "Prévient certains types de cancer", "Protège la peau", "Renforce la vision"] },
  { name: "Lipid Care Tea", image: productLipidCare, benefits: ["Abaisse le taux de lipides", "Améliore l'endurance", "Favorise la digestion", "Maintient un poids sain"] },
  { name: "Kidney Tonifying", image: productKidney, benefits: ["Renforce la fonction rénale", "Optimise la détox", "Santé urinaire", "Améliore la vitalité"] },
  { name: "Prostacre", image: productProstacre, benefits: ["Soulage la prostate", "Diminue les envies d'uriner", "Confort urinaire", "Santé reproductive"] },
  { name: "A-Power Capsule", image: productAPower, benefits: ["Soutient le traitement du cancer", "Renforce l'immunité", "Énergie cellulaire", "Anti-oxydant"] },
  { name: "Anti-Aging", image: productAntiAging, benefits: ["Combat le vieillissement", "Riche en antioxydants", "Santé de la peau", "Équilibre endocrinien"] },
  { name: "Glucoblock", image: productGlucoblock, benefits: ["Régule la glycémie", "Fonction pancréatique", "Sensibilité à l'insuline", "Protège les vaisseaux"] },
  { name: "Zinc Adulte", image: productZincAdulte, benefits: ["Renforce l'immunité", "Santé peau et cheveux", "Soutient la fertilité", "Source de zinc"] },
  { name: "Cordyceps", image: productCordyceps, benefits: ["Énergie et vitalité", "Régule l'immunité", "Endurance physique", "Santé respiratoire"] },
  { name: "Kuding Tea", image: productKudingTea, benefits: ["Détoxifie l'organisme", "Réduit l'inflammation", "Santé cardiovasculaire", "Soulage maux de tête"] },
  { name: "Pine Pollen", image: productPinePollen, benefits: ["Vitalité masculine", "Riche en acides aminés", "Santé hormonale", "Régénération cellulaire"] },
  { name: "Vigeur Capsule", image: productVigeurCapsule, benefits: ["Vitalité masculine", "Santé reproductive", "Équilibre hormonal", "Endurance"] },
  { name: "Clear (Dentifrice)", image: productClear, benefits: ["Prévient les caries", "Blanchit les dents", "Élimine la mauvaise haleine", "Soulage les gencives"] },
];

const BenefitCard = ({ product, index }: { product: typeof productBenefits[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center p-6 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-base font-display text-accent">{product.name}</h3>
        <ul className="space-y-1.5">
          {product.benefits.map((b) => (
            <li key={b} className="text-muted-foreground text-xs flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">•</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="bienfaits" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Bienfaits</p>
          <h2 className="text-3xl sm:text-4xl text-accent">
            Pourquoi <span className="italic text-primary">nous choisir</span> ?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Chaque produit Green World est conçu pour cibler des besoins de santé spécifiques avec des ingrédients 100% naturels.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productBenefits.map((product, i) => (
            <BenefitCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
