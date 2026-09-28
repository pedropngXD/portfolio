/**
 * Dicionário completo de traduções para suporte bilíngue (Português / Inglês)
 */
export const TRANSLATIONS = {
  pt: {
    system: {
      brand: 'Pedro',
      statusWork: 'Credware Tech',
      statusAvailable: 'Disponível para Projetos',
      clockLocale: 'pt-BR',
      switchThemeLight: 'Mudar para modo claro',
      switchThemeDark: 'Mudar para modo escuro',
      switchLang: 'Mudar idioma para Inglês',
      langLabel: 'PT',
      langFlag: '🇧🇷',
      copySuccess: 'Copiado!',
      copyEmail: 'Copiar E-mail',
      emailToastTitle: 'Área de Transferência',
      emailToastMessage: 'E-mail copiado para a área de transferência!',
      externalToastTitle: 'Aplicação Externa',
      externalToastMessage: 'Abrindo projeto em uma nova aba...',
      openInBrowser: 'Abrir no Navegador ↗',
      openAsWindow: 'Abrir como Janela no Desktop 🪟',
      copyProjectLink: 'Copiar link do projeto',
      pinToDock: 'Fixar na barra de tarefas',
      unpinFromDock: 'Desafixar da barra de tarefas',
      alignIcons: 'Alinhar todos os ícones',
      resetDock: 'Restaurar barra de tarefas padrão',
      minimized: 'Minimizada',
      open: 'Aberta',
      decreaseVolume: 'Diminuir volume (-10%)',
      increaseVolume: 'Aumentar volume (+10%)',
      systemVolume: 'Volume do Sistema',
      mute: 'Silenciar',
      unmute: 'Ativar som',
      testSound: 'Testar som'
    },
    sections: {
      about: {
        title: 'Sobre Mim',
        shortLabel: 'Sobre',
        tag: 'Perfil & Bio'
      },
      projects: {
        title: 'Projetos',
        shortLabel: 'Projetos',
        tag: 'Portfólio & Código'
      },
      'status-check': {
        title: 'Status Check',
        shortLabel: 'Status Check',
        tag: 'Telemetria & IA'
      },
      stack: {
        title: 'Stack Técnica',
        shortLabel: 'Stack',
        tag: 'Linguagens & Bancos'
      },
      experience: {
        title: 'Experiência',
        shortLabel: 'Experiência',
        tag: 'Credware Tecnologia'
      },
      contact: {
        title: 'Contato & Formação',
        shortLabel: 'Contato',
        tag: 'Unisinos & Redes'
      }
    },
    about: {
      role: 'Desenvolvedor de Software Júnior / Estagiário de Sistemas',
      education: 'Análise e Desenvolvimento de Sistemas — Unisinos (7º semestre)',
      graduation: 'Previsão de conclusão: 12/2026',
      location: 'Rio Grande do Sul, Brasil',
      headline: 'Desenvolvedor focado em soluções web, sustentação de APIs internas e sistemas de gestão financeira.',
      paragraphs: [
        'Estudante do 7º semestre de ADS na Unisinos com atuação prática como estagiário de sistemas na Credware Tecnologia. No dia a dia, atuo no desenvolvimento, manutenção e suporte à API própria da empresa e em produtos internos essenciais para as operações, como portal de chamados, CRM e módulos de controle financeiro.',
        'Minha rotina técnica combina PHP e JavaScript no ecossistema web, integrando interfaces dinâmicas com regras de negócio no backend e bancos de dados relacionais (SQL Server, MySQL, PostgreSQL). Priorizo código legível, rotas bem documentadas e arquitetura previsível.',
        'Busco oportunidades para evoluir como desenvolvedor júnior em times de engenharia que valorizem boas práticas, resolução de problemas reais de negócio e aprendizado contínuo de ponta a ponta.'
      ],
      quickInfo: [
        { label: 'Formação', value: 'ADS @ Unisinos (7º sem)' },
        { label: 'Experiência Atual', value: 'Estágio @ Credware Tecnologia' },
        { label: 'Conclusão', value: 'Dezembro / 2026' },
        { label: 'Foco Técnico', value: 'Backend (PHP / Node / APIs) & Frontend' }
      ]
    },
    experience: {
      title: 'Experiência Profissional',
      subtitle: 'Histórico prático de atuação com sistemas em produção e regras de negócio corporativas.',
      company: 'Credware Tecnologia',
      role: 'Estagiário de Sistemas',
      period: 'Em andamento',
      location: 'Rio Grande do Sul, Brasil',
      type: 'Estágio',
      summary: 'Atuação no ciclo de vida de desenvolvimento, suporte e manutenção da API própria da empresa e dos principais produtos internos de apoio às operações de negócio.',
      responsibilities: [
        {
          area: 'API Própria da Empresa',
          detail: 'Desenvolvimento e manutenção de endpoints RESTful em PHP, tratamento de exceções, padronização de payloads JSON e testes de integração com os sistemas satélites.'
        },
        {
          area: 'Portal de Chamados',
          detail: 'Sustentação do sistema interno de suporte técnico, correção de bugs, otimização de rotinas de triagem e melhorias contínuas na usabilidade para as equipes internas.'
        },
        {
          area: 'CRM Corporativo',
          detail: 'Evolução de módulos de gerenciamento de clientes, manipulação dinâmica de formulários com JavaScript e integração direta com o backend em PHP.'
        },
        {
          area: 'Módulos Financeiros & Banco de Dados',
          detail: 'Construção e ajuste de consultas SQL em SQL Server, geração de relatórios de apoio operacional e manutenção da consistência dos dados de transações financeiras.'
        }
      ]
    },
    stack: {
      title: 'Stack & Habilidades Técnicas',
      subtitle: 'Tecnologias, linguagens e bancos de dados aplicados no desenvolvimento e sustentação de sistemas.',
      categories: {
        all: 'Todas',
        backend: 'Backend & APIs',
        frontend: 'Frontend',
        database: 'Bancos de Dados',
        tools: 'Ferramentas & Git'
      }
    },
    projects: {
      title: 'Projetos & Código',
      subtitle: 'Aplicações práticas com código real, regras de negócio e boas práticas de arquitetura.',
      btnCode: 'Repositório',
      btnLive: 'Acessar Demo',
      footerText: 'Mais projetos de estudos e scripts estão disponíveis diretamente no meu perfil do GitHub.'
    },
    contact: {
      title: 'Contato & Formação Acadêmica',
      subtitle: 'Canais profissionais e trajetória acadêmica universitária.',
      academicCardTitle: 'Formação Acadêmica',
      channelsCardTitle: 'Canais de Contato',
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado!',
      openBtn: 'Acessar'
    },
    modeSelector: {
      modalTitle: 'Como você deseja visualizar?',
      modalSubtitle: 'Selecione a experiência que melhor se adapta ao seu dispositivo',
      desktopTitle: 'Desktop OS',
      desktopBadge: 'Experiência Completa',
      desktopDesc: 'Sistema operacional interativo para computadores e telas amplas com janelas flutuantes, efeitos sonoros e dock.',
      desktopBtn: 'Acessar Desktop OS ➔',
      mobileTitle: 'Versão Mobile',
      mobileBadge: 'Em Desenvolvimento 🚧',
      mobileDesc: 'Interface planejada para smartphones e telas de toque verticais.',
      mobileBtn: 'Acessar Versão Mobile ➔',
      changeModeTooltip: 'Mudar modo de visualização (Desktop / Mobile)',
      exitToSelector: 'Mudar Modo',
      underDevTitle: 'Versão Mobile em Desenvolvimento',
      underDevSubtitle: 'Estamos construindo uma experiência mobile dedicada com navegação por gestos e gavetas táteis.',
      underDevNotice: 'Em breve disponível! Enquanto isso, aproveite a experiência completa no modo Desktop.',
      goToDesktop: 'Acessar Modo Desktop 💻',
      backToSelect: '⬅ Voltar ao Menu de Seleção',
      featureWindows: 'Janelas arrastáveis e redimensionáveis',
      featureSounds: 'Efeitos sonoros nativos e controle de volume',
      featureDock: 'Barra de tarefas personalizável',
      featureMobileTouch: 'Interface adaptada para telas verticais',
      featureMobileUnderDev: 'Em fase ativa de implementação',
      rememberChoiceTip: '💡 Sua escolha fica salva no navegador. Você pode alternar a qualquer momento.'
    }
  },
  en: {
    system: {
      brand: 'Pedro',
      statusWork: 'Credware Tech',
      statusAvailable: 'Available for Work',
      clockLocale: 'en-US',
      switchThemeLight: 'Switch to light mode',
      switchThemeDark: 'Switch to dark mode',
      switchLang: 'Mudar idioma para Português',
      langLabel: 'EN',
      langFlag: '🇺🇸',
      copySuccess: 'Copied!',
      copyEmail: 'Copy Email',
      emailToastTitle: 'Clipboard',
      emailToastMessage: 'Email copied to clipboard!',
      externalToastTitle: 'External Application',
      externalToastMessage: 'Opening project in a new tab...',
      openInBrowser: 'Open in Browser ↗',
      openAsWindow: 'Open as Desktop Window 🪟',
      copyProjectLink: 'Copy project link',
      pinToDock: 'Pin to Taskbar',
      unpinFromDock: 'Unpin from Taskbar',
      alignIcons: 'Align all icons',
      resetDock: 'Reset taskbar to default',
      minimized: 'Minimized',
      open: 'Open',
      decreaseVolume: 'Decrease volume (-10%)',
      increaseVolume: 'Increase volume (+10%)',
      systemVolume: 'System Volume',
      mute: 'Mute',
      unmute: 'Unmute',
      testSound: 'Test sound'
    },
    sections: {
      about: {
        title: 'About Me',
        shortLabel: 'About',
        tag: 'Profile & Bio'
      },
      projects: {
        title: 'Projects',
        shortLabel: 'Projects',
        tag: 'Portfolio & Code'
      },
      'status-check': {
        title: 'Status Check',
        shortLabel: 'Status Check',
        tag: 'AI & Telemetry'
      },
      stack: {
        title: 'Tech Stack',
        shortLabel: 'Stack',
        tag: 'Languages & DBs'
      },
      experience: {
        title: 'Experience',
        shortLabel: 'Experience',
        tag: 'Credware Tecnologia'
      },
      contact: {
        title: 'Contact & Education',
        shortLabel: 'Contact',
        tag: 'Unisinos & Links'
      }
    },
    about: {
      role: 'Junior Software Developer / Systems Intern',
      education: 'Systems Analysis and Development — Unisinos (7th semester)',
      graduation: 'Expected graduation: 12/2026',
      location: 'Rio Grande do Sul, Brazil',
      headline: 'Developer focused on web solutions, internal API maintenance, and financial management systems.',
      paragraphs: [
        '7th semester Systems Analysis and Development student at Unisinos with practical experience as a systems intern at Credware Tecnologia. On a daily basis, I work on developing, maintaining, and supporting the company\'s proprietary API and essential operational systems, such as a ticketing portal, CRM, and financial control modules.',
        'My technical workflow combines PHP and JavaScript across the web ecosystem, connecting dynamic interfaces with backend business logic and relational databases (SQL Server, MySQL, PostgreSQL). I prioritize clean code, well-documented endpoints, and predictable architecture.',
        'Seeking opportunities to grow as a junior developer within engineering teams that value best practices, real-world business problem solving, and continuous end-to-end learning.'
      ],
      quickInfo: [
        { label: 'Education', value: 'ADS @ Unisinos (7th sem)' },
        { label: 'Current Role', value: 'Internship @ Credware Tecnologia' },
        { label: 'Graduation', value: 'December / 2026' },
        { label: 'Technical Focus', value: 'Backend (PHP / Node / APIs) & Frontend' }
      ]
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'Hands-on experience with production systems and corporate business logic.',
      company: 'Credware Tecnologia',
      role: 'Systems Intern',
      period: 'Current / Ongoing',
      location: 'Rio Grande do Sul, Brazil',
      type: 'Internship',
      summary: 'Working across the development lifecycle, support, and maintenance of the company\'s proprietary API and core operational software.',
      responsibilities: [
        {
          area: 'Company Proprietary API',
          detail: 'Development and maintenance of RESTful endpoints in PHP, exception handling, JSON payload standardization, and integration testing with satellite systems.'
        },
        {
          area: 'Internal Ticketing Portal',
          detail: 'Support and maintenance of the internal technical support platform, bug resolution, triage optimization, and continuous UX improvements for internal teams.'
        },
        {
          area: 'Corporate CRM',
          detail: 'Evolution of customer management modules, dynamic client-side form handling with JavaScript, and direct integration with the PHP backend.'
        },
        {
          area: 'Financial Modules & Database',
          detail: 'Building and tuning SQL queries in SQL Server, producing operational reporting, and ensuring database consistency for financial transactions.'
        }
      ]
    },
    stack: {
      title: 'Stack & Technical Skills',
      subtitle: 'Technologies, languages, and databases applied in system engineering and maintenance.',
      categories: {
        all: 'All',
        backend: 'Backend & APIs',
        frontend: 'Frontend',
        database: 'Databases',
        tools: 'Tools & Git'
      }
    },
    projects: {
      title: 'Projects & Code',
      subtitle: 'Practical applications with real code, business logic, and architectural best practices.',
      btnCode: 'Repository',
      btnLive: 'Live Demo',
      footerText: 'More study projects and scripts are available directly on my GitHub profile.'
    },
    contact: {
      title: 'Contact & Education',
      subtitle: 'Professional channels and university academic background.',
      academicCardTitle: 'Academic Background',
      channelsCardTitle: 'Contact Channels',
      copyBtn: 'Copy',
      copiedBtn: 'Copied!',
      openBtn: 'Visit'
    },
    modeSelector: {
      modalTitle: 'How would you like to view?',
      modalSubtitle: 'Select the experience that best suits your device',
      desktopTitle: 'Desktop OS',
      desktopBadge: 'Full Experience',
      desktopDesc: 'Interactive desktop operating system with floating windows, sound effects and customizable dock.',
      desktopBtn: 'Enter Desktop OS ➔',
      mobileTitle: 'Mobile Version',
      mobileBadge: 'Under Development 🚧',
      mobileDesc: 'Interface designed for smartphones and vertical touch screens.',
      mobileBtn: 'Enter Mobile Version ➔',
      changeModeTooltip: 'Switch viewing mode (Desktop / Mobile)',
      exitToSelector: 'Switch Mode',
      underDevTitle: 'Mobile Version Under Development',
      underDevSubtitle: 'We are crafting a dedicated mobile experience with gesture navigation and touch drawers.',
      underDevNotice: 'Coming soon! In the meantime, enjoy the full experience in Desktop mode.',
      goToDesktop: 'Go to Desktop Mode 💻',
      backToSelect: '⬅ Back to Mode Selection',
      featureWindows: 'Draggable and resizable windows',
      featureSounds: 'Native sound effects and volume control',
      featureDock: 'Customizable taskbar and quick shortcuts',
      featureMobileTouch: 'Tailored for smartphone touchscreens',
      featureMobileUnderDev: 'Currently under active construction',
      rememberChoiceTip: '💡 Your choice is saved in your browser. You can switch at any time.'
    }
  }
}
