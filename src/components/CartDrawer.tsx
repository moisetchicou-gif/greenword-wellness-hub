import { useState } from "react";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { orderFormSchema, safeOpenExternal } from "@/lib/sanitize";
import { usePersistentState } from "@/hooks/usePersistentState";
import PersistenceConsent from "@/components/PersistenceConsent";
import logoWave from "@/assets/logo-wave.png";

const paymentMethods = [
  { name: "Wave", logo: logoWave },
];

type Step = "cart" | "info" | "payment" | "done";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, total } = useCart();
  const [step, setStep] = useState<Step>("cart");
  // Coordonnées de livraison : persistées 30 jours après opt-in (PersistenceConsent).
  // Validées défensivement à la lecture pour rejeter toute valeur corrompue dans localStorage.
  const [form, setForm] = usePersistentState<{
    nom: string;
    prenom: string;
    adresse: string;
    telephone: string;
    civilite: "M." | "Mme";
  }>(
    "gw.cart.checkout.form.v1",
    { nom: "", prenom: "", adresse: "", telephone: "", civilite: "M." },
    {
      validate: (raw): raw is { nom: string; prenom: string; adresse: string; telephone: string; civilite: "M." | "Mme" } => {
        if (!raw || typeof raw !== "object") return false;
        const r = raw as Record<string, unknown>;
        return (
          typeof r.nom === "string" &&
          typeof r.prenom === "string" &&
          typeof r.adresse === "string" &&
          typeof r.telephone === "string" &&
          (r.civilite === "M." || r.civilite === "Mme")
        );
      },
    },
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  // Numéro de commande affiché à l'utilisateur après paiement (généré juste avant l'ouverture de Wave/WhatsApp)
  const [orderRef, setOrderRef] = useState<string>("");
  // Le mode de paiement préféré est aussi mémorisé (mais reste révoquable).
  const [selectedPayment, setSelectedPayment] = usePersistentState<string | null>(
    "gw.cart.payment.method.v1",
    null,
    { validate: (raw): raw is string | null => raw === null || typeof raw === "string" },
  );

  const handleClose = () => {
    setIsOpen(false);
    if (step === "done") {
      setStep("cart");
      // On NE réinitialise PAS le formulaire : les coordonnées restent disponibles
      // pour la prochaine commande (objectif de la mémorisation).
      setFormErrors({});
    }
  };

  const handleProceedToInfo = () => setStep("info");

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const result = orderFormSchema.safeParse(form);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setForm({ ...form, ...result.data });
    setStep("payment");
  };

  const WAVE_PAYMENT_LINK = `https://pay.wave.com/m/M_ci_tXW_B6Tybbrb/c/ci/?amount=${total}`;

  // Construit le message WhatsApp pré-rempli pour la commande, en incluant le numéro de commande.
  const buildWhatsAppUrl = (refId: string) => {
    const hour = new Date().getHours();
    const greeting = hour < 18 ? "Bonjour" : "Bonsoir";
    const civ = form.civilite;
    const now = new Date();
    const dateStr = now.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

    const itemsList = items
      .map((i) => `• ${i.name} x${i.quantity} — ${(i.priceNum * i.quantity).toLocaleString("fr-FR")} FCFA`)
      .join("\n");

    const message = `${greeting}, j'ai passé une commande sur Green World 🌿 et j'ai effectué le paiement ✅

🔖 *N° de commande :* ${refId}
📅 *Date :* ${dateStr} à ${timeStr}

👤 *Mes informations :*
• *Civilité :* ${civ}
• *Nom :* ${form.nom}
• *Prénom :* ${form.prenom}
• *Téléphone :* ${form.telephone}
• *Adresse de livraison :* ${form.adresse}

📦 *Ma commande :*
${itemsList}

💰 *Total payé :* ${total.toLocaleString("fr-FR")} FCFA
💳 *J'ai payé via :* ${selectedPayment}

Merci de confirmer la réception de ma commande 🙏`;

    return `https://wa.me/2250715736370?text=${encodeURIComponent(message)}`;
  };

  // Génère un identifiant de commande unique (court, lisible).
  const generateOrderRef = () => `GW-${Date.now().toString(36).toUpperCase()}`;

  // Cas non-Wave : envoi direct du récapitulatif WhatsApp.
  const sendWhatsAppConfirmation = () => {
    const refId = generateOrderRef();
    setOrderRef(refId);
    safeOpenExternal(buildWhatsAppUrl(refId));
    clearCart();
    setStep("done");
  };

  const handlePay = () => {
    if (selectedPayment === "Wave") {
      // 1) Génère le numéro de commande
      const refId = generateOrderRef();
      setOrderRef(refId);
      // 2) Ouvre Wave dans un nouvel onglet pour le paiement
      safeOpenExternal(WAVE_PAYMENT_LINK);
      // 3) Redirige immédiatement le client vers WhatsApp (message pré-rempli avec le n° de commande).
      //    Les deux ouvertures sont déclenchées dans le même geste utilisateur => pas de blocage navigateur.
      safeOpenExternal(buildWhatsAppUrl(refId));
      clearCart();
      setStep("done");
      return;
    }

    // Pour les autres moyens de paiement, envoyer directement
    sendWhatsAppConfirmation();
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
              <PersistenceConsent
                description="Mémoriser mes coordonnées de livraison sur cet appareil pour ne pas avoir à les ressaisir lors de mes prochaines commandes (30 jours)."
              />
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Civilité</label>
                <div className="flex gap-3">
                  {(["M.", "Mme"] as const).map((c) => (
                    <button key={c} type="button" onClick={() => setForm({ ...form, civilite: c })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${form.civilite === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-primary/10"}`}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Nom</label>
                  <input required maxLength={50} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${formErrors.nom ? "border-destructive" : "border-border"}`} placeholder="Koné" />
                  {formErrors.nom && <p className="text-destructive text-[10px] mt-1">{formErrors.nom}</p>}
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Prénom</label>
                  <input required maxLength={50} value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${formErrors.prenom ? "border-destructive" : "border-border"}`} placeholder="Adjoua" />
                  {formErrors.prenom && <p className="text-destructive text-[10px] mt-1">{formErrors.prenom}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Adresse de livraison</label>
                <input required maxLength={200} value={form.adresse} onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${formErrors.adresse ? "border-destructive" : "border-border"}`} placeholder="Cocody, Abidjan" />
                {formErrors.adresse && <p className="text-destructive text-[10px] mt-1">{formErrors.adresse}</p>}
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Numéro de téléphone</label>
                <input required type="tel" maxLength={20} value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl border bg-secondary/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${formErrors.telephone ? "border-destructive" : "border-border"}`} placeholder="+225 07..." />
                {formErrors.telephone && <p className="text-destructive text-[10px] mt-1">{formErrors.telephone}</p>}
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
                {paymentMethods.map((m) => {
                  const isPaypal = m.name === "PayPal";
                  return (
                    <button key={m.name} onClick={() => { if (!isPaypal) setSelectedPayment(m.name); else setSelectedPayment("PayPal"); }}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${isPaypal ? "border-border opacity-50 cursor-not-allowed" : selectedPayment === m.name ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"}`}
                    >
                      <div className="w-12 h-10 flex items-center justify-center">
                        <img src={m.logo} alt={m.name} className={`max-w-full max-h-full object-contain ${isPaypal ? "grayscale" : ""}`} />
                      </div>
                      <span className="text-xs font-medium text-foreground">{m.name}</span>
                      {isPaypal && <span className="absolute top-1 right-1 text-[10px] bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full font-semibold">Indisponible</span>}
                    </button>
                  );
                })}
              </div>
              {selectedPayment === "PayPal" && (
                <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4 animate-in fade-in">
                  <span className="text-lg mt-0.5">⚠️</span>
                  <div>
                    <p className="text-sm font-semibold text-destructive">Paiement PayPal Indisponible</p>
                    <p className="text-xs text-destructive/80 mt-1">Ce moyen de paiement n'est pas disponible dans votre zone pour le moment. Veuillez sélectionner une autre méthode.</p>
                  </div>
                </div>
              )}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-foreground font-bold text-lg mb-4">
                  <span>Total à payer</span>
                  <span className="text-primary">{total.toLocaleString("fr-FR")} FCFA</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("info")} className="flex-1 border border-border text-foreground py-3 rounded-full font-semibold hover:bg-secondary/50 transition-colors">Retour</button>
                  <button onClick={handlePay} disabled={!selectedPayment || selectedPayment === "PayPal"}
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
              {orderRef && (
                <div className="mx-auto inline-flex flex-col items-center gap-1 px-4 py-3 rounded-2xl bg-secondary/60 border border-border/60">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Numéro de commande</span>
                  <span className="font-mono font-semibold text-foreground text-base">{orderRef}</span>
                </div>
              )}
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Wave et WhatsApp se sont ouverts dans un nouvel onglet. Finalisez votre paiement Wave puis envoyez le message WhatsApp pré-rempli pour confirmer votre commande.
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
