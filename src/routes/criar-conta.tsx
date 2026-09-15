import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Campo, FormShell, inputClasses } from "@/components/FormShell";

export const Route = createFileRoute("/criar-conta")({
  head: () => ({
    meta: [
      { title: "Criar conta — Garimpa Aqui" },
      { name: "description", content: "Crie sua conta no Garimpa Aqui e cadastre brechós do Rio." },
      { property: "og:title", content: "Criar conta — Garimpa Aqui" },
      { property: "og:description", content: "Crie sua conta no Garimpa Aqui." },
    ],
  }),
  component: CriarConta,
});

function CriarConta() {
  const [aviso, setAviso] = useState("");

  return (
    <FormShell
      titulo="Criar conta"
      descricao="Versão de demonstração: o cadastro ainda não está conectado."
      acao="Criar conta"
      onSubmit={(e) => {
        e.preventDefault();
        setAviso("Cadastro ainda não disponível nesta primeira versão.");
      }}
      rodape={
        <>
          {aviso && (
            <p role="status" className="mb-3 rounded-xl bg-clay/60 px-4 py-2 font-semibold">
              {aviso}
            </p>
          )}
          Já tem conta?{" "}
          <Link to="/entrar" className="font-bold text-brand hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <Campo id="nome" rotulo="Nome">
        <input id="nome" type="text" required autoComplete="name" className={inputClasses} />
      </Campo>
      <Campo id="email" rotulo="E-mail">
        <input id="email" type="email" required autoComplete="email" className={inputClasses} />
      </Campo>
      <Campo id="senha" rotulo="Senha">
        <input
          id="senha"
          type="password"
          required
          autoComplete="new-password"
          className={inputClasses}
        />
      </Campo>
    </FormShell>
  );
}
