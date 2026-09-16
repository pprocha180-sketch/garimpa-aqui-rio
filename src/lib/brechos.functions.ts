import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export type BrechoRow = {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  endereco: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  latitude: number | null;
  longitude: number | null;
  instagram_url: string | null;
  whatsapp: string | null;
  website_url: string | null;
  faixa_preco: string | null;
  categorias: string[];
  tem_loja_fisica: boolean;
  vende_online: boolean;
  horario_funcionamento: string | null;
  imagem_capa_url: string | null;
  destaque: boolean;
};

const COLUNAS =
  "id, nome, slug, descricao, endereco, bairro, cidade, estado, latitude, longitude, instagram_url, whatsapp, website_url, faixa_preco, categorias, tem_loja_fisica, vende_online, horario_funcionamento, imagem_capa_url, destaque";

function clientePublico() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listarBrechos = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await clientePublico()
    .from("brechos")
    .select(COLUNAS)
    .eq("status", "approved")
    .order("destaque", { ascending: false })
    .order("nome", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as BrechoRow[];
});
