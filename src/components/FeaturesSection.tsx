import { useEffect, useRef, useState } from "react";
import productBetaCarotene from "@/assets/product-beta-carotene.jpg";
import productLipidCare from "@/assets/product-lipid-care-tea.jpg";
import productKidney from "@/assets/product-kidney-tonifying.jpg";
import productProstacre from "@/assets/product-prostacre.jpg";
import productAPower from "@/assets/product-a-power.jpg";

const productBenefits = [
  {
    name: "Beta-Carotene",
    image: productBetaCarotene,
    benefits: [
      "Source naturelle de vitamine A",
      "Prévient certains types de cancer",
      "Protège la peau contre le vieillissement",
      "Renforce la vision et la santé oculaire",
    ],
  },
  {
    name: "Lipid Care Tea",
    image: productLipidCare,
    benefits: [
      "Abaisse le taux de lipides dans le sang",
      "Améliore l'endurance physique",
      "Favorise la digestion naturelle",
      "Aide à maintenir un poids sain",
    ],
  },
  {
    name: "Kidney Tonifying",
    image: productKidney,
    benefits: [
      "Renforce la fonction rénale",
      "Optimise la détoxification rénale",
      "Soutient la santé urinaire",
      "Améliore la vitalité générale",
    ],
  },
  {
    name: "Prostacre",
    image: productProstacre,
    benefits: [
      "Prévient et soulage les problèmes de prostate",
      "Diminue les envies fréquentes d'uriner",
      "Améliore le confort urinaire masculin",
      "Soutient la santé reproductive",
    ],
  },
  {
    name: "A-Power Capsule",
    image: productAPower,
    benefits: [
      "Soutient le traitement du cancer",
      "Renforce le système immunitaire",
      "Augmente l'énergie cellulaire",
      "Protège contre le stress oxydatif",
    ],
  },
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
      className={`bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-display text-primary">{product.name}</h3>
        <ul className="space-y-2">
          {product.benefits.map((b) => (
            <li key={b} className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">•</span>
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
        <div className="text-center mb-16 space-y-3">
          <p className="text-primary text-sm font-medium uppercase tracking-widest">Bienfaits</p>
          <h2 className="text-3xl sm:text-4xl text-foreground">
            Les bienfaits de nos <span className="text-primary">produits</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Chaque produit Green World est conçu pour cibler des besoins de santé spécifiques.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productBenefits.map((product, i) => (
            <BenefitCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
