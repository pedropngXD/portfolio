import { EDUCATION_DATA } from '../../data/contact'
import SectionHeader from '../common/SectionHeader'
import styles from './ContactSection.module.css'

export default function ContactSection({ t }) {
  const isEn = t?.system?.langLabel === 'EN'

  const coreSubjects = isEn
    ? [
        'Database Modeling & Administration',
        'Software Engineering & Architectural Patterns',
        'Data Structures & Algorithms',
        'Web Programming & API Development',
        'Operating Systems & Computer Networks'
      ]
    : EDUCATION_DATA.coreSubjects

  return (
    <div className={styles.container}>
      {/* Cabeçalho Reutilizável */}
      <SectionHeader
        title={t?.contact?.title || (isEn ? 'Education' : 'Formação')}
        subtitle={
          t?.contact?.subtitle ||
          (isEn
            ? 'Undergraduate degree in progress and computer science foundations at Unisinos.'
            : 'Graduação em andamento e fundamentos de engenharia de software na Unisinos.')
        }
      />

      {/* Bloco Único: Formação */}
      <section className={styles.sectionBlock} aria-label={t?.contact?.academicCardTitle || (isEn ? 'Education' : 'Formação')}>
        <h3 className={styles.blockTitle}>
          <span>🎓</span>
          <span>{isEn ? 'Education' : 'Formação'}</span>
        </h3>

        <article className={styles.educationCard}>
          <div className={styles.eduHeader}>
            <div>
              <h4 className={styles.courseTitle}>
                {isEn ? 'Systems Analysis and Development (ADS)' : EDUCATION_DATA.course}
              </h4>
              <p className={styles.institution}>{EDUCATION_DATA.institution}</p>
            </div>
            <span className={styles.statusBadge}>
              {isEn ? '7th Semester — In progress' : EDUCATION_DATA.status}
            </span>
          </div>

          <p className={styles.graduationDate}>
            {isEn ? 'Expected graduation: December / 2026' : EDUCATION_DATA.graduationDate} • {isEn ? 'Rio Grande do Sul, Brazil' : EDUCATION_DATA.location}
          </p>

          <div className={styles.subjectsSection}>
            <span className={styles.subjectsLabel}>
              {isEn ? 'Core Foundations & Applied Subjects:' : 'Fundamentos & Disciplinas aplicadas:'}
            </span>
            <ul className={styles.subjectsList}>
              {coreSubjects.map((sub, idx) => (
                <li key={idx} className={styles.subjectTag}>
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </div>
  )
}
