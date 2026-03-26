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

// Safely open external links
export const safeOpenExternal = (url: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.click();
};
