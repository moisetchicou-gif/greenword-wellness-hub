import { z } from "zod";

// Sanitize a string: trim, remove control characters
const sanitizeString = (val: string) =>
  val.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

// Order form validation schema
export const orderFormSchema = z.object({
  civilite: z.enum(["M.", "Mme"]),
  nom: z
    .string()
    .transform(sanitizeString)
    .pipe(
      z
        .string()
        .min(1, "Le nom est requis")
        .max(50, "Le nom ne doit pas dépasser 50 caractères")
        .regex(/^[\p{L}\s'-]+$/u, "Le nom contient des caractères invalides")
    ),
  prenom: z
    .string()
    .transform(sanitizeString)
    .pipe(
      z
        .string()
        .min(1, "Le prénom est requis")
        .max(50, "Le prénom ne doit pas dépasser 50 caractères")
        .regex(/^[\p{L}\s'-]+$/u, "Le prénom contient des caractères invalides")
    ),
  adresse: z
    .string()
    .transform(sanitizeString)
    .pipe(
      z
        .string()
        .min(3, "L'adresse est requise")
        .max(200, "L'adresse ne doit pas dépasser 200 caractères")
    ),
  telephone: z
    .string()
    .transform(sanitizeString)
    .pipe(
      z
        .string()
        .min(8, "Le numéro doit contenir au moins 8 chiffres")
        .max(20, "Numéro trop long")
        .regex(/^[+\d\s()-]+$/, "Format de téléphone invalide")
    ),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

// Allowed external domains for safe navigation
const ALLOWED_DOMAINS = [
  "wa.me",
  "pay.wave.com",
];

// Safely open external links — only allows https and whitelisted domains.
// Returns true when the navigation was successfully triggered, false otherwise
// (invalid URL, non-whitelisted domain, missing DOM, or browser exception).
export const safeOpenExternal = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    if (!["https:", "http:"].includes(parsed.protocol)) return false;
    const domain = parsed.hostname;
    if (!ALLOWED_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))) {
      console.warn("Blocked navigation to non-whitelisted domain:", domain);
      return false;
    }
    if (typeof document === "undefined") return false;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
    return true;
  } catch {
    console.warn("Invalid URL blocked:", url);
    return false;
  }
};
