# Garimpa Aqui: Moda Circular Carioca

Crie um web app responsivo chamado Garimpa Aqui, com identidade visual inspirada em garimpo, moda circular e cultura urbana do Rio de Janeiro.

O nome deve aparecer exatamente como “Garimpa Aqui”, com “Aqui” escrito com K: “Garimpa Aki” não deve ser usado; o nome correto da marca é “Garimpa Aqui” conforme definido no projeto. Antes de criar qualquer logotipo, use o texto da marca na interface.

O produto é um catálogo de brechós do estado do Rio de Janeiro.

Crie as seguintes rotas:

- /

- /brechos

- /brechos/:id

- /categorias

- /entrar

- /criar-conta

- /perfil

- /enviar-brecho

- /admin

Na primeira versão, use dados fictícios locais para validar o layout. Não crie ainda integração com APIs externas.

A página inicial deve conter:

- Busca por nome, bairro e categoria.

- Cards de brechós.

- Acesso para visualizar lista e mapa.

- Categorias principais.

- Brechós em destaque.

- Navegação responsiva para desktop e celular.

Cada card deve mostrar:

- Foto de capa.

- Nome.

- Bairro.

- Categorias.

- Faixa de preço.

- Indicador de loja física ou online.

A página de detalhes deve mostrar:

- Galeria de fotos.

- Descrição.

- Endereço.

- Instagram.

- WhatsApp.

- Horário.

- Categorias.

- Botões para contato e como chegar.

Crie componentes reutilizáveis e estados de loading, erro e lista vazia. Priorize acessibilidade, contraste, navegação por teclado e layout mobile-first. Não implemente favoritos, pagamentos ou chat nesta primeira etapa.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://garimpa-aqui-rio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6bf254d6-d891-4346-b280-f9d8490edbca).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
