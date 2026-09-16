import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BrechoCard } from "@/components/BrechoCard";
import { FiltrosBusca, type FiltrosValor } from "@/components/FiltrosBusca";
import { EstadoErro, EstadoVazio, GridCarregando } from "@/components/estados";
import { useBrechos } from "@/hooks/useBrechos";
import { categorias } from "@/data/brechos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Garimpa Aqui — Brechós do Rio de Janeiro" },
      {
        name: "description",
        content:
          "Encontre brechós do estado do Rio de Janeiro por nome, bairro e categoria. Moda circular e cultura urbana carioca.",
      },
      { property: "og:title", content: "Garimpa Aqui — Brechós do Rio de Janeiro" },
      {
        property: "og:description",
        content: "Catálogo de brechós cariocas com busca por nome, bairro e categoria.",
      },
    ],
  }),
  component: Inicio,
});

const coresCategoria = ["bg-clay", "bg-mint", "bg-accent-warm/30", "bg-brand/15"];

function Inicio() {
  const [filtros, setFiltros] = useState<FiltrosValor>({ termo: "", bairro: "", categoria: "" });
  const { data, isPending, isError, refetch } = useBrechos();

  const resultados = useMemo(() => {
    const lista = data ?? [];
    const termo = filtros.termo.trim().toLowerCase();
    return lista.filter(
      (b) =>
        (!termo ||
          b.nome.toLowerCase().includes(termo) ||
          b.bairro.toLowerCase().includes(termo) ||
          b.categorias.some((c) => c.toLowerCase().includes(termo))) &&
        (!filtros.bairro || b.bairro === filtros.bairro) &&
        (!filtros.categoria || b.categorias.includes(filtros.categoria)),
    );
  }, [data, filtros]);

  const temFiltro = Boolean(filtros.termo || filtros.bairro || filtros.categoria);
  const destaques = resultados.filter((b) => b.destaque);
  const lista = temFiltro ? resultados : destaques;

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-9 text-cream sm:px-10">
          <div className="absolute -right-8 -top-10 size-40 rounded-full bg-mint/30" aria-hidden="true" />
          <div className="absolute bottom-4 right-16 size-16 rounded-full bg-accent-warm/40" aria-hidden="true" />
          <p className="relative text-sm font-bold uppercase tracking-wide text-mint">
            Moda circular · Rio de Janeiro
          </p>
          <h1 className="relative mt-2 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Garimpe a peça certa no seu bairro
          </h1>
          <p className="relative mt-3 max-w-md text-cream/80">
            Catálogo de brechós de todo o estado. Encontre peças com história perto de você.
          </p>

          <div className="relative mt-6">
            <FiltrosBusca valor={filtros} aoMudar={setFiltros} variante="sobre-brand" />
          </div>

          <div className="relative mt-4 flex flex-wrap gap-2 text-sm">
            <Link
              to="/brechos"
              className="rounded-full bg-cream/15 px-3 py-1.5 font-semibold transition hover:bg-cream/25"
            >
              Ver todos os brechós
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-4 font-display text-xl font-bold">Categorias principais</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categorias.map((c, i) => (
            <button
              key={c.slug}
              onClick={() => setFiltros({ ...filtros, categoria: c.nome })}
              className={`rounded-2xl p-4 text-center font-bold shadow-sm transition hover:-translate-y-0.5 ${coresCategoria[i % 4]}`}
            >
              {c.nome}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-display text-xl font-bold">
            {temFiltro ? "Resultados da busca" : "Brechós em destaque"}
          </h2>
          {temFiltro && (
            <button 
              onClick={() => setFiltros({ termo: "", bairro: "", categoria: "" })}
              className="text-sm font-bold text-brand hover:underline"
            >
              Limpar filtros ✕
            </button>
          )}
        </div>

        {isPending ? (
          <GridCarregando />
        ) : isError ? (
          <EstadoErro aoTentarNovamente={() => refetch()} />
        ) : lista.length === 0 ? (
          <EstadoVazio
            acao={
              <button
                type="button"
                onClick={() => setFiltros({ termo: "", bairro: "", categoria: "" })}
                className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground transition hover:brightness-110"
              >
                Limpar busca
              </button>
            }
          />
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* Espaço reservado para o Mapa Futuro */}
            <div className="flex h-[200px] w-full items-center justify-center rounded-2xl border border-dashed border-brand/30 bg-brand/5 text-brand/60 shadow-sm">
              <p className="font-semibold">🗺️ Mapa indisponível temporariamente</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lista.map((b) => (
                <BrechoCard key={b.id} brecho={b} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
