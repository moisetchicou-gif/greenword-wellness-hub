import { useState, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, Shield, Sparkles, Clock, Users, Star, Play, ChevronDown, CalendarCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingDialog from "@/components/BookingDialog";
import SEO from "@/components/SEO";
import { getOfferBySlug } from "@/data/offers";
import { useCart } from "@/hooks/useCart";

const OfferDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const offer = slug ? getOfferBySlug(slug) : undefined;
  const [added, setAdded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addItem } = useCart();

  if (!offer) return <Navigate to="/" replace />;

  const siteUrl = "https://greenworldprestige.lovable.app";
  const canonical = `${siteUrl}/offre/${offer.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: offer.name,
    description: offer.shortDescription,
    image: [offer.image],
    brand: { "@type": "Brand", name: "Green World" },
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: "XOF",
      price: offer.priceNum,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Green World" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        offer.testimonials.reduce((s, t) => s + t.rating, 0) / offer.testimonials.length
      ).toFixed(1),
      reviewCount: offer.testimonials.length,
    },
    review: offer.testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.text,
    })),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: offer.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: offer.name, item: canonical },
    ],
  };

  const handleAdd = () => {
    addItem({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      priceNum: offer.priceNum,
      image: offer.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-3 h-3" />
              Retour à l'accueil
            </Link>
          </div>

          {/* Hero produit */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">
            {/* Visuel / Vidéo */}
            <div className="relative bg-white rounded-2xl p-6 sm:p-10 flex items-center justify-center aspect-square border-2 border-primary/20 overflow-hidden">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                OFFRE D'APPEL
              </div>

              {showVideo && offer.video && !videoError ? (
                <video
                  ref={videoRef}
                  src={offer.video}
                  autoPlay
                  loop
                  controls
                  playsInline
                  className="w-full h-full object-cover rounded-xl"
                  onError={() => setVideoError(true)}
                />
              ) : (
                <>
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-full h-full object-contain max-w-md"
                    width={1024}
                    height={1024}
                  />
                  {offer.video && !videoError && (
                    <button
                      onClick={() => setShowVideo(true)}
                      aria-label={`Voir la vidéo de ${offer.name}`}
                      className="absolute inset-0 flex items-center justify-center bg-accent/0 hover:bg-accent/10 transition-all duration-300 group"
                    >
                      <span className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Infos */}
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {offer.tagline}
                </span>
                <h1 className="text-3xl md:text-4xl font-display text-foreground mt-2">
                  {offer.name}
                </h1>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                {offer.shortDescription}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2">
                {offer.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-xs bg-secondary/50 rounded-full px-3 py-2 border border-border/40">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{h}</span>
                  </div>
                ))}
              </div>

              {/* Prix */}
              <div className="flex items-baseline gap-3 pt-2">
                <p className="text-3xl font-display text-primary font-bold">{offer.price}</p>
                <span className="text-sm text-muted-foreground">seulement</span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex-1 sm:flex-none px-8 py-3.5 rounded-full text-sm font-semibold active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2 tracking-wide ${
                    added
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02]"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Ajouter au panier
                    </>
                  )}
                </button>
                <BookingDialog
                  offerName={offer.name}
                  trigger={
                    <button
                      type="button"
                      className="flex-1 sm:flex-none px-8 py-3.5 rounded-full text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2 tracking-wide"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Réserver une séance
                    </button>
                  }
                />
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  {offer.duration}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  Sans risque
                </div>
              </div>
            </div>
          </div>

          {/* Description longue */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-display text-foreground mb-4">À propos de {offer.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {offer.longDescription}
            </p>
          </section>

          {/* Bénéfices */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-display text-foreground mb-6">Les bienfaits</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {offer.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                  <span className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <p className="text-sm text-foreground">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comment ça marche */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-display text-foreground mb-6">Comment ça se passe ?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {offer.steps.map((step, i) => (
                <div key={step.title} className="bg-card border border-border rounded-xl p-5 space-y-3 relative">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-base text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pour qui */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6 sm:p-8 flex items-start gap-4">
              <span className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </span>
              <div className="space-y-2">
                <h3 className="font-display text-lg text-foreground">Pour qui ?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{offer.forWhom}</p>
              </div>
            </div>
          </section>

          {/* Témoignages */}
          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-display text-foreground mb-6 text-center">
              Ils en parlent
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {offer.testimonials.map((t) => (
                <div key={t.name} className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < t.rating ? "fill-primary text-primary" : "text-border"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed italic">"{t.text}"</p>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-display text-foreground mb-6">Questions fréquentes</h2>
            <div className="space-y-3">
              {offer.faq.map((item, i) => (
                <div key={item.q} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary/30 transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-medium text-sm text-foreground">{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <section className="max-w-3xl mx-auto">
            <div className="bg-accent text-accent-foreground rounded-2xl p-8 sm:p-10 text-center space-y-4">
              <h3 className="text-xl sm:text-2xl font-display">
                Prêt(e) à essayer <span className="italic text-primary">{offer.name}</span> ?
              </h3>
              <p className="text-sm opacity-80 max-w-md mx-auto">
                Profitez de notre offre découverte à seulement {offer.price}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-[0.98] transition-all duration-300"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter au panier — {offer.price}
                </button>
                <BookingDialog
                  offerName={offer.name}
                  trigger={
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-background text-foreground text-sm font-semibold hover:shadow-xl hover:scale-105 active:scale-[0.98] transition-all duration-300"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Réserver une séance
                    </button>
                  }
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
};

export default OfferDetail;
