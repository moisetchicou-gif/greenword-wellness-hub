import { useEffect, useRef, useState } from "react";
import bioPhoto1 from "@/assets/bio-photo-1.webp";
import bioPhoto2 from "@/assets/bio-photo-2.webp";
import bioPhoto3 from "@/assets/bio-photo-3.webp";
import bioPhoto4 from "@/assets/bio-photo-4.webp";

const BiographySection = () => {
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
    <section id="biographie" className="py-24 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-3xl sm:text-4xl font-display text-center mb-12">
          <span className="text-destructive">Présentation de l'entreprise</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Biographie */}
          <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
            <p className="text-lg font-semibold text-foreground">
              🌟 Monsieur ASSOGBA OCTAVE : LE LEADER QUI FAIT REVIVRE LA SANTÉ NATURELLE EN CÔTE D'IVOIRE ! 🌟
            </p>
            <p>
              Monsieur ASSOGBA OCTAVE, directeur visionnaire, passionné et d'une rare compétence, dirige Green World Prestige Koumassi Remblais avec une excellence qui inspire confiance et résultats concrets.
            </p>
            <p>
              Son engagement total, son expertise pointue et son écoute exceptionnelle font de lui la référence absolue pour transformer des vies grâce à la puissance de la nature.
            </p>
            <p>
              Fondée en 1994 par le Dr. Deming Li (génie de la science végétale formé à Cornell), Green World Prestige domine mondialement avec des produits 100 % naturels d'une efficacité redoutable :
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2"><span className="text-primary">•</span>Compléments alimentaires ultra-puissants qui explosent l'énergie, renforcent l'immunité, réparent le sommeil et boostent la vitalité en profondeur</li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span>Formules ciblées anti-fatigue, anti-stress, anti-douleurs articulaires et digestives – sans chimie, sans effets secondaires, juste des résultats qui marquent</li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span>Engrais biologiques Nutriplant qui font exploser les rendements agricoles de façon saine et durable</li>
            </ul>
            <p>
              Assez de la fatigue qui vous écrase, du stress qui vous vole vos jours, des douleurs qui vous empêchent de vivre pleinement !
            </p>
            <p>
              À Koumassi Remblais, Monsieur ASSOGBA OCTAVE et son équipe d'experts vous guident personnellement vers les solutions qui changent vraiment la donne :
            </p>
            <p className="italic text-foreground/80">
              Des milliers d'Ivoiriens témoignent déjà : « Je suis redevenu moi-même », « Mon énergie est revenue comme à 20 ans », « Plus de douleurs, plus de soucis digestifs ! »
            </p>
            <p>Ne laissez plus votre corps attendre.</p>
            <p className="font-semibold text-foreground">Choisissez l'excellence naturelle qui fait la différence depuis des décennies.</p>
            <p>Rejoignez la révolution Green World Prestige portée par un leader d'exception en Côte d'Ivoire.</p>
            <p className="text-foreground font-bold">📞 Contactez-nous MAINTENANT – votre transformation commence aujourd'hui !</p>
            <p className="text-foreground font-semibold">Votre corps, votre famille, votre avenir vous diront MERCI ! 💥💚</p>

            <div className="pt-4">
              <a
                href="#produits"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg"
              >
                Commander maintenant
              </a>
            </div>
          </div>

          {/* Photos */}
          <div className="grid grid-cols-2 gap-4">
            {[bioPhoto1, bioPhoto2, bioPhoto3, bioPhoto4].map((photo, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden shadow-lg border border-border transition-all duration-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <img src={photo} alt={`Green World Prestige - Photo ${i + 1}`} className="w-full h-full object-cover aspect-square" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiographySection;
