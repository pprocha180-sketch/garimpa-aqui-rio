CREATE TABLE public.brechos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  slug text NOT NULL UNIQUE,
  descricao text NOT NULL,
  endereco text,
  bairro text NOT NULL,
  cidade text NOT NULL,
  estado text NOT NULL,
  latitude numeric(10,7),
  longitude numeric(10,7),
  instagram_url text,
  whatsapp text,
  website_url text,
  faixa_preco text,
  categorias text[] NOT NULL DEFAULT '{}',
  tem_loja_fisica boolean NOT NULL DEFAULT false,
  vende_online boolean NOT NULL DEFAULT false,
  horario_funcionamento text,
  imagem_capa_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('approved','pending','rejected','archived')),
  destaque boolean NOT NULL DEFAULT false,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.brechos TO anon;
GRANT SELECT ON public.brechos TO authenticated;
GRANT ALL ON public.brechos TO service_role;

ALTER TABLE public.brechos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brechos aprovados sao publicos"
ON public.brechos FOR SELECT
TO anon, authenticated
USING (status = 'approved');

CREATE OR REPLACE FUNCTION public.set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER brechos_set_atualizado_em
BEFORE UPDATE ON public.brechos
FOR EACH ROW EXECUTE FUNCTION public.set_atualizado_em();

INSERT INTO public.brechos (nome, slug, descricao, endereco, bairro, cidade, estado, instagram_url, whatsapp, faixa_preco, categorias, tem_loja_fisica, vende_online, horario_funcionamento, status, destaque) VALUES
('Riostar Brechó','riostar-brecho','Jeans, camisas e jaquetas garimpadas peça a peça. Arara cheia, etiqueta de papel e atendimento de bairro.','Rua Barata Ribeiro, 320 — Copacabana, Rio de Janeiro','Copacabana','Rio de Janeiro','RJ','https://instagram.com/riostar.brecho','5521999990001','R$ 15 – R$ 120',ARRAY['Vestuário','Acessório'],true,false,'Seg a Sáb · 10h às 19h','approved',true),
('Boêmia das Araras','boemia-das-araras','Vestidos de época, rendas e estampas floridas. Vendas por encomenda com entrega em todo o estado.','Atendimento online — retirada combinada na Tijuca','Tijuca','Rio de Janeiro','RJ','https://instagram.com/boemia.araras','5521999990002','R$ 20 – R$ 200',ARRAY['Vestuário','Vinil & Arte'],false,true,'Pedidos todos os dias · resposta em até 24h','approved',true),
('Zona Sul Calçados','zona-sul-calcados','Botas de couro, tênis retrô e sapatos restaurados. Numeração do 34 ao 45 com prova na loja.','Rua Voluntários da Pátria, 210 — Botafogo, Rio de Janeiro','Botafogo','Rio de Janeiro','RJ','https://instagram.com/zonasul.calcados','5521999990003','R$ 50 – R$ 300',ARRAY['Sapato & Bota'],true,false,'Ter a Sáb · 11h às 20h','approved',true),
('Garimpo Carioca','garimpo-carioca','Casarão com roupas, objetos, vinis e livros. Peças únicas e histórias boas em cada prateleira.','Rua Almirante Alexandrino, 137 — Santa Teresa, Rio de Janeiro','Santa Teresa','Rio de Janeiro','RJ','https://instagram.com/garimpo.carioca','5521999990004','R$ 25 – R$ 180',ARRAY['Vestuário','Vinil & Arte'],true,false,'Qua a Dom · 12h às 19h','approved',false),
('Dona Pedra Acessórios','dona-pedra-acessorios','Bolsas, cintos e bijuterias antigas selecionadas em feiras do Centro e da Praça XV.','Rua da Carioca, 48 — Centro, Rio de Janeiro','Centro','Rio de Janeiro','RJ','https://instagram.com/donapedra.acessorios','5521999990005','R$ 10 – R$ 90',ARRAY['Acessório'],true,false,'Seg a Sex · 9h às 18h','approved',false),
('Vinil da Ponte','vinil-da-ponte','Discos, cartazes e arte impressa de segunda mão. Catálogo atualizado toda semana no Instagram.','Atendimento online — entregas em Niterói e São Gonçalo','Niterói','Niterói','RJ','https://instagram.com/vinil.daponte','5521999990006','R$ 30 – R$ 250',ARRAY['Vinil & Arte','Acessório'],false,true,'Pedidos de seg a sáb · 10h às 18h','approved',false);