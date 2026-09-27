import { PROJECTS_DATA } from '../../data/projects'
import styles from './ProjectsSection.module.css'

export default function ProjectsSection() {
  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <h2 className={styles.title}>Projetos & Código</h2>
        <p className={styles.subtitle}>
          Aplicações práticas com código real, regras de negócio e boas práticas de arquitetura.
        </p>
      </div>

      {/* Grid de Cards de Projetos */}
      <div className={styles.grid}>
        {PROJECTS_DATA.map((project) => (
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
                    <span>Repositório</span>
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
                    <span>Acessar Demo</span>
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
          Mais projetos de estudos e scripts estão disponíveis diretamente no meu perfil do GitHub.
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
