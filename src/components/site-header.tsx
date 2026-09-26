import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import mark from "@/assets/belmont-mark.png";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Início", to: "/" },
  { label: "Coleção", to: "/colecao" },
  { label: "A Maison", to: "/maison" },
  { label: "Contato", to: "/contato" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-sm py-3"
          : "border-b border-transparent py-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={mark} alt="" width={816} height={816} className="h-9 w-9 object-contain" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-2xl tracking-[0.3em] text-primary">BELMONT</span>
            <span className="mt-1 text-center text-[0.5rem] tracking-[0.45em] text-accent">
              ✷
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow text-primary/70 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button aria-label="Buscar" className="text-primary transition-colors hover:text-accent">
            <Search className="h-[18px] w-[18px]" strokeWidth={1.3} />
          </button>
          <button aria-label="Sacola" className="text-primary transition-colors hover:text-accent">
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.3} />
          </button>
          <button
            aria-label="Menu"
            className="text-primary md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.3} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.3} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-fade-in border-t border-border bg-background px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="eyebrow text-primary/80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
