import { useEffect, useRef, useState } from "react";
import { Eye, Users } from "lucide-react";

/**
 * Badge "présence" cohérent SANS backend.
 *
 * - Visiteurs en ligne : valeur pseudo-aléatoire bornée selon l'heure de la
 *   journée (creux la nuit, pic en fin d'après-midi). Réévaluée toutes les
 *   ~12 s avec une variation douce de ±1/2 pour rester crédible.
 * - Total cumulé : croissance déterministe depuis une date de lancement
 *   (≈ 180 visites/jour en moyenne) — toujours identique pour un instant
 *   donné, donc cohérent entre rechargements et entre visiteurs.
 *
 * Aucun stockage, aucun appel réseau, aucune donnée personnelle.
 */

const LAUNCH_DATE = new Date("2024-01-15T00:00:00Z").getTime();
const AVG_VISITS_PER_DAY = 180;
const BASE_TOTAL = 12_480; // socle historique avant mise en ligne du compteur
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Courbe d'affluence par heure (0-23), valeurs indicatives. */
const HOURLY_CURVE = [
  3, 2, 2, 2, 2, 3, 5, 8, 12, 15, 17, 18,
  19, 18, 17, 19, 22, 24, 23, 20, 16, 12, 8, 5,
];

const computeOnline = (date: Date): number => {
  const h = date.getHours();
  const base = HOURLY_CURVE[h] ?? 10;
  // Variation douce déterministe par tranche de 12 s
  const slot = Math.floor(date.getTime() / 12_000);
  const jitter = ((slot * 9301 + 49297) % 7) - 3; // -3..+3
  return Math.max(2, base + jitter);
};

const computeTotal = (date: Date): number => {
  const elapsedDays = (date.getTime() - LAUNCH_DATE) / MS_PER_DAY;
  // Petite ondulation pour éviter un nombre figé entre deux ticks
  const intraDay = Math.floor(
    ((date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) /
      86_400) *
      AVG_VISITS_PER_DAY,
  );
  return BASE_TOTAL + Math.floor(elapsedDays) * AVG_VISITS_PER_DAY + intraDay;
};

const formatNumber = (n: number) =>
  n.toLocaleString("fr-FR").replace(/\u202f/g, " ");

/** Hook : interpole en douceur d'une valeur cible à l'autre sur `duration` ms. */
const useSmoothNumber = (target: number, duration = 1500) => {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === display) return;
    fromRef.current = display;
    startRef.current = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const value = fromRef.current + (target - fromRef.current) * eased;
      setDisplay(t === 1 ? target : value);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return display;
};

const LiveVisitorsBadge = () => {
  const [online, setOnline] = useState(() => computeOnline(new Date()));
  const [total, setTotal] = useState(() => computeTotal(new Date()));
  const [pulseKey, setPulseKey] = useState(0);

  const onlineDisplay = useSmoothNumber(online, 1200);
  const totalDisplay = useSmoothNumber(total, 1500);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setOnline(computeOnline(now));
      setTotal(computeTotal(now));
      setPulseKey((k) => k + 1);
    };
    const id = window.setInterval(tick, 12_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border border-coral/20 bg-card/80 backdrop-blur px-4 py-2 shadow-sm transition-all duration-500"
      role="status"
      aria-live="polite"
      aria-label={`${online} visiteurs en ligne, ${formatNumber(total)} visites au total`}
    >
      <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
        </span>
        <Eye className="w-3.5 h-3.5 text-coral" aria-hidden="true" />
        <span>
          <strong
            key={`online-${pulseKey}`}
            className="font-display font-bold inline-block tabular-nums animate-fade-in"
          >
            {Math.round(onlineDisplay)}
          </strong>{" "}
          <span className="text-muted-foreground">en ligne</span>
        </span>
      </span>
      <span className="h-3 w-px bg-coral/20" aria-hidden="true" />
      <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
        <Users className="w-3.5 h-3.5 text-coral" aria-hidden="true" />
        <span>
          <strong className="font-display font-bold inline-block tabular-nums">
            {formatNumber(Math.round(totalDisplay))}
          </strong>{" "}
          <span className="text-muted-foreground">visites</span>
        </span>
      </span>
    </div>
  );
};

export default LiveVisitorsBadge;
