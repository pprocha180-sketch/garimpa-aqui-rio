import type { ReactNode } from "react";

export function GridCarregando({ itens = 3 }: { itens?: number }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <span className="sr-only">Carregando brechós…</span>
      {Array.from({ length: itens }).map((_, i) => (
        <div key={i} className="rounded-3xl bg-surface p-3 shadow-md" aria-hidden="true">
          <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-clay/70" />
          <div className="space-y-2 p-2">
            <div className="h-5 w-2/3 animate-pulse rounded bg-clay/70" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-clay/60" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-clay/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Caixa({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-brand/15 bg-surface px-6 py-10 text-center shadow-sm">
      {children}
    </div>
  );
}

export function EstadoErro({
  mensagem = "Não foi possível carregar os brechós agora.",
  aoTentarNovamente,
}: {
  mensagem?: string;
  aoTentarNovamente?: () => void;
}) {
  return (
    <Caixa>
      <div role="alert">
        <h3 className="font-display text-xl font-bold">Deu ruim no garimpo</h3>
        <p className="mt-2 text-sm text-ink/70">{mensagem}</p>
      </div>
      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="mt-5 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Tentar de novo
        </button>
      )}
    </Caixa>
  );
}

export function EstadoVazio({
  titulo = "Nenhum brechó encontrado",
  descricao = "Tente outro nome, bairro ou categoria.",
  acao,
}: {
  titulo?: string;
  descricao?: string;
  acao?: ReactNode;
}) {
  return (
    <Caixa>
      <h3 className="font-display text-xl font-bold">{titulo}</h3>
      <p className="mt-2 text-sm text-ink/70">{descricao}</p>
      {acao && <div className="mt-5">{acao}</div>}
    </Caixa>
  );
}
