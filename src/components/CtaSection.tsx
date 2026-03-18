import { useState } from "react";
import { Phone, Mail, MapPin, X } from "lucide-react";

const CtaSection = () => {
  const [showInfo, setShowInfo] = useState(false);

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
        <div className="pt-4">
          <button
            onClick={() => setShowInfo(true)}
            className="inline-block bg-card text-primary px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Commander maintenant
          </button>
        </div>

        {/* Méthodes de paiement */}
        <div className="pt-6">
          <p className="text-sm opacity-80 mb-4">Méthodes de paiement acceptées</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Orange Money", color: "#FF6600", letter: "OM" },
              { name: "Wave", color: "#1DC3E2", letter: "W" },
              { name: "MTN Money", color: "#FFCC00", letter: "MTN", textColor: "#000" },
              { name: "Moov Money", color: "#0066CC", letter: "MM" },
              { name: "Carte de crédit", color: "#1A1F71", letter: "💳" },
              { name: "PayPal", color: "#003087", letter: "PP" },
            ].map((method) => (
              <div
                key={method.name}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-14 h-10 rounded-lg flex items-center justify-center text-xs font-bold shadow-md"
                  style={{ backgroundColor: method.color, color: method.textColor || "#fff" }}
                >
                  {method.letter}
                </div>
                <span className="text-xs opacity-70">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal informations */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
          <div className="bg-card text-foreground rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-fade-up">
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-display text-foreground mb-6">Contactez-nous pour commander</h3>
            <div className="space-y-4">
              <a href="tel:+2250715736370" className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Téléphone</p>
                  <p className="text-sm text-muted-foreground">+225 0715736370</p>
                </div>
              </a>
              <a href="https://wa.me/2250715736370" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+225 0715736370</p>
                </div>
              </a>
              <a href="mailto:greenworldkr25@gmail.com" className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">greenworldkr25@gmail.com</p>
                </div>
              </a>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Adresse</p>
                  <p className="text-sm text-muted-foreground">
                    Koumassi Remblais, Rue de la Mosquée Ramata,
                    à côté de Choco Bar — Immeuble Résidence 2000, Bureau 2
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CtaSection;
