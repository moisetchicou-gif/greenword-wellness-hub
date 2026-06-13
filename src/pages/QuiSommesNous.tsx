import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import SEO from "@/components/SEO";

const QuiSommesNous = () => {
  const siteUrl = "https://greenworldprestige.com";
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Qui sommes-nous — Green World Prestige",
    url: siteUrl + "/qui-sommes-nous",
    description:
      "Découvrez Green World Prestige, votre partenaire santé naturel en Côte d'Ivoire. Compléments alimentaires 100% naturels depuis 1994.",
    mainEntity: {
      "@type": "Organization",
      name: "Green World Prestige",
      url: siteUrl,
      description:
        "Green World Prestige accompagne les familles de Côte d'Ivoire vers une meilleure santé grâce à des compléments alimentaires 100% naturels.",
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
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Qui sommes-nous — Green World Prestige Côte d'Ivoire"
        description="Découvrez l'histoire de Green World Prestige, votre partenaire santé naturel en Côte d'Ivoire. Compléments alimentaires 100% naturels depuis 1994."
        canonical={siteUrl + "/qui-sommes-nous"}
        jsonLd={[orgJsonLd]}
      />
      <Navbar />
      <div className="pt-20 sm:pt-24" />
      <AboutSection />
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
};

export default QuiSommesNous;
