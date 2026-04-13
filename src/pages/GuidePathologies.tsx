import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, Check, ChevronDown, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { pathologies, pathologyCategories, type PathologyCategory } from "@/data/pathologies";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { getProductSlug } from "@/lib/productUtils";

const ProductMini = ({ productId }: { productId: number }) => {
  const product = products.find((p) => p.id === productId);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, priceNum: product.priceNum, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-card rounded-xl border border-border/60 overflow-hidden hover-lift group transition-all duration-300">
      <Link to={`/produit/${getProductSlug(product)}`}>
        <div className="aspect-square bg-secondary/20 flex items-center justify-center p-3">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
      </Link>
      <div className="p-3 space-y-2">
        <Link to={`/produit/${getProductSlug(product)}`} className="text-xs font-display text-foreground group-hover:text-primary transition-colors block leading-tight">
          {product.name}
        </Link>
        <p className="text-xs font-semibold text-accent">{product.price}</p>
        <button
          onClick={handleAdd}
          className={`w-full px-3 py-1.5 rounded-full text-[10px] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 ${
            added
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground hover:shadow-md"
          }`}
        >
          {added ? <><Check className="w-3 h-3" />Ajouté</> : <><ShoppingCart className="w-3 h-3" />Ajouter</>}
        </button>
      </div>
    </div>
  );
};

const PathologyCard = ({ pathology }: { pathology: typeof pathologies[0] }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl border border-border/60 overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-start gap-4 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Heart className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base text-foreground">{pathology.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{pathology.description}</p>
          <p className="text-[10px] text-primary font-semibold mt-2">
            {pathology.productIds.length} produit{pathology.productIds.length > 1 ? "s" : ""} conseillé{pathology.productIds.length > 1 ? "s" : ""}
          </p>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-border/40">
          <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mt-4 mb-3">
            Compléments conseillés
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pathology.productIds.map((id) => (
              <ProductMini key={id} productId={id} />
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-4 italic">
            ⚠️ Ces compléments ne remplacent pas un avis médical. Consultez un professionnel de santé.
          </p>
        </div>
      )}
    </div>
  );
};

const GuidePathologies = () => {
  const [activeCategory, setActiveCategory] = useState<PathologyCategory | "Toutes">("Toutes");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = pathologies;
    if (activeCategory !== "Toutes") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim().length >= 2) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/#produits" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-3 h-3" />
              Retour à la boutique
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Guide santé</p>
            <h1 className="text-3xl sm:text-4xl font-display text-foreground">
              Produits par <span className="italic text-primary">Pathologie</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              Retrouvez les compléments alimentaires Green World conseillés pour chaque problème de santé.
              Ce guide est à titre informatif et ne remplace pas un avis médical.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une pathologie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("Toutes")}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === "Toutes"
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20 scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-highlight/50 border border-border/50"
              }`}
            >
              Toutes ({pathologies.length})
            </button>
            {pathologyCategories.map((cat) => {
              const count = pathologies.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20 scale-105"
                      : "bg-secondary text-secondary-foreground hover:bg-highlight/50 border border-border/50"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Pathology list */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filtered.map((p) => (
              <PathologyCard key={p.name} pathology={p} />
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-16 text-sm">
                Aucune pathologie trouvée pour cette recherche.
              </p>
            )}
          </div>

          {/* Disclaimer */}
          <div className="max-w-2xl mx-auto mt-16 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Avertissement :</strong> Les informations présentées sur cette page sont à titre informatif uniquement.
              Ces compléments alimentaires ne sont pas des médicaments et ne remplacent en aucun cas un diagnostic ou un traitement médical.
              Consultez toujours un professionnel de santé avant de commencer une cure.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
};

export default GuidePathologies;
