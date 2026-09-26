import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { allCategories, featuredBrands, products } from "@/lib/products";
import { cn } from "@/lib/utils";

const search = z.object({ categoria: z.string().optional(), marca: z.string().optional() });

export const Route = createFileRoute("/colecao")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Coleção — BELMONT" },
      { name: "description", content: "Polos, camisas, tricôs, jaquetas, calçados, tênis, acessórios e relógios de grifes importadas, com curadoria Belmont." },
      { property: "og:title", content: "Coleção — BELMONT" },
      { property: "og:description", content: "Grifes importadas originais: Polo Ralph Lauren, Loro Piana, Moncler, New Balance e mais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Colecao,
});

const prices = [
  { label: "Todas as faixas", min: 0, max: Infinity },
  { label: "Até R$ 1.000", min: 0, max: 1000 },
  { label: "R$ 1.000 – 3.000", min: 1000, max: 3000 },
  { label: "R$ 3.000 – 8.000", min: 3000, max: 8000 },
  { label: "Acima de R$ 8.000", min: 8000, max: Infinity },
];

function Colecao() {
  const sp = Route.useSearch();
  const [brand, setBrand] = useState(sp.marca ?? "Todas");
  const [cat, setCat] = useState(sp.categoria ?? "Todas");
  const [price, setPrice] = useState(0);
  const [sort, setSort] = useState("new");

  const list = useMemo(() => {
    const r = prices[price];
    const out = products.filter(
      (p) =>
        (brand === "Todas" || p.brand === brand) &&
        (cat === "Todas" || p.category === cat) &&
        p.price >= r.min && p.price < r.max,
    );
    if (sort === "asc") return [...out].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...out].sort((a, b) => b.price - a.price);
    return [...out].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  }, [brand, cat, price, sort]);

  const selectCls = "border-b border-border bg-transparent py-2 pr-6 text-sm text-primary focus:border-accent focus:outline-none";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-44 lg:px-10">
        <div className="animate-fade-up text-center">
          <p className="eyebrow text-accent">Curadoria de grifes</p>
          <h1 className="mt-5 font-serif text-5xl text-primary sm:text-6xl">A Coleção</h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Do preppy americano ao luxo silencioso europeu. Cada peça, original e escolhida à mão.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-x-7 gap-y-3 border-y border-border py-6">
          {["Todas", ...featuredBrands].map((b) => (
            <button key={b} onClick={() => setBrand(b)} className={cn("font-serif text-base tracking-wide transition-colors", brand === b ? "text-accent" : "text-primary/60 hover:text-primary")}>
              {b}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-6">
            <select aria-label="Categoria" value={cat} onChange={(e) => setCat(e.target.value)} className={selectCls}>
              <option value="Todas">Todas as categorias</option>
              {allCategories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select aria-label="Faixa de preço" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={selectCls}>
              {prices.map((p, i) => <option key={p.label} value={i}>{p.label}</option>)}
            </select>
            <select aria-label="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} className={selectCls}>
              <option value="Todas">Todas as marcas</option>
              {Array.from(new Set(products.map((p) => p.brand))).map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{list.length} peças</span>
            <select aria-label="Ordenar" value={sort} onChange={(e) => setSort(e.target.value)} className={selectCls}>
              <option value="new">Novidades</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </div>
        </div>

        {list.length ? (
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        ) : (
          <p className="mt-24 text-center font-serif text-2xl text-primary/60">Nenhuma peça nesta seleção, por ora.</p>
        )}
      </section>
    </SiteLayout>
  );
}
