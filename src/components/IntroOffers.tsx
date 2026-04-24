import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Play, Sparkles, CalendarCheck } from "lucide-react";
import { offers, type Offer } from "@/data/offers";
import BookingDialog from "@/components/BookingDialog";

const OfferCard = ({ offer, index }: { offer: Offer; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);


  return (
    <div
      ref={ref}
      className={`group relative bg-card rounded-2xl sm:rounded-3xl border-2 border-primary/20 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 ease-premium hover:-translate-y-1 flex flex-col h-full ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Badge offre spéciale */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex items-center gap-1 sm:gap-1.5 bg-primary text-primary-foreground px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-bold shadow-lg">
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline">OFFRE SPÉCIALE</span>
        <span className="sm:hidden">OFFRE</span>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-0 h-full">
        {/* Visuel / Vidéo */}
        <div className="relative aspect-square md:aspect-auto bg-white flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {showVideo && offer.video && !videoError ? (
            <video
              ref={videoRef}
              src={offer.video}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover rounded-xl"
              onError={() => setVideoError(true)}
            />
          ) : (
            <>
              <img
                src={offer.image}
                alt={offer.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              {offer.video && !videoError && (
                <button
                  onClick={() => setShowVideo(true)}
                  aria-label={`Voir la vidéo de ${offer.name}`}
                  className="absolute inset-0 flex items-center justify-center bg-accent/0 hover:bg-accent/20 transition-all duration-300 group/play"
                >
                  <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 sm:w-7 sm:h-7 ml-0.5 sm:ml-1" fill="currentColor" />
                  </span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Contenu */}
        <div className="p-3 sm:p-6 md:p-7 flex flex-col justify-between gap-3 sm:gap-4 flex-1">
          <div className="space-y-2 sm:space-y-3">
            <p className="text-primary text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] line-clamp-1">{offer.tagline}</p>
            <Link
              to={`/offre/${offer.slug}`}
              className="text-sm sm:text-xl md:text-2xl font-display text-accent leading-tight hover:text-primary transition-colors block line-clamp-2"
            >
              {offer.name}
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">{offer.shortDescription}</p>
            <ul className="space-y-1 sm:space-y-1.5 pt-1 hidden sm:block">
              {offer.benefits.slice(0, 3).map((b) => (
                <li key={b} className="text-foreground text-xs flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
            <div>
              <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-lg sm:text-2xl font-bold font-display text-primary">{offer.price}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">seulement</span>
              </div>
              <p className="mt-1 inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-muted-foreground italic">
                <CalendarCheck className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="line-clamp-1">Sur rendez-vous uniquement</span>
              </p>
            </div>
            <BookingDialog
              offerName={offer.name}
              trigger={
                <button
                  type="button"
                  className="w-full px-2 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2"
                >
                  <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">Réserver</span>
                  <span className="hidden sm:inline">ma séance</span>
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const IntroOffers = () => {
  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-secondary/40 via-background to-background relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-3">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">À découvrir absolument</p>
          <h2 className="text-3xl sm:text-4xl font-display text-accent">
            Nos offres <span className="italic text-primary">à 5 000 FCFA</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Découvrez nos deux solutions d'entrée pour faire le premier pas vers une meilleure santé.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto items-stretch">
          {offers.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroOffers;
