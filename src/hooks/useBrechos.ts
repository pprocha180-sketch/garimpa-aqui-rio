import { useQuery } from "@tanstack/react-query";
import type { Brecho } from "@/data/brechos";
import { imagensPadrao, imagensPorSlug } from "@/data/brechos";
import { listarBrechos, type BrechoRow } from "@/lib/brechos.functions";

function paraBrecho(row: BrechoRow): Brecho {
  const imagens = imagensPorSlug[row.slug] ?? imagensPadrao;
  const instagram = row.instagram_url
    ? `@${row.instagram_url.replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "")}`
    : "";
  return {
    id: row.slug,
    nome: row.nome,
    bairro: row.bairro,
    cidade: row.cidade,
    categorias: row.categorias ?? [],
    faixaPreco: row.faixa_preco ?? "",
    tipo: row.tem_loja_fisica ? "fisica" : "online",
    capa: imagens.capa,
    galeria: imagens.galeria,
    descricao: row.descricao,
    endereco: row.endereco ?? "",
    instagram,
    whatsapp: row.whatsapp ?? "",
    horario: row.horario_funcionamento ?? "",
    destaque: row.destaque,
  };
}

async function carregar(): Promise<Brecho[]> {
  const linhas = await listarBrechos();
  return linhas.map(paraBrecho);
}

export function useBrechos() {
  return useQuery({ queryKey: ["brechos"], queryFn: carregar, staleTime: 60_000 });
}

export function useBrecho(id: string) {
  return useQuery({
    queryKey: ["brecho", id],
    queryFn: async () => (await carregar()).find((b) => b.id === id) ?? null,
    staleTime: 60_000,
  });
}
