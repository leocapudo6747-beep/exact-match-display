import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PackageCheck, RefreshCcw, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { formatPrice, getProduct, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.brand} ${loaderData.name} — BELMONT` : "Produto — BELMONT";
    const description = loaderData?.description ?? "Peça importada original da Maison Belmont.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
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

const WHATSAPP = "5511999999999";

function Produto() {
  const product = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(product.colors?.[0] ?? null);
  const [added, setAdded] = useState(false);

  const sameBrand = products.filter((p) => p.brand === product.brand && p.slug !== product.slug);
  const related = [...sameBrand, ...products.filter((p) => p.category === product.category && p.brand !== product.brand)].slice(0, 4);
  const msg = encodeURIComponent(`Olá! Tenho interesse em ${product.brand} ${product.name}${size ? `, tamanho ${size}` : ""}${color ? `, cor ${color}` : ""}.`);

  return (
    <SiteLayout>
      <section key={product.slug} className="mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-10">
        <Link to="/colecao" className="eyebrow text-muted-foreground hover:text-accent">← Coleção</Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-2">
          <div className="animate-fade-in flex flex-col-reverse gap-4 sm:flex-row">
            {product.images.length > 1 && (
              <div className="flex gap-3 sm:flex-col">
                {product.images.map((src, i) => (
                  <button key={i} onClick={() => setActive(i)} aria-label={`Foto ${i + 1}`} className={cn("h-24 w-20 overflow-hidden border transition-opacity", active === i ? "border-accent" : "border-transparent opacity-60 hover:opacity-100")}>
                    <img src={src} alt="" width={160} height={200} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="aspect-[4/5] flex-1 overflow-hidden bg-card">
              <img src={product.images[active]} alt={`${product.brand} ${product.name}`} width={1024} height={1280} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="animate-fade-up lg:pt-6">
            <div className="flex items-center gap-4">
              <p className="eyebrow text-accent">{product.brand}</p>
              <span className="border border-accent/50 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.25em] text-accent">{product.seal}</span>
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-primary sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg text-primary/80">{formatPrice(product.price)}</p>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <dl className="mt-8 grid max-w-md grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
              <div><dt className="eyebrow text-primary/60">Composição</dt><dd className="mt-2 text-primary">{product.composition}</dd></div>
              <div><dt className="eyebrow text-primary/60">Origem</dt><dd className="mt-2 text-primary">{product.origin}</dd></div>
            </dl>

            {product.colors && (
              <div className="mt-10">
                <p className="eyebrow text-primary/60">Cor · <span className="text-primary">{color}</span></p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button key={c} onClick={() => setColor(c)} className={cn("border px-4 py-2 text-sm transition-colors", color === c ? "border-primary text-primary" : "border-border text-primary/60 hover:border-accent")}>{c}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <p className="eyebrow text-primary/60">Tamanho</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={cn("min-w-14 border px-4 py-3 text-sm transition-colors", size === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-primary hover:border-accent")}>{s}</button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setAdded(true)} className="eyebrow bg-primary px-10 py-5 text-primary-foreground transition-opacity hover:opacity-90">Adicionar à sacola</button>
              <a href={`https://wa.me/${WHATSAPP}?text=${msg}`} target="_blank" rel="noreferrer" className="eyebrow border border-primary px-10 py-5 text-center text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Comprar pelo WhatsApp</a>
            </div>
            {added && (
              <p className="mt-4 text-xs text-accent">
                {size ? `Tamanho ${size} adicionado à sacola.` : "Peça adicionada — escolha o tamanho antes de finalizar."}
              </p>
            )}

            <ul className="mt-12 space-y-4 border-t border-border pt-10">
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

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl border-t border-border px-6 py-24 lg:px-10">
          <p className="eyebrow text-accent">{product.brand}</p>
          <h2 className="mt-4 font-serif text-4xl text-primary">Você também pode gostar</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
