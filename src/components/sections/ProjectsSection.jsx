import { PROJECTS_DATA } from '../../data/projects'
import SectionHeader from '../common/SectionHeader'
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
        description: 'Interactive web operating system developed with React, Vite, Tailwind CSS, and CSS Modules, featuring dynamic window management, design tokens, and theme support.',
        highlights: [
          'Component-driven architecture in React 18 with ultra-fast Vite bundling',
          'Modern responsive styling with Tailwind CSS, CSS Modules, and design tokens (Dark/Light mode)',
          'Multitasking window state management with native OS controls, keyboard shortcuts, and Web Audio API'
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
      <SectionHeader
        title={t?.projects?.title || 'Projetos & Código'}
        subtitle={
          t?.projects?.subtitle ||
          'Aplicações práticas com código real, regras de negócio e boas práticas de arquitetura.'
        }
      />
      <div className={styles.grid}>
        {localizedProjects.map((project) => (
          <article key={project.id} className={styles.projectCard}>
            <div>
              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.statusBadge}>{project.status}</span>
              </div>
              <p className={styles.description}>{project.description}</p>
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
              <div className={styles.techTags}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
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
