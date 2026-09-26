import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import hero from "@/assets/hero-belmont.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BELMONT — O luxo silencioso das peças essenciais" },
      {
        name: "description",
        content:
          "Loja de roupas e calçados importados com curadoria refinada: Polo Ralph Lauren, Birkenstock e Fear of God. Peças originais, elegância atemporal.",
      },
      { property: "og:title", content: "BELMONT — O luxo silencioso das peças essenciais" },
      {
        property: "og:description",
        content:
          "Curadoria de roupas e calçados importados originais. Elegância atemporal, envios para todo o Brasil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const destaques = products.slice(0, 3);

  return (
    <SiteLayout>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-background pt-28">
        <img
          src={hero}
          alt="Casal em trajes atemporais em um pátio europeu ensolarado"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover object-right opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-2xl animate-fade-up">
            <p className="eyebrow text-accent">Maison Belmont · Desde sempre</p>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
              O luxo silencioso das peças essenciais
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              Uma seleção restrita de roupas e calçados importados originais, escolhidos pela
              permanência e não pela temporada.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/colecao"
                className="eyebrow bg-primary px-9 py-4 text-primary-foreground transition-opacity hover:opacity-90"
              >
                Ver Coleção
              </Link>
              <Link
                to="/maison"
                className="eyebrow border border-primary px-9 py-4 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                A Maison
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border py-10">
        <p className="mx-auto max-w-7xl px-6 text-center font-serif text-lg tracking-[0.3em] text-primary/70 sm:text-xl lg:px-10">
          Polo Ralph Lauren · Birkenstock · Fear of God
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-accent">Seleção</p>
            <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">Destaques</h2>
          </div>
          <Link to="/colecao" className="eyebrow text-primary/70 hover:text-accent">
            Ver tudo
          </Link>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-primary px-6 py-32 text-primary-foreground lg:px-10">
        <blockquote className="mx-auto max-w-3xl text-center font-serif text-3xl italic leading-snug sm:text-4xl lg:text-[2.75rem]">
          “Elegância é quando a peça é lembrada, não quem a veste”
        </blockquote>
        <p className="eyebrow mt-10 text-center text-accent">Maison Belmont</p>
      </section>
    </SiteLayout>
  );
}
