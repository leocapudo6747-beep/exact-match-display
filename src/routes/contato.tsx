import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — BELMONT" },
      {
        name: "description",
        content:
          "Fale com a Belmont por WhatsApp, e-mail ou Instagram. Atendimento de segunda a sexta, das 9h às 18h.",
      },
      { property: "og:title", content: "Contato — BELMONT" },
      {
        property: "og:description",
        content: "Canais diretos de atendimento da Maison Belmont.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contato,
});

const canais = [
  { icon: MessageCircle, label: "WhatsApp", value: "+55 11 90000-0000" },
  { icon: Mail, label: "E-mail", value: "atendimento@belmont.com.br" },
  { icon: Instagram, label: "Instagram", value: "@belmont.maison" },
];

function Contato() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 pb-28 pt-44 lg:px-10">
        <div className="animate-fade-up max-w-xl">
          <p className="eyebrow text-accent">Contato</p>
          <h1 className="mt-5 font-serif text-5xl text-primary sm:text-6xl">Fale com a Maison</h1>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Atendemos de segunda a sexta, das 9h às 18h. Respondemos toda mensagem, sempre com
            calma.
          </p>
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          <ul className="space-y-10">
            {canais.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-5 border-b border-border pb-8">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.3} />
                <div>
                  <p className="eyebrow text-primary/60">{label}</p>
                  <p className="mt-2 font-serif text-2xl text-primary">{value}</p>
                </div>
              </li>
            ))}
          </ul>

          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div>
              <label className="eyebrow text-primary/60" htmlFor="nome">
                Nome
              </label>
              <input
                id="nome"
                required
                className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm text-primary focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="eyebrow text-primary/60" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm text-primary focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="eyebrow text-primary/60" htmlFor="mensagem">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                rows={4}
                required
                className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-sm text-primary focus:border-accent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="eyebrow w-full bg-primary px-10 py-4 text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
            >
              Enviar mensagem
            </button>
            {sent && (
              <p className="text-xs text-accent">
                Mensagem registrada. Retornaremos em até um dia útil.
              </p>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
