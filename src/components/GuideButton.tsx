import { Stethoscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const GuideButton = () => {
  const { pathname } = useLocation();
  if (pathname === "/guide-pathologies") return null;

  return (
    <Link
      to="/guide-pathologies"
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/30 hover:scale-110 hover:shadow-xl hover:shadow-primary/40 active:scale-[0.95] transition-all duration-500 ease-premium animate-slide-up-fade"
      aria-label="Guide Santé"
    >
      <Stethoscope className="w-4 h-4" />
      <span className="hidden sm:inline">Guide Santé</span>
    </Link>
  );
};

export default GuideButton;
