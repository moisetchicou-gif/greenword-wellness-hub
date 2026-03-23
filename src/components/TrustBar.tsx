import { Leaf, Shield, FlaskConical, Award } from "lucide-react";

const trustItems = [
  { icon: Leaf, label: "100% Naturel", desc: "Ingrédients biologiques" },
  { icon: Shield, label: "Certifié Bio", desc: "Normes internationales" },
  { icon: FlaskConical, label: "Testé cliniquement", desc: "Efficacité prouvée" },
  { icon: Award, label: "Qualité premium", desc: "Depuis 1994" },
];

const TrustBar = () => (
  <section className="py-12 bg-secondary/50 border-y border-border/50">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-accent">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
