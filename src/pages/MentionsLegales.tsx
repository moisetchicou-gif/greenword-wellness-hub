import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MentionsLegales = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm">
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>

      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Mentions Légales</h1>

      <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">1. Éditeur du site</h2>
          <p>
            <strong>Green World Prestige</strong><br />
            Compléments alimentaires naturels<br />
            Siège : Koumassi Remblais, Rue de la Mosquée Ramata, à côté de Choco Bar, Immeuble Résidence 2000, Bureau 2 — Abidjan, Côte d'Ivoire<br />
            Téléphone : <a href="tel:+2252733747334" className="text-primary hover:underline">+225 27 33 74 73 34</a><br />
            Email : <a href="mailto:greenworldkr25@gmail.com" className="text-primary hover:underline">greenworldkr25@gmail.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">2. Hébergement</h2>
          <p>
            Ce site est hébergé par <strong>Lovable</strong> (lovable.dev).<br />
            Les données sont hébergées sur des serveurs sécurisés conformes aux standards internationaux.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">3. Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes, icônes) sont la propriété exclusive de Green World Prestige ou de leurs auteurs respectifs. Toute reproduction, représentation, modification ou adaptation, totale ou partielle, est strictement interdite sans autorisation écrite préalable.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">4. Responsabilité</h2>
          <p>
            Green World Prestige s'efforce de fournir des informations exactes et à jour. Toutefois, les informations diffusées sur ce site sont présentées à titre indicatif et ne sauraient engager la responsabilité de Green World Prestige en cas d'erreur ou d'omission. Les compléments alimentaires ne remplacent pas un régime alimentaire varié et équilibré ni un mode de vie sain.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">5. Liens hypertextes</h2>
          <p>
            Ce site peut contenir des liens vers des sites tiers. Green World Prestige ne saurait être tenu responsable du contenu de ces sites externes ni des éventuels dommages résultant de leur consultation.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">6. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit ivoirien. En cas de litige, les tribunaux d'Abidjan seront seuls compétents.
          </p>
        </section>
      </div>

      <p className="text-xs text-muted-foreground/60 mt-12">Dernière mise à jour : mars 2026</p>
    </div>
  </div>
);

export default MentionsLegales;
