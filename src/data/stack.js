export const STACK_CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'tools', label: 'Ferramentas & Git' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'database', label: 'Bancos de Dados' }
]

export const STACK_DATA = [
  // Backend & Linguagens
  {
    name: 'PHP',
    category: 'backend',
    level: 'Produção diária',
    levelEn: 'Daily production',
    highlight: true,
    description: 'Manutenção de regras de negócio, rotas e sustentação da API interna na Credware Tecnologia.',
    descriptionEn: 'Business logic maintenance, routes, and internal API support at Credware Tecnologia.'
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 'Produção diária',
    levelEn: 'Daily production',
    highlight: true,
    description: 'Manipulação de DOM, consumo assíncrono de APIs (Fetch/Axios), SPAs e interatividade dos sistemas internos.',
    descriptionEn: 'DOM manipulation, async API consumption (Fetch/Axios), SPAs, and internal system interactivity.'
  },
  {
    name: 'Laravel',
    category: 'backend',
    level: 'Framework',
    levelEn: 'Framework',
    highlight: true,
    description: 'Arquitetura MVC, Eloquent ORM, migrações de banco e desenvolvimento de APIs RESTful estruturadas.',
    descriptionEn: 'MVC architecture, Eloquent ORM, database migrations, and structured RESTful API development.'
  },
  {
    name: 'CodeIgniter',
    category: 'backend',
    level: 'Framework',
    levelEn: 'Framework',
    highlight: false,
    description: 'Manutenção e suporte a sistemas legados da empresa, controllers enxutos e models com query builder.',
    descriptionEn: 'Maintenance and support of enterprise legacy systems, lean controllers, and query builder models.'
  },
  {
    name: 'Python',
    category: 'backend',
    level: 'Scripts & Automação',
    levelEn: 'Scripts & Automation',
    highlight: false,
    description: 'Scripts de processamento de dados, automação de rotinas e estudos acadêmicos na Unisinos.',
    descriptionEn: 'Data processing scripts, routine automation, and computer science coursework at Unisinos.'
  },
  {
    name: 'React',
    category: 'frontend',
    level: 'Framework / Lib',
    levelEn: 'Framework / Lib',
    highlight: true,
    description: 'Construção de interfaces modernas baseadas em componentes funcionais, hooks (useState, useEffect) e controle de estado.',
    descriptionEn: 'Building modern interfaces with functional components, React hooks (useState, useEffect), and state management.'
  },
  {
    name: 'HTML5 & CSS3',
    category: 'frontend',
    level: 'Essencial',
    levelEn: 'Core Web',
    highlight: false,
    description: 'Estruturação semântica, CSS Modules, Flexbox, Grid, design responsivo e tokens de design.',
    descriptionEn: 'Semantic markup, CSS Modules, Flexbox, CSS Grid, responsive layout, and design tokens.'
  },

  // Bancos de Dados
  {
    name: 'SQL Server',
    category: 'database',
    level: 'Produção diária',
    levelEn: 'Daily production',
    highlight: true,
    description: 'Queries complexas, Stored Procedures, Views e suporte aos módulos de CRM e financeiro.',
    descriptionEn: 'Complex queries, Stored Procedures, Views, and support for CRM and financial modules.'
  },
  {
    name: 'MySQL',
    category: 'database',
    level: 'Modelagem & Queries',
    levelEn: 'Modeling & Queries',
    highlight: false,
    description: 'Modelagem relacional, normalização de dados e integração com aplicações PHP e Laravel.',
    descriptionEn: 'Relational data modeling, normalization, and integration with PHP and Laravel applications.'
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    level: 'Modelagem & Queries',
    levelEn: 'Modeling & Queries',
    highlight: false,
    description: 'Estruturação de bancos relacionais com integridade referencial, índices e boas práticas SQL.',
    descriptionEn: 'Relational database structuring with referential integrity, indexes, and SQL best practices.'
  },

  // Ferramentas & DevOps
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 'Controle de Versão',
    levelEn: 'Version Control',
    highlight: true,
    description: 'Fluxo de trabalho com branches, commits semânticos (Conventional Commits), pull requests e resolução de conflitos.',
    descriptionEn: 'Branching workflow, semantic commits (Conventional Commits), pull requests, and merge conflict resolution.'
  },
  {
    name: 'APIs RESTful',
    category: 'backend',
    level: 'Arquitetura',
    levelEn: 'Architecture',
    highlight: true,
    description: 'Comunicação JSON, autenticação, status codes HTTP corretos e documentação de endpoints.',
    descriptionEn: 'JSON communication, token authentication, accurate HTTP status codes, and endpoint documentation.'
  }
]
