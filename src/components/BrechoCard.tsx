import { Link } from "@tanstack/react-router";
import type { Brecho } from "@/data/brechos";

export function BrechoCard({ brecho }: { brecho: Brecho }) {
  return (
    <article className="rounded-3xl bg-surface p-3 shadow-md transition hover:-translate-y-1 focus-within:-translate-y-1">
      <img
        src={brecho.capa}
        alt={`Fachada e peças do ${brecho.nome}`}
        loading="lazy"
        width={1024}
        height={768}
        className="aspect-[4/3] w-full rounded-2xl object-cover"
      />
      <div className="p-2">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
          <h3 className="min-w-0 font-display text-lg font-bold">
            <Link
              to="/brechos/$id"
              params={{ id: brecho.id }}
              className="rounded transition hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {brecho.nome}
            </Link>
          </h3>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
              brecho.tipo === "fisica" ? "bg-mint text-brand" : "bg-clay text-ink"
            }`}
          >
            {brecho.tipo === "fisica" ? "Loja física" : "Online"}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/70">{brecho.bairro}</p>
        <ul className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold">
          {brecho.categorias.map((c) => (
            <li key={c} className="rounded-full bg-clay/60 px-2 py-0.5">
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm font-bold text-accent-warm">{brecho.faixaPreco}</p>
      </div>
    </article>
  );
}
