import { EXPERIENCE_DATA } from '../../data/experience'
import SectionHeader from '../common/SectionHeader'
import styles from './ExperienceSection.module.css'

export default function ExperienceSection({ t }) {
  const experiences = t?.experience?.items || EXPERIENCE_DATA
  const title = t?.experience?.title || 'Experiência Profissional'
  const subtitle =
    t?.experience?.subtitle ||
    'Atuação prática em ambiente corporativo, sustentação de microsserviços e produtos internos.'
  const isEn = t?.system?.langLabel === 'EN'

  return (
    <div className={styles.container}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
      />
      <div className={styles.cardsList}>
        {experiences.map((exp) => {
          const responsibilities = exp.responsibilities || []
          const techStack = exp.techStack || []

          return (
            <article
              key={exp.id || exp.role}
              className={`${styles.experienceCard} ${!exp.isCurrent ? styles.pastExperienceCard : ''}`}
            >
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.roleTitle}>{exp.role}</h3>
                  <p className={styles.companyName}>
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <div className={`${styles.statusBadge} ${!exp.isCurrent ? styles.statusBadgePast : ''}`}>
                  {exp.isCurrent ? (
                    <span className={styles.pulseDot} />
                  ) : (
                    <span className={styles.calendarIcon} aria-hidden="true">📅</span>
                  )}
                  <span>{exp.period}</span>
                </div>
              </div>
              <p className={styles.summaryText}>{exp.summary}</p>

              {responsibilities.length > 0 && (
                <ul className={styles.responsibilitiesList}>
                  {responsibilities.map((resp, idx) => (
                    <li key={idx} className={styles.responsibilityItem}>
                      <strong className={styles.areaHeading}>
                        <span>{resp.area}</span>
                      </strong>
                      <p className={styles.detailText}>{resp.detail}</p>
                    </li>
                  ))}
                </ul>
              )}

              {techStack.length > 0 && (
                <div className={styles.techSection}>
                  <span className={styles.techHeading}>
                    {isEn ? 'Daily production stack:' : 'Stack aplicada no dia a dia:'}
                  </span>
                  <div className={styles.techTags}>
                    {techStack.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
