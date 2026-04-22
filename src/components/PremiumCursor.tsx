import { useEffect, useRef, useState } from "react";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  active: boolean;
  pressed: boolean;
};

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "summary",
  "[role='button']",
  "[role='link']",
  "[tabindex]:not([tabindex='-1'])",
  "video",
].join(",");

const PremiumCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursor = useRef({ x: 0, y: 0, ringX: 0, ringY: 0 });
  const [state, setState] = useState<CursorState>({ x: 0, y: 0, visible: false, active: false, pressed: false });

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsFinePointer) return;

    let frame = 0;

    const animate = () => {
      cursor.current.ringX += (cursor.current.x - cursor.current.ringX) * 0.18;
      cursor.current.ringY += (cursor.current.y - cursor.current.ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${cursor.current.ringX}px, ${cursor.current.ringY}px, 0) translate(-50%, -50%)`;
      }

      frame = requestAnimationFrame(animate);
    };

    const updatePosition = (event: PointerEvent) => {
      cursor.current.x = event.clientX;
      cursor.current.y = event.clientY;
      setState((prev) => ({ ...prev, x: event.clientX, y: event.clientY, visible: true }));
    };

    const updateTarget = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setState((prev) => ({ ...prev, active: Boolean(target?.closest(interactiveSelector)) }));
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePosition(event);
      updateTarget(event);
    };

    const handlePointerDown = () => setState((prev) => ({ ...prev, pressed: true }));
    const handlePointerUp = () => setState((prev) => ({ ...prev, pressed: false }));
    const handlePointerLeave = () => setState((prev) => ({ ...prev, visible: false }));
    const handlePointerEnter = () => setState((prev) => ({ ...prev, visible: true }));

    frame = requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.documentElement.addEventListener("pointerenter", handlePointerEnter, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`premium-cursor ${state.visible ? "is-visible" : ""} ${state.active ? "is-active" : ""} ${state.pressed ? "is-pressed" : ""}`}
      style={{ "--cursor-x": `${state.x}px`, "--cursor-y": `${state.y}px` } as React.CSSProperties}
    >
      <div ref={ringRef} className="premium-cursor__ring" />
      <div ref={dotRef} className="premium-cursor__dot" />
    </div>
  );
};

export default PremiumCursor;