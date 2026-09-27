import { PROJECTS_DATA } from '../../data/projects'
import styles from './ProjectsSection.module.css'

export default function ProjectsSection({ t }) {
  const isEn = t?.system?.langLabel === 'EN'
  const btnCode = t?.projects?.btnCode || 'Repositório'
  const btnLive = t?.projects?.btnLive || 'Acessar Demo'

  const localizedProjects = PROJECTS_DATA.map((project) => {
    if (!isEn) return project

    if (project.id === 'desktop-portfolio') {
      return {
        ...project,
        title: 'Personal Portfolio Desktop OS',
        tag: 'Frontend & UI',
        status: 'Completed',
        description: 'Interactive operating system simulation showcasing real stack, hands-on experience, and technical projects.',
        highlights: [
          'Modular React component architecture with Vite',
          'Pure CSS design tokens (dark/light mode and translucent glassmorphism)',
          'Multi-window state management with real OS controls and shortcut navigation'
        ]
      }
    }

    if (project.id === 'status-check') {
      return {
        ...project,
        title: 'Status Check — AI & Cloud Telemetry',
        tag: 'Fullstack & Monitoring',
        status: 'Online',
        description: 'Real-time health monitoring and telemetry dashboard for leading AI services and developer platforms.',
        highlights: [
          'Continuous status, latency, and uptime monitoring for AI services',
          'Modern responsive interface with live telemetry and theme support',
          'Continuous deployment and high-performance hosting on Vercel'
        ]
      }
    }

    return project
  })

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <h2 className={styles.title}>{t?.projects?.title || 'Projetos & Código'}</h2>
        <p className={styles.subtitle}>
          {t?.projects?.subtitle || 'Aplicações práticas com código real, regras de negócio e boas práticas de arquitetura.'}
        </p>
      </div>

      {/* Grid de Cards de Projetos */}
      <div className={styles.grid}>
        {localizedProjects.map((project) => (
          <article key={project.id} className={styles.projectCard}>
            <div>
              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.statusBadge}>{project.status}</span>
              </div>

              <p className={styles.description}>{project.description}</p>

              {/* Destaques Técnicos do Projeto */}
              <ul className={styles.highlightsList} style={{ marginTop: '0.6rem' }}>
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <span className={styles.bullet}>▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Tags da Stack */}
              <div className={styles.techTags}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Ações / Links */}
              <div className={styles.cardFooter}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionLink} ${styles.btnCode}`}
                  >
                    <span>{btnCode}</span>
                    <span>↗</span>
                  </a>
                )}

                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionLink} ${styles.btnLive}`}
                  >
                    <span>{btnLive}</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Chamada para repositório completo */}
      <div className={styles.footerCallout}>
        <span>
          {t?.projects?.footerText || 'Mais projetos de estudos e scripts estão disponíveis diretamente no meu perfil do GitHub.'}
        </span>
        <a
          href="https://github.com/pedropngXD"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          github.com/pedropngXD ↗
        </a>
      </div>
    </div>
  )
}
