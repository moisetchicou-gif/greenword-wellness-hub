import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PromoSlider from "@/components/PromoSlider";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <PromoSlider />
      <ProductsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
};

export default Index;
