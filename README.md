# pedroOs — Portfólio pessoal

Portfólio interativo inspirado em um sistema operacional desktop. O projeto apresenta minha trajetória, experiência, formação, tecnologias e projetos em uma interface responsiva, com versão mobile inspirada no iPhone.

**Acesse em produção:** [pmoserdev.vercel.app](https://pmoserdev.vercel.app/)

## Visão geral

- Interface desktop com janelas que podem ser movidas, redimensionadas, minimizadas e maximizadas.
- Experiência mobile com tela inicial, aplicativos e alternador de janelas.
- Conteúdo em português e inglês, com temas claro e escuro.
- Seções de perfil, tecnologias, experiência, formação, projetos e currículo em PDF.
- Preferências de interface salvas no navegador.

## Tecnologias

- React 18 e JavaScript (ES modules)
- Vite 5
- Tailwind CSS 4
- CSS Modules
- Web Audio API para efeitos sonoros

## Executar localmente

Requisitos: Node.js 18 ou superior e npm.

```bash
git clone https://github.com/pedropngXD/portfolio.git
cd portfolio
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos de produção são gerados em `dist/`. `npm run preview` inicia um servidor local para conferir esse build.

## Estrutura do projeto

```text
public/                  Arquivos públicos, imagem de perfil e currículos em PDF
src/
  components/            Componentes de interface, layout e seções
  data/                  Conteúdo do portfólio e traduções
  hooks/                 Hooks para estado e comportamento da interface
  styles/                Reset e tokens globais de estilo
  utils/                 Funções auxiliares
```

## Conteúdo

As informações do portfólio ficam em `src/data/`. Os currículos em PDF ficam em `public/`. Para atualizar textos, links ou dados apresentados na interface, edite os arquivos correspondentes nessas pastas.

## Outro projeto

[Status Check](https://status-check-eosin.vercel.app) — painel de status e telemetria de serviços de IA e nuvem.
