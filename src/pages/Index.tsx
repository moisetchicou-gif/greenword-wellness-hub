import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";

import TrustBar from "@/components/TrustBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import SEO from "@/components/SEO";

const IntroOffers = lazy(() => import("@/components/IntroOffers"));
const ProductsSection = lazy(() => import("@/components/ProductsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BusinessSection = lazy(() => import("@/components/BusinessSection"));
const CtaSection = lazy(() => import("@/components/CtaSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const siteUrl = "https://greenworldprestige.com";
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Green World Prestige",
    url: siteUrl,
    logo: `${siteUrl}/placeholder.svg`,
    description:
      "Green World Prestige propose des compléments alimentaires naturels et efficaces pour votre bien-être quotidien en Côte d'Ivoire.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CI",
      addressLocality: "Abidjan",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+2250715736370",
      contactType: "customer service",
      areaServed: "CI",
      availableLanguage: ["French"],
    },
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Green World Prestige",
    url: siteUrl,
    inLanguage: "fr-FR",
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Green World Prestige Côte d'Ivoire — Compléments alimentaires naturels"
        description="Découvrez plus de 80 compléments alimentaires 100% naturels Green World Prestige en Côte d'Ivoire. Scanner santé QRMA & Detox Pad à 5 000 FCFA. Livraison Abidjan."
        canonical={siteUrl + "/"}
        jsonLd={[orgJsonLd, websiteJsonLd]}
      />
      <Navbar />
      <HeroSection />
      <TrustBar />
      <div className="bg-accent border-y border-border/50 py-2.5">
        <p className="text-center text-xs sm:text-sm text-muted-foreground italic px-4">
          <strong>Note :</strong> Ces produits sont des compléments alimentaires et ne remplacent pas un avis médical.
        </p>
      </div>
      <Suspense fallback={<SectionFallback />}>
        <IntroOffers />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProductsSection />
      </Suspense>
      <HighlightsSection />
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BusinessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CtaSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
      <CookieBanner />
      <PathSelector />
    </div>
  );
};

export default Index;
