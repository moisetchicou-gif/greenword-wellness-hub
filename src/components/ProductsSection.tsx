import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { products, categories, type Product, type Category } from "@/data/products";
import { getProductSlug } from "@/lib/productUtils";
import ProductImage from "@/components/ProductImage";
import ProductViewersBadge from "@/components/ProductViewersBadge";

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
      className={`bg-card rounded-2xl border border-border/60 overflow-hidden group card-gradient-border flex flex-col h-full reveal-warm ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms`, animationDelay: `${index * 80 + 400}ms` }}
    >
      <Link
        to={`/produit/${getProductSlug(product)}`}
        aria-label={`Voir les détails de ${product.name}`}
        className="block bg-secondary/30 p-3 sm:p-6 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 group/img"
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          aspect="1 / 1"
          priority={index < 4}
          imgClassName="group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-premium p-1 sm:p-2"
        />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5 z-10 items-start">
          <span className="badge-contrast text-[9px] sm:text-[10px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">{product.bv} BV</span>
          {product.discount && (
            <span className="text-[9px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-coral-foreground shadow-md shadow-coral/30 animate-pulse-soft" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--coral)), hsl(14 85% 52%))" }}>
              −{product.discount}%
            </span>
          )}
        </div>
        {/* Hover overlay corail/gold */}
        <div className="absolute inset-0 bg-gradient-to-tr from-coral/[0.08] via-transparent to-gold/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Link>
      <div className="p-3 sm:p-5 flex flex-col flex-1 gap-2 sm:gap-3">
        <Link
          to={`/produit/${getProductSlug(product)}`}
          className="text-sm sm:text-base font-display text-accent group-hover:text-coral transition-colors duration-300 block line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] leading-snug"
          title={product.name}
        >
          {product.name}
        </Link>
        <ul className="space-y-1 hidden sm:block">
          {product.benefits.slice(0, 3).map((b) => (
            <li key={b} className="text-muted-foreground text-xs flex items-start gap-2">
              <span className="text-primary mt-0.5 text-sm shrink-0">✓</span>
              <span className="line-clamp-1">{b}</span>
            </li>
          ))}
        </ul>
        <p className="text-accent font-semibold text-base sm:text-lg font-display mt-auto">{product.price}</p>
        <button
          onClick={handleAdd}
          className={`w-full px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium active:scale-[0.95] transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 tracking-wide shine-on-hover ${
            added
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "btn-warm"
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Ajouté !</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="truncate">Ajouter</span>
              <span className="hidden sm:inline">au panier</span>
            </>
          )}
        </button>
        <ProductViewersBadge productId={String(product.id)} className="pt-1" />
      </div>
    </div>
  );
};

const PRODUCTS_PER_PAGE = 20;

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


  return (
    <section id="produits" className="py-24 bg-section-warm relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-coral-soft/40 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div ref={ref} className={`text-center mb-12 space-y-4 reveal-warm-section ${visible ? "is-visible" : ""}`}>
          <p className="text-coral text-xs font-semibold uppercase tracking-[0.2em]">Notre gamme</p>
          <h2 className="text-3xl sm:text-4xl text-accent">
            Nos <span className="italic text-gradient-warm">Best-sellers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Découvrez notre gamme complète de compléments alimentaires naturels et produits Green World Prestige.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5 auto-rows-fr items-stretch">
          {displayed.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-16 text-sm">
              Produits bientôt disponibles dans cette catégorie.
            </p>
          )}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)}
              className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground border border-border/50 text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 tracking-wide"
            >
              Voir plus ({filtered.length - visibleCount} restant{filtered.length - visibleCount > 1 ? "s" : ""})
            </button>
          </div>
        )}

        {/* CTA Guide Santé */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-r from-coral/10 via-gold/10 to-primary/10 rounded-2xl border border-coral/25 p-8 sm:p-10 text-center space-y-4 hover-warm-glow">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-coral/20 to-gold/20 flex items-center justify-center mx-auto animate-pulse-soft">
              <span className="text-2xl">🩺</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display text-foreground">
              Vous avez un <span className="text-gradient-warm italic">problème de santé</span> ?
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
              Consultez notre guide complet pour trouver les compléments alimentaires adaptés à votre pathologie.
            </p>
            <Link
              to="/guide-pathologies"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full btn-warm shine-on-hover text-sm font-semibold"
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
