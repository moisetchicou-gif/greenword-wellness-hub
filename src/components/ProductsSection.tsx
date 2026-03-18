import { useEffect, useRef, useState } from "react";
import productBetaCarotene from "@/assets/product-beta-carotene.jpg";
import productLipidCare from "@/assets/product-lipid-care-tea.jpg";
import productKidney from "@/assets/product-kidney-tonifying.jpg";
import productProstacre from "@/assets/product-prostacre.jpg";
import productAPower from "@/assets/product-a-power.jpg";

const products = [
  {
    id: 1,
    name: "Beta-Carotene",
    image: productBetaCarotene,
    benefits: ["Apport en vitamine A", "Prévient le cancer"],
    price: "14 300 FCFA",
  },
  {
    id: 2,
    name: "Lipid Care Tea",
    image: productLipidCare,
    benefits: ["Abaisse le taux de lipides", "Améliore l'endurance"],
    price: "10 000 FCFA",
  },
  {
    id: 3,
    name: "Kidney Tonifying",
    image: productKidney,
    benefits: ["Renforce les reins", "Optimise la détox rénale"],
    price: "21 400 FCFA",
  },
  {
    id: 4,
    name: "Prostacre",
    image: productProstacre,
    benefits: ["Prévient et soulage la prostate", "Diminue les envies fréquentes d'uriner"],
    price: "23 600 FCFA",
  },
  {
    id: 5,
    name: "A-Power Capsule",
    image: productAPower,
    benefits: ["Soutient le traitement du cancer", "Renforce l'immunité"],
    price: "Nous contacter",
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-display text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <ul className="space-y-1">
          {product.benefits.map((b) => (
            <li key={b} className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <p className="text-primary font-bold text-lg">{product.price}</p>
        <a
          href="#commander"
          className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all mt-1"
        >
          Commander
        </a>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  return (
    <section id="produits" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <p className="text-primary text-sm font-medium uppercase tracking-widest">Notre gamme</p>
          <h2 className="text-3xl sm:text-4xl text-foreground">
            Nos <span className="text-primary">Produits</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez notre gamme de compléments alimentaires naturels Green World.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
