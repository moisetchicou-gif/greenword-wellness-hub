import { useState, useMemo, useEffect } from "react";
import { Briefcase, TrendingUp, Plane, Car, Home, Gift, Check, User, MapPin, AlertCircle, Target, Building2, Phone, Languages, RotateCcw, Lock } from "lucide-react";
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
import PersistenceConsent from "@/components/PersistenceConsent";
import businessHero from "@/assets/business-opportunity-hero.jpg";

const WHATSAPP_NUMBER = "2250707089631";

// Lettres (accents inclus), espaces, apostrophes, tirets et points uniquement.
const SAFE_TEXT_REGEX = /^[\p{L}\s'’\-.]*$/u;
const NAME_MAX = 60;
const CITY_MAX = 40;
const SECTOR_MAX = 60;
const PHONE_MAX = 20;

// Format de zone adapté au marché ivoirien : « Ville – Commune / Quartier ».
// 3 exemples concrets, cliquables comme suggestions rapides.
const SECTOR_EXAMPLES = [
  "Abidjan – Cocody Angré",
  "Yamoussoukro – Habitat",
  "Bouaké – Air France",
] as const;
const SECTOR_PLACEHOLDER = "Ex : Abidjan – Cocody Angré";
// Zone/secteur : lettres, chiffres, espaces, tirets, apostrophes, virgules, slash et points.
const SECTOR_REGEX = /^[\p{L}0-9\s'’\-,/.]*$/u;
// Téléphone : chiffres, espaces, +, parenthèses, points, tirets.
const PHONE_REGEX = /^[+0-9\s().-]*$/;

/**
 * Normalise un texte avant validation et envoi :
 * - normalisation Unicode NFC (compose les accents)
 * - unifie les apostrophes typographiques (’ ‘ ` ´ ′) → '
 * - unifie les tirets longs (— – ‒ ―) → -
 * - unifie les guillemets typographiques (« » " " „ ‟ ‹ ›) → "
 * - convertit tous les sauts de ligne (\r \n \v \f U+2028 U+2029) en espaces
 * - supprime les caractères invisibles / de contrôle (zero-width, BOM, etc.)
 * - normalise les espaces non-cassables (NBSP U+00A0, U+202F, U+2007) en espace standard
 * - réduit les suites d'espaces en un seul espace
 * - trim final
 */
const normalizeText = (raw: string): string =>
  raw
    .normalize("NFC")
    // Apostrophes typographiques → ASCII
    .replace(/[’‘`´′]/g, "'")
    // Tirets longs / cadratins → ASCII
    .replace(/[—–‒―]/g, "-")
    // Guillemets typographiques → ASCII
    .replace(/[«»“”„‟‹›]/g, '"')
    // Tous les sauts de ligne et tabulations verticales → espace
    .replace(/[\r\n\v\f\u2028\u2029]+/g, " ")
    // Espaces non-cassables (NBSP, narrow NBSP, figure space) → espace standard
    .replace(/[\u00A0\u202F\u2007]/g, " ")
    // Caractères de contrôle invisibles : zero-width space/joiner, BOM, marks de direction, etc.
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, "")
    // Compactage final des espaces multiples
    .replace(/\s+/g, " ")
    .trim();

/** Normalise un numéro de téléphone : applique la même hygiène que normalizeText puis compacte. */
const normalizePhone = (raw: string): string =>
  raw
    .normalize("NFC")
    .replace(/[\r\n\v\f\u2028\u2029]+/g, " ")
    .replace(/[\u00A0\u202F\u2007]/g, " ")
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Retire un préfixe de salutation que l'utilisateur aurait pu taper par erreur dans le champ nom
 * (ex : « Bonjour, je suis Aïcha », « Hello, my name is John », « Salut Aïcha »).
 * Évite la répétition « Bonjour ... Bonjour, je suis Aïcha » dans le message final.
 */
const stripGreetingPrefix = (raw: string): string => {
  if (!raw) return raw;
  // Liste de préfixes à éliminer (insensible à la casse, multiples passages possibles).
  const patterns: RegExp[] = [
    /^\s*(bonjour|bonsoir|salut|coucou|hello|hi|hey|good\s+(morning|afternoon|evening))\b[\s,!.;:]*/i,
    /^\s*(je\s+(suis|m'appelle|me\s+nomme)|moi\s+c'est|c'est)\b[\s,]*/i,
    /^\s*(my\s+name\s+is|i'?m|i\s+am|this\s+is)\b[\s,]*/i,
  ];
  let cleaned = raw;
  // Plusieurs passes pour gérer les enchaînements (« Bonjour, je suis Aïcha »).
  for (let i = 0; i < 3; i++) {
    let changed = false;
    for (const p of patterns) {
      const next = cleaned.replace(p, "");
      if (next !== cleaned) {
        cleaned = next;
        changed = true;
      }
    }
    if (!changed) break;
  }
  return cleaned.trim();
};

const GOAL_OPTIONS = [
  {
    value: "revente",
    label: "Revente de produits",
    message: { fr: "faire de la revente de produits", en: "resell the products" },
  },
  {
    value: "distribution",
    label: "Distribution / réseau",
    message: { fr: "rejoindre le réseau de distribution", en: "join the distribution network" },
  },
  {
    value: "demarrage",
    label: "Démarrage d'activité",
    message: { fr: "démarrer une activité avec Green World", en: "start a business with Green World" },
  },
  {
    value: "info",
    label: "Juste m'informer",
    message: { fr: "obtenir plus d'informations sur l'opportunité", en: "get more information about the opportunity" },
  },
] as const;

type GoalValue = (typeof GOAL_OPTIONS)[number]["value"];
const GOAL_VALUES = GOAL_OPTIONS.map((g) => g.value) as [GoalValue, ...GoalValue[]];
const goalSchema = z.enum(GOAL_VALUES, { errorMap: () => ({ message: "Objectif : option invalide" }) }).optional();
type Lang = "fr" | "en";

const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
];

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
  sector: z
    .string()
    .trim()
    .max(SECTOR_MAX, `Zone : ${SECTOR_MAX} caractères max`)
    .regex(SECTOR_REGEX, "Zone : caractères spéciaux non autorisés")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(PHONE_MAX, `Téléphone : ${PHONE_MAX} caractères max`)
    .regex(PHONE_REGEX, "Téléphone : format invalide")
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 8, {
      message: "Téléphone : au moins 8 chiffres",
    })
    .optional()
    .or(z.literal("")),
  goal: goalSchema,
});

const I18N = {
  fr: {
    // Toujours terminé par un point pour permettre une majuscule à la phrase suivante.
    helloNamed: (n: string, c: string) => `Bonjour, je suis ${n}${c ? ` (${c})` : ""}.`,
    helloAnon: (c: string) => `Bonjour${c ? ` (${c})` : ""}.`,
    goalPrefix: " Mon objectif : ",
    // Reformulé pour éviter la répétition « je suis » avec helloNamed.
    fallbackGoal: " Je souhaite en savoir plus sur l'opportunité Business Green World (devenir distributeur).",
    sectorPrefix: " Zone / secteur : ",
    phonePrefix: " Mon numéro : ",
    // Reformulé pour éviter la répétition du mot « informations » avec fallbackGoal.
    closing: " Merci de me recontacter dès que possible.",
  },
  en: {
    helloNamed: (n: string, c: string) => `Hello, I'm ${n}${c ? ` (${c})` : ""}.`,
    helloAnon: (c: string) => `Hello${c ? ` (${c})` : ""}.`,
    goalPrefix: " My goal: ",
    fallbackGoal: " I'd like to learn more about the Green World Business opportunity (becoming a distributor).",
    sectorPrefix: " Area / sector: ",
    phonePrefix: " My phone number: ",
    closing: " Please get back to me as soon as possible.",
  },
} as const;

// Limite de sécurité pour le texte WhatsApp décodé (wa.me accepte ~4096, on reste large).
export const WA_MESSAGE_MAX = 1500;

/** Tronque proprement à la fin du dernier mot complet et ajoute « … ». */
const truncateAtWord = (text: string, max: number): string => {
  if (text.length <= max) return text;
  const slice = text.slice(0, Math.max(0, max - 1));
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > max * 0.5 ? slice.slice(0, lastSpace) : slice;
  return `${cut.replace(/[.,;:\-\s]+$/, "")}…`;
};

export const buildWhatsAppMessage = (
  name: string | undefined | null,
  city: string | undefined | null,
  goal: GoalValue | undefined,
  sector: string | undefined | null,
  phone: string | undefined | null,
  lang: Lang,
) => {
  const t = I18N[lang] ?? I18N.fr;
  // Normalisation systématique de TOUS les inputs avant assemblage : même si l'appelant
  // a oublié, on garantit ici un message propre (NFC, apostrophes, sauts de ligne, etc.).
  // Puis on retire d'éventuels préfixes de salutation tapés dans le champ nom (anti-doublon "Bonjour").
  const cleanName = stripGreetingPrefix(normalizeText(name ?? ""));
  const cleanCity = normalizeText(city ?? "");
  let cleanSector = normalizeText(sector ?? "");
  const cleanPhone = normalizePhone(phone ?? "");

  const intro = cleanName ? t.helloNamed(cleanName, cleanCity) : t.helloAnon(cleanCity);
  // Whitelist : ignore tout objectif hors de la liste autorisée (défense en profondeur).
  const goalOption = goal && GOAL_VALUES.includes(goal) ? GOAL_OPTIONS.find((g) => g.value === goal) : undefined;
  const goalSentence = goalOption
    ? `${t.goalPrefix}${goalOption.message[lang]}.`
    : t.fallbackGoal;
  const phoneSentence = cleanPhone ? `${t.phonePrefix}${cleanPhone}.` : "";

  // Tous les segments suivants (goalSentence, sectorSentence, phoneSentence, closing) commencent
  // déjà par un espace via leurs préfixes I18N — on concatène donc directement après `intro`.
  // Calcule la place disponible pour le secteur après assemblage des autres parties.
  const fixedParts = `${intro}${goalSentence}${phoneSentence}${t.closing}`;
  const sectorWrapperLen = `${t.sectorPrefix}.`.length;
  const availableForSector = WA_MESSAGE_MAX - fixedParts.length - sectorWrapperLen;

  let sectorSentence = "";
  if (cleanSector) {
    if (availableForSector <= 3) {
      // Pas assez de place : on supprime totalement la ligne secteur plutôt que d'envoyer un fragment illisible.
      cleanSector = "";
    } else {
      cleanSector = truncateAtWord(cleanSector, availableForSector);
      sectorSentence = `${t.sectorPrefix}${cleanSector}.`;
    }
  }

  let finalText = `${intro}${goalSentence}${sectorSentence}${phoneSentence}${t.closing}`;

  // ----- Normalisation finale du message assemblé (filet de sécurité ultime) -----
  finalText = finalText
    // Re-supprime tout caractère invisible qui aurait pu survivre via un message hard-codé I18N.
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, "")
    // Tous les sauts de ligne (au cas où) → espace.
    .replace(/[\r\n\v\f\u2028\u2029]+/g, " ")
    // Espaces multiples → un seul.
    .replace(/\s{2,}/g, " ")
    // Espaces avant ponctuation française non protégés.
    .replace(/\s+([,.;])/g, "$1")
    // Garantit un espace après ponctuation s'il manque (ex : ".Mon" → ". Mon").
    .replace(/([,.;])([A-Za-zÀ-ÿ])/g, "$1 $2")
    // Doubles ponctuations de fin (".." ou ",.").
    .replace(/([.,;])\1+/g, "$1")
    .replace(/\.,|,\./g, ".")
    .trim();

  // Anti-doublon "Bonjour"/"Hello" : si malgré tout deux occurrences subsistent, on retire la 2e.
  // (cas pathologique : nom contenant déjà un "Bonjour" non détecté par stripGreetingPrefix)
  const greetingRegex = /\b(Bonjour|Bonsoir|Hello|Hi|Hey)\b/gi;
  const greetings = finalText.match(greetingRegex);
  if (greetings && greetings.length > 1) {
    let kept = false;
    finalText = finalText.replace(greetingRegex, (m) => {
      if (!kept) {
        kept = true;
        return m;
      }
      return "";
    });
    // Re-nettoie les espaces / ponctuations laissés par les suppressions.
    finalText = finalText
      .replace(/\s{2,}/g, " ")
      .replace(/\s+([,.;])/g, "$1")
      .replace(/^[\s,;:!.]+/, "")
      .trim();
    // Re-majuscule la première lettre si on l'a entamée.
    if (finalText) finalText = finalText.charAt(0).toUpperCase() + finalText.slice(1);
  }

  // Garde-fou : si malgré tout on dépasse (cas extrême : nom/ville très longs), on tronque le tout.
  if (finalText.length > WA_MESSAGE_MAX) {
    finalText = truncateAtWord(finalText, WA_MESSAGE_MAX);
  }

  return encodeURIComponent(finalText);
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

const getCounterClass = (current: number, max: number) => {
  const ratio = current / max;
  if (current >= max) return "text-destructive font-semibold";
  if (ratio >= 0.85) return "text-amber-600 dark:text-amber-500 font-medium";
  return "text-muted-foreground";
};

const getInputBorderClass = (current: number, max: number, hasError: boolean) => {
  if (hasError || current >= max) return "border-destructive focus-visible:ring-destructive";
  if (current / max >= 0.85) return "border-amber-500 focus-visible:ring-amber-500";
  return "";
};

// ----- Persistance locale du brouillon de formulaire -----
const DRAFT_STORAGE_KEY = "gw.business.contact.draft.v1";

type DraftState = {
  name: string;
  city: string;
  sector: string;
  phone: string;
  goal: GoalValue | undefined;
  lang: Lang;
};

const EMPTY_DRAFT: DraftState = {
  name: "",
  city: "",
  sector: "",
  phone: "",
  goal: undefined,
  lang: "fr",
};

/** Récupère un champ string borné à `max` caractères depuis un objet brut. */
const readString = (raw: unknown, max: number): string => {
  if (typeof raw !== "string") return "";
  return raw.slice(0, max);
};

/** Charge le brouillon depuis localStorage en validant chaque champ (défensif). */
const loadDraft = (): DraftState => {
  if (typeof window === "undefined") return EMPTY_DRAFT;
  // Pas de chargement sans consentement explicite (RGPD).
  try {
    if (window.localStorage.getItem("gw.persistence.consent.v1") !== "1") return EMPTY_DRAFT;
  } catch {
    return EMPTY_DRAFT;
  }
  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return EMPTY_DRAFT;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const goalRaw = parsed.goal;
    const langRaw = parsed.lang;
    return {
      name: readString(parsed.name, NAME_MAX),
      city: readString(parsed.city, CITY_MAX),
      sector: readString(parsed.sector, SECTOR_MAX),
      phone: readString(parsed.phone, PHONE_MAX),
      goal:
        typeof goalRaw === "string" && (GOAL_VALUES as readonly string[]).includes(goalRaw)
          ? (goalRaw as GoalValue)
          : undefined,
      lang: langRaw === "en" || langRaw === "fr" ? langRaw : "fr",
    };
  } catch {
    return EMPTY_DRAFT;
  }
};

/** Sauvegarde le brouillon (silencieux si quota plein / mode privé / consentement refusé). */
const saveDraft = (draft: DraftState) => {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem("gw.persistence.consent.v1") !== "1") return;
    // Si tout est vide, on nettoie la clé pour ne pas polluer le storage.
    const isEmpty =
      !draft.name && !draft.city && !draft.sector && !draft.phone && !draft.goal && draft.lang === "fr";
    if (isEmpty) {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Quota dépassé ou storage indisponible : on ignore silencieusement.
  }
};

