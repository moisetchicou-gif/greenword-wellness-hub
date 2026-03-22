import { Phone, Mail, MapPin } from "lucide-react";
import logoOrangeMoney from "@/assets/logo-orange-money.png";
import logoWave from "@/assets/logo-wave.png";
import logoMtn from "@/assets/logo-mtn.png";
import logoMoov from "@/assets/logo-moov.jpg";
import logoPaypal from "@/assets/logo-paypal.png";

const CtaSection = () => {
  return (
    <section id="commander" className="py-24 bg-primary text-primary-foreground relative">
      <div className="container mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-display">
          Prêt à transformer votre santé ?
        </h2>
        <p className="max-w-lg mx-auto opacity-90">
          Commandez dès aujourd'hui vos produits Green World.
          Satisfait ou remboursé pendant 30 jours.
        </p>

        <div className="pt-2">
          <a href="#produits" className="inline-block bg-card text-primary px-8 py-3 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg">
            Commander maintenant
          </a>
        </div>

        {/* Contact direct */}
        <div id="contact" className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4">
          <a href="tel:+2252733747334" className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4 hover:bg-card/20 transition-colors">
            <Phone className="w-5 h-5" />
            <div className="text-left">
              <p className="text-xs opacity-70">Téléphone</p>
              <p className="font-medium">+225 27 33 74 73 34</p>
            </div>
          </a>
          <a href="https://wa.me/2250715736370" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4 hover:bg-card/20 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <div className="text-left">
              <p className="text-xs opacity-70">WhatsApp</p>
              <p className="font-medium">+225 0715736370</p>
            </div>
          </a>
          <a href="mailto:greenworldkr25@gmail.com" className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4 hover:bg-card/20 transition-colors">
            <Mail className="w-5 h-5" />
            <div className="text-left">
              <p className="text-xs opacity-70">Email</p>
              <p className="font-medium text-sm">greenworldkr25@gmail.com</p>
            </div>
          </a>
          <a href="https://share.google/tqV7vorkQ4N4yP3jb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4 hover:bg-card/20 transition-colors">
            <MapPin className="w-5 h-5 shrink-0" />
            <div className="text-left">
              <p className="text-xs opacity-70">Localisation</p>
              <p className="font-medium text-sm">Koumassi Remblais, Imm. Résidence 2000</p>
            </div>
          </a>
        </div>

        {/* Méthodes de paiement */}
        <div className="pt-8">
          <p className="text-sm opacity-80 mb-5">Méthodes de paiement acceptées</p>
          <div className="flex flex-wrap justify-center gap-5">
            {[
              { name: "Orange Money", logo: logoOrangeMoney },
              { name: "Wave", logo: logoWave },
              { name: "MTN Money", logo: logoMtn },
              { name: "Moov Money", logo: logoMoov },
              { name: "PayPal", logo: logoPaypal },
            ].map((method) => (
              <div key={method.name} className="flex flex-col items-center gap-2">
                <div className="w-16 h-12 rounded-xl bg-card/90 flex items-center justify-center shadow-md overflow-hidden p-1.5">
                  <img src={method.logo} alt={method.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs opacity-70">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
