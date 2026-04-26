import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

/**
 * Badge "X personnes regardent ce produit" — sans backend.
 *
 * - Valeur déterministe par produit (hash du productId) pour rester cohérente
 *   entre rechargements et entre visiteurs.
 * - Modulée par l'heure de la journée (creux la nuit, pic l'après-midi).
 * - Réévaluée toutes les 12 s avec une variation douce (±1/2).
 * - Transition animée du chiffre via requestAnimationFrame (easing-out).
 */

const HOURLY_CURVE = [
  2, 1, 1, 1, 1, 2, 3, 4, 6, 7, 8, 9,
  10, 9, 8, 9, 11, 12, 11, 9, 7, 5, 4, 3,
];

const hashString = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

const computeViewers = (productId: string, date: Date): number => {
  const seed = hashString(productId);
  const baseAffinity = (seed % 5) - 2; // -2..+2 : popularité intrinsèque
  const hourly = HOURLY_CURVE[date.getHours()] ?? 6;
  const slot = Math.floor(date.getTime() / 12_000);
  const jitter = (((seed + slot) * 9301 + 49297) % 5) - 2; // -2..+2
  return Math.max(1, hourly + baseAffinity + jitter);
};

const useSmoothNumber = (target: number, duration = 1200) => {
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
      const value = fromRef.current + (target - fromRef.current) * easeOutCubic(t);
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

interface Props {
  productId: string;
  className?: string;
}

const ProductViewersBadge = ({ productId, className = "" }: Props) => {
  const [count, setCount] = useState(() => computeViewers(productId, new Date()));
  const display = useSmoothNumber(count, 1000);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount(computeViewers(productId, new Date()));
    }, 12_000);
    return () => window.clearInterval(id);
  }, [productId]);

  const rounded = Math.round(display);

  return (
    <div
      className={`flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-muted-foreground ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`${rounded} personnes regardent ce produit`}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-coral" />
      </span>
      <Eye className="w-3 h-3 text-coral shrink-0" aria-hidden="true" />
      <span className="tabular-nums">
        <strong className="font-semibold text-accent">{rounded}</strong>{" "}
        <span className="hidden sm:inline">personnes regardent</span>
        <span className="sm:hidden">en ligne</span>
      </span>
    </div>
  );
};

export default ProductViewersBadge;
