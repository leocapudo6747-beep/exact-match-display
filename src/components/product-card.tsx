import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group block animate-fade-up"
    >
      <div className="aspect-[4/5] overflow-hidden bg-card">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          width={1024}
          height={1280}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="pt-5">
        <p className="eyebrow text-accent">{product.brand}</p>
        <h3 className="mt-2 font-serif text-xl text-primary">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
