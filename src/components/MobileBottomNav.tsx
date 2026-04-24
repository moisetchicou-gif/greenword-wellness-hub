import { Home, Store, Search, ShoppingCart, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

/**
 * Barre d'actions fixe en bas de l'écran, visible uniquement sur mobile/tablette.
 * Regroupe les actions essentielles pour simplifier la navigation tactile :
 * Accueil • Boutique • Recherche • Panier • WhatsApp.
 */
const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, toggleCartOpen } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const goHome = () => {
    if (location.pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goShop = () => {
    if (location.pathname !== "/") {
      navigate("/#produits");
    } else {
      const el = document.getElementById("produits");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("gw:open-search"));
  };

  const items_ = [
    { key: "home", label: "Accueil", icon: Home, onClick: goHome },
    { key: "shop", label: "Boutique", icon: Store, onClick: goShop },
    { key: "search", label: "Recherche", icon: Search, onClick: openSearch },
    {
      key: "cart",
      label: "Panier",
      icon: ShoppingCart,
      onClick: toggleCartOpen,
      badge: totalItems,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      onClick: () =>
        window.open(
          "https://wa.me/2250715736370",
          "_blank",
          "noopener,noreferrer"
        ),
      accent: true,
    },
  ] as const;

  return (
    <nav
      aria-label="Navigation rapide mobile"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/60 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {items_.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.key}>
              <button
                onClick={item.onClick}
                aria-label={item.label}
                className="relative w-full min-h-[60px] flex flex-col items-center justify-center gap-1 px-1 py-2 text-muted-foreground hover:text-accent active:scale-95 transition-all duration-200"
              >
                <span
                  className={`relative flex items-center justify-center ${
                    item.accent
                      ? "w-10 h-10 rounded-full bg-[#25D366] text-white shadow-md"
                      : ""
                  }`}
                >
                  <Icon className={item.accent ? "w-5 h-5" : "w-5 h-5"} />
                  {"badge" in item && item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1 -right-1.5 bg-accent text-accent-foreground text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <span className="text-[10px] font-medium tracking-wide">
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
