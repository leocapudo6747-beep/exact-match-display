import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { allCategories, categoryImage, products } from "@/lib/products";
import hero from "@/assets/hero-belmont.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BELMONT — O luxo silencioso das peças essenciais" },
      { name: "description", content: "Curadoria de ícones atemporais importados: Polo Ralph Lauren, Lacoste, Loro Piana, Moncler, Birkenstock, Fear of God e mais." },
      { property: "og:title", content: "BELMONT — O luxo silencioso das peças essenciais" },
      { property: "og:description", content: "Curadoria de grifes importadas originais. Envio para todo o Brasil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const marquee = ["Polo Ralph Lauren", "Lacoste", "Tommy Hilfiger", "Brooks Brothers", "Loro Piana", "Moncler", "Stone Island", "Birkenstock", "New Balance", "Fear of God"];
const homeCats = ["Camisas", "Polos", "Tricôs", "Jaquetas", "Calçados", "Acessórios"] as const;

function Home() {
  const destaques = [0, 16, 25, 18].map((i) => products[i]).filter((p): p is (typeof products)[number] => !!p);
  const novidades = products.filter((p) => p.isNew);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <SiteLayout>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-background pt-28">
        <img src={hero} alt="Casal em trajes atemporais em um pátio europeu" width={1600} height={1104} className="absolute inset-0 h-full w-full object-cover object-right opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-2xl animate-fade-up">
            <p className="eyebrow text-accent">Maison Belmont · Curadoria de importados</p>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] text-primary sm:text-6xl lg:text-7xl">O luxo silencioso das peças essenciais</h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              Curadoria de ícones atemporais. Polo Ralph Lauren, Lacoste, Birkenstock, Fear of God e mais.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link to="/colecao" className="eyebrow bg-primary px-9 py-4 text-primary-foreground transition-opacity hover:opacity-90">Ver Coleção</Link>
              <Link to="/maison" className="eyebrow border border-primary px-9 py-4 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">A Maison</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border py-8">
        <div className="flex w-max animate-marquee">
          {[...marquee, ...marquee].map((b, i) => (
            <span key={i} className="whitespace-nowrap px-8 font-serif text-lg tracking-[0.3em] text-primary/70 sm:text-xl">
              {b} <span className="ml-8 text-accent">·</span>
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-accent">Seleção</p>
            <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">Destaques da Semana</h2>
          </div>
          <Link to="/colecao" className="eyebrow text-primary/70 hover:text-accent">Ver tudo</Link>
        </div>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <p className="eyebrow text-accent">Explorar</p>
        <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">Por Categoria</h2>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeCats.map((c) => (
            <Link key={c} to="/colecao" search={{ categoria: c }} className="group relative block aspect-[4/5] overflow-hidden bg-card">
              <img src={categoryImage[c]} alt={c} width={1024} height={1280} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-serif text-3xl text-primary-foreground">{c}</h3>
                <p className="eyebrow mt-2 text-accent">Descobrir →</p>
              </div>
            </Link>
          ))}
        </div>
        {allCategories.length > homeCats.length && null}
      </section>

      <section className="border-t border-border py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow text-accent">Recém-chegados</p>
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">Novidades Importadas</h2>
        </div>
        <div className="mt-14 flex snap-x gap-8 overflow-x-auto px-6 pb-6 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          {novidades.map((p) => (
            <div key={p.slug} className="w-64 shrink-0 snap-start sm:w-72">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary px-6 py-32 text-primary-foreground lg:px-10">
        <blockquote className="mx-auto max-w-3xl text-center font-serif text-3xl italic leading-snug sm:text-4xl lg:text-[2.75rem]">
          “Certas peças atravessam gerações. Curamos apenas o que vestiríamos.”
        </blockquote>
        <p className="eyebrow mt-10 text-center text-accent">Manifesto Belmont</p>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-28 text-center">
        <p className="eyebrow text-accent">Correspondência</p>
        <h2 className="mt-4 font-serif text-4xl text-primary">Chegadas, antes de todos</h2>
        <p className="mt-5 text-sm text-muted-foreground">Uma carta ocasional com novas peças e edições limitadas. Nada além disso.</p>
        <form className="mx-auto mt-10 flex max-w-md border-b border-primary/30 pb-2" onSubmit={(e) => { e.preventDefault(); setDone(true); setEmail(""); }}>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" className="w-full bg-transparent text-sm text-primary placeholder:text-muted-foreground focus:outline-none" />
          <button type="submit" className="eyebrow text-accent">Assinar</button>
        </form>
        {done && <p className="mt-4 text-xs text-accent">Obrigado. Sua primeira carta chega em breve.</p>}
      </section>
    </SiteLayout>
  );
}
