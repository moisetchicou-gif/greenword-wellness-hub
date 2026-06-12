import { useEffect, useRef } from "react";

/**
 * Curseur simple et performant.
 * - Un point net qui suit instantanément + un anneau qui suit en douceur.
 * - Une seule boucle requestAnimationFrame, transforms GPU uniquement.
 * - Désactivé automatiquement sur écrans tactiles / sans pointeur fin.
 */
const interactiveSelector = "a,button,input,textarea,select,summary,[role='button'],[role='link'],[tabindex]:not([tabindex='-1']),label";

const SimpleCursor = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let visible = false;

    const root = rootRef.current!;
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const animate = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        root.classList.add("is-visible");
      }
      const active = !!(e.target as Element | null)?.closest(interactiveSelector);
      root.classList.toggle("is-active", active);
    };
    const onDown = () => root.classList.add("is-pressed");
    const onUp = () => root.classList.remove("is-pressed");
    const onLeave = () => {
      visible = false;
      root.classList.remove("is-visible");
    };

    raf = requestAnimationFrame(animate);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="simple-cursor">
      <div ref={ringRef} className="simple-cursor__ring" />
      <div ref={dotRef} className="simple-cursor__dot" />
    </div>
  );
};

export default SimpleCursor;
