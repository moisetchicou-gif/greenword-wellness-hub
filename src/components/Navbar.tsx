import logo from "@/assets/logo-greenworld.jpg";

const Navbar = () => {
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
        <a
          href="#commander"
          className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Commander
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
