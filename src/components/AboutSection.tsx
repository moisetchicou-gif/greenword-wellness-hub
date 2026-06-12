import { useEffect, useRef, useState } from "react";
import { Leaf, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import { warm, warmCx } from "@/lib/warmTheme";

const values = [
  {
    icon: Leaf,
    title: "100 % Naturel",
    text: "Des compléments issus de la nature, sans chimie ni effets secondaires.",
  },
  {
    icon: ShieldCheck,
    title: "Qualité certifiée",
    text: "Des produits Green World rigoureusement contrôlés et reconnus mondialement.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement",
    text: "Une équipe à votre écoute pour vous guider vers les bonnes solutions.",
  },
  {
    icon: Sparkles,
    title: "Résultats concrets",
    text: "Des milliers d'Ivoiriens témoignent déjà des bienfaits au quotidien.",
  },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="qui-sommes-nous" className={warmCx(warm.section("soft"), "py-20 sm:py-24 scroll-mt-20")}>
      <div className={warm.blob.coral + " w-72 h-72 -top-10 -left-10"} />
      <div className={warm.blob.gold + " w-72 h-72 bottom-0 right-0"} />

      <div
        ref={ref}
        className={`container relative mx-auto px-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className={warm.eyebrow}>Notre histoire</span>
          <h2 className={warmCx(warm.heading(2), "mt-3")}>
            Qui <span className={warm.textGradient}>sommes-nous</span> ?
          </h2>
          <p className={warmCx(warm.lead, "mt-5")}>
            Green World Prestige accompagne les familles de Côte d'Ivoire vers une
            meilleure santé grâce à des compléments alimentaires 100 % naturels.
            Depuis sa création par le Dr. Deming Li, Green World s'impose comme une
            référence mondiale du bien-être naturel. À Abidjan, notre équipe met son
            expertise et son écoute au service de votre vitalité.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className={warmCx(warm.card("interactive"), "p-6 text-center")}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={warmCx(warm.iconWrap("mixed", "lg"), "mx-auto mb-4")}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg text-accent mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a href="/#produits" className={warm.button("primary", "lg")}>
            Découvrir nos produits
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
