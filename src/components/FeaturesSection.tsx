import { useEffect, useRef, useState } from "react";
import { products, type Product } from "@/data/products";

const BenefitCard = ({ product, index }: { product: Product; index: number }) => {
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
      className={`bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center p-6 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute top-3 left-3">
          <span className="bg-primary/90 text-primary-foreground text-[10px] font-semibold px-2.5 py-1 rounded-full">{product.bv} BV</span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-base font-display text-accent">{product.name}</h3>
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

const FeaturesSection = () => {
  return (
    <section id="bienfaits" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Bienfaits</p>
          <h2 className="text-3xl sm:text-4xl text-accent">
            Pourquoi <span className="italic text-primary">nous choisir</span> ?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Chaque produit Green World est conçu pour cibler des besoins de santé spécifiques avec des ingrédients 100% naturels.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <BenefitCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
