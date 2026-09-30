# Revisão de main

## Origem e isolamento

- Origem: `main`, commit `be622e39de62bd6e0e32a365912541ae725a413c`.
- Branch de trabalho: `review/main-20260930`.
- Worktree independente: `C:/xampp/htdocs/portfolio-review/main`.
- As seis branches remotas foram listadas novamente com `git fetch origin`, `git branch -r` e `git ls-remote --heads origin`.
- Nenhum `AGENTS.md` foi encontrado no repositório nem nos diretórios ancestrais verificados.
- Checkout original limpo, mantido em `main`. Sem merge, exclusão de branch, force push ou publicação.

## Problemas e alterações

- `App` concentrava construção de menus, seleção de seções e composição do sistema. Os três menus passaram para `useContextMenus`, com os mesmos callbacks, rótulos, ordem, opções e diferenças da origem.
- Criado `SectionContent` para selecionar componentes de seção, mantendo os argumentos específicos de cada origem.
- Extraída a aritmética de oito direções de resize para `resizeWindow` em `windowGeometry.js`; limites e ancoragem protegidos por testes.
- Extraída `arrayMove`, usada pelo dock e pela tela inicial mobile.
- Extraído `useOutsideClick` para os popovers de volume e Wi-Fi, mantendo o evento `mousedown` e seu ciclo de inscrição/limpeza.
- Textos do README interno movidos literalmente para `src/data/readme.js`.
- Paletas mobile movidas para `src/data/appGradients.js`. Os valores iguais entre Home e App Switcher são compartilhados.
- Imports, props e funções locais sem consumidores foram removidos. Comentários de títulos de blocos, descrição óbvia do markup e notas obsoletas foram limpos. Foram mantidas explicações sobre animações, colisão, compatibilidade e eventos.
- README de template substituído por instruções reais do projeto.
- Adicionados `npm test` e `npm run lint`. Oxlint 1.86.0 foi instalado como dependência de desenvolvimento, com lock atualizado pelo npm. O uso existente de callbacks por curto-circuito é permitido explicitamente no lint.

## Remoções verificadas

- `src/components/MobilePlaceholder.jsx`
- `src/components/MobilePlaceholder.module.css`
- `src/components/mobile/IPhoneAppIcon.jsx`
- `src/components/mobile/IPhoneControlCenter.jsx`
- `src/components/mobile/IPhoneStatusBar.jsx`

Os componentes removidos não eram alcançados por imports diretos ou transitivos. Não há import dinâmico, glob de componentes, roteador por arquivos ou configuração de build/deploy que os carregue. O CSS exclusivo do placeholder foi removido somente nas origens que já usam a interface iPhone. O placeholder permanece nas outras origens.

O handler `handleContentPointerDown` não estava ligado ao JSX nem era chamado; foi removido com suas refs exclusivas. A rolagem e os handlers touch ativos foram preservados.

Nenhuma dependência original foi removida: React, React DOM, Vite, plugin React, Tailwind e plugin Tailwind têm consumidores efetivos. Os SVGs públicos sem referências internas evidentes foram preservados porque seus caminhos podem ser acessados diretamente. Dados legados de currículo e traduções foram preservados para respeitar a restrição sobre conteúdo. Seletores de CSS foram mantidos, incluindo os usados por nomes dinâmicos.

## Validação

- Build da origem: aprovado antes das mudanças. Não havia scripts de testes ou lint na origem.
- Lint da origem, executado com Oxlint 1.86.0: 58 avisos.
- Lint após a revisão: sem erros; 3 avisos preexistentes (react(purity), react(set-state-in-effect), react(refs)).
- Seis testes unitários aprovados: reordenação sem mutação, round trip da grade, prevenção de colisões e resize em bordas/cantos/limites.
- Build de produção aprovado após a refatoração.
- CSS comparado por AST: mesmos seletores, regras e declarações nos arquivos mantidos. Conteúdo de dados e assets públicos preservado.
- Chromium: comparação com a origem em 1440×900, 390×844, 767×900 e 768×900; abertura de seções, filtros, maximização, restauração, minimização, idioma, tema, menus e fluxos mobile existentes.
- Evidências locais e scripts da comparação: `C:/xampp/htdocs/portfolio-review/tooling/evidence/main/`. O resumo consolidado registra a comparação final de pixels e interações. Fontes remotas e iframe foram substituídos por respostas vazias iguais nas duas versões para essa comparação determinística.

## Falhas preexistentes e limites

- O relógio chama `new Date()` durante renderização. O layout do desktop atualiza estado em um efeito. O controle de volume consulta uma ref durante renderização. Esses avisos foram mantidos para não alterar a sincronização visual.
- Ícones do desktop têm `role="button"` e `tabIndex`, mas não possuem handler de teclado para ativação por Enter/Espaço.
- Algumas leituras/escritas de `localStorage` e promessas de clipboard não tratam indisponibilidade/permissão; não foi mudado o comportamento de falha.
- O adaptador de conteúdo mobile não encaminha todas as opções do App Switcher em algumas origens. O resultado original foi preservado.
- Os textos do README interno, metadados e dados pessoais não foram corrigidos editorialmente, mesmo quando contêm descrições históricas.
- Status Check, GitHub e Google Fonts responderam HTTP 200 na verificação externa. LinkedIn falhou na consulta de rede deste ambiente; disponibilidade externa não comprovada. Nenhum e-mail foi enviado.
- A execução interna do serviço Status Check, audição humana, dispositivos físicos, Safari/Firefox e deploy de produção não foram validados. O teste de áudio cobre eventos/estado; PDFs cobrem caminhos, resposta HTTP e download, sem validar plugins de PDF de todos os navegadores.
- Não há checagem de tipos porque o projeto é JavaScript.
