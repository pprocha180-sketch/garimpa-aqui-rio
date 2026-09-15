import { createFileRoute, Link } from "@tanstack/react-router";
import { EstadoErro, EstadoVazio } from "@/components/estados";
import { useBrechos } from "@/hooks/useBrechos";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administração — Garimpa Aqui" },
      { name: "description", content: "Painel de administração do catálogo de brechós Garimpa Aqui." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Administração — Garimpa Aqui" },
      { property: "og:description", content: "Painel de administração do catálogo." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { data, isPending, isError, refetch } = useBrechos();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Administração</h1>
      <p className="mt-2 text-sm text-ink/70">
        Visão geral do catálogo com dados fictícios desta primeira versão.
      </p>

      {isError ? (
        <div className="mt-6">
          <EstadoErro aoTentarNovamente={() => refetch()} />
        </div>
      ) : isPending ? (
        <div className="mt-6 space-y-3" role="status" aria-live="polite">
          <span className="sr-only">Carregando catálogo…</span>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-2xl bg-clay/70" aria-hidden="true" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="mt-6">
          <EstadoVazio titulo="Catálogo vazio" descricao="Nenhum brechó cadastrado até agora." />
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-3xl bg-surface p-2 shadow-md">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Brechós cadastrados</caption>
            <thead>
              <tr className="text-xs uppercase tracking-wide text-ink/50">
                <th scope="col" className="px-4 py-3">Brechó</th>
                <th scope="col" className="px-4 py-3">Bairro</th>
                <th scope="col" className="px-4 py-3">Tipo</th>
                <th scope="col" className="px-4 py-3">Faixa</th>
                <th scope="col" className="px-4 py-3">Destaque</th>
              </tr>
            </thead>
            <tbody>
              {data.map((b) => (
                <tr key={b.id} className="border-t border-brand/10">
                  <th scope="row" className="px-4 py-3 font-bold">
                    <Link to="/brechos/$id" params={{ id: b.id }} className="hover:text-brand hover:underline">
                      {b.nome}
                    </Link>
                  </th>
                  <td className="px-4 py-3">{b.bairro}</td>
                  <td className="px-4 py-3">{b.tipo === "fisica" ? "Loja física" : "Online"}</td>
                  <td className="px-4 py-3">{b.faixaPreco}</td>
                  <td className="px-4 py-3">{b.destaque ? "Sim" : "Não"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
