import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
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

type Category = "Produits de santé" | "Produits de beauté" | "Engrais Bio";

const categories: Category[] = ["Produits de santé", "Produits de beauté", "Engrais Bio"];

const products = [
  { id: 1, name: "Beta-Carotene", image: productBetaCarotene, benefits: ["Apport en vitamine A", "Prévient le cancer"], price: "14 300 FCFA", priceNum: 14300, category: "Produits de santé" as Category },
  { id: 2, name: "Lipid Care Tea", image: productLipidCare, benefits: ["Abaisse le taux de lipides", "Améliore l'endurance"], price: "10 000 FCFA", priceNum: 10000, category: "Produits de santé" as Category },
  { id: 3, name: "Kidney Tonifying", image: productKidney, benefits: ["Renforce les reins", "Optimise la détox rénale"], price: "21 400 FCFA", priceNum: 21400, category: "Produits de santé" as Category },
  { id: 4, name: "Prostacre", image: productProstacre, benefits: ["Prévient et soulage la prostate", "Diminue les envies fréquentes d'uriner"], price: "23 600 FCFA", priceNum: 23600, category: "Produits de santé" as Category },
  { id: 5, name: "A-Power Capsule", image: productAPower, benefits: ["Soutient le traitement du cancer", "Renforce l'immunité"], price: "28 600 FCFA", priceNum: 28600, category: "Produits de santé" as Category },
  { id: 6, name: "Anti-Aging", image: productAntiAging, benefits: ["Combat le vieillissement cellulaire", "Protège contre les radicaux libres"], price: "22 900 FCFA", priceNum: 22900, category: "Produits de beauté" as Category },
  { id: 7, name: "Glucoblock", image: productGlucoblock, benefits: ["Régule la glycémie", "Soutient la fonction pancréatique"], price: "12 900 FCFA", priceNum: 12900, category: "Produits de santé" as Category },
  { id: 8, name: "Zinc Adulte", image: productZincAdulte, benefits: ["Renforce le système immunitaire", "Favorise la santé de la peau"], price: "11 400 FCFA", priceNum: 11400, category: "Produits de santé" as Category },
  { id: 9, name: "Cordyceps", image: productCordyceps, benefits: ["Augmente l'énergie et la vitalité", "Régule le système immunitaire"], price: "14 300 FCFA", priceNum: 14300, category: "Produits de santé" as Category },
  { id: 10, name: "Kuding Tea", image: productKudingTea, benefits: ["Détoxifie l'organisme", "Réduit l'inflammation"], price: "8 600 FCFA", priceNum: 8600, category: "Produits de santé" as Category },
  { id: 11, name: "Pine Pollen", image: productPinePollen, benefits: ["Stimule la vitalité masculine", "Riche en nutriments essentiels"], price: "10 000 FCFA", priceNum: 10000, category: "Produits de santé" as Category },
  { id: 12, name: "Vigeur Capsule", image: productVigeurCapsule, benefits: ["Renforce la vitalité masculine", "Améliore l'endurance et la stamina"], price: "18 600 FCFA", priceNum: 18600, category: "Produits de santé" as Category },
  { id: 13, name: "Clear (Dentifrice)", image: productClear, benefits: ["Prévient les caries et blanchit les dents", "Élimine la mauvaise haleine"], price: "7 500 FCFA", priceNum: 7500, category: "Produits de beauté" as Category },
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
      className={`bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="aspect-square bg-secondary/30 flex items-center justify-center p-6 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-accent/90 text-accent-foreground text-[10px] font-semibold px-2.5 py-1 rounded-full">Naturel</span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-base font-display text-accent group-hover:text-primary transition-colors">{product.name}</h3>
        <ul className="space-y-1">
          {product.benefits.map((b) => (
            <li key={b} className="text-muted-foreground text-xs flex items-start gap-2">
              <span className="text-primary mt-0.5 text-sm">✓</span>{b}
            </li>
          ))}
        </ul>
        <p className="text-accent font-semibold text-lg font-display">{product.price}</p>
        <button
          onClick={handleAdd}
          className="w-full bg-accent text-accent-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all mt-1 flex items-center justify-center gap-2 tracking-wide"
        >
          <ShoppingCart className="w-4 h-4" />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Produits de santé");
  const filtered = products.filter((p) => p.category === activeCategory);

  return (
    <section id="produits" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Notre gamme</p>
          <h2 className="text-3xl sm:text-4xl text-accent">
            Nos <span className="italic text-primary">Best-sellers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Découvrez notre gamme complète de compléments alimentaires naturels et produits de beauté Green World.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 tracking-wide ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-highlight/50 border border-border/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-16 text-sm">
              Produits bientôt disponibles dans cette catégorie.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
