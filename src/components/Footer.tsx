import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="py-12 bg-foreground text-primary-foreground/70">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="font-display text-lg text-primary-foreground">Greenword</span>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-primary-foreground transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">CGV</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">Contact</a>
        </div>
        <p className="text-xs">© 2026 Greenword. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
