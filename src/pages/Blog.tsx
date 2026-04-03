import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blog";

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto mb-12">
            <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-3 h-3" /> Retour à l'accueil
            </Link>
            <h1 className="text-3xl md:text-4xl font-display text-foreground">
              Blog Santé Naturelle
            </h1>
            <p className="text-muted-foreground mt-3 text-sm">
              Conseils, astuces et actualités pour prendre soin de votre santé au naturel.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {blogArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group flex gap-4 bg-card rounded-xl border border-border p-4 hover-lift"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-lg flex items-center justify-center text-3xl shrink-0">
                  {article.image}
                </div>
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <span>{new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <h2 className="font-display text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {article.title}
                  </h2>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
