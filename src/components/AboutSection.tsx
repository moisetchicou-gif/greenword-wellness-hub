import { useEffect, useRef, useState } from "react";
import {
  Leaf,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Users,
  BadgeCheck,
  TrendingUp,
  MapPin,
  MessageCircle,
  Award,
  Zap,
  Shield,
  Activity,
  Droplets,
  Heart,
  Trophy,
  Star,
} from "lucide-react";
import { warm, warmCx } from "@/lib/warmTheme";

import awardCheque from "@/assets/about/award-cheque.jpeg";
import certificate from "@/assets/about/certificate.jpeg";
import speech from "@/assets/about/speech.jpeg";
import winnersTrio from "@/assets/about/winners-trio.jpeg";
import teamGroup from "@/assets/about/team-group.jpeg";
import winnersAward from "@/assets/about/winners-award.jpeg";
import managerPortrait from "@/assets/about/manager-portrait.jpeg";
import giftCeremony from "@/assets/about/gift-ceremony.jpeg";
import managerSpeaking from "@/assets/about/manager-speaking.jpg.asset.json";
import managerSummit from "@/assets/about/manager-summit.jpg.asset.json";
import foundersAward from "@/assets/about/founders-award.jpg.asset.json";

const WHATSAPP_NUMBER = "2250707089631";
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Bonjour, je souhaite en savoir plus sur Green World Prestige à Koumassi Remblais.",
)}`;

const values = [
  { icon: Leaf, title: "100 % Naturel", text: "Des produits issus de la recherche et des technologies de pointe, puisant le meilleur de la nature." },
  { icon: HeartHandshake, title: "Accompagnement", text: "Un suivi personnalisé pour chaque client, selon ses besoins de santé." },
  { icon: ShieldCheck, title: "Authenticité garantie", text: "Produits officiels Green World, contre la contrefaçon qui touche le secteur." },
  { icon: Sparkles, title: "Bien-être global", text: "Bien plus qu'une vente : une approche complète de votre mieux-être." },
  { icon: TrendingUp, title: "Opportunité", text: "Rejoignez notre réseau de distributeurs et développez votre activité." },
];

const productFamilies = [
  { icon: Zap, label: "Énergie & vitalité" },
  { icon: Shield, label: "Immunité & défenses" },
  { icon: Activity, label: "Digestion & confort intestinal" },
  { icon: Droplets, label: "Circulation sanguine" },
  { icon: Heart, label: "Vitalité masculine & féminine" },
];

const services = [
  { title: "Séances de détoxification", desc: "Bain de pieds ionique pour éliminer les toxines." },
  { title: "Scan corporel", desc: "Analyse complète de votre composition corporelle." },
  { title: "Fauteuil de massage", desc: "Un moment de relaxation profonde sur place." },
  { title: "Soins & produits Olylife", desc: "Technologies bien-être complémentaires." },
];

const stats = [
  { icon: MapPin, value: "Koumassi", label: "Remblais, Abidjan" },
  { icon: Users, value: "1000+", label: "Clients accompagnés" },
  { icon: BadgeCheck, value: "80+", label: "Produits & services" },
  { icon: Trophy, value: "30 ans", label: "d'expertise Green World" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="qui-sommes-nous" className={warmCx(warm.section("soft"), "py-16 sm:py-24 scroll-mt-20")}>
      <div className={warm.blob.coral + " w-80 h-80 -top-16 -left-16"} />
      <div className={warm.blob.gold + " w-80 h-80 top-1/3 -right-20"} />
      <div className={warm.blob.primary + " w-72 h-72 bottom-0 left-1/4"} />

      <div
        ref={ref}
        className={`container relative mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 1. Accroche d'ouverture */}
        <header className="max-w-3xl mx-auto text-center space-y-5">
          <span className={warm.eyebrow}>Qui sommes-nous</span>
          <h1 className={warm.heading(1)}>
            Green World Prestige — <span className={warm.textGradient}>le bien-être naturel</span>, au cœur d'Abidjan.
          </h1>
          <p className={warmCx(warm.lead, "max-w-2xl")}>
            Distributeur agréé Green World à Koumassi Remblais. Des produits 100 % naturels,
            un accompagnement personnalisé, une passion : votre santé.
          </p>
        </header>

        {/* Le fondateur — mis en avant */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-3 space-y-5 order-2 lg:order-1">
            <span className={warm.eyebrow}>Le fondateur</span>
            <h2 className={warm.heading(2)}>
              Une vision portée par <span className={warm.textGradient}>un homme de conviction</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              À la tête de Green World Prestige, un entrepreneur passionné, formé aux enjeux du
              bien-être et actif dans l'écosystème international des nouvelles technologies et
              de la santé naturelle. Présent sur les grands sommets professionnels, il porte
              une ambition claire : rendre la santé naturelle accessible à toutes les familles
              ivoiriennes.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className={warm.badge?.("coral") ?? "px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-semibold"}>Conférencier</span>
              <span className={warm.badge?.("gold") ?? "px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold"}>Distributeur agréé</span>
              <span className={warm.badge?.("primary") ?? "px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"}>Entrepreneur bien-être</span>
            </div>
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2 grid grid-cols-2 gap-3">
            <img
              src={managerSpeaking.url}
              alt="Fondateur Green World Prestige en conférence"
              loading="eager"
              decoding="async"
              className="col-span-2 w-full h-64 sm:h-80 object-cover rounded-2xl shadow-xl"
            />
            <img
              src={managerSummit.url}
              alt="Fondateur Green World Prestige lors d'un sommet international"
              loading="lazy"
              decoding="async"
              className="w-full h-40 sm:h-48 object-cover rounded-2xl shadow-md"
            />
            <img
              src={foundersAward.url}
              alt="Rencontre avec les dirigeants Green World International"
              loading="lazy"
              decoding="async"
              className="w-full h-40 sm:h-48 object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>


        {/* 2. Notre histoire */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className={warm.eyebrow}>Notre histoire</span>
            <h2 className={warm.heading(2)}>
              30 ans d'expertise, <span className={warm.textGradient}>désormais à Abidjan</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Installée à <strong className="text-accent">Koumassi Remblais</strong>, Green World Prestige est
              une boutique spécialisée dans les produits naturels de santé et le bien-être,
              distributeur agréé de la marque internationale Green World.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Fondée en <strong className="text-accent">1994</strong>, Green World est aujourd'hui reconnue
              dans plus de <strong className="text-accent">40 pays</strong> à travers l'Afrique, l'Asie, l'Europe
              et les Amériques. Présente sur le continent africain depuis 2007 et en Côte d'Ivoire depuis
              plusieurs années, la marque s'appuie sur une philosophie simple : puiser dans la nature
              ce qu'elle a de meilleur pour améliorer votre qualité de vie.
            </p>
            <p className="text-muted-foreground leading-relaxed italic">
              C'est cette vision que Green World Prestige porte au quotidien à Abidjan : rendre ces produits
              100 % naturels accessibles à tous, avec écoute et conseils adaptés.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <img src={speech} alt="Présentation Green World Côte d'Ivoire" loading="lazy" className="w-full h-56 sm:h-72 object-cover rounded-2xl shadow-lg col-span-2" />
            <img src={certificate} alt="Remise de certificat Green World" loading="lazy" className="w-full h-40 sm:h-48 object-cover rounded-2xl shadow-md" />
            <img src={giftCeremony} alt="Cérémonie Green World" loading="lazy" className="w-full h-40 sm:h-48 object-cover rounded-2xl shadow-md" />
          </div>
        </div>

        {/* 3. Mission & valeurs */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className={warm.eyebrow}>Mission & valeurs</span>
            <h2 className={warm.heading(2)}>
              La santé commence par <span className={warm.textGradient}>ce que la nature offre</span> de plus pur
            </h2>
            <p className={warm.lead}>
              Notre mission : vous accompagner vers un mieux-être durable, grâce à des solutions
              naturelles efficaces et un service de confiance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className={warmCx(warm.card("interactive"), "p-5 text-center")}
                     style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className={warmCx(warm.iconWrap("mixed", "md"), "mx-auto mb-3")}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-base text-accent mb-1.5">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Ce que nous proposons */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div className={warmCx(warm.card("highlight"), "p-6 sm:p-8 space-y-5")}>
            <span className={warm.eyebrow}>Nos produits</span>
            <h3 className={warm.heading(3)}>Une gamme complète de compléments naturels</h3>
            <p className="text-sm text-muted-foreground">
              Organisée autour de <strong className="text-accent">cinq grandes familles</strong> de besoins :
            </p>
            <ul className="space-y-2.5">
              {productFamilies.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.label} className="flex items-center gap-3">
                    <span className={warm.iconWrap("coral", "sm")}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-medium text-accent">{f.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={warmCx(warm.card("highlight"), "p-6 sm:p-8 space-y-5")}>
            <span className={warm.eyebrow}>Nos services bien-être</span>
            <h3 className={warm.heading(3)}>Prenez soin de vous sur place</h3>
            <p className="text-sm text-muted-foreground">
              En plus des produits, notre boutique propose :
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.title} className="flex gap-3">
                  <span className={warm.iconWrap("gold", "sm")}>
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-accent">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. Engagement qualité */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <img src={certificate} alt="Certificat officiel Green World" loading="lazy"
               className="w-full h-72 sm:h-96 object-cover rounded-2xl shadow-xl order-2 lg:order-1" />
          <div className="space-y-5 order-1 lg:order-2">
            <span className={warm.eyebrow}>Engagement qualité</span>
            <h2 className={warm.heading(2)}>
              Des produits <span className={warm.textGradient}>garantis authentiques</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Dans un secteur où la contrefaçon reste malheureusement fréquente,
              Green World Prestige s'engage à ne proposer que des produits directement
              issus du <strong className="text-accent">réseau officiel Green World</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Chaque produit est vérifiable et conforme aux standards de qualité de la marque —
              pour votre sécurité et votre tranquillité d'esprit.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <BadgeCheck className="w-6 h-6 text-coral" />
              <span className="text-sm font-semibold text-accent">Distributeur agréé & vérifiable</span>
            </div>
          </div>
        </div>

        {/* 6. Notre équipe */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className={warm.eyebrow}>Notre équipe</span>
            <h2 className={warm.heading(2)}>
              Une équipe <span className={warm.textGradient}>passionnée</span> à votre écoute
            </h2>
            <p className={warm.lead}>
              Derrière Green World Prestige, une équipe formée aux produits et aux conseils
              bien-être, présente pour vous accueillir et vous orienter vers les solutions
              les plus adaptées à votre situation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className={warmCx(warm.card("interactive"), "overflow-hidden")}>
              <img src={managerPortrait} alt="Gérant Green World Prestige" loading="lazy"
                   className="w-full h-72 object-cover" />
              <div className="p-5 text-center">
                <p className="font-display text-lg text-accent">Le/la gérant(e)</p>
                <p className="text-xs text-muted-foreground mt-1">Fondateur & conseiller bien-être</p>
              </div>
            </div>
            <div className={warmCx(warm.card("interactive"), "overflow-hidden md:col-span-2")}>
              <img src={teamGroup} alt="Équipe Green World Prestige" loading="lazy"
                   className="w-full h-72 object-cover" />
              <div className="p-5 text-center">
                <p className="font-display text-lg text-accent">L'équipe Green World Prestige</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Distributeurs et partenaires primés — <em>China Trip Award Winners</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Programme fidélité & distributeurs */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className={warm.eyebrow}>Fidélité & réseau</span>
            <h2 className={warm.heading(2)}>
              Rejoignez la <span className={warm.textGradient}>communauté Green World</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Devenir client, c'est aussi rejoindre une communauté. Grâce à notre programme
              de fidélité par points <strong className="text-accent">(BV)</strong> cumulés
              sur un cycle du 5 au 5 de chaque mois, nos clients réguliers bénéficient d'avantages
              et de récompenses selon des paliers progressifs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Vous souhaitez aller plus loin ?{" "}
              <strong className="text-accent">Devenez distributeur</strong> et profitez de prix
              préférentiels tout en développant votre propre activité au sein de notre réseau.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/#membre" className={warm.button("primary", "md")}>
                <Star className="w-4 h-4" /> Devenir membre
              </a>
              <a href="/business" className={warm.button("outline", "md")}>
                Découvrir l'opportunité
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <img src={awardCheque} alt="Chèque de récompense Green World 67 500 000 FCFA" loading="lazy"
                 className="col-span-2 w-full h-56 sm:h-64 object-cover rounded-2xl shadow-lg" />
            <img src={winnersAward} alt="Distributeurs primés" loading="lazy"
                 className="w-full h-40 object-cover rounded-2xl shadow-md" />
            <img src={winnersTrio} alt="Winners Green World Côte d'Ivoire" loading="lazy"
                 className="w-full h-40 object-cover rounded-2xl shadow-md" />
          </div>
        </div>

        {/* 8. En chiffres */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className={warm.eyebrow}>Green World Prestige en chiffres</span>
            <h2 className={warm.heading(2)}>
              Une <span className={warm.textGradient}>expertise reconnue</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className={warmCx(warm.card("glass"), "p-6 text-center")}>
                  <div className={warmCx(warm.iconWrap("mixed", "lg"), "mx-auto mb-3")}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl text-accent">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 9. Appel à l'action */}
        <div className={warmCx(warm.section("strong"), "rounded-3xl px-6 py-12 sm:py-16 text-center space-y-6")}>
          <Award className="w-12 h-12 text-coral mx-auto" />
          <h2 className={warm.heading(2)}>
            Venez nous rencontrer à <span className={warm.textGradient}>Koumassi Remblais</span>
          </h2>
          <p className={warm.lead}>
            Ou contactez-nous dès maintenant sur WhatsApp pour découvrir nos produits
            et services bien-être.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className={warm.button("primary", "lg")}>
              <MessageCircle className="w-5 h-5" /> Contacter sur WhatsApp
            </a>
            <a
              href="https://maps.google.com/?q=Koumassi+Remblais+Abidjan"
              target="_blank"
              rel="noopener noreferrer"
              className={warm.button("outline", "lg")}
            >
              <MapPin className="w-5 h-5" /> Voir sur Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
