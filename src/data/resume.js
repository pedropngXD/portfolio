/**
 * Texto legado do currículo e metadados do visualizador de PDF.
 */
export const RESUME_TEXT_PT = `================================================================================
PEDRO GABRIEL PINHEIRO MOSER
Desenvolvedor de Software Júnior
Porto Alegre - RS | Brasil
GitHub   : https://github.com/pedropngXD
LinkedIn : https://www.linkedin.com/in/pedro-moser/
E-mail   : pgpmoser@gmail.com
================================================================================

[ 1. RESUMO PROFISSIONAL ]
--------------------------------------------------------------------------------
Desenvolvedor focado em desenvolvimento web, sustentação de APIs RESTful e
sistemas corporativos de gestão. Experiência prática na manutenção e evolução de
produtos internos essenciais (portal de chamados, CRM e módulos de controle
financeiro), integrando regras de negócio no backend com bancos de dados relacionais.
Atualmente aprofundando conhecimentos em React e arquitetura de software frontend.


[ 2. EXPERIÊNCIA PROFISSIONAL ]
--------------------------------------------------------------------------------
Credware Tecnologia
Cargo: Desenvolvedor Júnior / Estagiário de Sistemas
Período: Em andamento
Local: Porto Alegre - RS, Brasil

Atuação no ciclo de vida de desenvolvimento, suporte e manutenção:
• API Própria da Empresa:
  Desenvolvimento e sustentação de endpoints RESTful em PHP, tratamento de
  exceções, padronização de payloads JSON e testes de integração com sistemas satélites.

• Portal de Chamados:
  Sustentação da plataforma interna de suporte técnico, correção de bugs,
  otimização de rotinas de triagem e melhorias contínuas de usabilidade.

• CRM Corporativo:
  Evolução de módulos de gerenciamento de clientes, manipulação dinâmica de
  formulários com JavaScript e integração direta com o backend em PHP.

• Módulos Financeiros & Banco de Dados:
  Construção e ajuste de consultas SQL em SQL Server, geração de relatórios
  operacionais e garantia da consistência dos dados de transações financeiras.

• Monitoramento & Observabilidade:
  Acompanhamento de métricas de infraestrutura e serviços via Zabbix.


[ 3. FORMAÇÃO ACADÊMICA ]
--------------------------------------------------------------------------------
Universidade do Vale do Rio dos Sinos (Unisinos)
Curso: Análise e Desenvolvimento de Sistemas (ADS)
Status: 7º semestre
Previsão de Conclusão: Dezembro de 2026


[ 4. STACK TÉCNICA & HABILIDADES ]
--------------------------------------------------------------------------------
• Backend      : PHP, Node.js, RESTful APIs, JSON, MVC
• Frontend     : React, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
• Bancos Dados : SQL Server, MySQL, PostgreSQL, Modelagem Relacional
• Ferramentas  : Git, GitHub, Bitbucket, Postman, Zabbix, Vite
• Metodologias : Boas práticas de código, Arquitetura em camadas, Clean Code
`

export const RESUME_TEXT_EN = `================================================================================
PEDRO GABRIEL PINHEIRO MOSER
Junior Software Developer
Porto Alegre - RS | Brazil
GitHub   : https://github.com/pedropngXD
LinkedIn : https://www.linkedin.com/in/pedro-moser/
Email    : pgpmoser@gmail.com
================================================================================

[ 1. PROFESSIONAL SUMMARY ]
--------------------------------------------------------------------------------
Developer focused on web solutions, RESTful API support, and enterprise
management systems. Hands-on experience developing, maintaining, and supporting
core internal systems (ticketing portal, corporate CRM, and financial control modules),
connecting business logic with relational databases.
Currently deepening knowledge in React, component-based architectures, and modern frontend.


[ 2. WORK EXPERIENCE ]
--------------------------------------------------------------------------------
Credware Tecnologia
Role: Junior Developer / Systems Intern
Period: Ongoing / Current
Location: Porto Alegre - RS, Brazil

Working across the development lifecycle, support, and maintenance:
• Proprietary Company API:
  Development and support of RESTful endpoints in PHP, exception handling,
  JSON payload standardization, and integration testing with satellite systems.

• Internal Ticketing Portal:
  Maintenance of internal technical support platform, bug resolution, triage
  workflow optimization, and continuous UX improvements for internal teams.

• Corporate CRM:
  Evolution of customer management modules, dynamic client-side forms with
  JavaScript, and direct integration with the PHP backend.

• Financial Modules & Database:
  Crafting and optimizing SQL queries in SQL Server, operational reporting,
  and ensuring transactional data integrity.

• Monitoring & Observability:
  Monitoring infrastructure and critical service metrics with Zabbix.


[ 3. EDUCATION ]
--------------------------------------------------------------------------------
Universidade do Vale do Rio dos Sinos (Unisinos)
Degree: Systems Analysis and Development (ADS)
Status: 7th semester
Expected Graduation: December 2026


[ 4. TECH STACK & SKILLS ]
--------------------------------------------------------------------------------
• Backend      : PHP, Node.js, RESTful APIs, JSON, MVC
• Frontend     : React, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
• Databases    : SQL Server, MySQL, PostgreSQL, Relational Modeling
• Tools        : Git, GitHub, Bitbucket, Postman, Zabbix, Vite
• Practices    : Clean Code, Layered Architecture, Componentization


================================================================================
File generated by Pedro OS • UTF-8 • resume.txt
================================================================================`

export const RESUME_METADATA = {
  pdfUrl: '/curriculo_pedro_moser.pdf',
  pdfUrlPt: '/curriculo_pedro_moser.pdf',
  pdfUrlEn: '/pedro_moser_resume_en.pdf',
  pdfDownloadName: 'Pedro Gabriel Pinheiro Moser.pdf',
  pdfDownloadNamePt: 'Pedro Gabriel Pinheiro Moser.pdf',
  pdfDownloadNameEn: 'Pedro Moser - Resume (EN).pdf',
  fileNamePt: 'currículo.pdf',
  fileNameEn: 'resume.pdf'
}

export const getResumePdf = (lang = 'pt') => {
  const isEn = lang === 'en'
  return {
    url: isEn ? RESUME_METADATA.pdfUrlEn : RESUME_METADATA.pdfUrlPt,
    downloadName: isEn ? RESUME_METADATA.pdfDownloadNameEn : RESUME_METADATA.pdfDownloadNamePt,
    fileName: isEn ? RESUME_METADATA.fileNameEn : RESUME_METADATA.fileNamePt
  }
}
