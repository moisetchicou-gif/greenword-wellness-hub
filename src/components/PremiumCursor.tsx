import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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

const CURSOR_DISABLED_KEY = "gw-custom-cursor-disabled";

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
  const [disabled, setDisabled] = useState(() => localStorage.getItem(CURSOR_DISABLED_KEY) === "true");
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
    if (!supportsFinePointer) return;

    let frame = 0;

    const animate = () => {
      const scrollDrag = Math.min(Math.abs(cursor.current.scrollVelocity) / 48, 0.1);
      const ringEase = 0.18 - scrollDrag;
      const auraEase = 0.11 - scrollDrag * 0.45;

      cursor.current.ringX += (cursor.current.x - cursor.current.ringX) * ringEase;
      cursor.current.ringY += (cursor.current.y - cursor.current.ringY) * ringEase;
      cursor.current.auraX += (cursor.current.x - cursor.current.auraX) * auraEase;
      cursor.current.auraY += (cursor.current.y - cursor.current.auraY) * auraEase;
      cursor.current.scrollVelocity *= 0.86;

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
      const section = target?.closest("section, header, footer, main");
      const sectionIndex = section ? Array.from(document.querySelectorAll("section, header, footer, main")).indexOf(section) : 0;
      const sectionTheme = sectionIndex % 3 === 1 ? "gold" : sectionIndex % 3 === 2 ? "deep" : "botanical";
      setState((prev) => ({ ...prev, active: Boolean(target?.closest(interactiveSelector)), section: sectionTheme }));
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
      cursor.current.scrollVelocity += window.scrollY - (handleScroll as typeof handleScroll & { lastY?: number }).lastY! || 0;
      (handleScroll as typeof handleScroll & { lastY?: number }).lastY = window.scrollY;
      setState((prev) => (prev.scrolling ? prev : { ...prev, scrolling: true }));
      window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => setState((prev) => ({ ...prev, scrolling: false })), 120);
    };
    (handleScroll as typeof handleScroll & { lastY?: number }).lastY = window.scrollY;

    frame = requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.documentElement.addEventListener("pointerenter", handlePointerEnter, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(scrollTimeout.current);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`premium-cursor is-${state.section} ${state.visible ? "is-visible" : ""} ${state.active ? "is-active" : ""} ${state.pressed ? "is-pressed" : ""} ${state.scrolling ? "is-scrolling" : ""}`}
      style={{ "--cursor-x": `${state.x}px`, "--cursor-y": `${state.y}px` } as CSSProperties}
    >
      <div ref={auraRef} className="premium-cursor__aura" />
      <div ref={ringRef} className="premium-cursor__ring" />
      <div ref={dotRef} className="premium-cursor__dot" />
    </div>
  );
};

export default PremiumCursor;