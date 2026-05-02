import { useEffect, useState } from "react";
import { ArrowUp, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

/**
 * Aides flottantes de navigation, visibles sur toutes les pages :
 * - Raccourci panier (apparaît dès qu'il y a des articles, n'importe où sur la page).
 * - Bouton "Retour en haut" (apparaît après 600px de scroll).
 *
 * Positionné à gauche pour ne pas chevaucher le bouton WhatsApp (à droite).
 */
const FloatingNavHelpers = () => {
  const { items, toggleCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const showCart = totalItems > 0 && scrolled;
  const showTop = scrolled;

  if (!showCart && !showTop) return null;

  return (
    <div className="fixed left-4 sm:left-6 bottom-24 sm:bottom-6 z-40 flex flex-col gap-3 pointer-events-none">
      {showCart && (
        <button
          onClick={toggleCartOpen}
          aria-label={`Voir mon panier (${totalItems} article${totalItems > 1 ? "s" : ""})`}
          className="pointer-events-auto relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground shadow-[0_10px_28px_-8px_hsl(var(--primary)/0.6)] hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center animate-fade-in"
        >
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-coral text-white text-[10px] font-bold flex items-center justify-center border-2 border-background">
            {totalItems}
          </span>
        </button>
      )}

      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card/95 backdrop-blur border border-border/60 text-accent shadow-md hover:bg-secondary hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center animate-fade-in"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

export default FloatingNavHelpers;
