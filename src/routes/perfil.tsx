import { createFileRoute, Link } from "@tanstack/react-router";
import { EstadoVazio } from "@/components/estados";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Garimpa Aqui" },
      { name: "description", content: "Seu perfil no Garimpa Aqui e os brechós que você enviou." },
      { property: "og:title", content: "Meu perfil — Garimpa Aqui" },
      { property: "og:description", content: "Seu perfil no Garimpa Aqui." },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Meu perfil</h1>
      <p className="mt-2 text-sm text-ink/70">
        Nesta primeira versão o perfil mostra apenas os brechós enviados por você.
      </p>

      <div className="mt-6 rounded-3xl bg-surface p-6 shadow-md">
        <h2 className="font-display text-xl font-bold">Dados da conta</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink/50">Nome</dt>
            <dd>Visitante</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink/50">E-mail</dt>
            <dd>—</dd>
          </div>
        </dl>
        <Link
          to="/entrar"
          className="mt-5 inline-block rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground transition hover:brightness-110"
        >
          Entrar na conta
        </Link>
      </div>

      <h2 className="mt-10 font-display text-xl font-bold">Brechós enviados</h2>
      <div className="mt-4">
        <EstadoVazio
          titulo="Você ainda não enviou nenhum brechó"
          descricao="Indique um brechó que você conhece e ele aparecerá aqui."
          acao={
            <Link
              to="/enviar-brecho"
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground transition hover:brightness-110"
            >
              Enviar brechó
            </Link>
          }
        />
      </div>
    </section>
  );
}
