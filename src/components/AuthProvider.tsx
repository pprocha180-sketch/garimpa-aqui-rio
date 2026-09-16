import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

type AuthContexto = {
  usuario: User | null;
  sessao: Session | null;
  carregando: boolean;
  sair: () => Promise<void>;
};

const Contexto = createContext<AuthContexto>({
  usuario: null,
  sessao: null,
  carregando: true,
  sair: async () => {},
});

export function useAuth() {
  return useContext(Contexto);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    let ativo = true;

    const { data: sub } = supabase.auth.onAuthStateChange((evento, novaSessao) => {
      if (!ativo) return;
      setSessao(novaSessao);
      setCarregando(false);
      if (evento !== "SIGNED_IN" && evento !== "SIGNED_OUT" && evento !== "USER_UPDATED") return;
      router.invalidate();
      if (evento !== "SIGNED_OUT") queryClient.invalidateQueries();
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!ativo) return;
      setSessao(data.session);
      setCarregando(false);
    });

    return () => {
      ativo = false;
      sub.subscription.unsubscribe();
    };
  }, [router, queryClient]);

  async function sair() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    router.navigate({ to: "/entrar", replace: true });
  }

  return (
    <Contexto.Provider value={{ sessao, usuario: sessao?.user ?? null, carregando, sair }}>
      {children}
    </Contexto.Provider>
  );
}
