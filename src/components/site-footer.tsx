import { Link } from "@tanstack/react-router";
import { useState } from "react";
import mark from "@/assets/belmont-mark.png";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={mark}
                alt=""
                width={816}
                height={816}
                loading="lazy"
                className="h-10 w-10 object-contain brightness-0 invert"
              />
              <span className="font-serif text-2xl tracking-[0.3em]">BELMONT</span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              Curadoria de roupas e calçados importados. Peças originais, escolhidas para durar
              décadas.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-accent">Navegação</h4>
            <ul className="mt-6 space-y-3 text-sm text-primary-foreground/70">
              <li>
                <Link to="/" className="transition-colors hover:text-accent">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/colecao" className="transition-colors hover:text-accent">
                  Coleção
                </Link>
              </li>
              <li>
                <Link to="/maison" className="transition-colors hover:text-accent">
                  A Maison
                </Link>
              </li>
              <li>
                <Link to="/contato" className="transition-colors hover:text-accent">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-accent">Atendimento</h4>
            <ul className="mt-6 space-y-3 text-sm text-primary-foreground/70">
              <li>Segunda a sexta, 9h às 18h</li>
              <li>atendimento@belmont.com.br</li>
              <li>Trocas em até 30 dias</li>
              <li>Envios para todo o Brasil</li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-accent">Newsletter</h4>
            <p className="mt-6 text-sm text-primary-foreground/60">
              Novas chegadas e edições limitadas, sem excessos.
            </p>
            <form
              className="mt-5 flex border-b border-primary-foreground/30 pb-2"
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
                setEmail("");
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="w-full bg-transparent text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none"
              />
              <button type="submit" className="eyebrow text-accent">
                Enviar
              </button>
            </form>
            {done && (
              <p className="mt-3 text-xs text-accent">Obrigado. Em breve você terá notícias.</p>
            )}
          </div>
        </div>

        <p className="mt-16 border-t border-primary-foreground/15 pt-8 text-center text-xs tracking-wide text-primary-foreground/45">
          © 2025 Belmont. Todos os direitos reservados. Brasil · Envios para todo o país
        </p>
      </div>
    </footer>
  );
}
