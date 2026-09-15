import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Campo, FormShell, inputClasses } from "@/components/FormShell";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — Garimpa Aqui" },
      { name: "description", content: "Acesse sua conta do Garimpa Aqui para gerenciar seus brechós." },
      { property: "og:title", content: "Entrar — Garimpa Aqui" },
      { property: "og:description", content: "Acesse sua conta do Garimpa Aqui." },
    ],
  }),
  component: Entrar,
});

function Entrar() {
  const [aviso, setAviso] = useState("");

  return (
    <FormShell
      titulo="Entrar"
      descricao="Versão de demonstração: o login ainda não está conectado."
      acao="Entrar"
      onSubmit={(e) => {
        e.preventDefault();
        setAviso("Login ainda não disponível nesta primeira versão.");
      }}
      rodape={
        <>
          {aviso && (
            <p role="status" className="mb-3 rounded-xl bg-clay/60 px-4 py-2 font-semibold">
              {aviso}
            </p>
          )}
          Ainda não tem conta?{" "}
          <Link to="/criar-conta" className="font-bold text-brand hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <Campo id="email" rotulo="E-mail">
        <input id="email" type="email" required autoComplete="email" className={inputClasses} />
      </Campo>
      <Campo id="senha" rotulo="Senha">
        <input
          id="senha"
          type="password"
          required
          autoComplete="current-password"
          className={inputClasses}
        />
      </Campo>
    </FormShell>
  );
}
