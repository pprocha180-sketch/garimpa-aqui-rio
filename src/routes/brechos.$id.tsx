import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { EstadoErro, EstadoVazio } from "@/components/estados";
import { useBrecho } from "@/hooks/useBrechos";
import { brechos } from "@/data/brechos";

export const Route = createFileRoute("/brechos/$id")({
  head: ({ params }) => {
    const b = brechos.find((x) => x.id === params.id);
    const titulo = b ? `${b.nome} — ${b.bairro} | Garimpa Aqui` : "Brechó — Garimpa Aqui";
    const desc = b
      ? `${b.descricao} Endereço: ${b.endereco}.`
      : "Detalhes do brechó no catálogo Garimpa Aqui.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: DetalheBrecho,
});

function DetalheBrecho() {
  const { id } = Route.useParams();
  const { data, isPending, isError, refetch } = useBrecho(id);
  const [fotoAtiva, setFotoAtiva] = useState(0);

  if (isPending) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10" role="status" aria-live="polite">
        <span className="sr-only">Carregando brechó…</span>
        <div className="aspect-[16/9] w-full animate-pulse rounded-3xl bg-clay/70" />
        <div className="mt-6 h-8 w-1/2 animate-pulse rounded bg-clay/70" />
        <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-clay/60" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <EstadoErro
          mensagem="Não foi possível carregar este brechó."
          aoTentarNovamente={() => refetch()}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <EstadoVazio
          titulo="Brechó não encontrado"
          descricao="Esse endereço não existe mais ou o brechó saiu do catálogo."
          acao={
            <Link
              to="/brechos"
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground transition hover:brightness-110"
            >
              Ver todos os brechós
            </Link>
          }
        />
      </div>
    );
  }

  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.endereco)}`;

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/brechos" className="text-sm font-bold text-brand hover:underline">
        ← Voltar aos brechós
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <img
            src={data.galeria[fotoAtiva]}
            alt={`Foto ${fotoAtiva + 1} do ${data.nome}`}
            width={1024}
            height={768}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-md"
          />
          <ul className="mt-3 flex gap-3">
            {data.galeria.map((foto, i) => (
              <li key={foto + i}>
                <button
                  type="button"
                  onClick={() => setFotoAtiva(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === fotoAtiva}
                  className={`overflow-hidden rounded-2xl transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                    i === fotoAtiva ? "ring-2 ring-brand" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={foto}
                    alt=""
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-20 w-28 object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-surface p-6 shadow-md">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <h1 className="min-w-0 font-display text-3xl font-bold">{data.nome}</h1>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                data.tipo === "fisica" ? "bg-mint text-brand" : "bg-clay text-ink"
              }`}
            >
              {data.tipo === "fisica" ? "Loja física" : "Online"}
            </span>
          </div>
          <p className="mt-1 text-sm font-bold text-accent-warm">{data.faixaPreco}</p>

          <ul className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold">
            {data.categorias.map((c) => (
              <li key={c} className="rounded-full bg-clay/60 px-2.5 py-1">
                {c}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm leading-relaxed text-ink/80">{data.descricao}</p>

          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink/50">Endereço</dt>
              <dd>{data.endereco}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink/50">Horário</dt>
              <dd>{data.horario}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink/50">Instagram</dt>
              <dd>
                <a
                  href={`https://instagram.com/${data.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-brand hover:underline"
                >
                  {data.instagram}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink/50">WhatsApp</dt>
              <dd>{data.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")}</dd>
            </div>
          </dl>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <a
              href={`https://wa.me/${data.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-brand px-4 py-3 text-center text-sm font-bold text-brand-foreground transition hover:brightness-110"
            >
              Falar no WhatsApp
            </a>
            <a
              href={mapa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-accent-warm px-4 py-3 text-center text-sm font-bold text-cream transition hover:brightness-110"
            >
              Como chegar
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
