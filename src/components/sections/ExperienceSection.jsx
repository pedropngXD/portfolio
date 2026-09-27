import { EXPERIENCE_DATA } from '../../data/experience'
import styles from './ExperienceSection.module.css'

export default function ExperienceSection() {
  const [exp] = EXPERIENCE_DATA

  return (
    <div className={styles.container}>
      {/* Cabeçalho da Seção */}
      <div className={styles.header}>
        <h2 className={styles.title}>Experiência Profissional</h2>
        <p className={styles.subtitle}>
          Atuação prática em ambiente corporativo, sustentação de microsserviços e produtos internos.
        </p>
      </div>

      {/* Card Principal da Experiência na Credware */}
      <article className={styles.experienceCard}>
        <div className={styles.cardTop}>
          <div>
            <h3 className={styles.roleTitle}>{exp.role}</h3>
            <p className={styles.companyName}>{exp.company} • {exp.location}</p>
          </div>

          <div className={styles.statusBadge}>
            <span className={styles.pulseDot} />
            <span>{exp.period}</span>
          </div>
        </div>

        <p className={styles.summaryText}>{exp.summary}</p>

        {/* Detalhamento das 4 Áreas de Impacto */}
        <ul className={styles.responsibilitiesList}>
          {exp.responsibilities.map((resp, idx) => (
            <li key={idx} className={styles.responsibilityItem}>
              <strong className={styles.areaHeading}>
                <span>⚡</span>
                <span>{resp.area}</span>
              </strong>
              <p className={styles.detailText}>{resp.detail}</p>
            </li>
          ))}
        </ul>

        {/* Stack de Produção Aplicada */}
        <div className={styles.techSection}>
          <span className={styles.techHeading}>Stack aplicada no dia a dia:</span>
          <div className={styles.techTags}>
            {exp.techStack.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
