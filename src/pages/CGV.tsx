import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CGV = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm">
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>

      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Conditions Générales de Vente</h1>

      <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">1. Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes de produits effectuées par Green World via le site internet greenword-wellness-hub.lovable.app. Toute commande implique l'acceptation sans réserve des présentes CGV.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">2. Identité du vendeur</h2>
          <p>
            <strong>Green World</strong><br />
            Compléments alimentaires naturels<br />
            Siège : Koumassi Remblais, Rue de la Mosquée Ramata, à côté de Choco Bar, Immeuble Résidence 2000, Bureau 2 — Abidjan, Côte d'Ivoire<br />
            Téléphone : <a href="tel:+2252733747334" className="text-primary hover:underline">+225 27 33 74 73 34</a><br />
            Email : <a href="mailto:greenworldkr25@gmail.com" className="text-primary hover:underline">greenworldkr25@gmail.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">3. Produits</h2>
          <p>
            Les produits proposés sont des compléments alimentaires 100 % naturels. Les descriptions et photographies sont fournies à titre indicatif. Green World s'efforce de présenter les caractéristiques essentielles des produits avec la plus grande exactitude possible. Les compléments alimentaires ne sont pas des médicaments et ne peuvent se substituer à un traitement médical.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">4. Prix</h2>
          <p>
            Les prix sont indiqués en Francs CFA (FCFA), toutes taxes comprises. Green World se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés au prix en vigueur au moment de la validation de la commande.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">5. Commande</h2>
          <p>
            Le processus de commande comprend les étapes suivantes :
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Sélection des produits et ajout au panier</li>
            <li>Saisie des informations personnelles (nom, prénom, adresse, téléphone)</li>
            <li>Choix du moyen de paiement</li>
            <li>Confirmation de la commande via WhatsApp</li>
          </ol>
          <p>
            La commande est considérée comme définitive après le paiement et l'envoi du message de confirmation WhatsApp. Green World se réserve le droit de refuser toute commande en cas de données manifestement erronées ou incomplètes.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">6. Moyens de paiement</h2>
          <p>Les moyens de paiement acceptés sont :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Wave</strong></li>
            <li><strong>Orange Money</strong></li>
            <li><strong>MTN Money</strong></li>
            <li><strong>Moov Money</strong></li>
          </ul>
          <p>
            Le paiement est exigible à la commande. Aucune donnée bancaire n'est stockée sur le site. Les transactions sont traitées directement par les plateformes de paiement mobile.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">7. Livraison</h2>
          <p>
            La livraison est effectuée à l'adresse indiquée par le client lors de la commande. Les délais de livraison sont communiqués à titre indicatif et peuvent varier selon la zone géographique. Green World s'engage à faire ses meilleurs efforts pour livrer dans les délais annoncés. En cas de retard significatif, le client sera informé par WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">8. Droit de rétractation</h2>
          <p>
            Conformément à la réglementation en vigueur, le client dispose d'un délai de <strong>14 jours</strong> à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à justifier de motif. Les produits doivent être retournés dans leur emballage d'origine, non ouverts et en parfait état. Les frais de retour sont à la charge du client. Le remboursement sera effectué dans un délai de 14 jours suivant la réception des produits retournés.
          </p>
          <p>
            Pour exercer ce droit, contactez-nous à : <a href="mailto:greenworldkr25@gmail.com" className="text-primary hover:underline">greenworldkr25@gmail.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">9. Garanties et réclamations</h2>
          <p>
            Tous les produits bénéficient de la garantie légale de conformité. En cas de produit défectueux ou non conforme, le client peut contacter Green World dans un délai de 30 jours suivant la réception pour obtenir un échange ou un remboursement. Une preuve d'achat (référence de commande) sera demandée.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">10. Responsabilité</h2>
          <p>
            Green World ne saurait être tenu responsable des dommages résultant d'une mauvaise utilisation des produits. Les compléments alimentaires doivent être consommés dans le cadre d'un régime alimentaire varié et équilibré. Il est recommandé de consulter un professionnel de santé avant toute utilisation, notamment en cas de grossesse, d'allaitement ou de traitement médical en cours.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">11. Protection des données</h2>
          <p>
            Les données personnelles collectées sont traitées conformément à notre{" "}
            <Link to="/politique-confidentialite" className="text-primary hover:underline font-medium">
              Politique de Confidentialité
            </Link>
            . Aucune donnée n'est vendue ou transmise à des tiers à des fins commerciales.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">12. Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments du site (textes, images, logos, marques) sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est strictement interdite.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">13. Litiges et droit applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit ivoirien. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut d'accord amiable, les tribunaux d'Abidjan seront seuls compétents.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">14. Contact</h2>
          <p>
            Pour toute question relative aux présentes CGV :<br />
            <strong>Green World</strong><br />
            Email : <a href="mailto:greenworldkr25@gmail.com" className="text-primary hover:underline">greenworldkr25@gmail.com</a><br />
            Téléphone : <a href="tel:+2252733747334" className="text-primary hover:underline">+225 27 33 74 73 34</a><br />
            WhatsApp : <a href="https://wa.me/2250715736370" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+225 07 15 73 63 70</a>
          </p>
        </section>
      </div>

      <p className="text-xs text-muted-foreground/60 mt-12">Dernière mise à jour : mars 2026</p>
    </div>
  </div>
);

export default CGV;
