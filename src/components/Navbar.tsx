import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo-greenworld.jpg";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { items, toggleCartOpen } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Green World" className="w-10 h-10 object-contain" />
          <span className="font-display text-xl text-foreground">Green World</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#produits" className="hover:text-primary transition-colors">Produits</a>
          <a href="#bienfaits" className="hover:text-primary transition-colors">Bienfaits</a>
          <a href="#avis" className="hover:text-primary transition-colors">Avis</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleCartOpen} className="relative text-foreground hover:text-primary transition-colors p-2">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3 text-sm font-medium text-muted-foreground">
            <a href="#produits" onClick={() => setOpen(false)} className="hover:text-primary py-2">Produits</a>
            <a href="#bienfaits" onClick={() => setOpen(false)} className="hover:text-primary py-2">Bienfaits</a>
            <a href="#avis" onClick={() => setOpen(false)} className="hover:text-primary py-2">Avis</a>
            <a href="#contact" onClick={() => setOpen(false)} className="hover:text-primary py-2">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
