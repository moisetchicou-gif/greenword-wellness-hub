import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import productBetaCarotene from "@/assets/product-beta-carotene.jpg";
import productLipidCare from "@/assets/product-lipid-care-tea.jpg";
import productKidney from "@/assets/product-kidney-tonifying.jpg";
import productProstacre from "@/assets/product-prostacre.jpg";
import productAPower from "@/assets/product-a-power.jpg";
import productAntiAging from "@/assets/product-anti-aging.jpg";
import productProSlimTea from "@/assets/product-pro-slim-tea.jpg";
import productGlucoblock from "@/assets/product-glucoblock.jpg";
import productZincAdulte from "@/assets/product-zinc-adulte.png";
import productCordyceps from "@/assets/product-cordyceps.jpg";
import productKudingTea from "@/assets/product-kuding-tea.jpg";
import productPinePollen from "@/assets/product-pine-pollen.jpg";

const products = [
  { id: 1, name: "Beta-Carotene", image: productBetaCarotene, benefits: ["Apport en vitamine A", "Prévient le cancer"], price: "14 300 FCFA", priceNum: 14300 },
  { id: 2, name: "Lipid Care Tea", image: productLipidCare, benefits: ["Abaisse le taux de lipides", "Améliore l'endurance"], price: "10 000 FCFA", priceNum: 10000 },
  { id: 3, name: "Kidney Tonifying", image: productKidney, benefits: ["Renforce les reins", "Optimise la détox rénale"], price: "21 400 FCFA", priceNum: 21400 },
  { id: 4, name: "Prostacre", image: productProstacre, benefits: ["Prévient et soulage la prostate", "Diminue les envies fréquentes d'uriner"], price: "23 600 FCFA", priceNum: 23600 },
  { id: 5, name: "A-Power Capsule", image: productAPower, benefits: ["Soutient le traitement du cancer", "Renforce l'immunité"], price: "28 600 FCFA", priceNum: 28600 },
  { id: 6, name: "Anti-Aging", image: productAntiAging, benefits: ["Combat le vieillissement cellulaire", "Protège contre les radicaux libres"], price: "22 900 FCFA", priceNum: 22900 },
  { id: 7, name: "Pro-Slim Tea", image: productProSlimTea, benefits: ["Accélère la perte de poids", "Élimine les toxines"], price: "8 600 FCFA", priceNum: 8600 },
  { id: 8, name: "Glucoblock", image: productGlucoblock, benefits: ["Régule la glycémie", "Soutient la fonction pancréatique"], price: "12 900 FCFA", priceNum: 12900 },
  { id: 9, name: "Zinc Adulte", image: productZincAdulte, benefits: ["Renforce le système immunitaire", "Favorise la santé de la peau"], price: "11 400 FCFA", priceNum: 11400 },
  { id: 10, name: "Cordyceps", image: productCordyceps, benefits: ["Augmente l'énergie et la vitalité", "Régule le système immunitaire"], price: "14 300 FCFA", priceNum: 14300 },
  { id: 11, name: "Kuding Tea", image: productKudingTea, benefits: ["Détoxifie l'organisme", "Réduit l'inflammation"], price: "8 600 FCFA", priceNum: 8600 },
  { id: 12, name: "Pine Pollen", image: productPinePollen, benefits: ["Stimule la vitalité masculine", "Riche en nutriments essentiels"], price: "10 000 FCFA", priceNum: 10000 },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, priceNum: product.priceNum, image: product.image });
  };

  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-display text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
        <ul className="space-y-1">
          {product.benefits.map((b) => (
            <li key={b} className="text-muted-foreground text-sm flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>{b}
            </li>
          ))}
        </ul>
        <p className="text-primary font-bold text-lg">{product.price}</p>
        <button
          onClick={handleAdd}
          className="w-full bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all mt-1 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Ajouter au panier
        </button>
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
            Découvrez notre gamme complète de compléments alimentaires naturels Green World.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
