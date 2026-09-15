import { createFileRoute, Link } from "@tanstack/react-router";
import { categorias } from "@/data/brechos";
import { useBrechos } from "@/hooks/useBrechos";
import { EstadoErro } from "@/components/estados";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias de brechós — Garimpa Aqui" },
      {
        name: "description",
        content: "Navegue por vestuário, sapatos, acessórios e vinis nos brechós do Rio de Janeiro.",
      },
      { property: "og:title", content: "Categorias de brechós — Garimpa Aqui" },
      {
        property: "og:description",
        content: "Navegue por vestuário, sapatos, acessórios e vinis nos brechós do Rio de Janeiro.",
      },
    ],
  }),
  component: Categorias,
});

const cores = ["bg-clay", "bg-mint", "bg-accent-warm/30", "bg-brand/15"];

function Categorias() {
  const { data, isPending, isError, refetch } = useBrechos();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Categorias</h1>
      <p className="mt-2 text-sm text-ink/70">Escolha um tipo de garimpo e veja os brechós.</p>

      {isError ? (
        <div className="mt-6">
          <EstadoErro aoTentarNovamente={() => refetch()} />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c, i) => {
            const total = (data ?? []).filter((b) => b.categorias.includes(c.nome)).length;
            return (
              <Link
                key={c.slug}
                to="/brechos"
                search={{ categoria: c.nome }}
                className={`rounded-3xl p-6 shadow-sm transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${cores[i % 4]}`}
              >
                <h2 className="font-display text-xl font-bold">{c.nome}</h2>
                <p className="mt-1 text-sm text-ink/70">
                  {isPending ? "Carregando…" : `${total} brechó(s)`}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
