import { useQuery } from "@tanstack/react-query";
import { brechos, type Brecho } from "@/data/brechos";

// Dados fictícios locais: simulam uma busca assíncrona para exercitar
// os estados de carregamento, erro e lista vazia.
function carregar(): Promise<Brecho[]> {
  return new Promise((resolve) => setTimeout(() => resolve(brechos), 400));
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
