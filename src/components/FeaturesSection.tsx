import { Leaf, ShieldCheck, Dna, Droplets } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Ingrédients Bio",
    description: "Nos formules sont composées à 100% d'extraits naturels certifiés biologiques.",
  },
  {
    icon: ShieldCheck,
    title: "Qualité Certifiée",
    description: "Chaque lot est testé en laboratoire pour garantir pureté et efficacité.",
  },
  {
    icon: Dna,
    title: "Science & Nature",
    description: "Des formulations validées par la recherche scientifique moderne.",
  },
  {
    icon: Droplets,
    title: "Absorption Optimale",
    description: "Technologie d'encapsulation pour une biodisponibilité maximale.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="bienfaits" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl text-foreground">
            Pourquoi choisir <span className="text-primary">Greenword</span> ?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Une approche holistique de la santé, alliant tradition botanique et innovation scientifique.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-display text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
