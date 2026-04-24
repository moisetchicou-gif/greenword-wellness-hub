import { describe, it, expect } from "vitest";
import { buildWhatsAppMessage, WA_MESSAGE_MAX } from "../BusinessSection";

const decode = (s: string) => decodeURIComponent(s);

describe("buildWhatsAppMessage", () => {
  it("génère un message FR sans nom ni ville", () => {
    const out = decode(buildWhatsAppMessage("", "", undefined, "", "", "fr"));
    expect(out).toContain("Bonjour.");
    expect(out).toContain("Je souhaite en savoir plus sur l'opportunité Business Green World");
    expect(out).toContain("Merci de me recontacter dès que possible.");
  });

  it("tolère undefined / null pour name, city, sector, phone", () => {
    expect(() =>
      buildWhatsAppMessage(undefined, undefined, undefined, undefined, undefined, "fr"),
    ).not.toThrow();
    expect(() =>
      buildWhatsAppMessage(
        null as unknown as string,
        null as unknown as string,
        undefined,
        null as unknown as string,
        null as unknown as string,
        "fr",
      ),
    ).not.toThrow();
  });

  it("inclut le nom et la ville quand renseignés (FR)", () => {
    const out = decode(buildWhatsAppMessage("Aïcha", "Abidjan", undefined, "", "", "fr"));
    expect(out).toContain("Bonjour, je suis Aïcha (Abidjan).");
  });

  it("affiche la ville même sans nom", () => {
    const out = decode(buildWhatsAppMessage("", "Abidjan", undefined, "", "", "fr"));
    expect(out).toContain("Bonjour (Abidjan).");
  });

  it.each([
    ["revente", "fr", "faire de la revente de produits"],
    ["distribution", "fr", "rejoindre le réseau de distribution"],
    ["demarrage", "fr", "démarrer une activité avec Green World"],
    ["info", "fr", "obtenir plus d'informations sur l'opportunité"],
    ["revente", "en", "resell the products"],
    ["distribution", "en", "join the distribution network"],
    ["demarrage", "en", "start a business with Green World"],
    ["info", "en", "get more information about the opportunity"],
  ] as const)("intègre l'objectif %s en %s", (goal, lang, expected) => {
    const out = decode(buildWhatsAppMessage("Aïcha", "", goal, "", "", lang));
    expect(out).toContain(expected);
  });

  it("ignore un objectif inconnu (whitelist)", () => {
    const out = decode(
      // @ts-expect-error - valeur volontairement invalide
      buildWhatsAppMessage("Aïcha", "", "hacker", "", "", "fr"),
    );
    expect(out).toContain("Je souhaite en savoir plus sur l'opportunité Business Green World");
  });

  it("intègre zone/secteur et téléphone quand renseignés", () => {
    const out = decode(
      buildWhatsAppMessage("Aïcha", "Abidjan", "revente", "Cocody", "+225 07 00 00 00 00", "fr"),
    );
    expect(out).toContain("Zone / secteur : Cocody.");
    expect(out).toContain("Mon numéro : +225 07 00 00 00 00.");
  });

  it("génère une URI correctement encodée (pas de caractères bruts non encodés)", () => {
    const raw = buildWhatsAppMessage("Aïcha", "Abidjan", "revente", "", "", "fr");
    expect(raw).not.toContain(" ");
    expect(raw).not.toContain("\n");
    // Doit pouvoir être décodée sans erreur
    expect(() => decodeURIComponent(raw)).not.toThrow();
  });

  it("fallback sur FR si lang inconnue", () => {
    // @ts-expect-error - lang invalide
    const out = decode(buildWhatsAppMessage("Aïcha", "", undefined, "", "", "es"));
    expect(out).toContain("Bonjour");
  });

  describe("longueur maximale", () => {
    it("ne dépasse jamais WA_MESSAGE_MAX (texte décodé)", () => {
      const longSector = "Cocody ".repeat(500); // ~3500 chars
      const out = decode(
        buildWhatsAppMessage("Aïcha", "Abidjan", "revente", longSector, "+225 07 00 00 00 00", "fr"),
      );
      expect(out.length).toBeLessThanOrEqual(WA_MESSAGE_MAX);
    });

    it("préserve intro, objectif, téléphone et clôture quand le secteur est trop long", () => {
      const longSector = "x ".repeat(1000);
      const out = decode(
        buildWhatsAppMessage("Aïcha", "Abidjan", "revente", longSector, "+225 07 00 00 00 00", "fr"),
      );
      expect(out).toContain("Bonjour, je suis Aïcha (Abidjan).");
      expect(out).toContain("Mon objectif : faire de la revente de produits.");
      expect(out).toContain("Mon numéro : +225 07 00 00 00 00.");
      expect(out).toContain("Merci de me recontacter dès que possible.");
    });

    it("tronque le secteur avec une ellipse propre (pas de mot coupé en plein milieu)", () => {
      const longSector = "Cocody ".repeat(500);
      const out = decode(buildWhatsAppMessage("A", "", "revente", longSector, "", "fr"));
      // Le secteur doit se terminer par … suivi du point final.
      expect(out).toMatch(/Zone \/ secteur : .+…\./);
      // Pas de mot Cocody coupé (ex : "Coco." ou "Cocod.")
      expect(out).not.toMatch(/Coco[a-z]?\./);
    });

    it("ne touche pas au secteur s'il rentre largement dans la limite", () => {
      const out = decode(buildWhatsAppMessage("A", "", "revente", "Cocody", "", "fr"));
      expect(out).toContain("Zone / secteur : Cocody.");
      expect(out).not.toContain("…");
    });

    it("supprime totalement la ligne secteur s'il ne reste pas la place pour un fragment lisible", () => {
      // Nom qui sature presque tout l'espace.
      const hugeName = "x".repeat(WA_MESSAGE_MAX - 50);
      const out = decode(buildWhatsAppMessage(hugeName, "", "revente", "Cocody", "", "fr"));
      expect(out).not.toContain("Zone / secteur");
      expect(out.length).toBeLessThanOrEqual(WA_MESSAGE_MAX);
    });
  });

  describe("anomalies de phrasé", () => {
    it("ne contient jamais 'Bonjour' deux fois", () => {
      const cases = [
        buildWhatsAppMessage("", "", undefined, "", "", "fr"),
        buildWhatsAppMessage("Aïcha", "", undefined, "", "", "fr"),
        buildWhatsAppMessage("Aïcha", "Abidjan", "revente", "Cocody", "0707", "fr"),
        buildWhatsAppMessage("", "Abidjan", "info", "", "", "fr"),
      ];
      for (const raw of cases) {
        const out = decode(raw);
        const matches = out.match(/Bonjour/g) ?? [];
        expect(matches.length, `Trop de "Bonjour" dans : ${out}`).toBeLessThanOrEqual(1);
      }
    });

    it("ne répète pas 'Je suis' (intro + fallbackGoal)", () => {
      const out = decode(buildWhatsAppMessage("Aïcha", "Abidjan", undefined, "", "", "fr"));
      const matches = out.match(/[Jj]e suis/g) ?? [];
      expect(matches.length, `'je suis' répété dans : ${out}`).toBeLessThanOrEqual(1);
    });

    it("ne contient jamais de double espace", () => {
      const cases = [
        buildWhatsAppMessage("", "", undefined, "", "", "fr"),
        buildWhatsAppMessage("Aïcha", "Abidjan", "revente", "Cocody", "0707", "fr"),
        buildWhatsAppMessage("", "", undefined, "", "", "en"),
      ];
      for (const raw of cases) {
        const out = decode(raw);
        expect(out, `Double espace dans : ${out}`).not.toMatch(/ {2,}/);
      }
    });

    it("ne commence pas par une virgule suivie d'une majuscule (mauvaise ponctuation)", () => {
      const out = decode(buildWhatsAppMessage("", "Abidjan", "info", "", "", "fr"));
      // Anti-régression : avant on avait "Bonjour (Abidjan), Mon objectif" → virgule + majuscule.
      expect(out).not.toMatch(/, [A-ZÀ-Ý]/);
    });
  });

  describe("normalisation supplémentaire des inputs", () => {
    it("supprime les sauts de ligne dans tous les champs", () => {
      const out = decode(
        buildWhatsAppMessage(
          "Aïcha\nKoné",
          "Abidjan\r\nCocody",
          "revente",
          "Cocody\nAngré",
          "+225\n07 00 00 00 00",
          "fr",
        ),
      );
      expect(out).not.toMatch(/[\r\n]/);
      expect(out).toContain("Aïcha Koné");
      expect(out).toContain("Cocody Angré");
    });

    it("normalise les apostrophes typographiques (’ ‘ ´ ′)", () => {
      const out = decode(buildWhatsAppMessage("D’Artagnan", "L‘Abidjan", "revente", "Quartier d´élite", "", "fr"));
      expect(out).not.toMatch(/[’‘´′]/);
      expect(out).toContain("D'Artagnan");
      expect(out).toContain("L'Abidjan");
    });

    it("normalise les guillemets typographiques", () => {
      const out = decode(buildWhatsAppMessage("Jean «Le Roi»", "", "revente", "", "", "fr"));
      expect(out).not.toMatch(/[«»“”]/);
      expect(out).toContain('"Le Roi"');
    });

    it("normalise les tirets longs (— – ‒ ―)", () => {
      const out = decode(buildWhatsAppMessage("", "", "revente", "Abidjan — Cocody – Angré", "", "fr"));
      expect(out).not.toMatch(/[—–‒―]/);
      expect(out).toContain("Abidjan - Cocody - Angré");
    });

    it("supprime les caractères invisibles (zero-width, BOM)", () => {
      const out = decode(
        buildWhatsAppMessage("Aï\u200Bcha\uFEFF", "Abi\u200Cdjan", "revente", "Co\u200Dcody", "07\u200B00", "fr"),
      );
      expect(out).not.toMatch(/[\u200B-\u200F\uFEFF]/);
      expect(out).toContain("Aïcha");
      expect(out).toContain("Abidjan");
    });

    it("normalise les espaces non-cassables (NBSP) en espace standard", () => {
      const out = decode(buildWhatsAppMessage("Aïcha\u00A0Koné", "", "revente", "", "", "fr"));
      expect(out).not.toMatch(/\u00A0/);
      expect(out).toContain("Aïcha Koné");
    });

    it("retire le préfixe « Bonjour » tapé par erreur dans le champ nom", () => {
      const cases = [
        "Bonjour Aïcha",
        "Bonjour, je suis Aïcha",
        "Salut Aïcha",
        "Hello Aïcha",
        "bonjour aïcha", // casse
      ];
      for (const inputName of cases) {
        const out = decode(buildWhatsAppMessage(inputName, "", "revente", "", "", "fr"));
        const greetings = out.match(/Bonjour|Hello|Salut/gi) ?? [];
        expect(greetings.length, `"${inputName}" → ${out}`).toBeLessThanOrEqual(1);
        expect(out, `"${inputName}" → ${out}`).toMatch(/aïcha/i);
      }
    });

    it("retire le préfixe « my name is » / « I'm » en anglais", () => {
      const out = decode(buildWhatsAppMessage("Hello, my name is John", "", "revente", "", "", "en"));
      const greetings = out.match(/Hello|Hi/g) ?? [];
      expect(greetings.length).toBeLessThanOrEqual(1);
      expect(out).toMatch(/John/);
    });

    it("ne contient jamais d'espace avant une virgule ou un point", () => {
      const out = decode(
        buildWhatsAppMessage("Aïcha   ", "  Abidjan  ", "revente", "  Cocody  ", "  0707  ", "fr"),
      );
      expect(out).not.toMatch(/\s[,.;]/);
    });

    it("garantit un espace après chaque ponctuation", () => {
      const out = decode(buildWhatsAppMessage("Aïcha", "Abidjan", "revente", "Cocody", "0707", "fr"));
      // Pas de ponctuation collée à une lettre suivante (".Mon" interdit)
      expect(out).not.toMatch(/[.,;][A-Za-zÀ-ÿ]/);
    });

    it("est idempotent : rappeler la fonction sur le résultat normalisé donne le même rendu", () => {
      const a = decode(buildWhatsAppMessage("  Aïcha\n", " Abidjan ", "revente", "Cocody", "0707", "fr"));
      const b = decode(buildWhatsAppMessage("  Aïcha\n", " Abidjan ", "revente", "Cocody", "0707", "fr"));
      expect(a).toBe(b);
    });

    it("gère un cas pathologique : tout combiné", () => {
      const out = decode(
        buildWhatsAppMessage(
          "  Bonjour,\u00A0je suis\nD’Artagnan\u200B  ",
          "Abidjan\r\n—\u00A0Cocody",
          "revente",
          "  «Quartier»\u200B 220 logements  ",
          "+225\u00A007\u200B00 00 00 00",
          "fr",
        ),
      );
      const bonjours = out.match(/Bonjour/g) ?? [];
      expect(bonjours.length, `"Bonjour" répété dans : ${out}`).toBeLessThanOrEqual(1);
      expect(out).not.toMatch(/[\r\n\u00A0\u200B\uFEFF’«»—]/);
      expect(out).not.toMatch(/ {2,}/);
      expect(out).toContain("D'Artagnan");
    });
  });
});

