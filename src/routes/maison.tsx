import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/maison")({
  head: () => ({
    meta: [
      { title: "A Maison — BELMONT" },
      {
        name: "description",
        content:
          "A história da Belmont: curadoria de peças importadas originais, elegância atemporal e o compromisso com o luxo silencioso.",
      },
      { property: "og:title", content: "A Maison — BELMONT" },
      {
        property: "og:description",
        content: "Curadoria, originalidade e atemporalidade: os princípios da Maison Belmont.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Maison,
});

const valores = [
  {
    title: "Curadoria",
    text: "Escolhemos poucas peças por temporada. Cada entrada no catálogo exclui outra — é assim que uma coleção mantém sentido.",
  },
  {
    title: "Originalidade",
    text: "Trabalhamos apenas com peças importadas autênticas, verificadas uma a uma antes de chegarem às suas mãos.",
  },
  {
    title: "Atemporalidade",
    text: "Não perseguimos tendências. Procuramos o corte, o tecido e a proporção que continuarão certos daqui a dez anos.",
  },
  {
    title: "Discrição",
    text: "Nada de logotipos gritantes. A qualidade se anuncia sozinha, sem precisar de volume.",
  },
];

function Maison() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-44 lg:px-10">
        <div className="animate-fade-up">
          <p className="eyebrow text-accent">A Maison</p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-primary sm:text-6xl">
            Uma casa construída sobre a permanência
          </h1>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              A Belmont nasceu de uma inquietação simples: o guarda-roupa contemporâneo acumula
              demais e escolhe de menos. Em vez de mais uma vitrine de novidades, quisemos construir
              uma casa de curadoria — um lugar onde cada peça precisa justificar sua presença.
            </p>
            <p>
              Selecionamos roupas e calçados importados de marcas que entenderam o mesmo princípio:
              Polo Ralph Lauren, com seu vocabulário clássico americano; Birkenstock, com o conforto
              que atravessou gerações; Fear of God, com a sobriedade de uma silhueta bem resolvida.
            </p>
            <p>
              Tudo o que oferecemos é original, verificado e enviado com o cuidado que uma peça de
              anos merece. Acreditamos no luxo silencioso — aquele que não pede atenção, mas
              permanece.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-28 text-primary-foreground lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-accent">Nossos valores</p>
          <div className="mt-14 grid gap-14 sm:grid-cols-2">
            {valores.map((v) => (
              <div key={v.title}>
                <h2 className="font-serif text-3xl">{v.title}</h2>
                <div className="mt-5 h-px w-12 bg-accent" />
                <p className="mt-5 text-sm leading-relaxed text-primary-foreground/65">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
