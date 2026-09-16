import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Campo, FormShell, inputClasses } from "@/components/FormShell";
import { supabase } from "@/integrations/supabase/client";

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
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  async function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    setEnviando(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        emailRedirectTo: window.location.origin,
        data: { nome },
      },
    });
    setEnviando(false);
    if (error) {
      setErro(
        error.message.toLowerCase().includes("already")
          ? "Já existe uma conta com esse e-mail."
          : "Não foi possível criar a conta agora. Tente de novo.",
      );
      return;
    }
    if (data.session) {
      navigate({ to: "/perfil", replace: true });
      return;
    }
    setSucesso("Conta criada! Enviamos um e-mail de confirmação: clique no link para ativar sua conta.");
  }

  return (
    <FormShell
      titulo="Criar conta"
      descricao="Crie sua conta para indicar brechós do Rio."
      acao={enviando ? "Criando conta…" : "Criar conta"}
      enviando={enviando}
      onSubmit={aoEnviar}
      rodape={
        <>
          {erro && (
            <p role="alert" className="mb-3 rounded-xl bg-clay/60 px-4 py-2 font-semibold">
              {erro}
            </p>
          )}
          {sucesso && (
            <p role="status" className="mb-3 rounded-xl bg-mint px-4 py-2 font-semibold text-brand">
              {sucesso}
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
        <input
          id="nome"
          type="text"
          required
          autoComplete="name"
          className={inputClasses}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </Campo>
      <Campo id="email" rotulo="E-mail">
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          className={inputClasses}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Campo>
      <Campo id="senha" rotulo="Senha">
        <input
          id="senha"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className={inputClasses}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </Campo>
    </FormShell>
  );
}
