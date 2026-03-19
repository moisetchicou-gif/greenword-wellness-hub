import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import productBetaCarotene from "@/assets/product-beta-carotene.jpg";
import productLipidCare from "@/assets/product-lipid-care-tea.jpg";
import productKidney from "@/assets/product-kidney-tonifying.jpg";
import productProstacre from "@/assets/product-prostacre.jpg";
import productAPower from "@/assets/product-a-power.jpg";
import productAntiAging from "@/assets/product-anti-aging.jpg";
import productProSlimTea from "@/assets/product-pro-slim-tea.jpg";
import productGlucoblock from "@/assets/product-glucoblock.jpg";
import productZincAdulte from "@/assets/product-zinc-adulte.png";
import productCordyceps from "@/assets/product-cordyceps.jpg";
import productKudingTea from "@/assets/product-kuding-tea.jpg";
import productPinePollen from "@/assets/product-pine-pollen.jpg";

const products = [
  {
    id: 1,
    name: "Beta-Carotene",
    image: productBetaCarotene,
    benefits: ["Apport en vitamine A", "Prévient le cancer"],
    price: "14 300 FCFA",
  },
  {
    id: 2,
    name: "Lipid Care Tea",
    image: productLipidCare,
    benefits: ["Abaisse le taux de lipides", "Améliore l'endurance"],
    price: "10 000 FCFA",
  },
  {
    id: 3,
    name: "Kidney Tonifying",
    image: productKidney,
    benefits: ["Renforce les reins", "Optimise la détox rénale"],
    price: "21 400 FCFA",
  },
  {
    id: 4,
    name: "Prostacre",
    image: productProstacre,
    benefits: ["Prévient et soulage la prostate", "Diminue les envies fréquentes d'uriner"],
    price: "23 600 FCFA",
  },
  {
    id: 5,
    name: "A-Power Capsule",
    image: productAPower,
    benefits: ["Soutient le traitement du cancer", "Renforce l'immunité"],
    price: "28 600 FCFA",
  },
  {
    id: 6,
    name: "Anti-Aging",
    image: productAntiAging,
    benefits: ["Combat le vieillissement cellulaire", "Protège contre les radicaux libres"],
    price: "22 900 FCFA",
  },
  {
    id: 7,
    name: "Pro-Slim Tea",
    image: productProSlimTea,
    benefits: ["Accélère la perte de poids", "Élimine les toxines"],
    price: "8 600 FCFA",
  },
  {
    id: 8,
    name: "Glucoblock",
    image: productGlucoblock,
    benefits: ["Régule la glycémie", "Soutient la fonction pancréatique"],
    price: "12 900 FCFA",
  },
  {
    id: 9,
    name: "Zinc Adulte",
    image: productZincAdulte,
    benefits: ["Renforce le système immunitaire", "Favorise la santé de la peau"],
    price: "11 400 FCFA",
  },
  {
    id: 10,
    name: "Cordyceps",
    image: productCordyceps,
    benefits: ["Augmente l'énergie et la vitalité", "Régule le système immunitaire"],
    price: "14 300 FCFA",
  },
  {
    id: 11,
    name: "Kuding Tea",
    image: productKudingTea,
    benefits: ["Détoxifie l'organisme", "Réduit l'inflammation"],
    price: "8 600 FCFA",
  },
  {
    id: 12,
    name: "Pine Pollen",
    image: productPinePollen,
    benefits: ["Stimule la vitalité masculine", "Riche en nutriments essentiels"],
    price: "10 000 FCFA",
  },
];

const OrderModal = ({ product, onClose }: { product: typeof products[0]; onClose: () => void }) => {
  const [form, setForm] = useState({ nom: "", prenom: "", adresse: "", telephone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hour = new Date().getHours();
    const greeting = hour < 18 ? "Bonjour" : "Bonsoir";
    const message = `${greeting} ${form.prenom} ${form.nom} 👋,

Votre commande de *${product.name}* (${product.price}) a bien été prise en charge ✅

📍 *Adresse de livraison :* ${form.adresse}
📱 *Téléphone :* ${form.telephone}

🚚 Vous serez livré(e) dans un délai de *1 à 2 jours ouvrés*.

Merci pour votre confiance et bienvenue dans la famille Green World ! 🌿

_Pour toute question, n'hésitez pas à nous écrire ici._`;

    const whatsappUrl = `https://wa.me/2250715736370?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card text-foreground rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-fade-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-display text-foreground">Commande envoyée !</h3>
            <p className="text-muted-foreground text-sm">Votre commande a été transmise via WhatsApp. Nous vous contacterons très bientôt.</p>
            <button onClick={onClose} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              Fermer
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-display text-foreground mb-1">Commander {product.name}</h3>
            <p className="text-primary font-bold mb-5">{product.price}</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Nom</label>
                  <input
                    required
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Koné"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Prénom</label>
                  <input
                    required
                    value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Adjoua"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Adresse de livraison</label>
                <input
                  required
                  value={form.adresse}
                  onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Cocody, Abidjan"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Numéro de téléphone</label>
                <input
                  required
                  type="tel"
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="+225 07..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Confirmer via WhatsApp
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={`bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-display text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <ul className="space-y-1">
            {product.benefits.map((b) => (
              <li key={b} className="text-muted-foreground text-sm flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <p className="text-primary font-bold text-lg">{product.price}</p>
          <button
            onClick={() => setShowOrder(true)}
            className="w-full bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all mt-1 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Commander
          </button>
        </div>
      </div>
      {showOrder && <OrderModal product={product} onClose={() => setShowOrder(false)} />}
    </>
  );
};

const ProductsSection = () => {
  return (
    <section id="produits" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <p className="text-primary text-sm font-medium uppercase tracking-widest">Notre gamme</p>
          <h2 className="text-3xl sm:text-4xl text-foreground">
            Nos <span className="text-primary">Produits</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez notre gamme complète de compléments alimentaires naturels Green World.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
