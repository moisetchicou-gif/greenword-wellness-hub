import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Check, Play, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import scannerImg from "@/assets/product-scanner-qrma.jpg";
import detoxImg from "@/assets/product-detoxin-pad.jpg";

interface Offer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceNum: number;
  oldPrice?: string;
  image: string;
  video?: string; // path under /public, e.g. "/videos/scanner.mp4"
  benefits: string[];
}

const offers: Offer[] = [
  {
    id: 1001,
    name: "Scanner QRMA",
    tagline: "Bilan de santé express",
    description: "Analyse rapide et complète de votre état de santé en quelques minutes grâce à la technologie QRMA.",
    price: "5 000 FCFA",
    priceNum: 5000,
    image: scannerImg,
    video: "/videos/scanner-qrma.mp4",
    benefits: ["Analyse multi-organes", "Résultats instantanés", "Indolore et non-invasif"],
  },
  {
    id: 1002,
    name: "Magic Detoxin Pad",
    tagline: "Détox en une nuit",
    description: "Patchs détoxifiants à appliquer sous les pieds pour éliminer les toxines pendant votre sommeil.",
    price: "5 000 FCFA",
    priceNum: 5000,
    image: detoxImg,
    video: "/videos/detox-pad.mp4",
    benefits: ["Élimine les toxines", "Améliore le sommeil", "Boost d'énergie"],
  },
];

const OfferCard = ({ offer, index }: { offer: Offer; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    addItem({ id: offer.id, name: offer.name, price: offer.price, priceNum: offer.priceNum, image: offer.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      ref={ref}
      className={`group relative bg-card rounded-3xl border-2 border-primary/20 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Badge offre d'appel */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        <Sparkles className="w-3.5 h-3.5" />
        OFFRE D'APPEL
      </div>

      <div className="grid sm:grid-cols-2 gap-0">
        {/* Visuel / Vidéo */}
        <div className="relative aspect-square sm:aspect-auto bg-white flex items-center justify-center p-6 overflow-hidden">
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
                  <span className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 ml-1" fill="currentColor" />
                  </span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <p className="text-primary text-[10px] font-semibold uppercase tracking-[0.2em]">{offer.tagline}</p>
            <h3 className="text-xl sm:text-2xl font-display text-accent leading-tight">{offer.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{offer.description}</p>
            <ul className="space-y-1.5 pt-1">
              {offer.benefits.map((b) => (
                <li key={b} className="text-foreground text-xs flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display text-primary">{offer.price}</span>
              <span className="text-xs text-muted-foreground">seulement</span>
            </div>
            <button
              onClick={handleAdd}
              className={`w-full px-5 py-3 rounded-full text-sm font-semibold active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2 ${
                added
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02]"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Ajouté !
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter au panier
                </>
              )}
            </button>
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

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {offers.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroOffers;
