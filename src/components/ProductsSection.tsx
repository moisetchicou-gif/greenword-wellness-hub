import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { products, categories, type Product, type Category } from "@/data/products";

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
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
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-primary/90 text-primary-foreground text-[10px] font-semibold px-2.5 py-1 rounded-full">{product.bv} BV</span>
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
  const [activeCategory, setActiveCategory] = useState<Category>("Compléments de santé");
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
            Découvrez notre gamme complète de compléments alimentaires naturels et produits Green World.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 tracking-wide ${
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
