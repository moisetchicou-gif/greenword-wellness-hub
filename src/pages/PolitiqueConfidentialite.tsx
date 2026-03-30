import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PolitiqueConfidentialite = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm">
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>

      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Politique de Confidentialité</h1>

      <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">1. Introduction</h2>
          <p>
            Green World s'engage à protéger la vie privée de ses utilisateurs. La présente politique de confidentialité décrit les types de données collectées, leur utilisation et les mesures prises pour les protéger, conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation ivoirienne en vigueur.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">2. Données collectées</h2>
          <p>Lors de la passation d'une commande, nous collectons les informations suivantes :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Civilité</strong> (M. / Mme)</li>
            <li><strong>Nom et prénom</strong></li>
            <li><strong>Adresse de livraison</strong></li>
            <li><strong>Numéro de téléphone</strong></li>
          </ul>
          <p>Aucune donnée bancaire n'est stockée sur notre site. Les paiements sont traités directement par les plateformes de paiement mobile (Wave, Orange Money, MTN Money, Moov Money).</p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">3. Finalité du traitement</h2>
          <p>Vos données personnelles sont collectées uniquement pour :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Le traitement et la livraison de votre commande</li>
            <li>La communication relative à votre commande via WhatsApp</li>
            <li>L'amélioration de nos services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">4. Base légale</h2>
          <p>
            Le traitement de vos données repose sur l'exécution d'un contrat (votre commande) conformément à l'article 6.1.b du RGPD. Aucune donnée n'est collectée sans votre action volontaire.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">5. Conservation des données</h2>
          <p>
            Vos données de commande ne sont pas stockées sur notre site. Elles sont transmises directement via WhatsApp pour le traitement de votre commande. Aucune base de données utilisateur n'est maintenue sur le site.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">6. Partage des données</h2>
          <p>
            Vos données ne sont partagées avec aucun tiers, à l'exception des plateformes de paiement mobile que vous choisissez lors de votre commande. Nous ne vendons, ne louons et ne transmettons jamais vos informations personnelles.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">7. Sécurité</h2>
          <p>Nous mettons en œuvre les mesures de sécurité suivantes :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Politique de sécurité du contenu (CSP) stricte</li>
            <li>Protection contre le clickjacking (X-Frame-Options)</li>
            <li>Validation et assainissement de toutes les entrées utilisateur</li>
            <li>Ouverture sécurisée des liens externes (protection contre le tab-nabbing)</li>
            <li>Connexion HTTPS chiffrée</li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">8. Cookies</h2>
          <p>
            Ce site n'utilise aucun cookie de suivi, cookie publicitaire ni outil d'analyse tiers. Aucune donnée de navigation n'est collectée à des fins commerciales.
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">9. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : <a href="mailto:greenworldkr25@gmail.com" className="text-primary hover:underline">greenworldkr25@gmail.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-display text-xl font-semibold">10. Contact</h2>
          <p>
            Pour toute question relative à cette politique de confidentialité :<br />
            <strong>Green World</strong><br />
            Email : <a href="mailto:greenworldkr25@gmail.com" className="text-primary hover:underline">greenworldkr25@gmail.com</a><br />
            Téléphone : <a href="tel:+2252733747334" className="text-primary hover:underline">+225 27 33 74 73 34</a>
          </p>
        </section>
      </div>

      <p className="text-xs text-muted-foreground/60 mt-12">Dernière mise à jour : mars 2026</p>
    </div>
  </div>
);

export default PolitiqueConfidentialite;
