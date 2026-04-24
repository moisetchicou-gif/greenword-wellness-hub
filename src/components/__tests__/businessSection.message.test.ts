import { describe, it, expect } from "vitest";
import { buildWhatsAppMessage } from "../BusinessSection";

const decode = (s: string) => decodeURIComponent(s);

describe("buildWhatsAppMessage", () => {
  it("génère un message FR sans nom ni ville", () => {
    const out = decode(buildWhatsAppMessage("", "", undefined, "", "", "fr"));
    expect(out).toContain("Bonjour,");
    expect(out).toContain("Je suis intéressé(e) par l'opportunité Business Green World");
    expect(out).toContain("Pouvez-vous me donner plus d'informations ?");
  });

  it("tolère undefined / null pour name, city, sector, phone", () => {
    expect(() =>
      buildWhatsAppMessage(undefined, undefined, undefined, undefined, undefined, "fr"),
    ).not.toThrow();
    expect(() =>
      // @ts-expect-error - simulate runtime null
      buildWhatsAppMessage(null, null, undefined, null, null, "fr"),
    ).not.toThrow();
  });

  it("inclut le nom et la ville quand renseignés (FR)", () => {
    const out = decode(buildWhatsAppMessage("Aïcha", "Abidjan", undefined, "", "", "fr"));
    expect(out).toContain("Bonjour, je suis Aïcha (Abidjan).");
  });

  it("affiche la ville même sans nom", () => {
    const out = decode(buildWhatsAppMessage("", "Abidjan", undefined, "", "", "fr"));
    expect(out).toContain("Bonjour (Abidjan),");
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
    expect(out).toContain("Je suis intéressé(e) par l'opportunité Business Green World");
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
});
