import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie M.",
    text: "Depuis que j'utilise Greenword, je me sens pleine d'énergie. Un produit vraiment exceptionnel !",
    rating: 5,
  },
  {
    name: "Marc D.",
    text: "La qualité des ingrédients se ressent immédiatement. Je le recommande à toute ma famille.",
    rating: 5,
  },
  {
    name: "Amina K.",
    text: "Enfin un complément naturel qui tient ses promesses. Mon bien-être s'est nettement amélioré.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="avis" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl text-foreground">
            Ce que disent nos <span className="text-primary">clients</span>
          </h2>
          <p className="text-muted-foreground">Des milliers de personnes nous font confiance.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed italic">"{t.text}"</p>
              <p className="text-sm font-semibold text-primary">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
