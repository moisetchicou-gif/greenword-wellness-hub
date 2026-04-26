import { Leaf, Shield, FlaskConical, Award } from "lucide-react";
import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";
import LiveVisitorsBadge from "@/components/LiveVisitorsBadge";

const trustItems = [
  { icon: Leaf, label: "100% Naturel", desc: "Ingrédients biologiques", count: 100, suffix: "%" },
  { icon: Shield, label: "Certifié Bio", desc: "Normes internationales", count: 30, suffix: "+ ans" },
  { icon: FlaskConical, label: "Testé cliniquement", desc: "Efficacité prouvée", count: 80, suffix: "+" },
  { icon: Award, label: "Qualité premium", desc: "Depuis 1994", count: 50, suffix: "k+" },
];

const TrustItem = ({ item, index }: { item: typeof trustItems[0]; index: number }) => {
  const { ref, visible } = useScrollReveal(0.2);
  const count = useCountUp(item.count, 2000, visible);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 justify-center transition-all duration-700 ease-premium ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-[2px]"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-coral/15 to-gold/15 flex items-center justify-center shrink-0 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-coral/20 hover:rotate-6">
        <item.icon className="w-5 h-5 text-coral" />
      </div>
      <div>
        <p className="text-xl font-display font-bold text-accent">{count}{item.suffix}</p>
        <p className="text-xs text-muted-foreground">{item.desc}</p>
      </div>
    </div>
  );
};

const TrustBar = () => (
  <section className="py-14 bg-section-warm border-y border-coral/15 relative overflow-hidden">
    <div className="absolute inset-0 shimmer-bg animate-shimmer opacity-20" />
    <div className="container mx-auto px-6 relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {trustItems.map((item, i) => (
          <TrustItem key={item.label} item={item} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
