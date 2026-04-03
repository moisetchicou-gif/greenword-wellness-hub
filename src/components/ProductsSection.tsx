import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { products, categories, type Product, type Category } from "@/data/products";
import { getProductSlug } from "@/lib/productUtils";

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, priceNum: product.priceNum, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl border border-border/60 overflow-hidden hover-lift group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="aspect-square bg-secondary/30 flex items-center justify-center p-6 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="glass text-accent text-[10px] font-semibold px-2.5 py-1 rounded-full">{product.bv} BV</span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
      </div>
      <div className="p-5 space-y-3">
        <Link to={`/produit/${getProductSlug(product)}`} className="text-base font-display text-accent group-hover:text-primary transition-colors duration-300 block">{product.name}</Link>
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
          className={`w-full px-6 py-2.5 rounded-full text-sm font-medium active:scale-[0.97] transition-all duration-300 mt-1 flex items-center justify-center gap-2 tracking-wide ${
            added
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/20"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Ajouté !
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Ajouter au panier
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous les produits");
  const filtered = activeCategory === "Tous les produits" ? products : products.filter((p) => p.category === activeCategory);
  const { ref, visible } = useScrollRevealSimple();

  return (
    <section id="produits" className="py-24 bg-background relative">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-secondary/30 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div ref={ref} className={`text-center mb-12 space-y-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Notre gamme</p>
          <h2 className="text-3xl sm:text-4xl text-accent">
            Nos <span className="italic text-primary">Best-sellers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Découvrez notre gamme complète de compléments alimentaires naturels et produits Green World.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 tracking-wide ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20 scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-highlight/50 border border-border/50 hover:scale-[1.02]"
              }`}
            >
              {cat === "Tous les produits" ? `${cat} (${products.length})` : cat}
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

// Simple scroll reveal hook inline
function useScrollRevealSimple() {
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
  return { ref, visible };
}

export default ProductsSection;
