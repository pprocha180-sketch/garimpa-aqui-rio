import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-4 max-w-6xl px-4 py-10">
      <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-ink px-6 py-8 text-cream sm:flex-row">
        <span className="font-display text-xl font-bold">Garimpa Aqui</span>
        <nav className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-cream/70" aria-label="Rodapé">
          <Link to="/perfil" className="transition hover:text-cream">
            Perfil
          </Link>
          <Link to="/enviar-brecho" className="transition hover:text-cream">
            Enviar brechó
          </Link>
          <Link to="/admin" className="transition hover:text-cream">
            Admin
          </Link>
        </nav>
      </div>
    </footer>
  );
}
