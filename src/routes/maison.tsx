import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import interior from "@/assets/maison-interior.jpg";

export const Route = createFileRoute("/maison")({
  head: () => ({
    meta: [
      { title: "A Maison — BELMONT" },
      { name: "description", content: "Curadoria minimalista, importação direta e originalidade comprovada. Conheça a Maison Belmont." },
      { property: "og:title", content: "A Maison — BELMONT" },
      { property: "og:description", content: "Curadoria de grifes importadas com originalidade garantida e atendimento pessoal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Maison,
});

const valores = [
  { title: "Originalidade comprovada", text: "Cada peça chega com nota de importação e é verificada individualmente antes do envio." },
  { title: "Curadoria minimalista", text: "Escolhemos pouco, e escolhemos bem. Só entra o que atravessa temporadas." },
  { title: "Atendimento pessoal", text: "Uma conversa direta, sem roteiro, para ajudar com medidas, cores e combinações." },
  { title: "Envio para todo o Brasil", text: "Embalagem cuidadosa e entrega assegurada, de Porto Alegre a Manaus." },
];

function Maison() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-44 lg:px-10">
        <div className="animate-fade-up">
          <p className="eyebrow text-accent">A Maison</p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-primary sm:text-6xl">Uma casa construída sobre a permanência</h1>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>A Belmont é uma casa de curadoria. Reunimos o vocabulário do preppy americano — Polo Ralph Lauren, Brooks Brothers, GANT — ao luxo silencioso europeu de Loro Piana, Brunello Cucinelli e Tod's.</p>
            <p>Trabalhamos com importação direta, de fornecedores autorizados, para que cada peça chegue exatamente como saiu da origem. Nada de réplicas, nada de atalhos.</p>
            <p>Acreditamos no guarda-roupa que se constrói devagar: poucas peças, muito bem escolhidas, para vestir por décadas.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <img src={interior} alt="Interior de boutique com tricôs dobrados em prateleiras de madeira" width={1600} height={1008} loading="lazy" className="aspect-[16/9] w-full object-cover" />
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
