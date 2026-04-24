import { useState, useMemo } from "react";
import { Briefcase, TrendingUp, Plane, Car, Home, Gift, Check, User, MapPin, AlertCircle, Target } from "lucide-react";
import { z } from "zod";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WHATSAPP_NUMBER = "2250707089631";

// Lettres (accents inclus), espaces, apostrophes, tirets et points uniquement.
const SAFE_TEXT_REGEX = /^[\p{L}\s'’\-.]*$/u;
const NAME_MAX = 60;
const CITY_MAX = 40;

const GOAL_OPTIONS = [
  { value: "revente", label: "Revente de produits", message: "faire de la revente de produits" },
  { value: "distribution", label: "Distribution / réseau", message: "rejoindre le réseau de distribution" },
  { value: "demarrage", label: "Démarrage d'activité", message: "démarrer une activité avec Green World" },
  { value: "info", label: "Juste m'informer", message: "obtenir plus d'informations sur l'opportunité" },
] as const;

type GoalValue = (typeof GOAL_OPTIONS)[number]["value"] | "";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .max(NAME_MAX, `Nom : ${NAME_MAX} caractères max`)
    .regex(SAFE_TEXT_REGEX, "Nom : caractères spéciaux non autorisés")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .trim()
    .max(CITY_MAX, `Ville : ${CITY_MAX} caractères max`)
    .regex(SAFE_TEXT_REGEX, "Ville : caractères spéciaux non autorisés")
    .optional()
    .or(z.literal("")),
});

const buildWhatsAppMessage = (name: string, city: string, goal: GoalValue) => {
  const cleanName = name.trim();
  const cleanCity = city.trim();
  const intro = cleanName
    ? `Bonjour, je suis ${cleanName}${cleanCity ? ` (${cleanCity})` : ""}.`
    : `Bonjour${cleanCity ? ` (${cleanCity})` : ""},`;
  const goalOption = GOAL_OPTIONS.find((g) => g.value === goal);
  const goalSentence = goalOption
    ? `Mon objectif : ${goalOption.message}.`
    : `Je suis intéressé(e) par l'opportunité Business Green World (devenir distributeur).`;
  return encodeURIComponent(
    `${intro} ${goalSentence} Pouvez-vous me donner plus d'informations ?`
  );
};

const rewards = [
  { icon: TrendingUp, label: "20% de commission", desc: "Sur chacune de vos ventes" },
  { icon: Plane, label: "Voyages internationaux", desc: "Découvrez le monde" },
  { icon: Car, label: "Voitures", desc: "Récompenses automobiles" },
  { icon: Home, label: "Une maison", desc: "Pour les top performers" },
  { icon: Gift, label: "Nombreux lots", desc: "Bonus & cadeaux exclusifs" },
];

const benefits = [
  "Formation gratuite et accompagnement personnalisé",
  "Produits 100% naturels reconnus depuis 1994",
  "Aucun investissement de départ obligatoire",
  "Travaillez à votre rythme, depuis chez vous",
  "Plan de carrière évolutif et international",
];

const BusinessSection = () => {
  const { ref, visible } = useScrollReveal(0.1);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [goal, setGoal] = useState<GoalValue>("");

  const validation = useMemo(() => {
    const result = contactSchema.safeParse({ name, city });
    if (result.success) return { isValid: true, nameError: "", cityError: "" };
    const errors = result.error.flatten().fieldErrors;
    return {
      isValid: false,
      nameError: errors.name?.[0] ?? "",
      cityError: errors.city?.[0] ?? "",
    };
  }, [name, city]);

  const whatsappHref = validation.isValid
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(name, city, goal)}`
    : undefined;

  return (
    <section
      id="business"
      className="py-20 sm:py-24 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 relative">
        <div className={`text-center max-w-2xl mx-auto mb-12 space-y-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.2em]">
            <Briefcase className="w-3.5 h-3.5" />
            Opportunité Business
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-accent leading-tight">
            Devenez <span className="italic text-primary">distributeur</span> Green World
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Rejoignez notre réseau et gagnez <strong className="text-accent">20% de commission</strong> sur les ventes,
            des voyages internationaux, des voitures, une maison et de nombreux lots.
          </p>
        </div>

        {/* Rewards grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-14">
          {rewards.map((r, i) => (
            <div
              key={r.label}
              className={`group bg-card border border-border/60 rounded-2xl p-5 text-center hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <r.icon className="w-6 h-6" />
              </div>
              <p className="font-display text-sm text-accent leading-tight">{r.label}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefits + CTA */}
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto bg-card border border-border/60 rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="space-y-4">
            <h3 className="text-2xl font-display text-accent">Pourquoi nous rejoindre ?</h3>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5 text-center md:text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                Lancez-vous dès aujourd'hui
              </p>
              <p className="text-accent font-display text-xl leading-snug">
                Contactez-nous sur WhatsApp pour rejoindre le réseau et démarrer votre activité.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="space-y-1.5">
                <Label htmlFor="biz-name" className="text-xs">
                  <User className="inline w-3.5 h-3.5 mr-1 text-primary" />
                  Votre nom <span className="text-muted-foreground font-normal">(optionnel)</span>
                </Label>
                <Input
                  id="biz-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Aïcha Koné"
                  maxLength={NAME_MAX}
                  aria-invalid={!!validation.nameError}
                  aria-describedby="biz-name-error"
                  className={validation.nameError ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {validation.nameError && (
                  <p id="biz-name-error" className="text-[11px] text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validation.nameError}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="biz-city" className="text-xs">
                  <MapPin className="inline w-3.5 h-3.5 mr-1 text-primary" />
                  Votre ville <span className="text-muted-foreground font-normal">(optionnel)</span>
                </Label>
                <Input
                  id="biz-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex : Abidjan"
                  maxLength={CITY_MAX}
                  aria-invalid={!!validation.cityError}
                  aria-describedby="biz-city-error"
                  className={validation.cityError ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {validation.cityError && (
                  <p id="biz-city-error" className="text-[11px] text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validation.cityError}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <Label htmlFor="biz-goal" className="text-xs">
                <Target className="inline w-3.5 h-3.5 mr-1 text-primary" />
                Votre objectif <span className="text-muted-foreground font-normal">(optionnel)</span>
              </Label>
              <Select value={goal} onValueChange={(v) => setGoal(v as GoalValue)}>
                <SelectTrigger id="biz-goal" className="w-full">
                  <SelectValue placeholder="Choisir un objectif…" />
                </SelectTrigger>
                <SelectContent>
                  {GOAL_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!validation.isValid}
              onClick={(e) => {
                if (!validation.isValid) e.preventDefault();
              }}
              className={`group inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#25D366] text-white px-7 py-4 rounded-full font-semibold text-sm tracking-wide shadow-lg transition-all duration-300 ${validation.isValid ? "hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97]" : "opacity-50 cursor-not-allowed pointer-events-none"}`}
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
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
