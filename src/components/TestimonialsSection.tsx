import { Star } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";

const testimonials = [
  {
    name: "Adjoua Koné",
    city: "Abidjan",
    text: "Depuis que j'utilise Greenword, je me sens pleine d'énergie chaque matin. Un produit vraiment exceptionnel que je recommande à toutes mes sœurs !",
    rating: 5,
    image: testimonial1,
  },
  {
    name: "Kouassi Yao",
    city: "Bouaké",
    text: "La qualité des ingrédients se ressent immédiatement. Toute ma famille l'utilise et nous voyons la différence au quotidien.",
    rating: 5,
    image: testimonial2,
  },
  {
    name: "Sékou Ouattara",
    city: "Yamoussoukro",
    text: "En tant que sportif, j'avais besoin d'un complément naturel et efficace. Greenword a dépassé toutes mes attentes !",
    rating: 5,
    image: testimonial3,
  },
  {
    name: "Awa Touré",
    city: "San-Pédro",
    text: "Je suis très satisfaite de ce produit. Mon bien-être général s'est nettement amélioré en seulement quelques semaines.",
    rating: 5,
    image: testimonial4,
  },
  {
    name: "Marie-Jeanne Brou",
    city: "Korhogo",
    text: "À mon âge, il est important de prendre soin de sa santé. Greenword m'aide à rester en forme et active. Merci infiniment !",
    rating: 5,
    image: testimonial5,
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
          <p className="text-muted-foreground">Des milliers d'Ivoiriens nous font confiance.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}, Côte d'Ivoire</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
