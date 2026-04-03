import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { blogArticles } from "@/data/blog";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BlogSection = () => {
  const { ref } = useScrollReveal();
  const featured = blogArticles.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Actualités & Conseils
          </span>
          <h2 className="text-3xl md:text-4xl font-display mt-2 text-foreground">
            Blog Santé Naturelle
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            Des articles experts pour vous accompagner dans votre parcours bien-être au quotidien.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 reveal">
          {featured.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="group bg-card rounded-xl overflow-hidden border border-border hover-lift"
            >
              <div className="h-40 bg-primary/5 flex items-center justify-center text-5xl">
                {article.image}
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-display text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Lire l'article
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Voir tous les articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
