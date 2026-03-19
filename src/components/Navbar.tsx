import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo-greenworld.jpg";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
          <a href="tel:+2250715736370" className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span className="hidden lg:inline">+225 0715736370</span>
          </a>
          <a
            href="#commander"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Commander
          </a>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3 text-sm font-medium text-muted-foreground">
            <a href="#produits" onClick={() => setOpen(false)} className="hover:text-primary py-2">Produits</a>
            <a href="#bienfaits" onClick={() => setOpen(false)} className="hover:text-primary py-2">Bienfaits</a>
            <a href="#avis" onClick={() => setOpen(false)} className="hover:text-primary py-2">Avis</a>
            <a href="#contact" onClick={() => setOpen(false)} className="hover:text-primary py-2">Contact</a>
            <a href="tel:+2250715736370" className="flex items-center gap-2 text-primary py-2">
              <Phone className="w-4 h-4" /> +225 0715736370
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
