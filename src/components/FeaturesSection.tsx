import { useEffect, useRef, useState } from "react";
import { products, type Product } from "@/data/products";

const BenefitCard = ({ product, index }: { product: Product; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`glass rounded-2xl overflow-hidden hover-lift group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center p-6 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
        <div className="absolute top-3 left-3">
          <span className="glass text-accent text-[10px] font-semibold px-2.5 py-1 rounded-full">{product.bv} BV</span>
        </div>
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-base font-display text-accent group-hover:text-primary transition-colors duration-300">{product.name}</h3>
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

const BENEFITS_PER_PAGE = 5;

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(BENEFITS_PER_PAGE);

  const displayed = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="bienfaits" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-highlight/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div ref={ref} className={`text-center mb-16 space-y-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Bienfaits</p>
          <h2 className="text-3xl sm:text-4xl text-accent">
            Pourquoi <span className="italic text-primary">nous choisir</span> ?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Chaque produit Green World Prestige est conçu pour cibler des besoins de santé spécifiques avec des ingrédients 100% naturels.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayed.map((product, i) => (
            <BenefitCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + BENEFITS_PER_PAGE)}
              className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground border border-border/50 text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 tracking-wide"
            >
              Voir plus ({products.length - visibleCount} restant{products.length - visibleCount > 1 ? "s" : ""})
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
