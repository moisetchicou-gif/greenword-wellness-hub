// Logique de redirection canonique vers le domaine .com
// Extraite pour pouvoir être testée unitairement.

export const CANONICAL_HOST = "greenworldprestige.com";

export interface LocationLike {
  hostname: string;
  pathname: string;
  search: string;
  hash: string;
  protocol: string;
}

/**
 * Renvoie l'URL absolue vers laquelle rediriger,
 * ou `null` si aucune redirection ne doit être effectuée.
 */
export function getCanonicalRedirectUrl(loc: LocationLike): string | null {
  const { hostname, pathname, search, hash, protocol } = loc;

  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".local");

  const isLovablePreview =
    hostname.includes("id-preview--") ||
    hostname.endsWith(".lovableproject.com");

  const isPublishedLovable = hostname.endsWith(".lovable.app");

  const isCanonical =
    hostname === CANONICAL_HOST || hostname === `www.${CANONICAL_HOST}`;

  // Force HTTPS sur le domaine canonique
  if (isCanonical && protocol === "http:") {
    return `https://${hostname}${pathname}${search}${hash}`;
  }

  // Redirige depuis le domaine .lovable.app publié (pas le preview, pas le local)
  if (isPublishedLovable && !isLovablePreview && !isLocal) {
    return `https://${CANONICAL_HOST}${pathname}${search}${hash}`;
  }

  return null;
}
