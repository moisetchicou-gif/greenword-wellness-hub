import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import BiographySection from "@/components/BiographySection";
import PromoBanner2 from "@/components/PromoBanner2";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BiographySection />
      <ProductsSection />
      <FeaturesSection />
      <PromoBanner2 />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
