# pedroOs

Portfólio em React 18 e JavaScript, com Vite 5, Tailwind CSS 4 e CSS Modules.

## Executar

Use Node.js compatível com as dependências do lock (validação realizada com Node 24.19.0 e npm 12.1.0).

```sh
npm ci
npm run dev
```

O servidor de desenvolvimento usa a porta 3000 e abre o navegador.

## Validar

```sh
npm run lint
npm test
npm run build
npm run preview
```

- Lint: Oxlint, com a configuração em `.oxlintrc.json`. Há avisos preexistentes documentados na revisão.
- Testes: runner nativo do Node, cobrindo geometria das janelas, grade e reordenação.
- Build: gera `dist/`; não edite esses arquivos manualmente.
- Não há TypeScript nem comando separado de checagem de tipos.

## Estrutura e fluxo

- `index.html → src/main.jsx → src/App.jsx`: montagem React em StrictMode e composição dos estados do sistema.
- `src/hooks/`: tema, idioma, áudio, janelas, ícones, dock, menus de contexto e fechamento de popovers.
- `src/components/layout/`: experiências desktop e mobile, selecionadas pelas media queries existentes.
- `src/components/sections/SectionContent.jsx`: seleção do conteúdo das janelas; cada seção mantém seu próprio componente.
- `src/data/`: conteúdo, traduções, contatos e metadados, incluindo o texto do README interno e as paletas mobile.
- `src/utils/`: geometria, grade, reordenação e síntese de áudio.
- `src/styles/`: reset e tokens; estilos locais permanecem em CSS Modules.
- `public/`: foto, PDFs e SVGs servidos diretamente.
- `tests/`: testes unitários sem dependência adicional de runner.

Não há roteador por URL: os aplicativos são selecionados pelos IDs de `SECTIONS`. As preferências continuam em `localStorage`. O Status Check é incorporado por iframe; os contatos usam links externos, `mailto:` e clipboard. Não há formulário próprio nem backend neste repositório.

## Build e publicação

Publique o conteúdo gerado de `dist/` em uma hospedagem estática. O projeto usa caminhos públicos absolutos e a base padrão do Vite, portanto a configuração atual pressupõe publicação na raiz do domínio. Não há workflow de CI, script de deploy nem configuração versionada de provedor nesta branch. Nenhum deploy foi executado na revisão.

## Variante desta branch

Origem da revisão: `main` em `be622e3`. A interface mobile mantém tela inicial, gavetas de aplicativos e multitarefa. O desktop inicia sem janelas abertas, com agrupamentos de ícones à esquerda e à direita, aviso de tela cheia e Wi-Fi integrado às janelas.

Veja [a revisão desta branch](docs/REVISAO.md) para mudanças, remoções, evidências e limitações.
