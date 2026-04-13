import { useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import slider1 from "@/assets/slider-1.jpg";
import slider2 from "@/assets/slider-2.jpg";
import slider3 from "@/assets/slider-3.jpg";
import slider4 from "@/assets/slider-4.jpg";
import slider5 from "@/assets/slider-5.jpg";
import slider6 from "@/assets/slider-6.jpg";
import slider7 from "@/assets/slider-7.jpg";
import slider8 from "@/assets/slider-8.jpg";
import slider9 from "@/assets/slider-9.jpg";
import slider10 from "@/assets/slider-10.jpg";

const slides = [slider1, slider2, slider3, slider4, slider5, slider6, slider7, slider8, slider9, slider10];

const PromoSlider = memo(() => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((c) => (c + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-3">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Bilan QRMA</p>
          <h2 className="text-3xl sm:text-4xl text-accent">
            Analyseur Quantique <span className="italic text-primary">Magnétique</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Découvrez votre état de santé en 1 min 30s grâce au scan 3D — 45 examens pour seulement 5 000 FCFA.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-accent/10 border border-border/40 will-change-contents">
            {slides.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Slide ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-out will-change-[opacity,transform] ${
                  i === current
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.02]"
                }`}
              />
            ))}

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-accent hover:bg-background active:scale-90 transition-all duration-200"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-accent hover:bg-background active:scale-90 transition-all duration-200"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrent(i);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-6" : "bg-muted-foreground/30 w-2.5"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

PromoSlider.displayName = "PromoSlider";

export default PromoSlider;
