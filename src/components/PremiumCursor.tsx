import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CURSOR_PREFERENCE_EVENT, isCustomCursorDisabled, setCustomCursorDisabled } from "@/config/cursorPreferences";
import { getCursorThemeForPath, type CursorThemeName } from "@/config/cursorThemes";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  active: boolean;
  pressed: boolean;
  scrolling: boolean;
  keyboard: boolean;
  reducedMotion: boolean;
  theme: CursorThemeName;
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
  const location = useLocation();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const cursor = useRef({ x: 0, y: 0, ringX: 0, ringY: 0, auraX: 0, auraY: 0, scrollVelocity: 0, lastY: 0, lastScrollTime: 0, lastFrame: 0 });
  const scrollTimeout = useRef<number>();
  const [disabled, setDisabled] = useState(() => isCustomCursorDisabled());
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    visible: false,
    active: false,
    pressed: false,
    scrolling: false,
    keyboard: false,
    reducedMotion: false,
    theme: getCursorThemeForPath(window.location.pathname),
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, theme: getCursorThemeForPath(location.pathname) }));
  }, [location.pathname]);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setState((prev) => ({ ...prev, reducedMotion: reducedMotionQuery.matches }));
    document.documentElement.classList.toggle("custom-cursor-disabled", disabled || !supportsFinePointer);
    if (!supportsFinePointer || disabled) return;

    let frame = 0;

    const animate = (timestamp: number) => {
      const delta = cursor.current.lastFrame ? Math.min((timestamp - cursor.current.lastFrame) / 16.67, 2) : 1;
      cursor.current.lastFrame = timestamp;
      const scrollDrag = reducedMotionQuery.matches ? 0 : Math.min(Math.abs(cursor.current.scrollVelocity) / 1200, 0.1);
      const ringEase = 1 - Math.pow(1 - (0.18 - scrollDrag), delta);
      const auraEase = 1 - Math.pow(1 - (0.11 - scrollDrag * 0.45), delta);

      cursor.current.ringX += (cursor.current.x - cursor.current.ringX) * ringEase;
      cursor.current.ringY += (cursor.current.y - cursor.current.ringY) * ringEase;
      cursor.current.auraX += (cursor.current.x - cursor.current.auraX) * auraEase;
      cursor.current.auraY += (cursor.current.y - cursor.current.auraY) * auraEase;
      cursor.current.scrollVelocity *= Math.pow(0.86, delta);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${cursor.current.ringX}px, ${cursor.current.ringY}px, 0) translate(-50%, -50%)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${cursor.current.auraX}px, ${cursor.current.auraY}px, 0) translate(-50%, -50%)`;
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
      setState((prev) => ({ ...prev, active: Boolean(target?.closest(interactiveSelector)), keyboard: false }));
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePosition(event);
      updateTarget(event);
    };

    const handlePointerDown = () => setState((prev) => ({ ...prev, pressed: true }));
    const handlePointerUp = () => setState((prev) => ({ ...prev, pressed: false }));
    const handlePointerLeave = () => setState((prev) => ({ ...prev, visible: false }));
    const handlePointerEnter = () => setState((prev) => ({ ...prev, visible: true }));
    const handleScroll = () => {
      const now = performance.now();
      const deltaTime = Math.max(now - cursor.current.lastScrollTime, 16.67);
      const deltaY = window.scrollY - cursor.current.lastY;
      cursor.current.scrollVelocity = (deltaY / deltaTime) * 1000;
      cursor.current.lastY = window.scrollY;
      cursor.current.lastScrollTime = now;
      setState((prev) => (prev.scrolling ? prev : { ...prev, scrolling: true }));
      window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => setState((prev) => ({ ...prev, scrolling: false })), 120);
    };
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.matches(interactiveSelector)) return;
      const rect = target.getBoundingClientRect();
      cursor.current.x = rect.left + rect.width / 2;
      cursor.current.y = rect.top + rect.height / 2;
      setState((prev) => ({ ...prev, x: cursor.current.x, y: cursor.current.y, visible: true, active: true, keyboard: true, theme: "focus" }));
    };
    const handleFocusOut = () => setState((prev) => ({ ...prev, active: false, keyboard: false, theme: getCursorThemeForPath(location.pathname) }));
    const handleReducedMotionChange = () => setState((prev) => ({ ...prev, reducedMotion: reducedMotionQuery.matches }));
    cursor.current.lastY = window.scrollY;
    cursor.current.lastScrollTime = performance.now();

    frame = requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.documentElement.addEventListener("pointerenter", handlePointerEnter, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      window.clearTimeout(scrollTimeout.current);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, [disabled, location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("custom-cursor-disabled", disabled);
  }, [disabled]);

  useEffect(() => {
    const syncPreference = () => setDisabled(isCustomCursorDisabled());
    window.addEventListener("storage", syncPreference);
    window.addEventListener(CURSOR_PREFERENCE_EVENT, syncPreference);
    return () => {
      window.removeEventListener("storage", syncPreference);
      window.removeEventListener(CURSOR_PREFERENCE_EVENT, syncPreference);
    };
  }, []);

  if (disabled) {
    return (
      <button className="premium-cursor-toggle" type="button" onClick={() => setCustomCursorDisabled(false)} aria-label="Activer le curseur personnalisé">
        Curseur
      </button>
    );
  }

  return (
    <>
      <button className="premium-cursor-toggle" type="button" onClick={() => setCustomCursorDisabled(true)} aria-label="Désactiver le curseur personnalisé">
        Curseur
      </button>
      <div
        aria-hidden="true"
        className={`premium-cursor is-${state.theme} ${state.visible ? "is-visible" : ""} ${state.active ? "is-active" : ""} ${state.pressed ? "is-pressed" : ""} ${state.scrolling ? "is-scrolling" : ""} ${state.keyboard ? "is-keyboard" : ""} ${state.reducedMotion ? "is-reduced-motion" : ""}`}
        style={{ "--cursor-x": `${state.x}px`, "--cursor-y": `${state.y}px` } as CSSProperties}
      >
        <div ref={auraRef} className="premium-cursor__aura" />
        <div ref={ringRef} className="premium-cursor__ring" />
        <div ref={dotRef} className="premium-cursor__dot" />
      </div>
    </>
  );
};

export default PremiumCursor;