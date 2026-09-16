import type { FormEvent, ReactNode } from "react";

export const inputClasses =
  "w-full rounded-xl border border-brand/15 bg-surface px-4 py-3 font-semibold text-ink placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm";

export function Campo({
  id,
  rotulo,
  children,
}: {
  id: string;
  rotulo: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink/60"
      >
        {rotulo}
      </label>
      {children}
    </div>
  );
}

export function FormShell({
  titulo,
  descricao,
  onSubmit,
  children,
  acao,
  rodape,
  enviando,
}: {
  titulo: string;
  descricao?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  acao: string;
  rodape?: ReactNode;
  enviando?: boolean;
}) {
  return (
    <section className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-3xl bg-surface p-6 shadow-md sm:p-8">
        <h1 className="font-display text-2xl font-bold">{titulo}</h1>
        {descricao && <p className="mt-2 text-sm text-ink/70">{descricao}</p>}
        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            disabled={enviando}
            className="mt-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
          >
            {acao}
          </button>
        </form>
        {rodape && <div className="mt-5 text-sm text-ink/70">{rodape}</div>}
      </div>
    </section>
  );
}
