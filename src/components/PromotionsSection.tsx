import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Check, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { products, type Product } from "@/data/products";
import { getProductSlug } from "@/lib/productUtils";
import ProductImage from "@/components/ProductImage";

const PromoCard = ({ product, index }: { product: Product; index: number }) => {
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
      className={`bg-card rounded-2xl border border-coral/30 overflow-hidden group card-gradient-border flex flex-col h-full reveal-warm ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms`, animationDelay: `${index * 80 + 200}ms` }}
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
          imgClassName="group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-premium p-1 sm:p-2"
        />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5 z-10 items-start">
          <span
            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full text-coral-foreground shadow-md shadow-coral/30 animate-pulse-soft"
            style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--coral)), hsl(14 85% 52%))" }}
          >
            <Flame className="w-3 h-3" />
            −{product.discount}%
          </span>
          <span className="badge-contrast text-[9px] sm:text-[10px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
            {product.bv} BV
          </span>
        </div>
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

        <div className="mt-auto flex items-baseline gap-2 flex-wrap">
          <p className="text-coral font-bold text-base sm:text-lg font-display">{product.price}</p>
          {product.oldPrice && (
            <span className="text-muted-foreground text-xs sm:text-sm line-through decoration-coral/70 decoration-[1.5px]">
              {product.oldPrice}
            </span>
          )}
        </div>

        {product.oldPriceNum && (
          <p className="text-[11px] sm:text-xs text-primary font-semibold">
            Vous économisez {(product.oldPriceNum - product.priceNum).toLocaleString("fr-FR")} FCFA
          </p>
        )}

        <button
          onClick={handleAdd}
          className={`w-full px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium active:scale-[0.95] transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 tracking-wide shine-on-hover ${
            added ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "btn-warm"
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
              <span className="truncate">Profiter de l'offre</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const PromotionsSection = () => {
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

  // Filtre les produits en promo et trie par % de réduction décroissant
  const promoProducts = products
    .filter((p) => typeof p.discount === "number" && p.discount > 0)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));

  if (promoProducts.length === 0) return null;

  return (
    <section
      id="promotions"
      aria-labelledby="promotions-heading"
      className="relative overflow-hidden py-20 bg-section-warm-strong"
    >
      {/* Halos décoratifs */}
      <div className="absolute -top-20 left-1/4 w-80 h-80 rounded-full bg-coral/20 blur-[100px] pointer-events-none animate-pulse-soft" />
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-gold/20 blur-[100px] pointer-events-none animate-pulse-soft" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div
          ref={ref}
          className={`text-center mb-12 space-y-4 transition-all duration-1000 ease-premium ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-coral-foreground text-xs font-bold uppercase tracking-widest shadow-lg shadow-coral/30" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--coral)), hsl(var(--gold)))" }}>
            <Flame className="w-3.5 h-3.5 animate-bounce-gentle" />
            Offres limitées
          </div>
          <h2
            id="promotions-heading"
            className="text-3xl sm:text-4xl font-display text-accent leading-tight"
          >
            Nos <span className="italic text-gradient-warm">Promotions</span> du moment
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Profitez de réductions exclusives sur une sélection de nos compléments naturels les plus prisés.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5 auto-rows-fr items-stretch">
          {promoProducts.map((product, i) => (
            <PromoCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#produits"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-card border border-coral/40 text-accent text-sm font-medium hover:bg-coral/10 hover:border-coral hover:scale-[1.03] transition-all duration-300"
          >
            Voir tous nos produits
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
