import { Phone, Mail, MapPin, ArrowRight, Facebook } from "lucide-react";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const CtaSection = () => {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section id="commander" className="py-24 bg-accent text-accent-foreground relative overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-primary/5 blur-2xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8 relative">
        <p className={`text-primary/70 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Commander
        </p>
        <h2 className={`text-3xl sm:text-4xl font-display transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "100ms" }}>
          Prêt à transformer votre santé ?
        </h2>
        <p className={`max-w-lg mx-auto opacity-80 text-sm leading-relaxed transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "200ms" }}>
          Commandez dès aujourd'hui vos produits Green World Prestige. Satisfait ou remboursé pendant 30 jours.
        </p>

        <div className={`pt-2 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "300ms" }}>
          <a href="#produits" className="group inline-flex items-center gap-2 bg-secondary text-accent px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:shadow-2xl active:scale-[0.97] transition-all duration-500">
            Commander maintenant
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Contact */}
        <div id="contact" className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto pt-6">
          <a href="tel:+2250500796868" className="flex items-center gap-3 glass-dark rounded-xl p-4 hover:bg-accent-foreground/10 transition-all duration-300 hover-lift">
            <Phone className="w-4 h-4 text-primary" />
            <div className="text-left">
              <p className="text-[10px] opacity-60 uppercase tracking-wider">Téléphone</p>
              <p className="font-medium text-sm">+225 05 00 79 68 68</p>
            </div>
          </a>
          <a href="tel:+2252733747334" className="flex items-center gap-3 glass-dark rounded-xl p-4 hover:bg-accent-foreground/10 transition-all duration-300 hover-lift">
            <Phone className="w-4 h-4 text-primary" />
            <div className="text-left">
              <p className="text-[10px] opacity-60 uppercase tracking-wider">Téléphone Orange</p>
              <p className="font-medium text-sm">+225 27 33 74 73 34</p>
            </div>
          </a>
          <a href="https://wa.me/2250715736370" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 glass-dark rounded-xl p-4 hover:bg-accent-foreground/10 transition-all duration-300 hover-lift">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] opacity-60 uppercase tracking-wider">WhatsApp</p>
              <p className="font-medium text-sm">+225 0715736370</p>
            </div>
          </a>
          <a href="mailto:greenworldkr25@gmail.com" className="flex items-center gap-3 glass-dark rounded-xl p-4 hover:bg-accent-foreground/10 transition-all duration-300 hover-lift">
            <Mail className="w-4 h-4 text-primary" />
            <div className="text-left">
              <p className="text-[10px] opacity-60 uppercase tracking-wider">Email</p>
              <p className="font-medium text-sm">greenworldkr25@gmail.com</p>
            </div>
          </a>
          <a href="https://share.google/tqV7vorkQ4N4yP3jb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 glass-dark rounded-xl p-4 hover:bg-accent-foreground/10 transition-all duration-300 hover-lift">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <div className="text-left">
              <p className="text-[10px] opacity-60 uppercase tracking-wider">Localisation</p>
              <p className="font-medium text-sm">Koumassi Remblais, Imm. Résidence 2000</p>
            </div>
          </a>
          <a href="https://www.facebook.com/share/1AL3rAwBQL/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 glass-dark rounded-xl p-4 hover:bg-accent-foreground/10 transition-all duration-300 hover-lift">
            <Facebook className="w-4 h-4 text-primary" />
            <div className="text-left">
              <p className="text-[10px] opacity-60 uppercase tracking-wider">Facebook</p>
              <p className="font-medium text-sm">Green World Prestige CI</p>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};

export default CtaSection;
