import { useState } from "react";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import logoOrangeMoney from "@/assets/logo-orange-money.png";
import logoWave from "@/assets/logo-wave.png";
import logoMtn from "@/assets/logo-mtn.png";
import logoMoov from "@/assets/logo-moov.jpg";
import logoPaypal from "@/assets/logo-paypal.png";

const paymentMethods = [
  { name: "Orange Money", logo: logoOrangeMoney },
  { name: "Wave", logo: logoWave },
  { name: "MTN Money", logo: logoMtn },
  { name: "Moov Money", logo: logoMoov },
  { name: "PayPal", logo: logoPaypal },
];

type Step = "cart" | "info" | "payment" | "done";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, total } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState({ nom: "", prenom: "", adresse: "", telephone: "", civilite: "M." });
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    if (step === "done") {
      setStep("cart");
      setForm({ nom: "", prenom: "", adresse: "", telephone: "", civilite: "M." });
      setSelectedPayment(null);
    }
  };

  const handleProceedToInfo = () => setStep("info");

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePay = () => {
    const hour = new Date().getHours();
    const greeting = hour < 18 ? "Bonjour" : "Bonsoir";
    const civ = form.civilite;

    // Message client
    const itemsList = items.map((i) => `• ${i.name} x${i.quantity} — ${(i.priceNum * i.quantity).toLocaleString("fr-FR")} FCFA`).join("\n");

    const clientMsg = `${greeting} ${civ} ${form.prenom} ${form.nom} 👋,

Nous avons bien reçu votre commande et elle est en cours de traitement ✅

📦 *Récapitulatif :*
${itemsList}

💰 *Total :* ${total.toLocaleString("fr-FR")} FCFA
💳 *Paiement :* ${selectedPayment}

📍 *Adresse :* ${form.adresse}
📱 *Téléphone :* ${form.telephone}

🚚 Vous serez livré(e) dans un délai de *1 à 2 jours ouvrés*.

Merci pour votre confiance et bienvenue dans la famille Green World ! 🌿

_Pour toute question, n'hésitez pas à nous écrire ici._`;

    // Message pour le numéro WhatsApp de l'entreprise avec les infos client + référence paiement
    const refId = `GW-${Date.now().toString(36).toUpperCase()}`;
    const bizMsg = `📋 *Nouvelle commande - Réf : ${refId}*

👤 *Client :* ${civ} ${form.prenom} ${form.nom}
📱 *Tél :* ${form.telephone}
📍 *Adresse :* ${form.adresse}

📦 *Produits :*
${itemsList}

💰 *Total :* ${total.toLocaleString("fr-FR")} FCFA
💳 *Moyen de paiement :* ${selectedPayment}
🔖 *Réf. paiement :* ${refId}`;

    // Envoyer le message client via WhatsApp
    const whatsappUrl = `https://wa.me/2250715736370?text=${encodeURIComponent(clientMsg)}`;
    window.open(whatsappUrl, "_blank");

    // Ouvrir un second message pour l'entreprise (info)
    setTimeout(() => {
      const bizUrl = `https://wa.me/2250715736370?text=${encodeURIComponent(bizMsg)}`;
      window.open(bizUrl, "_blank");
    }, 1500);

    clearCart();
    setStep("done");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={handleClose}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-card h-full shadow-2xl animate-slide-in-right overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="font-display text-lg text-foreground flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            {step === "cart" && "Mon Panier"}
            {step === "info" && "Vos informations"}
            {step === "payment" && "Paiement"}
            {step === "done" && "Confirmation"}
          </h2>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {step === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                  <p className="text-muted-foreground">Votre panier est vide</p>
                  <a href="#produits" onClick={handleClose} className="text-primary text-sm font-medium hover:underline">Voir les produits</a>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 bg-secondary/30 rounded-xl p-3">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg bg-background" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-primary text-sm font-bold">{item.price}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary/10 transition-colors active:scale-90">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary/10 transition-colors active:scale-90">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex justify-between text-foreground font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{total.toLocaleString("fr-FR")} FCFA</span>
                    </div>
                    <button onClick={handleProceedToInfo} className="w-full bg-primary text-primary-foreground py-3 rounded-full font-semibold mt-4 hover:opacity-90 active:scale-[0.97] transition-all">
                      Continuer
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {step === "info" && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Civilité</label>
                <div className="flex gap-3">
                  {["M.", "Mme"].map((c) => (
                    <button key={c} type="button" onClick={() => setForm({ ...form, civilite: c })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${form.civilite === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-primary/10"}`}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Nom</label>
                  <input required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Koné" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Prénom</label>
                  <input required value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Adjoua" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Adresse de livraison</label>
                <input required value={form.adresse} onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Cocody, Abidjan" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Numéro de téléphone</label>
                <input required type="tel" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+225 07..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep("cart")} className="flex-1 border border-border text-foreground py-3 rounded-full font-semibold hover:bg-secondary/50 transition-colors">Retour</button>
                <button type="submit" className="flex-1 bg-primary text-primary-foreground py-3 rounded-full font-semibold hover:opacity-90 active:scale-[0.97] transition-all">Continuer</button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">Choisissez votre moyen de paiement :</p>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((m) => (
                  <button key={m.name} onClick={() => setSelectedPayment(m.name)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedPayment === m.name ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"}`}
                  >
                    <div className="w-12 h-10 flex items-center justify-center">
                      <img src={m.logo} alt={m.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{m.name}</span>
                  </button>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-foreground font-bold text-lg mb-4">
                  <span>Total à payer</span>
                  <span className="text-primary">{total.toLocaleString("fr-FR")} FCFA</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("info")} className="flex-1 border border-border text-foreground py-3 rounded-full font-semibold hover:bg-secondary/50 transition-colors">Retour</button>
                  <button onClick={handlePay} disabled={!selectedPayment}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-full font-semibold hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Payer maintenant
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-display text-foreground">Commande confirmée !</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Votre commande a été transmise avec succès. Vous recevrez un message de confirmation sur WhatsApp.
              </p>
              <button onClick={handleClose} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
