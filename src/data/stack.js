export const STACK_CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'database', label: 'Bancos de Dados' },
  { id: 'tools', label: 'Ferramentas & Git' }
]

export const STACK_DATA = [
  // Backend & Linguagens
  {
    name: 'PHP',
    category: 'backend',
    level: 'Produção diária',
    highlight: true,
    description: 'Manutenção de regras de negócio, rotas e sustentação da API interna na Credware Tecnologia.'
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 'Produção diária',
    highlight: true,
    description: 'Manipulação de DOM, consumo assíncrono de APIs (Fetch/Axios), SPAs e interatividade dos sistemas internos.'
  },
  {
    name: 'Laravel',
    category: 'backend',
    level: 'Framework',
    highlight: true,
    description: 'Arquitetura MVC, Eloquent ORM, migrações de banco e desenvolvimento de APIs RESTful estruturadas.'
  },
  {
    name: 'CodeIgniter',
    category: 'backend',
    level: 'Framework',
    highlight: false,
    description: 'Manutenção e suporte a sistemas legados da empresa, controllers enxutos e models com query builder.'
  },
  {
    name: 'Python',
    category: 'backend',
    level: 'Scripts & Automação',
    highlight: false,
    description: 'Scripts de processamento de dados, automação de rotinas e estudos acadêmicos na Unisinos.'
  },
  {
    name: 'React',
    category: 'frontend',
    level: 'Framework / Lib',
    highlight: true,
    description: 'Construção de interfaces modernas baseadas em componentes funcionais, hooks (useState, useEffect) e controle de estado.'
  },
  {
    name: 'HTML5 & CSS3',
    category: 'frontend',
    level: 'Essencial',
    highlight: false,
    description: 'Estruturação semântica, CSS Modules, Flexbox, Grid, design responsivo e tokens de design.'
  },

  // Bancos de Dados
  {
    name: 'SQL Server',
    category: 'database',
    level: 'Produção diária',
    highlight: true,
    description: 'Queries complexas, Stored Procedures, Views e suporte aos módulos de CRM e financeiro.'
  },
  {
    name: 'MySQL',
    category: 'database',
    level: 'Modelagem & Queries',
    highlight: false,
    description: 'Modelagem relacional, normalização de dados e integração com aplicações PHP e Laravel.'
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    level: 'Modelagem & Queries',
    highlight: false,
    description: 'Estruturação de bancos relacionais com integridade referencial, índices e boas práticas SQL.'
  },

  // Ferramentas & DevOps
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 'Controle de Versão',
    highlight: true,
    description: 'Fluxo de trabalho com branches, commits semânticos (Conventional Commits), pull requests e resolução de conflitos.'
  },
  {
    name: 'APIs RESTful',
    category: 'backend',
    level: 'Arquitetura',
    highlight: true,
    description: 'Comunicação JSON, autenticação, status codes HTTP corretos e documentação de endpoints.'
  }
]
