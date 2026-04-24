import { useEffect, useRef, useState } from "react";
import { Home, Store, Search, ShoppingCart, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

/**
 * Barre d'actions fixe en bas de l'écran, visible uniquement sur mobile/tablette.
 * Regroupe les actions essentielles pour simplifier la navigation tactile :
 * Accueil • Boutique • Recherche • Panier • WhatsApp.
 *
 * Le badge du panier se met à jour en temps réel via le CartContext et
 * déclenche une animation visuelle (pulse + bump) à chaque changement.
 */
const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, toggleCartOpen } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  // Animation du badge à chaque changement de quantité (ajout/suppression)
  const [pulse, setPulse] = useState(false);
  const prevTotalRef = useRef(totalItems);
  useEffect(() => {
    if (prevTotalRef.current !== totalItems) {
      prevTotalRef.current = totalItems;
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 450);
      return () => clearTimeout(t);
    }
  }, [totalItems]);

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

  type Item = {
    key: string;
    label: string;
    icon: typeof Home;
    onClick: () => void;
    badge?: number;
    accent?: boolean;
  };

  const items_: Item[] = [
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
  ];

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
                  className={`relative flex items-center justify-center transition-transform duration-300 ${
                    item.accent
                      ? "w-10 h-10 rounded-full bg-[#25D366] text-white shadow-md"
                      : ""
                  } ${item.key === "cart" && pulse ? "scale-110" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                  {item.badge && item.badge > 0 ? (
                    <span
                      key={item.badge /* re-mount à chaque changement pour relancer l'anim */}
                      aria-live="polite"
                      aria-label={`${item.badge} article${item.badge > 1 ? "s" : ""} dans le panier`}
                      className={`absolute -top-1 -right-1.5 bg-accent text-accent-foreground text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-sm ring-2 ring-background animate-scale-in ${
                        pulse ? "animate-pulse-soft" : ""
                      }`}
                    >
                      {item.badge > 9 ? "9+" : item.badge}
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
