import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  /** Aspect ratio CSS, ex: "1 / 1", "4 / 3" */
  aspect?: string;
  /** Class additionnelle sur le wrapper */
  className?: string;
  /** Class additionnelle sur l'image */
  imgClassName?: string;
  /** eager pour le LCP / above-the-fold */
  priority?: boolean;
  /** sizes hint pour le navigateur */
  sizes?: string;
  /** Charger uniquement à l'approche du viewport */
  observe?: boolean;
}

/**
 * Image produit optimisée :
 * - Wrapper à ratio fixe (évite le CLS / sauts visuels)
 * - Skeleton shimmer pendant le chargement
 * - Lazy loading natif + IntersectionObserver optionnel
 * - Fade-in doux à l'apparition
 * - Gestion d'erreur (placeholder)
 */
const ProductImage = ({
  src,
  alt,
  aspect = "1 / 1",
  className,
  imgClassName,
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 20vw",
  observe = true,
}: ProductImageProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(priority || !observe);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (priority || !observe || inView) return;
    const node = wrapperRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [priority, observe, inView]);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: aspect }}
    >
      {/* Skeleton shimmer (visible tant que pas chargé) */}
      {!loaded && !errored && (
        <div
          aria-hidden="true"
          className="absolute inset-0 shimmer-bg animate-shimmer-fast"
        />
      )}

      {/* Fallback erreur */}
      {errored && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 text-muted-foreground text-xs">
          Image indisponible
        </div>
      )}

      {/* Image réelle (montée seulement quand inView) */}
      {inView && !errored && (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName
          )}
        />
      )}
    </div>
  );
};

export default ProductImage;
