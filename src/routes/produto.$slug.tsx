import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PackageCheck, RefreshCcw, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { formatPrice, getProduct } from "@/lib/products";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.brand} ${loaderData.name} — BELMONT`
      : "Produto — BELMONT";
    const description = loaderData?.description ?? "Peça importada original da Maison Belmont.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Produto,
});

const garantias = [
  { icon: PackageCheck, text: "Envio assegurado para todo o Brasil em até 7 dias úteis" },
  { icon: ShieldCheck, text: "Originalidade verificada peça a peça pela curadoria Belmont" },
  { icon: RefreshCcw, text: "Trocas e devoluções em até 30 dias, sem burocracia" },
];

function Produto() {
  const product = Route.useLoaderData();
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-36 lg:px-10">
        <Link to="/colecao" className="eyebrow text-muted-foreground hover:text-accent">
          ← Coleção
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-2">
          <div className="animate-fade-in aspect-[4/5] overflow-hidden bg-card">
            <img
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="animate-fade-up lg:pt-6">
            <p className="eyebrow text-accent">{product.brand}</p>
            <h1 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg text-primary/80">{formatPrice(product.price)}</p>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-12">
              <p className="eyebrow text-primary/60">Tamanho</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={
                      size === s
                        ? "min-w-14 border border-primary bg-primary px-4 py-3 text-sm text-primary-foreground"
                        : "min-w-14 border border-border px-4 py-3 text-sm text-primary transition-colors hover:border-accent"
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setAdded(true)}
              className="eyebrow mt-10 w-full bg-primary px-10 py-5 text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
            >
              Adicionar à sacola
            </button>
            {added && (
              <p className="mt-4 text-xs text-accent">
                {size
                  ? `Tamanho ${size} adicionado à sacola.`
                  : "Peça adicionada à sacola — escolha o tamanho antes de finalizar."}
              </p>
            )}

            <ul className="mt-14 space-y-4 border-t border-border pt-10">
              {garantias.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-4 text-sm text-muted-foreground">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.3} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
