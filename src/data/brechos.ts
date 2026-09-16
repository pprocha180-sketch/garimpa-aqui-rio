import capa1 from "@/assets/brecho-1.jpg";
import capa2 from "@/assets/brecho-2.jpg";
import capa3 from "@/assets/brecho-3.jpg";
import capa4 from "@/assets/brecho-4.jpg";
import capa5 from "@/assets/brecho-5.jpg";
import capa6 from "@/assets/brecho-6.jpg";

export type Brecho = {
  id: string;
  nome: string;
  bairro: string;
  cidade: string;
  categorias: string[];
  faixaPreco: string;
  tipo: "fisica" | "online";
  capa: string;
  galeria: string[];
  descricao: string;
  endereco: string;
  instagram: string;
  whatsapp: string;
  horario: string;
  destaque: boolean;
};

export const categorias = [
  { slug: "vestuario", nome: "Vestuário" },
  { slug: "sapato-bota", nome: "Sapato & Bota" },
  { slug: "acessorio", nome: "Acessório" },
  { slug: "vinil-arte", nome: "Vinil & Arte" },
];

export const bairros = [
  "Copacabana",
  "Tijuca",
  "Botafogo",
  "Centro",
  "Niterói",
  "Santa Teresa",
];

export const brechos: Brecho[] = [
  {
    id: "riostar-brecho",
    nome: "Riostar Brechó",
    bairro: "Copacabana",
    cidade: "Rio de Janeiro",
    categorias: ["Vestuário", "Acessório"],
    faixaPreco: "R$ 15 – R$ 120",
    tipo: "fisica",
    capa: capa1,
    galeria: [capa1, capa5, capa4],
    descricao:
      "Jeans, camisas e jaquetas garimpadas peça a peça. Arara cheia, etiqueta de papel e atendimento de bairro.",
    endereco: "Rua Barata Ribeiro, 320 — Copacabana, Rio de Janeiro",
    instagram: "@riostar.brecho",
    whatsapp: "5521999990001",
    horario: "Seg a Sáb · 10h às 19h",
    destaque: true,
  },
  {
    id: "boemia-das-araras",
    nome: "Boêmia das Araras",
    bairro: "Tijuca",
    cidade: "Rio de Janeiro",
    categorias: ["Vestuário", "Vinil & Arte"],
    faixaPreco: "R$ 20 – R$ 200",
    tipo: "online",
    capa: capa2,
    galeria: [capa2, capa6, capa4],
    descricao:
      "Vestidos de época, rendas e estampas floridas. Vendas por encomenda com entrega em todo o estado.",
    endereco: "Atendimento online — retirada combinada na Tijuca",
    instagram: "@boemia.araras",
    whatsapp: "5521999990002",
    horario: "Pedidos todos os dias · resposta em até 24h",
    destaque: true,
  },
  {
    id: "zona-sul-calcados",
    nome: "Zona Sul Calçados",
    bairro: "Botafogo",
    cidade: "Rio de Janeiro",
    categorias: ["Sapato & Bota"],
    faixaPreco: "R$ 50 – R$ 300",
    tipo: "fisica",
    capa: capa3,
    galeria: [capa3, capa1, capa5],
    descricao:
      "Botas de couro, tênis retrô e sapatos restaurados. Numeração do 34 ao 45 com prova na loja.",
    endereco: "Rua Voluntários da Pátria, 210 — Botafogo, Rio de Janeiro",
    instagram: "@zonasul.calcados",
    whatsapp: "5521999990003",
    horario: "Ter a Sáb · 11h às 20h",
    destaque: true,
  },
  {
    id: "garimpo-carioca",
    nome: "Garimpo Carioca",
    bairro: "Santa Teresa",
    cidade: "Rio de Janeiro",
    categorias: ["Vestuário", "Vinil & Arte"],
    faixaPreco: "R$ 25 – R$ 180",
    tipo: "fisica",
    capa: capa5,
    galeria: [capa5, capa2, capa6],
    descricao:
      "Casarão com roupas, objetos, vinis e livros. Peças únicas e histórias boas em cada prateleira.",
    endereco: "Rua Almirante Alexandrino, 137 — Santa Teresa, Rio de Janeiro",
    instagram: "@garimpo.carioca",
    whatsapp: "5521999990004",
    horario: "Qua a Dom · 12h às 19h",
    destaque: false,
  },
  {
    id: "dona-pedra-acessorios",
    nome: "Dona Pedra Acessórios",
    bairro: "Centro",
    cidade: "Rio de Janeiro",
    categorias: ["Acessório"],
    faixaPreco: "R$ 10 – R$ 90",
    tipo: "fisica",
    capa: capa4,
    galeria: [capa4, capa1, capa6],
    descricao:
      "Bolsas, cintos e bijuterias antigas selecionadas em feiras do Centro e da Praça XV.",
    endereco: "Rua da Carioca, 48 — Centro, Rio de Janeiro",
    instagram: "@donapedra.acessorios",
    whatsapp: "5521999990005",
    horario: "Seg a Sex · 9h às 18h",
    destaque: false,
  },
  {
    id: "vinil-da-ponte",
    nome: "Vinil da Ponte",
    bairro: "Niterói",
    cidade: "Niterói",
    categorias: ["Vinil & Arte", "Acessório"],
    faixaPreco: "R$ 30 – R$ 250",
    tipo: "online",
    capa: capa6,
    galeria: [capa6, capa4, capa2],
    descricao:
      "Discos, cartazes e arte impressa de segunda mão. Catálogo atualizado toda semana no Instagram.",
    endereco: "Atendimento online — entregas em Niterói e São Gonçalo",
    instagram: "@vinil.daponte",
    whatsapp: "5521999990006",
    horario: "Pedidos de seg a sáb · 10h às 18h",
    destaque: false,
  },
];

// As fotos continuam locais nesta etapa: o banco guarda os dados,
// e as imagens são associadas pelo slug do brechó.
export const imagensPorSlug: Record<string, { capa: string; galeria: string[] }> = {
  "riostar-brecho": { capa: capa1, galeria: [capa1, capa5, capa4] },
  "boemia-das-araras": { capa: capa2, galeria: [capa2, capa6, capa4] },
  "zona-sul-calcados": { capa: capa3, galeria: [capa3, capa1, capa5] },
  "garimpo-carioca": { capa: capa5, galeria: [capa5, capa2, capa6] },
  "dona-pedra-acessorios": { capa: capa4, galeria: [capa4, capa1, capa6] },
  "vinil-da-ponte": { capa: capa6, galeria: [capa6, capa4, capa2] },
};

export const imagensPadrao = { capa: capa1, galeria: [capa1, capa2, capa3] };

export function buscarBrechos(opts: {
  termo?: string;
  bairro?: string;
  categoria?: string;
}): Brecho[] {
  const termo = (opts.termo ?? "").trim().toLowerCase();
  return brechos.filter((b) => {
    const casaTermo =
      !termo ||
      b.nome.toLowerCase().includes(termo) ||
      b.bairro.toLowerCase().includes(termo) ||
      b.categorias.some((c) => c.toLowerCase().includes(termo));
    const casaBairro = !opts.bairro || b.bairro === opts.bairro;
    const casaCategoria = !opts.categoria || b.categorias.includes(opts.categoria);
    return casaTermo && casaBairro && casaCategoria;
  });
}