const clearDraft = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // ignore
  }
};

const BusinessSection = () => {
  const { ref, visible } = useScrollReveal(0.1);
  // Initialisation paresseuse depuis localStorage : les valeurs précédemment saisies
  // sont restaurées au premier rendu pour éviter tout « flash » de champs vides.
  const initialDraft = useMemo(() => loadDraft(), []);
  const [name, setName] = useState<string>(initialDraft.name);
  const [city, setCity] = useState<string>(initialDraft.city);
  const [sector, setSector] = useState<string>(initialDraft.sector);
  const [phone, setPhone] = useState<string>(initialDraft.phone);
  const [goal, setGoal] = useState<GoalValue | undefined>(initialDraft.goal);
  const [lang, setLang] = useState<Lang>(initialDraft.lang);
  const [shake, setShake] = useState<{ name: boolean; city: boolean; sector: boolean }>({
    name: false,
    city: false,
    sector: false,
  });
  const [sectorTouched, setSectorTouched] = useState(false);
  const [justRestored, setJustRestored] = useState<boolean>(
    () => initialDraft !== EMPTY_DRAFT &&
      (!!initialDraft.name || !!initialDraft.city || !!initialDraft.sector || !!initialDraft.phone || !!initialDraft.goal),
  );

  // Sauvegarde le brouillon, debounced à ~300 ms pour limiter les écritures.
  useEffect(() => {
    const handle = window.setTimeout(() => {
      saveDraft({ name, city, sector, phone, goal, lang });
    }, 300);
    return () => window.clearTimeout(handle);
  }, [name, city, sector, phone, goal, lang]);

  // Masque la bannière « valeurs restaurées » au bout de quelques secondes.
  useEffect(() => {
    if (!justRestored) return;
    const handle = window.setTimeout(() => setJustRestored(false), 5000);
    return () => window.clearTimeout(handle);
  }, [justRestored]);

  const handleResetDraft = () => {
    setName("");
    setCity("");
    setSector("");
    setPhone("");
    setGoal(undefined);
    setLang("fr");
    setSectorTouched(false);
    setJustRestored(false);
    clearDraft();
  };

  const triggerShake = (field: "name" | "city" | "sector") => {
    setShake((s) => ({ ...s, [field]: true }));
    window.setTimeout(() => setShake((s) => ({ ...s, [field]: false })), 400);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.slice(0, NAME_MAX);
    if (name.length >= NAME_MAX && next.length >= NAME_MAX) triggerShake("name");
    setName(next);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.slice(0, CITY_MAX);
    if (city.length >= CITY_MAX && next.length >= CITY_MAX) triggerShake("city");
    setCity(next);
  };

  /**
   * Saisie « Zone / secteur » : on filtre à la volée les caractères non autorisés
   * pour donner un feedback immédiat sur mobile, et on bloque la frappe au-delà du max.
   */
  const handleSectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Conserve uniquement les caractères autorisés (incluant tirets longs – — qui seront normalisés).
    const filtered = raw.replace(/[^\p{L}0-9\s'’\-–—,/.]/gu, "");
    const hadInvalidChar = filtered.length !== raw.length;
    const next = filtered.slice(0, SECTOR_MAX);
    if ((hadInvalidChar || (sector.length >= SECTOR_MAX && next.length >= SECTOR_MAX))) {
      triggerShake("sector");
    }
    setSector(next);
  };

  // Valeurs normalisées utilisées pour la validation et la génération du message.
  const normalized = useMemo(
    () => ({
      name: normalizeText(name),
      city: normalizeText(city),
      sector: normalizeText(sector),
      phone: normalizePhone(phone),
    }),
    [name, city, sector, phone],
  );

  const validation = useMemo(() => {
    const result = contactSchema.safeParse({ ...normalized, goal });
    if (result.success)
      return {
        isValid: true,
        nameError: "",
        cityError: "",
        sectorError: "",
        phoneError: "",
        goalError: "",
      };
    const errors = result.error.flatten().fieldErrors;
    return {
      isValid: false,
      nameError: errors.name?.[0] ?? "",
      cityError: errors.city?.[0] ?? "",
      sectorError: errors.sector?.[0] ?? "",
      phoneError: errors.phone?.[0] ?? "",
      goalError: errors.goal?.[0] ?? "",
    };
  }, [normalized, goal]);

  // Checklist de complétude : signale à l'utilisateur quels champs sont remplis ou manquants.
  // En mode normal, sert d'aide visuelle. En mode strict (toggle), conditionne aussi l'envoi.
  const checklist = useMemo(
    () => [
      { key: "name", label: "Votre nom", filled: normalized.name.length > 0 },
      { key: "city", label: "Votre ville", filled: normalized.city.length > 0 },
      { key: "goal", label: "Votre objectif", filled: !!goal && (GOAL_VALUES as readonly string[]).includes(goal) },
      { key: "sector", label: "Zone / secteur", filled: normalized.sector.length > 0 },
      { key: "phone", label: "Téléphone", filled: normalized.phone.length > 0 },
    ],
    [normalized, goal],
  );
  const filledCount = checklist.filter((c) => c.filled).length;
  const totalCount = checklist.length;
  const allFilled = filledCount === totalCount;
  const missingFields = checklist.filter((c) => !c.filled);
  // Tous les champs sont obligatoires : le bouton WhatsApp ne s'active que si la validation passe
  // ET si l'intégralité de la checklist est remplie. Empêche tout envoi prématuré côté client.
  const canSend = validation.isValid && allFilled;

  const whatsappHref = canSend
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(
        normalized.name,
        normalized.city,
        goal,
        normalized.sector,
        normalized.phone,
        lang,
      )}`
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

        {/* Editorial hero — visuel pro reflétant les récompenses (voyages, voiture, maison, produits) */}
        <figure
          className={`relative max-w-5xl mx-auto mb-14 rounded-3xl overflow-hidden shadow-2xl shadow-accent/10 ring-1 ring-border/50 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <img
            src={businessHero}
            alt="Distributrice Green World élégante entourée des récompenses du programme : voyages internationaux, voiture, maison, produits naturels"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover aspect-[16/9] transition-transform duration-[1500ms] ease-out hover:scale-[1.02]"
          />
          {/* Overlay dégradé pour la lisibilité du texte (gauche → droite, sombre → transparent) */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-accent/85 via-accent/40 to-transparent"
            aria-hidden="true"
          />
          {/* Accent or sur le coin */}
          <div
            className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[hsl(var(--gold))] via-[hsl(var(--gold))]/60 to-transparent"
            aria-hidden="true"
          />

          <figcaption className="absolute inset-0 flex flex-col justify-end sm:justify-center p-6 sm:p-10 md:p-14 max-w-xl text-left">
            <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[hsl(var(--gold))]/20 backdrop-blur-sm border border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 sm:mb-4">
              <Briefcase className="w-3 h-3" />
              Réseau Green World
            </span>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
              Une vie qui change,<br />
              <span className="italic text-[hsl(var(--gold))]">à votre rythme.</span>
            </p>
            <p className="hidden sm:block text-white/80 text-sm md:text-base mt-3 max-w-md leading-relaxed">
              Des milliers de distributeurs en Côte d'Ivoire et à travers l'Afrique
              transforment leur quotidien grâce au plan de carrière Green World.
            </p>
            <div className="hidden md:flex items-center gap-4 mt-5 text-white/90 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]" />
                <span>Depuis 1994</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]" />
                <span>+30 pays</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]" />
                <span>100% naturel</span>
              </div>
            </div>
          </figcaption>
        </figure>

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

            {justRestored && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-left text-[11px] text-foreground"
              >
                <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                <span className="flex-1">
                  Vos informations ont été restaurées depuis votre dernière visite.
                </span>
                <button
                  type="button"
                  onClick={handleResetDraft}
                  className="text-primary hover:underline font-medium shrink-0"
                >
                  Effacer
                </button>
              </div>
            )}

            <PersistenceConsent
              description="Mémoriser mes informations (nom, ville, objectif, zone, téléphone) sur cet appareil pour les retrouver à ma prochaine visite (30 jours)."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="biz-name" className="text-xs">
                    <User className="inline w-3.5 h-3.5 mr-1 text-primary" />
                    Votre nom <span className="text-destructive font-normal">*</span>
                  </Label>
                  <span className={`text-[10px] tabular-nums ${getCounterClass(name.length, NAME_MAX)}`}>
                    {name.length}/{NAME_MAX}
                  </span>
                </div>
                <Input
                  id="biz-name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Ex : Aïcha Koné"
                  maxLength={NAME_MAX}
                  aria-invalid={!!validation.nameError}
                  aria-describedby="biz-name-error"
                  className={`${getInputBorderClass(name.length, NAME_MAX, !!validation.nameError)} ${shake.name ? "animate-shake" : ""}`}
                />
                {validation.nameError && (
                  <p id="biz-name-error" className="text-[11px] text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validation.nameError}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="biz-city" className="text-xs">
                    <MapPin className="inline w-3.5 h-3.5 mr-1 text-primary" />
                    Votre ville <span className="text-destructive font-normal">*</span>
                  </Label>
                  <span className={`text-[10px] tabular-nums ${getCounterClass(city.length, CITY_MAX)}`}>
                    {city.length}/{CITY_MAX}
                  </span>
                </div>
                <Input
                  id="biz-city"
                  value={city}
                  onChange={handleCityChange}
                  placeholder="Ex : Abidjan"
                  maxLength={CITY_MAX}
                  aria-invalid={!!validation.cityError}
                  aria-describedby="biz-city-error"
                  className={`${getInputBorderClass(city.length, CITY_MAX, !!validation.cityError)} ${shake.city ? "animate-shake" : ""}`}
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
              <Label htmlFor="biz-lang" className="text-xs">
                <Languages className="inline w-3.5 h-3.5 mr-1 text-primary" />
                Langue du message
              </Label>
              <Select value={lang} onValueChange={(v) => setLang(v as Lang)}>
                <SelectTrigger id="biz-lang" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANG_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 text-left">
              <Label htmlFor="biz-goal" className="text-xs">
                <Target className="inline w-3.5 h-3.5 mr-1 text-primary" />
                Votre objectif <span className="text-destructive font-normal">*</span>
              </Label>
              <Select
                value={goal}
                onValueChange={(v) => {
                  // Whitelist : on n'accepte que les valeurs déclarées dans GOAL_OPTIONS.
                  setGoal(GOAL_VALUES.includes(v as GoalValue) ? (v as GoalValue) : undefined);
                }}
              >
                <SelectTrigger
                  id="biz-goal"
                  className={`w-full ${validation.goalError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  aria-invalid={!!validation.goalError}
                  aria-describedby="biz-goal-error"
                >
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
              {validation.goalError && (
                <p id="biz-goal-error" className="text-[11px] text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validation.goalError}
                </p>
              )}
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="biz-sector" className="text-xs">
                  <Building2 className="inline w-3.5 h-3.5 mr-1 text-primary" />
                  Votre zone d'activité <span className="text-destructive font-normal">*</span> <span className="text-muted-foreground font-normal">(ville – commune / quartier)</span>
                </Label>
                <span className={`text-[10px] tabular-nums ${getCounterClass(sector.length, SECTOR_MAX)}`}>
                  {sector.length}/{SECTOR_MAX}
                </span>
              </div>
              <Input
                id="biz-sector"
                type="text"
                inputMode="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="words"
                spellCheck={false}
                value={sector}
                onChange={handleSectorChange}
                onBlur={() => setSectorTouched(true)}
                placeholder={SECTOR_PLACEHOLDER}
                maxLength={SECTOR_MAX}
                aria-invalid={sectorTouched && !!validation.sectorError}
                aria-describedby="biz-sector-error biz-sector-hint"
                className={`${getInputBorderClass(sector.length, SECTOR_MAX, sectorTouched && !!validation.sectorError)} ${shake.sector ? "animate-shake" : ""}`}
              />
              {sectorTouched && validation.sectorError ? (
                <p
                  id="biz-sector-error"
                  role="alert"
                  aria-live="polite"
                  className="text-[11px] text-destructive flex items-start gap-1"
                >
                  <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>{validation.sectorError}</span>
                </p>
              ) : (
                <div id="biz-sector-hint" className="space-y-1">
                  <p className="text-[10px] text-muted-foreground">
                    Indiquez votre <strong className="font-medium">ville</strong> puis votre <strong className="font-medium">commune ou quartier</strong>. Exemples :
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {SECTOR_EXAMPLES.map((ex) => (
                      <li key={ex}>
                        <button
                          type="button"
                          onClick={() => {
                            setSector(ex.slice(0, SECTOR_MAX));
                            setSectorTouched(false);
                          }}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          aria-label={`Utiliser l'exemple : ${ex}`}
                        >
                          {ex}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="biz-phone" className="text-xs">
                  <Phone className="inline w-3.5 h-3.5 mr-1 text-primary" />
                  Ton numéro de téléphone <span className="text-destructive font-normal">*</span>
                </Label>
                <span className={`text-[10px] tabular-nums ${getCounterClass(phone.length, PHONE_MAX)}`}>
                  {phone.length}/{PHONE_MAX}
                </span>
              </div>
              <Input
                id="biz-phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+225 07 00 00 00 00"
                maxLength={PHONE_MAX}
                aria-invalid={!!validation.phoneError}
                aria-describedby="biz-phone-error"
                className={validation.phoneError ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {validation.phoneError && (
                <p id="biz-phone-error" className="text-[11px] text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validation.phoneError}
                </p>
              )}
            </div>

            {/* Checklist de complétude — informative, et conditionnelle si « mode strict » activé. */}
            <div
              className="rounded-xl border border-border/60 bg-card/50 p-4 text-left"
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Avant d'envoyer
                </p>
                <span
                  className={`text-[11px] font-semibold tabular-nums ${
                    allFilled ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {filledCount}/{totalCount} {allFilled ? "✓" : ""}
                </span>
              </div>
              <div className="h-1 w-full bg-border/60 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${(filledCount / totalCount) * 100}%` }}
                />
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                {checklist.map((item) => (
                  <li
                    key={item.key}
                    className={`flex items-center gap-2 text-[12px] ${
                      item.filled ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        item.filled
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground/60"
                      }`}
                      aria-hidden="true"
                    >
                      {item.filled ? (
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </span>
                    <span className={item.filled ? "" : "italic"}>
                      {item.label}
                      {!item.filled && (
                        <span className="ml-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                          (manquant)
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              {!allFilled && (
                <p
                  role="alert"
                  className="text-[11px] text-destructive mt-3 leading-relaxed flex items-start gap-1.5"
                >
                  <Lock className="w-3 h-3 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    Remplissez les {missingFields.length} champ
                    {missingFields.length > 1 ? "s" : ""} manquant
                    {missingFields.length > 1 ? "s" : ""} (
                    {missingFields.map((f) => f.label).join(", ")}) pour pouvoir envoyer le message.
                  </span>
                </p>
              )}
              {allFilled && (
                <p className="text-[11px] text-primary mt-3 leading-relaxed flex items-start gap-1.5">
                  <Check className="w-3 h-3 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Tous les champs sont remplis : vous pouvez envoyer votre message.</span>
                </p>
              )}
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!canSend}
              title={
                !canSend && !allFilled
                  ? `Remplissez d'abord : ${missingFields.map((f) => f.label).join(", ")}`
                  : undefined
              }
              onClick={(e) => {
                if (!canSend) e.preventDefault();
              }}
              className={`group inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#25D366] text-white px-7 py-4 rounded-full font-semibold text-sm tracking-wide shadow-lg transition-all duration-300 ${canSend ? "hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97]" : "opacity-50 cursor-not-allowed pointer-events-none"}`}
              style={{ boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Rejoindre sur WhatsApp
            </a>
            {(name || city || sector || phone || goal) && (
              <button
                type="button"
                onClick={handleResetDraft}
                className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors mx-auto md:mx-0"
                aria-label="Réinitialiser le formulaire et effacer les valeurs sauvegardées"
              >
                <RotateCcw className="w-3 h-3" />
                Réinitialiser le formulaire
              </button>
            )}
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
