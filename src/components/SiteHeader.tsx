import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/brechos", label: "Brechós" },
  { to: "/categorias", label: "Categorias" },
  { to: "/enviar-brecho", label: "Enviar brechó" },
] as const;

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 md:h-16 md:py-0">
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Garimpa Aqui, início">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-warm font-display text-lg font-bold text-cream">
            G
          </span>
          <span className="truncate font-display text-xl font-bold tracking-tight">Garimpa Aqui</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 text-sm font-bold md:flex" aria-label="Principal">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-3 py-2 transition hover:bg-mint/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                activeProps={{ className: "bg-mint" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/entrar"
            className="hidden rounded-full px-3 py-2 text-sm font-bold transition hover:bg-mint/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:inline"
          >
            Entrar
          </Link>
          <Link
            to="/criar-conta"
            className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-brand-foreground shadow-sm transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Criar conta
          </Link>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className="rounded-full border border-brand/20 px-3 py-2 text-sm font-bold transition hover:bg-mint/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      {aberto && (
        <nav
          id="menu-mobile"
          aria-label="Principal (celular)"
          className="mx-auto max-w-6xl px-4 pb-3 md:hidden"
        >
          <ul className="grid gap-1 text-sm font-bold">
            {[...links, { to: "/entrar", label: "Entrar" }, { to: "/perfil", label: "Perfil" }].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setAberto(false)}
                  className="block rounded-xl px-3 py-2 transition hover:bg-mint/60"
                  activeProps={{ className: "bg-mint" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
