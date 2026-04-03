import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blog";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/blog" replace />;

  const related = blogArticles.filter((a) => a.id !== article.id).slice(0, 2);

  // Simple markdown-like rendering for ## headings, bold, and lists
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("### "))
        return <h3 key={i} className="text-lg font-display text-foreground mt-6 mb-2">{trimmed.slice(4)}</h3>;
      if (trimmed.startsWith("## "))
        return <h2 key={i} className="text-xl font-display text-foreground mt-8 mb-3">{trimmed.slice(3)}</h2>;
      if (trimmed.startsWith("- **")) {
        const match = trimmed.match(/^- \*\*(.+?)\*\*\s*:\s*(.+)$/);
        if (match)
          return <li key={i} className="ml-4 text-sm text-muted-foreground mb-1.5"><strong className="text-foreground">{match[1]}</strong> : {match[2]}</li>;
      }
      if (trimmed.startsWith("- "))
        return <li key={i} className="ml-4 text-sm text-muted-foreground mb-1.5">{trimmed.slice(2)}</li>;
      if (/^\d+\.\s/.test(trimmed))
        return <li key={i} className="ml-4 text-sm text-muted-foreground mb-1.5 list-decimal">{trimmed.replace(/^\d+\.\s/, "")}</li>;
      return <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">{trimmed}</p>;
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20">
        <article className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" /> Tous les articles
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{article.category}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-foreground leading-tight">{article.title}</h1>
            <p className="text-muted-foreground mt-3 text-sm">{article.excerpt}</p>
          </div>

          <div className="h-48 bg-primary/5 rounded-xl flex items-center justify-center text-6xl mb-10">
            {article.image}
          </div>

          <div className="prose-custom">
            {renderContent(article.content)}
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="font-display text-lg text-foreground mb-4">Articles similaires</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group bg-card rounded-xl border border-border p-4 hover-lift">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{r.category}</span>
                    <h4 className="font-display text-sm text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">{r.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;
