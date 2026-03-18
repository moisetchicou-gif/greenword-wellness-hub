import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PromoBanner from "@/components/PromoBanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import PromoBanner2 from "@/components/PromoBanner2";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <PromoBanner />
      <TestimonialsSection />
      <PromoBanner2 />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
