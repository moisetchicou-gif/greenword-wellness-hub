import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import logo from "@/assets/logo-greenworld.jpg";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items, toggleCartOpen } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Accueil", href: "#" },
    { label: "Boutique", href: "#produits" },
    { label: "Compléments", href: "#bienfaits" },
    { label: "Beauté", href: "#produits" },
    { label: "Avis", href: "#avis" },
    { label: "À propos", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Green World" className="w-9 h-9 object-contain rounded-md" />
          <span className="font-display text-lg text-accent tracking-wide">Green World</span>
        </a>

        <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase text-muted-foreground">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-accent transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-accent hover:after:w-full after:transition-all after:duration-300">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:text-accent transition-colors hidden md:flex">
            <Search className="w-4.5 h-4.5" />
          </button>
          <button onClick={toggleCartOpen} className="relative p-2 text-muted-foreground hover:text-accent transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="lg:hidden text-foreground p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="container mx-auto px-6 py-5 flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-accent py-2.5 border-b border-border/50 last:border-0 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
