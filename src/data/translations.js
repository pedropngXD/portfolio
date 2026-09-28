/**
 * Dicionário completo de traduções para suporte bilíngue (Português / Inglês)
 */
export const TRANSLATIONS = {
  pt: {
    system: {
      brand: 'pedroOs',
      statusAvailable: 'Disponível para Projetos',
      clockLocale: 'pt-BR',
      switchThemeLight: 'Modo Claro',
      switchThemeDark: 'Modo Escuro',
      switchLang: 'Mudar idioma para Inglês',
      langLabel: 'PT',
      langFlag: '🇧🇷',
      copySuccess: 'Copiado!',
      copyEmail: 'Copiar E-mail',
      sendEmail: 'Enviar E-mail',
      emailLabel: 'Email',
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
      resume: {
        title: 'currículo.pdf',
        shortLabel: 'currículo.pdf',
        tag: 'Documento • PDF'
      },
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
        title: 'Formação',
        shortLabel: 'Formação',
        tag: 'Unisinos'
      }
    },
    about: {
      role: 'Desenvolvedor Júnior',
      education: 'Análise e Desenvolvimento de Sistemas — Unisinos (7º semestre)',
      graduation: 'Previsão de conclusão: 12/2026',
      location: 'Rio Grande do Sul, Brasil',
      headline: 'Desenvolvedor focado em soluções web, sustentação de APIs internas e sistemas de gestão financeira.',
      paragraphs: [
        'Estudante do 7º semestre de ADS na Unisinos com atuação prática como desenvolvedor júnior na Credware Tecnologia. No dia a dia, atuo no desenvolvimento, manutenção e suporte à API própria da empresa e em produtos internos essenciais para as operações, como portal de chamados, CRM e módulos de controle financeiro.',
        'Minha rotina técnica combina PHP e JavaScript no ecossistema web, integrando interfaces dinâmicas com regras de negócio no backend e bancos de dados relacionais (SQL Server, MySQL, PostgreSQL). Paralelamente, estou aprofundando meus estudos em React e desenvolvendo projetos práticos para consolidar conceitos de componentização, estado e arquitetura moderna no frontend.',
        'Busco oportunidades para evoluir como desenvolvedor júnior em times de engenharia que valorizem boas práticas, resolução de problemas reais de negócio e aprendizado contínuo.'
      ],
      quickInfo: [
        { label: 'Formação', value: 'ADS @ Unisinos (7º sem)' },
        { label: 'Conclusão', value: 'Dezembro / 2026' },
        { label: 'Experiência Atual', value: 'Desenvolvedor Júnior @ Credware Tecnologia' },
        { label: 'Foco Técnico', value: 'Backend (PHP / Node / APIs) & Frontend (React)' }
      ],
      btnExperience: 'Ver Experiências Profissionais',
      btnStack: 'Explorar Stack Técnica'
    },
    experience: {
      title: 'Experiência Profissional',
      subtitle: 'Histórico prático de atuação com sistemas em produção e regras de negócio corporativas.',
      items: [
        {
          id: 'dev-junior',
          company: 'Credware Tecnologia',
          role: 'Desenvolvedor de Software Júnior',
          period: '03/08/2026 – Atual',
          isCurrent: true,
          location: 'Rio Grande do Sul, Brasil',
          type: 'CLT / Efetivo',
          summary: 'Atuação no ciclo de desenvolvimento, evolução de endpoints da API própria e desenvolvimento de soluções em produtos corporativos (CRM, chamados e módulos financeiros).',
          responsibilities: [
            {
              area: 'API Própria da Empresa',
              detail: 'Desenvolvimento e manutenção de endpoints RESTful em PHP, tratamento de exceções, padronização de payloads JSON e testes de integração com os sistemas satélites.'
            },
            {
              area: 'Portal de Chamados & CRM',
              detail: 'Evolução de módulos corporativos de gestão de clientes e chamados, manipulação dinâmica de formulários com JavaScript e regras de negócio no backend.'
            },
            {
              area: 'Módulos Financeiros & Banco de Dados',
              detail: 'Construção e ajuste de consultas SQL em SQL Server, geração de relatórios operacionais e manutenção da consistência dos dados de transações financeiras.'
            }
          ],
          techStack: [
            'PHP',
            'JavaScript',
            'HTML/CSS',
            'React',
            'CodeIgniter/MVC',
            'SQL Server',
            'APIs REST',
            'Git',
            'BitBucket'
          ]
        },
        {
          id: 'estagio',
          company: 'Credware Tecnologia',
          role: 'Estagiário de Sistemas',
          period: '11/03/2025 – 31/07/2026',
          isCurrent: false,
          location: 'Rio Grande do Sul, Brasil',
          type: 'Estágio',
          summary: 'Início da trajetória profissional na Credware, atuando no suporte aos sistemas internos, atendimento de chamados técnicos e monitoramento de serviços.',
          responsibilities: [
            {
              area: 'Atendimento & Chamados',
              detail: 'Atendimento e acompanhamento de chamados por meio de portal de suporte, resolução de dúvidas técnicas e triagem de ocorrências.'
            },
            {
              area: 'Desenvolvimento Web & Apoio',
              detail: 'Apoio no desenvolvimento e manutenção de telas e rotinas em PHP, JavaScript e HTML/CSS, com versionamento de código via Git e BitBucket.'
            },
            {
              area: 'Monitoramento com Zabbix',
              detail: 'Monitoramento da infraestrutura de servidores, serviços e disponibilidade de sistemas através da ferramenta Zabbix.'
            },
            {
              area: 'Bancos de Dados & Versionamento',
              detail: 'Execução de queries e rotinas de consulta em MySQL e SQL Server.'
            }
          ],
          techStack: [
            'PHP',
            'JavaScript',
            'HTML/CSS',
            'SQL Server',
            'MySQL',
            'Zabbix',
            'Git',
            'BitBucket'
          ]
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
      title: 'Formação',
      subtitle: 'Graduação em andamento e fundamentos de engenharia de software na Unisinos.',
      academicCardTitle: 'Formação'
    },
    wifi: {
      title: 'Wi-Fi',
      connected: 'Conectado',
      disconnected: 'Desconectado',
      connectedTo: 'Conectado a',
      knownNetworks: 'Redes Conhecidas',
      privateIp: 'IP Local',
      statusOnline: 'Acesso à Internet Ativo',
      networkSettings: 'Ajustes de Rede...',
      turnOff: 'Desativar Wi-Fi',
      turnOn: 'Ativar Wi-Fi'
    }
  },
  en: {
    system: {
      brand: 'pedroOs',
      statusAvailable: 'Available for Work',
      clockLocale: 'en-US',
      switchThemeLight: 'Switch to light mode',
      switchThemeDark: 'Switch to dark mode',
      switchLang: 'Mudar idioma para Português',
      langLabel: 'EN',
      langFlag: '🇺🇸',
      copySuccess: 'Copied!',
      copyEmail: 'Copy Email',
      sendEmail: 'Send Email',
      emailLabel: 'Email',
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
      resume: {
        title: 'resume.pdf',
        shortLabel: 'resume.pdf',
        tag: 'Document • PDF'
      },
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
        title: 'Education',
        shortLabel: 'Education',
        tag: 'Unisinos'
      }
    },
    about: {
      role: 'Junior Software Developer',
      education: 'Systems Analysis and Development — Unisinos (7th semester)',
      graduation: 'Expected graduation: 12/2026',
      location: 'Rio Grande do Sul, Brazil',
      headline: 'Developer focused on web solutions, internal API maintenance, and financial management systems.',
      paragraphs: [
        '7th semester Systems Analysis and Development student at Unisinos with practical experience as a junior developer at Credware Tecnologia. On a daily basis, I work on developing, maintaining, and supporting the company\'s proprietary API and essential operational systems, such as a ticketing portal, CRM, and financial control modules.',
        'My technical workflow combines PHP and JavaScript across the web ecosystem, connecting dynamic interfaces with backend business logic and relational databases (SQL Server, MySQL, PostgreSQL). In parallel, I am actively studying React and building hands-on projects to master componentization, modern state management, and frontend architecture.',
        'Seeking opportunities to grow as a junior developer within engineering teams that value best practices, real-world business problem solving, and continuous learning.'
      ],
      quickInfo: [
        { label: 'Education', value: 'ADS @ Unisinos (7th sem)' },
        { label: 'Graduation', value: 'December / 2026' },
        { label: 'Current Role', value: 'Junior Developer @ Credware Tecnologia' },
        { label: 'Technical Focus', value: 'Backend (PHP / Node / APIs) & Frontend (React)' }
      ],
      btnExperience: 'View Professional Experience',
      btnStack: 'Explore Tech Stack'
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'Hands-on experience with production systems and corporate business logic.',
      items: [
        {
          id: 'dev-junior',
          company: 'Credware Tecnologia',
          role: 'Junior Software Developer',
          period: '03/08/2026 – Present',
          isCurrent: true,
          location: 'Rio Grande do Sul, Brazil',
          type: 'Full-time',
          summary: 'Working across the software development lifecycle, proprietary API evolution, and enterprise products (CRM, ticketing, and financial modules).',
          responsibilities: [
            {
              area: 'Proprietary Company API',
              detail: 'Development and maintenance of RESTful endpoints in PHP, exception handling, JSON payload standardization, and integration testing with satellite systems.'
            },
            {
              area: 'Ticketing Portal & CRM',
              detail: 'Evolution of corporate customer management and ticketing modules, dynamic client-side forms with JavaScript, and backend business logic.'
            },
            {
              area: 'Financial Modules & Database',
              detail: 'Building and tuning SQL queries in SQL Server, producing operational reporting, and ensuring database consistency for financial transactions.'
            }
          ],
          techStack: [
            'PHP',
            'JavaScript',
            'React',
            'SQL Server',
            'APIs REST',
            'Git',
            'CodeIgniter/MVC'
          ]
        },
        {
          id: 'estagio',
          company: 'Credware Tecnologia',
          role: 'Systems Intern',
          period: '11/03/2025 – 31/07/2026',
          isCurrent: false,
          location: 'Rio Grande do Sul, Brazil',
          type: 'Internship',
          summary: 'Beginning of my professional career at Credware, focusing on internal systems support, technical ticketing resolution, and service monitoring.',
          responsibilities: [
            {
              area: 'Technical Support & Ticketing',
              detail: 'Handling, triaging, and resolving technical support tickets via internal portal, resolving bugs, and optimizing support workflows.'
            },
            {
              area: 'Web Development & Maintenance',
              detail: 'Assisting in developing and maintaining web screens and backend routines using PHP, JavaScript, and HTML/CSS.'
            },
            {
              area: 'Monitoring with Zabbix',
              detail: 'Proactive monitoring of server infrastructure, services, and system availability using Zabbix.'
            },
            {
              area: 'Databases & Version Control',
              detail: 'Executing SQL queries in MySQL and SQL Server for operational routines and reporting, using Git and BitBucket.'
            }
          ],
          techStack: [
            'PHP',
            'JavaScript',
            'SQL Server',
            'MySQL',
            'Zabbix',
            'Git',
            'BitBucket',
            'HTML/CSS'
          ]
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
      title: 'Education',
      subtitle: 'Undergraduate degree in progress and computer science foundations at Unisinos.',
      academicCardTitle: 'Education'
    },
    wifi: {
      title: 'Wi-Fi',
      connected: 'Connected',
      disconnected: 'Disconnected',
      connectedTo: 'Connected to',
      knownNetworks: 'Known Networks',
      privateIp: 'Local IP',
      statusOnline: 'Internet Access Active',
      networkSettings: 'Network Settings...',
      turnOff: 'Turn Wi-Fi Off',
      turnOn: 'Turn Wi-Fi On'
    }
  }
}
