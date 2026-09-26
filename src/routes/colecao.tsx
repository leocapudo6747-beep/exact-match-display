import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/colecao")({
  head: () => ({
    meta: [
      { title: "Coleção — BELMONT" },
      {
        name: "description",
        content:
          "Camisas, camisetas, moletons e calçados importados selecionados pela Belmont. Polo Ralph Lauren, Birkenstock e Fear of God.",
      },
      { property: "og:title", content: "Coleção — BELMONT" },
      {
        property: "og:description",
        content: "Camisas, camisetas, moletons e calçados importados com curadoria Belmont.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Colecao,
});

function Colecao() {
  const [active, setActive] = useState<string>("Todas");
  const list = active === "Todas" ? products : products.filter((p) => p.category === active);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-44 lg:px-10">
        <div className="animate-fade-up text-center">
          <p className="eyebrow text-accent">Outono · Inverno</p>
          <h1 className="mt-5 font-serif text-5xl text-primary sm:text-6xl">A Coleção</h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Poucas peças, escolhidas uma a uma. Todas originais, todas pensadas para durar muito
            além da estação.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 border-b border-border pb-5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "eyebrow relative pb-2 transition-colors",
                active === c
                  ? "text-primary after:absolute after:inset-x-0 after:-bottom-[21px] after:h-px after:bg-accent"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
