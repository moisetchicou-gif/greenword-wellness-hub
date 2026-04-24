import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Persistance localStorage avec :
 * - expiration TTL (par défaut : 30 jours)
 * - opt-in par préférence globale (clé `gw.persistence.consent.v1` = "1" pour autoriser)
 * - validation/typage défensif via un validator optionnel
 * - debounce des écritures (~300 ms) pour éviter la surcharge sur les inputs
 *
 * Si le consentement est refusé OU si le navigateur n'a pas de localStorage,
 * le hook se comporte comme un useState classique.
 */

const CONSENT_KEY = "gw.persistence.consent.v1";
const DEFAULT_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 jours

type StoredEnvelope<T> = {
  v: T;
  /** timestamp d'expiration (ms epoch) */
  exp: number;
};

const safeWindow = (): Window | null => (typeof window === "undefined" ? null : window);

export const isPersistenceAllowed = (): boolean => {
  const w = safeWindow();
  if (!w) return false;
  try {
    return w.localStorage.getItem(CONSENT_KEY) === "1";
  } catch {
    return false;
  }
};

export const setPersistenceAllowed = (allowed: boolean) => {
  const w = safeWindow();
  if (!w) return;
  try {
    if (allowed) w.localStorage.setItem(CONSENT_KEY, "1");
    else w.localStorage.removeItem(CONSENT_KEY);
    // Notifie les autres composants (même onglet + cross-onglet via 'storage' natif).
    w.dispatchEvent(new CustomEvent("gw:persistence-consent", { detail: { allowed } }));
  } catch {
    // ignore
  }
};

/** Supprime UNIQUEMENT les valeurs persistées par ce système (préfixe `gw.`). */
export const clearAllPersistedData = () => {
  const w = safeWindow();
  if (!w) return;
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < w.localStorage.length; i++) {
      const k = w.localStorage.key(i);
      if (k && k.startsWith("gw.") && k !== CONSENT_KEY) toRemove.push(k);
    }
    toRemove.forEach((k) => w.localStorage.removeItem(k));
  } catch {
    // ignore
  }
};

type Options<T> = {
  /** Validator pour rejeter une valeur stockée incohérente (sécurité). */
  validate?: (raw: unknown) => raw is T;
  /** TTL en ms ; défaut 30 jours. */
  ttlMs?: number;
  /** Délai de debounce pour l'écriture (défaut 300 ms). */
  debounceMs?: number;
};

const readPersisted = <T>(
  key: string,
  validate: ((raw: unknown) => raw is T) | undefined,
): T | undefined => {
  const w = safeWindow();
  if (!w || !isPersistenceAllowed()) return undefined;
  try {
    const raw = w.localStorage.getItem(key);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Partial<StoredEnvelope<unknown>>;
    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.exp !== "number" ||
      parsed.exp < Date.now()
    ) {
      // Expiré ou format invalide : on nettoie.
      w.localStorage.removeItem(key);
      return undefined;
    }
    if (validate && !validate(parsed.v)) return undefined;
    return parsed.v as T;
  } catch {
    return undefined;
  }
};

const writePersisted = <T>(key: string, value: T, ttlMs: number) => {
  const w = safeWindow();
  if (!w || !isPersistenceAllowed()) return;
  try {
    const envelope: StoredEnvelope<T> = { v: value, exp: Date.now() + ttlMs };
    w.localStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    // quota / mode privé : ignore silencieusement
  }
};

export function usePersistentState<T>(
  key: string,
  initialValue: T,
  options: Options<T> = {},
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const { validate, ttlMs = DEFAULT_TTL_MS, debounceMs = 300 } = options;

  // Lecture paresseuse au premier rendu uniquement.
  const [state, setState] = useState<T>(() => {
    const stored = readPersisted<T>(key, validate);
    return stored !== undefined ? stored : initialValue;
  });

  // Référence stable pour éviter de re-déclencher l'effet de debounce sur chaque rendu.
  const stateRef = useRef(state);
  stateRef.current = state;

  // Écriture debounced.
  useEffect(() => {
    const w = safeWindow();
    if (!w) return;
    const handle = w.setTimeout(() => {
      if (isPersistenceAllowed()) {
        writePersisted<T>(key, stateRef.current, ttlMs);
      }
    }, debounceMs);
    return () => w.clearTimeout(handle);
  }, [key, state, ttlMs, debounceMs]);

  // Si l'utilisateur révoque le consentement, on supprime la clé immédiatement.
  useEffect(() => {
    const w = safeWindow();
    if (!w) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ allowed: boolean }>).detail;
      if (detail && detail.allowed === false) {
        try {
          w.localStorage.removeItem(key);
        } catch {
          // ignore
        }
      }
    };
    w.addEventListener("gw:persistence-consent", handler);
    return () => w.removeEventListener("gw:persistence-consent", handler);
  }, [key]);

  const reset = useCallback(() => {
    setState(initialValue);
    const w = safeWindow();
    if (!w) return;
    try {
      w.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }, [initialValue, key]);

  return [state, setState, reset];
}
