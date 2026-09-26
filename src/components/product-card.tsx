import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/produto/$slug" params={{ slug: product.slug }} className="group block animate-fade-up">
      <div className="relative aspect-[4/5] overflow-hidden bg-card">
        <img
          src={product.images[0]}
          alt={`${product.brand} ${product.name}`}
          width={1024}
          height={1280}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:opacity-90"
        />
        <span className="absolute left-3 top-3 border border-accent/60 bg-background/80 px-2 py-1 text-[0.55rem] uppercase tracking-[0.25em] text-accent">
          Original
        </span>
      </div>
      <div className="pt-5">
        <p className="eyebrow text-accent">{product.brand}</p>
        <h3 className="mt-2 font-serif text-xl leading-snug text-primary">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
