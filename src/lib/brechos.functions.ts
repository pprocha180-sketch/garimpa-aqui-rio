import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

function gerarSlug(nome: string): string {
  const base = nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const sufixo = Math.random().toString(36).slice(2, 8);
  return `${base || "brecho"}-${sufixo}`;
}

const enviarBrechoSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome do brechó").max(120),
  bairro: z.string().trim().min(2, "Informe o bairro").max(80),
  categoria: z.string().trim().min(2, "Escolha uma categoria").max(60),
  endereco: z.string().trim().min(3, "Informe o endereço ou forma de atendimento").max(200),
  instagram: z.string().trim().max(120).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  descricao: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const enviarBrecho = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((dados: unknown) => enviarBrechoSchema.parse(dados))
  .handler(async ({ data, context }) => {
    const instagramUrl = data.instagram
      ? `https://instagram.com/${data.instagram.replace(/^@/, "").trim()}`
      : null;

    const { error } = await context.supabase.from("brechos").insert({
      nome: data.nome,
      slug: gerarSlug(data.nome),
      descricao: data.descricao || "Descrição em breve.",
      endereco: data.endereco,
      bairro: data.bairro,
      cidade: "Rio de Janeiro",
      estado: "RJ",
      categorias: [data.categoria],
      instagram_url: instagramUrl,
      whatsapp: data.whatsapp || null,
      status: "pending",
    });

    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
