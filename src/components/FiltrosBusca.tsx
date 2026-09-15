import { bairros, categorias } from "@/data/brechos";

export type FiltrosValor = { termo: string; bairro: string; categoria: string };

export function FiltrosBusca({
  valor,
  aoMudar,
  variante = "claro",
}: {
  valor: FiltrosValor;
  aoMudar: (v: FiltrosValor) => void;
  variante?: "claro" | "sobre-brand";
}) {
  const rotulo = variante === "sobre-brand" ? "text-cream/80" : "text-ink/70";
  const campo =
    "w-full rounded-xl bg-surface px-4 py-3 text-ink font-semibold placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm";

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className={`rounded-2xl p-2 ${variante === "sobre-brand" ? "bg-cream/10" : "bg-clay/50"}`}
    >
      <div className="grid gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <label htmlFor="busca-termo" className={`mb-1 block px-1 text-xs font-bold ${rotulo}`}>
            Nome, bairro ou categoria
          </label>
          <input
            id="busca-termo"
            type="search"
            value={valor.termo}
            onChange={(e) => aoMudar({ ...valor, termo: e.target.value })}
            placeholder="Ex.: Riostar, Tijuca, vestuário…"
            className={campo}
          />
        </div>
        <div>
          <label htmlFor="busca-bairro" className={`mb-1 block px-1 text-xs font-bold ${rotulo}`}>
            Bairro
          </label>
          <select
            id="busca-bairro"
            value={valor.bairro}
            onChange={(e) => aoMudar({ ...valor, bairro: e.target.value })}
            className={campo}
          >
            <option value="">Todos</option>
            {bairros.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="busca-categoria" className={`mb-1 block px-1 text-xs font-bold ${rotulo}`}>
            Categoria
          </label>
          <select
            id="busca-categoria"
            value={valor.categoria}
            onChange={(e) => aoMudar({ ...valor, categoria: e.target.value })}
            className={campo}
          >
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c.slug} value={c.nome}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
