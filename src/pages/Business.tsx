import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Plane, Car, Home, Gift, ShieldCheck, GraduationCap, Globe2, Clock, HeartHandshake, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

const BusinessSection = lazy(() => import("@/components/BusinessSection"));

const WHATSAPP_NUMBER = "2250707089631";
const WHATSAPP_DEFAULT_MESSAGE = encodeURIComponent(
  "Bonjour, je suis intéressé(e) par l'opportunité Business Green World (devenir distributeur). Pouvez-vous me donner plus d'informations ?",
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MESSAGE}`;

const rewards = [
  { icon: TrendingUp, label: "20% de commission", desc: "Sur chacune de vos ventes directes" },
  { icon: Plane, label: "Voyages internationaux", desc: "Découvrez le monde grâce au plan de carrière" },
  { icon: Car, label: "Voitures", desc: "Récompenses automobiles pour les performers" },
  { icon: Home, label: "Une maison", desc: "Bonus immobilier pour les top distributeurs" },
  { icon: Gift, label: "Bonus & cadeaux", desc: "Lots exclusifs et primes mensuelles" },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Marque reconnue depuis 1994",
    desc: "Green World est une entreprise internationale de phytothérapie présente dans plus de 70 pays, reconnue pour la qualité et la traçabilité de ses produits 100% naturels.",
  },
  {
    icon: GraduationCap,
    title: "Formation gratuite et accompagnement",
    desc: "Vous êtes formé(e) aux produits, à la vente et au plan de carrière. Un parrain expérimenté vous accompagne dès votre démarrage et tout au long de votre activité.",
  },
  {
    icon: Globe2,
    title: "Plan de carrière international",
    desc: "Évoluez du statut de distributeur à directeur en passant par superviseur et manager. Chaque palier débloque de nouveaux bonus, voyages et récompenses.",
  },
  {
    icon: Clock,
    title: "À votre rythme, depuis chez vous",
    desc: "Activité compatible avec un emploi, des études ou la vie de famille. Aucun horaire imposé, aucun stock obligatoire, aucun investissement de départ.",
  },
  {
    icon: HeartHandshake,
    title: "Aider les autres à se sentir mieux",
    desc: "Vous proposez des produits naturels qui améliorent réellement la santé de votre entourage. Une activité utile, en accord avec vos valeurs.",
  },
  {
    icon: Sparkles,
    title: "Aucun risque financier",
    desc: "Pas de droit d'entrée caché, pas d'achat minimum imposé. Vous démarrez avec ce que vous voulez et progressez à votre rythme.",
  },
];

const steps = [
  {
    n: "01",
    title: "Contact WhatsApp",
    desc: "Vous nous écrivez sur WhatsApp avec votre nom, votre ville et votre objectif. Nous vous répondons rapidement.",
  },
  {
    n: "02",
    title: "Présentation de l'opportunité",
    desc: "Nous vous présentons les produits, le plan de carrière, les commissions et répondons à toutes vos questions sans engagement.",
  },
  {
    n: "03",
    title: "Inscription gratuite",
    desc: "Vous êtes inscrit(e) en tant que distributeur officiel Green World et recevez votre identifiant personnel.",
  },
  {
    n: "04",
    title: "Formation & démarrage",
    desc: "Vous êtes formé(e) aux produits et accompagné(e) par votre parrain pour réaliser vos premières ventes.",
  },
];

const faqs = [
  {
    q: "Faut-il payer pour devenir distributeur ?",
    a: "Non. L'inscription est totalement gratuite et il n'y a aucun investissement de départ obligatoire. Vous achetez uniquement les produits que vous souhaitez revendre ou utiliser.",
  },
  {
    q: "Combien puis-je gagner ?",
    a: "Vous touchez 20% de commission directe sur chacune de vos ventes. Avec le plan de carrière, vous pouvez aussi gagner des bonus d'équipe, des voyages, une voiture et bien plus selon votre niveau.",
  },
  {
    q: "Combien de temps faut-il y consacrer ?",
    a: "Vous travaillez à votre rythme. Certains distributeurs y consacrent quelques heures par semaine en complément, d'autres en font leur activité principale.",
  },
  {
    q: "Suis-je obligé(e) de stocker des produits ?",
    a: "Non. Vous pouvez commander à la demande pour vos clients. Aucun stock minimum n'est imposé.",
  },
  {
    q: "Puis-je faire cette activité depuis n'importe quelle ville ?",
    a: "Oui. L'activité fonctionne dans toute la Côte d'Ivoire et à l'international. Vous pouvez démarrer depuis Abidjan, Yamoussoukro, Bouaké, San-Pédro, Korhogo, ou n'importe où.",
  },
];

const Business = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />

    {/* Hero */}
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>

        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.2em]">
            Opportunité Business Green World
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-accent leading-tight">
            Devenez <span className="italic text-primary">distributeur</span> Green World en Côte d'Ivoire
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Rejoignez un réseau international de phytothérapie reconnu depuis 1994. Gagnez{" "}
            <strong className="text-accent">20% de commission</strong> sur vos ventes, des voyages,
            une voiture, une maison et de nombreux lots — sans investissement de départ.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-7 py-4 rounded-full font-semibold text-sm tracking-wide shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              style={{ boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Démarrer sur WhatsApp
            </a>
            <a
              href="#formulaire"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-sm tracking-wide border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-accent"
            >
              Remplir le formulaire détaillé
            </a>
          </div>
          <p className="text-xs text-muted-foreground pt-1">
            <span className="font-semibold text-accent">+225 07 07 08 96 31</span> · Réponse rapide
          </p>
        </div>
      </div>
    </section>

    {/* Récompenses */}
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display text-accent">Ce que Green World vous offre</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Au-delà de la commission directe, le plan de carrière débloque progressivement de nombreuses récompenses.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {rewards.map((r) => (
            <div
              key={r.label}
              className="group bg-card border border-border/60 rounded-2xl p-5 text-center hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <r.icon className="w-6 h-6" />
              </div>
              <p className="font-display text-sm text-accent leading-tight">{r.label}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Pourquoi nous rejoindre */}
    <section className="py-14 sm:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display text-accent">Pourquoi rejoindre le réseau ?</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Une opportunité sérieuse, accessible à tous, pour développer une activité naturelle et utile.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg text-accent mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Comment démarrer */}
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display text-accent">Comment démarrer en 4 étapes</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Un parcours simple, gratuit et sans engagement, accompagné de bout en bout.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative bg-card border border-border/60 rounded-2xl p-5 hover:border-primary/40 transition-all duration-300"
            >
              <span className="absolute -top-3 left-5 bg-primary text-primary-foreground text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                {s.n}
              </span>
              <h3 className="font-display text-base text-accent mt-2 mb-1.5">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-14 sm:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display text-accent">Questions fréquentes</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-primary/40 transition-colors"
            >
              <summary className="cursor-pointer list-none px-5 py-4 flex items-start justify-between gap-3 text-sm font-medium text-accent">
                <span>{f.q}</span>
                <span className="text-primary text-lg leading-none transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* Formulaire détaillé (réutilise BusinessSection) */}
    <div id="formulaire">
      <Suspense
        fallback={
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <BusinessSection />
      </Suspense>
    </div>

    {/* CTA final */}
    <section className="py-14 sm:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-display text-accent">Prêt(e) à vous lancer ?</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Contactez-nous dès maintenant sur WhatsApp. Nous répondons en quelques minutes pendant les heures ouvrées.
        </p>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-7 py-4 rounded-full font-semibold text-sm tracking-wide shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          style={{ boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35)" }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Rejoindre sur WhatsApp
        </a>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-accent">+225 07 07 08 96 31</span> · Réponse rapide
        </p>
      </div>
    </section>
  </div>
);

export default Business;
