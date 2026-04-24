import { useState, useEffect, useRef } from "react";
import { usePersistentState } from "@/hooks/usePersistentState";
import { useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import logo from "@/assets/logo-greenworld.jpg";
import { useCart } from "@/hooks/useCart";
import { products } from "@/data/products";
import { getProductSlug } from "@/lib/productUtils";
import SettingsPanel from "@/components/SettingsPanel";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // Dernière requête de recherche : conservée 30 jours après opt-in (PersistenceConsent).
  const [query, setQuery] = usePersistentState<string>("gw.search.lastQuery.v1", "", {
    validate: (raw): raw is string => typeof raw === "string" && raw.length <= 200,
    debounceMs: 500,
  });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { items, toggleCartOpen } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Permettre l'ouverture de la recherche depuis la barre d'actions mobile
  useEffect(() => {
    const open = () => setSearchOpen(true);
    window.addEventListener("gw:open-search", open);
    return () => window.removeEventListener("gw:open-search", open);
  }, []);

  // Verrouille le scroll du body quand le menu mobile plein écran est ouvert
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const results = query.trim().length >= 2
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  // Reset selected index when query changes
  useEffect(() => { setSelectedIndex(-1); }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); return; }
      if (!searchOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
        e.preventDefault();
        handleResultClick(results[selectedIndex]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, selectedIndex, results]);

  const highlightMatch = (text: string, q: string) => {
    if (!q.trim()) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-primary font-semibold">{text.slice(idx, idx + q.length)}</span>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const links = [
    { label: "Accueil", href: "/" },
    { label: "Boutique", href: "/#produits" },
    { label: "Guide Santé", href: "/guide-pathologies" },
    { label: "Business", href: "/business" },
    
    { label: "À propos", href: "/#contact" },
  ];

  const handleResultClick = (product: typeof products[0]) => {
    setSearchOpen(false);
    setQuery("");
    navigate(`/produit/${getProductSlug(product)}`);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-xl shadow-sm border-b border-border/50" : "bg-transparent"}`}>
        <div className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2.5 group" aria-label="Green World - Accueil">
            <img src={logo} alt="Green World" className="w-9 h-9 object-contain rounded-md group-hover:scale-105 transition-transform duration-300" />
            <span className="hidden sm:inline font-display text-lg text-accent tracking-wide">Green World</span>
          </a>

          <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase text-muted-foreground">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-accent transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-primary hover:after:w-full after:transition-all after:duration-500">
                {l.label}
              </a>
            ))}
            <SettingsPanel variant="nav" />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-muted-foreground hover:text-accent transition-colors hover:bg-secondary/50 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleCartOpen}
              className="relative p-2.5 text-muted-foreground hover:text-accent transition-colors hover:bg-secondary/50 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="lg:hidden text-foreground p-2.5 bg-secondary/40 hover:bg-secondary/70 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — plein écran, grandes cibles tactiles */}
        {open && (
          <div className="lg:hidden fixed inset-0 top-14 sm:top-16 z-40 bg-background/98 backdrop-blur-xl animate-fade-in overflow-y-auto">
            <div className="container mx-auto px-6 py-8 flex flex-col gap-2">
              {links.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-accent active:bg-secondary/40 py-5 px-4 rounded-2xl border-b border-border/40 last:border-0 transition-all duration-300 flex items-center justify-between min-h-[60px] animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span>{l.label}</span>
                  <span className="text-muted-foreground text-xl" aria-hidden>›</span>
                </a>
              ))}
              <div className="pt-4 px-2">
                <SettingsPanel variant="nav" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 sm:pt-28" onClick={() => setSearchOpen(false)}>
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg mx-4 bg-card rounded-2xl shadow-2xl border border-border/60 overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {query.trim().length >= 2 && (
              <div className="max-h-80 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((product, i) => (
                      <button
                        key={product.id}
                        onClick={() => handleResultClick(product)}
                        className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-secondary/50 transition-colors text-left ${selectedIndex === i ? "bg-secondary/60" : ""}`}
                      >
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-contain rounded-lg bg-secondary/30 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{highlightMatch(product.name, query)}</p>
                          <p className="text-xs text-primary font-semibold">{product.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">Aucun produit trouvé pour « {query} »</p>
                  </div>
                )}
              </div>
            )}

            {query.trim().length < 2 && (
              <div className="py-6 text-center">
                <p className="text-xs text-muted-foreground">Tapez au moins 2 caractères pour rechercher</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
