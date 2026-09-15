import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BrechoCard } from "@/components/BrechoCard";
import { FiltrosBusca, type FiltrosValor } from "@/components/FiltrosBusca";
import { EstadoErro, EstadoVazio, GridCarregando } from "@/components/estados";
import { useBrechos } from "@/hooks/useBrechos";

type Busca = { categoria: string; bairro: string; visao: "lista" | "mapa" };

export const Route = createFileRoute("/brechos/")({
  validateSearch: (search: Record<string, unknown>): Busca => ({
    categoria: typeof search["categoria"] === "string" ? search["categoria"] : "",
    bairro: typeof search["bairro"] === "string" ? search["bairro"] : "",
    visao: search["visao"] === "mapa" ? "mapa" : "lista",
  }),
  head: () => ({
    meta: [
      { title: "Brechós do Rio — Garimpa Aqui" },
      {
        name: "description",
        content: "Lista completa de brechós do estado do Rio de Janeiro com filtros por bairro e categoria.",
      },
      { property: "og:title", content: "Brechós do Rio — Garimpa Aqui" },
      {
        property: "og:description",
        content: "Lista completa de brechós do estado do Rio de Janeiro com filtros por bairro e categoria.",
      },
    ],
  }),
  component: ListaBrechos,
});

function ListaBrechos() {
  const busca = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filtros, setFiltros] = useState<FiltrosValor>({
    termo: "",
    bairro: busca.bairro ?? "",
    categoria: busca.categoria ?? "",
  });
  const { data, isPending, isError, refetch } = useBrechos();

  const resultados = useMemo(() => {
    const termo = filtros.termo.trim().toLowerCase();
    return (data ?? []).filter(
      (b) =>
        (!termo ||
          b.nome.toLowerCase().includes(termo) ||
          b.bairro.toLowerCase().includes(termo) ||
          b.categorias.some((c) => c.toLowerCase().includes(termo))) &&
        (!filtros.bairro || b.bairro === filtros.bairro) &&
        (!filtros.categoria || b.categorias.includes(filtros.categoria)),
    );
  }, [data, filtros]);

  const visao = busca.visao ?? "lista";

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Brechós do estado do Rio</h1>
      <p className="mt-2 text-sm text-ink/70">
        {isPending ? "Carregando…" : `${resultados.length} brechó(s) encontrado(s)`}
      </p>

      <div className="mt-5">
        <FiltrosBusca valor={filtros} aoMudar={setFiltros} />
      </div>

      <div className="mt-4 inline-flex rounded-full bg-clay/60 p-1" role="tablist" aria-label="Ver lista ou mapa">
        {(["lista", "mapa"] as const).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={visao === v}
            onClick={() => navigate({ search: (p) => ({ ...p, visao: v }) })}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
              visao === v ? "bg-brand text-brand-foreground" : "text-ink/70 hover:text-ink"
            }`}
          >
            {v === "lista" ? "Lista" : "Mapa"}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {isPending ? (
          <GridCarregando itens={6} />
        ) : isError ? (
          <EstadoErro aoTentarNovamente={() => refetch()} />
        ) : resultados.length === 0 ? (
          <EstadoVazio
            acao={
              <button
                type="button"
                onClick={() => setFiltros({ termo: "", bairro: "", categoria: "" })}
                className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground transition hover:brightness-110"
              >
                Limpar filtros
              </button>
            }
          />
        ) : visao === "mapa" ? (
          <div className="rounded-3xl border border-brand/15 bg-surface p-6 shadow-sm">
            <p className="text-sm font-bold text-ink/70">
              O mapa chega em breve. Por enquanto, veja os endereços dos brechós encontrados:
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {resultados.map((b) => (
                <li key={b.id} className="rounded-2xl bg-clay/40 p-4">
                  <p className="font-display font-bold">{b.nome}</p>
                  <p className="mt-1 text-sm text-ink/70">{b.endereco}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((b) => (
              <BrechoCard key={b.id} brecho={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
