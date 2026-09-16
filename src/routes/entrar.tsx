import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Campo, FormShell, inputClasses } from "@/components/FormShell";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/entrar")({
  validateSearch: (search: Record<string, unknown>): { redirecionar?: string } => {
    const destino = search["redirecionar"];
    return typeof destino === "string" && destino.startsWith("/") ? { redirecionar: destino } : {};
  },
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
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { usuario, carregando } = useAuth();
  const navigate = useNavigate();
  const { redirecionar } = Route.useSearch();

  useEffect(() => {
    if (!carregando && usuario) {
      navigate({ to: redirecionar ?? "/perfil", replace: true });
    }
  }, [usuario, carregando, navigate, redirecionar]);

  async function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setEnviando(false);
    if (error) {
      setErro(
        error.message.toLowerCase().includes("invalid")
          ? "E-mail ou senha incorretos."
          : error.message.toLowerCase().includes("confirm")
            ? "Confirme seu e-mail antes de entrar."
            : "Não foi possível entrar agora. Tente de novo.",
      );
      return;
    }
    navigate({ to: redirecionar ?? "/perfil", replace: true });
  }

  return (
    <FormShell
      titulo="Entrar"
      descricao="Use seu e-mail e senha para acessar sua conta."
      acao={enviando ? "Entrando…" : "Entrar"}
      enviando={enviando}
      onSubmit={aoEnviar}
      rodape={
        <>
          {erro && (
            <p role="alert" className="mb-3 rounded-xl bg-clay/60 px-4 py-2 font-semibold">
              {erro}
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
          autoComplete="current-password"
          className={inputClasses}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </Campo>
    </FormShell>
  );
}
