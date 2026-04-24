import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, Shield, Leaf, Award } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { getProductSlug } from "@/lib/productUtils";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => getProductSlug(p) === slug);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) return <Navigate to="/#produits" replace />;

  const siteUrl = "https://greenworldprestige.lovable.app";
  const slugStr = getProductSlug(product);
  const canonical = `${siteUrl}/produit/${slugStr}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.name} — complément alimentaire naturel Green World. ${product.benefits.join(". ")}.`,
    image: [product.image],
    category: product.category,
    brand: { "@type": "Brand", name: "Green World" },
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: "XOF",
      price: product.priceNum,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Green World" },
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Produits", item: `${siteUrl}/#produits` },
      { "@type": "ListItem", position: 3, name: product.category, item: `${siteUrl}/#produits` },
      { "@type": "ListItem", position: 4, name: product.name, item: canonical },
    ],
  };

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, priceNum: product.priceNum, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <SEO
        title={`${product.name} — ${product.category} ${product.price} | Green World`}
        description={`${product.name} : ${product.benefits.slice(0, 2).join(", ")}. Complément alimentaire naturel Green World à ${product.price}. Livraison en Côte d'Ivoire.`}
        canonical={canonical}
        image={product.image}
        type="product"
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/#produits" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-3 h-3" />
              Retour aux produits
            </Link>
          </div>

          {/* Product main */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-20">
            {/* Image */}
            <div className="bg-secondary/30 rounded-2xl p-8 flex items-center justify-center aspect-square border border-border/40">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain max-w-md"
              />
            </div>

            {/* Info */}
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {product.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-display text-foreground mt-2">
                  {product.name}
                </h1>
              </div>

              <p className="text-2xl font-display text-accent font-semibold">
                {product.price}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                  {product.bv} BV
                </span>
                <span>Points Business Value</span>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <h2 className="font-display text-base text-foreground">Bienfaits</h2>
                <ul className="space-y-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 font-bold">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAdd}
                className={`w-full sm:w-auto px-8 py-3 rounded-full text-sm font-semibold active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2 tracking-wide ${
                  added
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/20"
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

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  Certifié & Sécurisé
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Leaf className="w-4 h-4 text-primary" />
                  100% Naturel
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Award className="w-4 h-4 text-primary" />
                  Depuis 1994
                </div>
              </div>
            </div>
          </div>

          {/* Description tabs */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl border border-border p-6 space-y-3">
                <h3 className="font-display text-base text-foreground flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Conseils
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.conseils
                    ? product.conseils
                    : `${product.name} est un complément alimentaire naturel de la gamme Green World. Formulé à partir d'ingrédients 100% naturels, il est conçu pour soutenir votre bien-être au quotidien.`}
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 space-y-3">
                <h3 className="font-display text-base text-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Ingrédients
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Composé d'extraits naturels soigneusement sélectionnés.
                  Sans additifs chimiques, sans OGM, sans conservateurs artificiels.
                  Fabriqué selon les normes internationales GMP.
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 space-y-3">
                <h3 className="font-display text-base text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Posologie
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.posologie
                    ? product.posologie
                    : "Prendre 2 à 3 capsules par jour avec de l'eau tiède, de préférence avant les repas. Cure recommandée : 1 à 3 mois. Consulter un professionnel de santé avant utilisation."}
                </p>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div>
              <h2 className="text-xl font-display text-foreground mb-6">Produits similaires</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/produit/${getProductSlug(p)}`}
                    className="bg-card rounded-xl border border-border/60 overflow-hidden hover-lift group"
                  >
                    <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4 space-y-1.5">
                      <h3 className="text-sm font-display text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                      <p className="text-sm font-semibold text-accent">{p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
