import { describe, it, expect } from "vitest";
import { buildWhatsAppMessage, WA_MESSAGE_MAX } from "../BusinessSection";

const decode = (s: string) => decodeURIComponent(s);

type Lang = "fr" | "en";
const LANGS: Lang[] = ["fr", "en"];

const GREETINGS_FR = ["Bonjour", "Salut", "Coucou"];
const GREETINGS_EN = ["Hello", "Hi", "Hey"];
const GREETING_RE = new RegExp(`\\b(${[...GREETINGS_FR, ...GREETINGS_EN].join("|")})\\b`, "gi");

/**
 * Génère une matrice large d'inputs pour stresser la production des messages
 * dans les deux langues et garantir l'absence de doublons d'introduction
 * et de ponctuation cassée, quelle que soit la combinaison.
 */
const NAMES = [
  "",
  "Aïcha",
  "  Aïcha  ",
  "Bonjour Aïcha",
  "Hello, my name is John",
  "Hi I'm Jane",
  "Salut, je suis Marc",
  "bonjour aïcha",
  "D'Artagnan",
  "D’Artagnan",
  "Jean\u00A0Pierre",
  "Aï\u200Bcha\uFEFF",
  "Aïcha\nKoné",
];

const CITIES = ["", "Abidjan", " Abidjan\r\n", "Abidjan\u00A0Cocody"];
const GOALS = [undefined, "revente", "distribution", "demarrage", "info"] as const;
const SECTORS = ["", "Cocody", "  Cocody — Angré  ", "«Quartier» 220 logements"];
const PHONES = ["", "+225 07 00 00 00 00", "+225\u00A007\u200B00 00 00 00"];

type Combo = [string, string, (typeof GOALS)[number], string, string];

const ALL_COMBOS: Combo[] = (() => {
  const combos: Combo[] = [];
  for (const n of NAMES)
    for (const c of CITIES)
      for (const g of GOALS)
        for (const s of SECTORS) for (const p of PHONES) combos.push([n, c, g, s, p]);
  return combos;
})();

describe("buildWhatsAppMessage — parité FR/EN", () => {
  describe.each(LANGS)("langue = %s", (lang) => {
    it("ne contient jamais deux salutations (anti-doublon d'introduction)", () => {
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        const greetings = out.match(GREETING_RE) ?? [];
        expect(
          greetings.length,
          `Doublon de salutation (${lang}) : ${JSON.stringify(greetings)} dans "${out}"`,
        ).toBeLessThanOrEqual(1);
      }
    });

    it("commence toujours par la salutation attendue", () => {
      const expected = lang === "fr" ? /^Bonjour/ : /^Hello/;
      for (const [n, c, g, s, p] of ALL_COMBOS.slice(0, 60)) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out, `Mauvaise intro (${lang}) : "${out}"`).toMatch(expected);
      }
    });

    it("ne contient jamais la salutation de l'autre langue", () => {
      const forbidden = lang === "fr" ? /\b(Hello|Hi|Hey)\b/ : /\b(Bonjour|Salut|Coucou)\b/i;
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out, `Salutation étrangère (${lang}) dans : "${out}"`).not.toMatch(forbidden);
      }
    });

    it("n'a jamais de double espace", () => {
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out, `Double espace (${lang}) dans : "${out}"`).not.toMatch(/ {2,}/);
      }
    });

    it("n'a jamais d'espace avant une virgule, un point ou un point-virgule", () => {
      // NB : on autorise « espace + ':' » (typographie française : « Mon numéro : ... »).
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out, `Espace avant ponct. (${lang}) : "${out}"`).not.toMatch(/\s[,.;]/);
      }
    });

    it("n'a jamais de ponctuation collée à une lettre suivante (.X interdit)", () => {
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out, `Ponct. collée (${lang}) : "${out}"`).not.toMatch(/[.,;:][A-Za-zÀ-ÿ]/);
      }
    });

    it("n'a jamais de double ponctuation (.. ,, ;; ,. .,)", () => {
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out, `Double ponct. (${lang}) : "${out}"`).not.toMatch(/[.,;:]{2,}/);
        expect(out, `Séquence ,. ou ., (${lang}) : "${out}"`).not.toMatch(/[,.][,.]/);
      }
    });

    it("ne commence pas par une virgule + majuscule (mauvaise jointure)", () => {
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out, `Virgule + maj (${lang}) : "${out}"`).not.toMatch(/, [A-ZÀ-Ý]/);
      }
    });

    it("se termine toujours par un point (clôture propre)", () => {
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out.trimEnd(), `Pas de point final (${lang}) : "${out}"`).toMatch(/\.$/);
      }
    });

    it("ne contient ni saut de ligne, ni caractère invisible, ni NBSP", () => {
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out, `Caractère interdit (${lang}) : "${out}"`).not.toMatch(
          /[\r\n\u00A0\u200B-\u200F\uFEFF]/,
        );
      }
    });

    it("respecte toujours WA_MESSAGE_MAX", () => {
      for (const [n, c, g, s, p] of ALL_COMBOS) {
        const out = decode(buildWhatsAppMessage(n, c, g, s, p, lang));
        expect(out.length).toBeLessThanOrEqual(WA_MESSAGE_MAX);
      }
    });

    it("est déterministe (même entrée → même sortie)", () => {
      for (const [n, c, g, s, p] of ALL_COMBOS.slice(0, 50)) {
        const a = buildWhatsAppMessage(n, c, g, s, p, lang);
        const b = buildWhatsAppMessage(n, c, g, s, p, lang);
        expect(a).toBe(b);
      }
    });
  });

  describe("EN — assertions spécifiques", () => {
    it("utilise « Hello » et non « Bonjour »", () => {
      const out = decode(buildWhatsAppMessage("Aïcha", "Abidjan", "revente", "Cocody", "0707", "en"));
      expect(out).toContain("Hello, I'm Aïcha (Abidjan).");
      expect(out).not.toMatch(/Bonjour/);
    });

    it("retire « Hello, my name is » tapé dans le champ nom", () => {
      const out = decode(buildWhatsAppMessage("Hello, my name is John", "", "info", "", "", "en"));
      const greetings = out.match(/\b(Hello|Hi|Hey)\b/g) ?? [];
      expect(greetings.length).toBe(1);
      expect(out).toMatch(/John/);
    });

    it("ne répète jamais « I'm » (intro + fallbackGoal)", () => {
      const out = decode(buildWhatsAppMessage("John", "London", undefined, "", "", "en"));
      const matches = out.match(/I'm|I am/g) ?? [];
      expect(matches.length, `'I'm' répété : ${out}`).toBeLessThanOrEqual(1);
    });

    it("clôture par « Please get back to me as soon as possible. »", () => {
      const out = decode(buildWhatsAppMessage("John", "", "info", "", "", "en"));
      expect(out).toMatch(/Please get back to me as soon as possible\.$/);
    });
  });

  describe("FR — assertions spécifiques", () => {
    it("utilise « Bonjour » et non « Hello »", () => {
      const out = decode(buildWhatsAppMessage("Aïcha", "Abidjan", "revente", "Cocody", "0707", "fr"));
      expect(out).toContain("Bonjour, je suis Aïcha (Abidjan).");
      expect(out).not.toMatch(/\bHello\b/);
    });

    it("clôture par « Merci de me recontacter dès que possible. »", () => {
      const out = decode(buildWhatsAppMessage("Aïcha", "", "info", "", "", "fr"));
      expect(out).toMatch(/Merci de me recontacter dès que possible\.$/);
    });
  });
});
