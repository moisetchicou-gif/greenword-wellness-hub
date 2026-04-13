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
      className={`bg-card rounded-2xl border border-border/60 overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-premium hover:-translate-y-1.5 ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-[2px]"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="aspect-square bg-secondary/30 flex items-center justify-center p-6 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" loading="lazy" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="glass text-accent text-[10px] font-semibold px-2.5 py-1 rounded-full">{product.bv} BV</span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          className={`w-full px-6 py-2.5 rounded-full text-sm font-medium active:scale-[0.95] transition-all duration-300 mt-1 flex items-center justify-center gap-2 tracking-wide ${
            added
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02]"
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

const PRODUCTS_PER_PAGE = 10;

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous les produits");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const filtered = activeCategory === "Tous les produits" ? products : products.filter((p) => p.category === activeCategory);
  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const { ref, visible } = useScrollRevealSimple();

  // Reset visible count when category changes
  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setVisibleCount(PRODUCTS_PER_PAGE);
  };


        {/* CTA Guide Santé */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8 sm:p-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto">
              <span className="text-2xl">🩺</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display text-foreground">
              Vous avez un <span className="text-primary italic">problème de santé</span> ?
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
              Consultez notre guide complet pour trouver les compléments alimentaires adaptés à votre pathologie.
            </p>
            <Link
              to="/guide-pathologies"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-[0.98] transition-all duration-300"
            >
              <span className="text-base">📋</span>
              Guide Santé par Pathologie
            </Link>
          </div>
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
