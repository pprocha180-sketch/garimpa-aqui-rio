import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Campo, FormShell, inputClasses } from "@/components/FormShell";
import { bairros, categorias } from "@/data/brechos";

export const Route = createFileRoute("/enviar-brecho")({
  head: () => ({
    meta: [
      { title: "Enviar brechó — Garimpa Aqui" },
      {
        name: "description",
        content: "Indique um brechó do Rio de Janeiro para entrar no catálogo do Garimpa Aqui.",
      },
      { property: "og:title", content: "Enviar brechó — Garimpa Aqui" },
      { property: "og:description", content: "Indique um brechó do Rio para o catálogo." },
    ],
  }),
  component: EnviarBrecho,
});

function EnviarBrecho() {
  const [enviado, setEnviado] = useState(false);

  return (
    <FormShell
      titulo="Enviar brechó"
      descricao="Indique um brechó do estado do Rio. A equipe revisa antes de publicar."
      acao="Enviar para revisão"
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
      rodape={
        enviado ? (
          <p role="status" className="rounded-xl bg-mint px-4 py-2 font-semibold text-brand">
            Recebemos sua indicação! Nesta versão os envios ficam apenas no seu aparelho.
          </p>
        ) : null
      }
    >
      <Campo id="nome-brecho" rotulo="Nome do brechó">
        <input id="nome-brecho" type="text" required className={inputClasses} />
      </Campo>
      <Campo id="bairro-brecho" rotulo="Bairro">
        <select id="bairro-brecho" required className={inputClasses} defaultValue="">
          <option value="" disabled>
            Escolha um bairro
          </option>
          {bairros.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Campo>
      <Campo id="categoria-brecho" rotulo="Categoria principal">
        <select id="categoria-brecho" required className={inputClasses} defaultValue="">
          <option value="" disabled>
            Escolha uma categoria
          </option>
          {categorias.map((c) => (
            <option key={c.slug} value={c.nome}>
              {c.nome}
            </option>
          ))}
        </select>
      </Campo>
      <Campo id="endereco-brecho" rotulo="Endereço ou forma de atendimento">
        <input id="endereco-brecho" type="text" required className={inputClasses} />
      </Campo>
      <Campo id="instagram-brecho" rotulo="Instagram">
        <input id="instagram-brecho" type="text" placeholder="@brecho" className={inputClasses} />
      </Campo>
      <Campo id="whatsapp-brecho" rotulo="WhatsApp">
        <input id="whatsapp-brecho" type="tel" placeholder="(21) 99999-0000" className={inputClasses} />
      </Campo>
      <Campo id="descricao-brecho" rotulo="Descrição">
        <textarea id="descricao-brecho" rows={4} className={inputClasses} />
      </Campo>
    </FormShell>
  );
}
