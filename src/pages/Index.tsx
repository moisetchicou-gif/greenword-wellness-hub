import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";

const IntroOffers = lazy(() => import("@/components/IntroOffers"));
const ProductsSection = lazy(() => import("@/components/ProductsSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const CtaSection = lazy(() => import("@/components/CtaSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
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
      <Suspense fallback={<SectionFallback />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CtaSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
      <CartDrawer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
};

export default Index;
