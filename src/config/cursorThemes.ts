export type CursorThemeName = "botanical" | "gold" | "deep" | "clinical" | "focus";

type CursorThemeRoute = {
  pattern: RegExp;
  theme: CursorThemeName;
};

const cursorThemeRoutes: CursorThemeRoute[] = [
  { pattern: /^\/$/, theme: "botanical" },
  { pattern: /^\/produit\//, theme: "clinical" },
  { pattern: /^\/offre\//, theme: "gold" },
  { pattern: /^\/guide-pathologies/, theme: "deep" },
  { pattern: /^\/(mentions-legales|politique-confidentialite|cgv)/, theme: "deep" },
];

export const getCursorThemeForPath = (pathname: string): CursorThemeName => {
  return cursorThemeRoutes.find((route) => route.pattern.test(pathname))?.theme ?? "botanical";
};