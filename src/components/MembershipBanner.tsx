import { useState } from "react";
import {
  Crown,
  BadgePercent,
  Star,
  Wallet,
  IdCard,
  Gift,
  TrendingUp,
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { warm, warmCx } from "@/lib/warmTheme";

const WHATSAPP_NUMBER = "2250707089631";
const membershipWaLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Bonjour, je souhaite devenir membre de Green World Prestige et profiter des -20% sur tous les produits. Pouvez-vous m'expliquer les démarches d'adhésion ?",
)}`;

const advantages = [
  {
    icon: BadgePercent,
    title: "−20 % sur chaque produit",
    desc: "Une réduction immédiate et permanente sur tout le catalogue, à chaque commande.",
    accent: "coral" as const,
  },
  {
    icon: TrendingUp,
    title: "Gagnez 20 % de vos points (BV)",
    desc: "Dès 3 étoiles atteintes (147 500 F d'achats), la société vous reverse 20 % de vos points chaque mois.",
    accent: "gold" as const,
  },
  {
    icon: Wallet,
    title: "Payé directement par la société",
    desc: "Vos gains vous sont versés en fin de mois, selon vos efforts. Un vrai revenu complémentaire.",
    accent: "primary" as const,
  },
  {
    icon: Gift,
    title: "Catalogue + carte membre offerts",
    desc: "Vous recevez le catalogue officiel des produits et votre carte de membre partenaire.",
    accent: "mixed" as const,
  },
];

const steps = [
  {
    icon: IdCard,
    title: "Votre pièce d'identité",
    desc: "CNI, permis de conduire ou passeport. Vous n'avez aucun document ? Nous vous aidons à rejoindre l'entreprise.",
  },
  {
    icon: Wallet,
    title: "Frais d'adhésion : 10 000 F",
    desc: "Une seule fois. Vous recevez immédiatement le catalogue produits et votre carte membre officielle.",
  },
  {
    icon: Crown,
    title: "Vous devenez partenaire officiel",
    desc: "Statut de partenaire de l'entreprise avec tous les avantages membres, à vie.",
  },
];

const MembershipBanner = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="membre" className={warmCx(warm.section("strong"), "scroll-mt-20 py-14 sm:py-20")}>
      <div className={warm.blob.gold + " -top-24 -right-24 w-72 h-72"} aria-hidden />
      <div className={warm.blob.coral + " -bottom-24 -left-24 w-72 h-72"} aria-hidden />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className={warmCx(warm.badge("warm"), "mx-auto")}>
            <Crown className="w-3.5 h-3.5" /> Programme Membre Privilège
          </span>

          <h2 className={warm.heading(2)}>
            Devenez membre et payez{" "}
            <span className={warm.textGradient}>20 % moins cher</span> sur tout
          </h2>

          <p className={warm.lead}>
            Rejoignez Green World Prestige, profitez de réductions considérables sur l'ensemble
            de nos produits et transformez chaque achat en revenu mensuel.
          </p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className={warmCx(
                  warm.button("primary", "lg"),
                  "group mt-2 animate-cta-bob shadow-[0_14px_36px_-10px_hsl(var(--coral)/0.7)]",
                )}
              >
                <Sparkles className="w-5 h-5" />
                Voir mes avantages membre
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto p-0 gap-0">
              <div className="bg-section-warm-strong px-6 sm:px-8 pt-8 pb-6 text-center relative overflow-hidden">
                <div className={warm.blob.gold + " -top-16 -right-16 w-48 h-48"} aria-hidden />
                <DialogHeader className="relative space-y-3">
                  <span className={warmCx(warm.badge("warm"), "mx-auto")}>
                    <Crown className="w-3.5 h-3.5" /> Green World Prestige
                  </span>
                  <DialogTitle className={warm.heading(3)}>
                    Vos avantages exceptionnels de membre
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground text-sm">
                    Un statut de partenaire, des réductions à vie et un vrai revenu mensuel.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="px-6 sm:px-8 py-6 space-y-7">
                {/* Avantages */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {advantages.map((a) => (
                    <div key={a.title} className={warmCx(warm.card("highlight"), "p-4 flex gap-3")}>
                      <span className={warm.iconWrap(a.accent, "sm")}>
                        <a.icon className="w-5 h-5" />
                      </span>
                      <div className="space-y-0.5 text-left">
                        <p className="font-semibold text-sm text-accent leading-snug">{a.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Étapes pour devenir membre */}
                <div className="space-y-3">
                  <h3 className="font-display text-lg text-accent text-center">
                    Comment devenir membre ?
                  </h3>
                  <div className="space-y-2.5">
                    {steps.map((s, i) => (
                      <div
                        key={s.title}
                        className={warmCx(warm.card("flat"), "p-4 flex items-start gap-3")}
                      >
                        <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold inline-flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-sm text-accent flex items-center gap-2">
                            <s.icon className="w-4 h-4 text-coral" /> {s.title}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Palier 3 étoiles */}
                <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 via-card to-coral/5 p-5 text-center space-y-2">
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-accent">
                    Atteignez 3 étoiles (147 500 F d'achats)
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Chaque mois où vous effectuez un achat, vous gagnez 20 % supplémentaires sur vos
                    points (BV). Ces 20 % vous sont <strong className="text-accent">payés directement
                    par la société</strong> en fin de mois, selon vos efforts.
                  </p>
                </div>

                <a
                  href={membershipWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={warmCx(warm.button("primary", "lg"), "w-full group")}
                >
                  <Check className="w-5 h-5" />
                  Je deviens membre maintenant
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-[11px] text-center text-muted-foreground">
                  Inscription rapide via WhatsApp · Accompagnement personnalisé
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default MembershipBanner;
