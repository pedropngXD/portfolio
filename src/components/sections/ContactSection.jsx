import { useState } from 'react'
import { EDUCATION_DATA, CONTACT_CHANNELS } from '../../data/contact'
import SystemIcon from '../SystemIcon'
import styles from './ContactSection.module.css'

export default function ContactSection({ t }) {
  const [copiedId, setCopiedId] = useState(null)
  const isEn = t?.system?.langLabel === 'EN'

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

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
      {/* Cabeçalho */}
      <div className={styles.header}>
        <h2 className={styles.title}>{t?.contact?.title || 'Formação Acadêmica & Contato'}</h2>
        <p className={styles.subtitle}>
          {t?.contact?.subtitle || 'Graduação em andamento e canais diretos para oportunidades de estágio e desenvolvimento de software.'}
        </p>
      </div>

      {/* Bloco 1: Formação Acadêmica */}
      <section className={styles.sectionBlock} aria-label={t?.contact?.academicCardTitle || 'Formação Acadêmica'}>
        <h3 className={styles.blockTitle}>
          <span>🎓</span>
          <span>{isEn ? 'Higher Education' : 'Graduação Superior'}</span>
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

      {/* Bloco 2: Canais de Contato Direto */}
      <section className={styles.sectionBlock} aria-label={t?.contact?.channelsCardTitle || 'Canais de Contato'}>
        <h3 className={styles.blockTitle}>
          <span>📫</span>
          <span>{isEn ? 'Direct Channels' : 'Canais de Comunicação'}</span>
        </h3>

        <div className={styles.contactsGrid}>
          {CONTACT_CHANNELS.map((item) => {
            const itemLabel = isEn
              ? (item.id === 'email' ? 'Professional Email' : item.label)
              : item.label

            return (
              <article key={item.id} className={styles.contactCard}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrapper}>
                    <SystemIcon
                      type={item.icon}
                      size={20}
                      color="var(--accent-contact)"
                    />
                  </div>
                  <div>
                    <h4 className={styles.contactLabel}>{itemLabel}</h4>
                    <p className={styles.contactValue}>{item.value}</p>
                  </div>
                </div>

                {item.actionType === 'copy' ? (
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => handleCopy(item.id, item.value)}
                    title={isEn ? 'Copy email address' : 'Copiar endereço de e-mail'}
                  >
                    <span>{copiedId === item.id ? (isEn ? '✓ Copied!' : '✓ Copiado!') : (isEn ? 'Copy Email' : 'Copiar E-mail')}</span>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                  >
                    <span>{isEn ? 'Visit Profile' : 'Acessar Perfil'}</span>
                    <span>↗</span>
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* Chamada de Disponibilidade */}
      <div className={styles.footerCallout}>
        <span aria-hidden="true">💼</span>
        <span>
          {isEn
            ? 'Available for new internship and junior software engineering roles (remote or hybrid).'
            : 'Disponível para novas oportunidades de estágio e vagas júnior em desenvolvimento de software (remoto ou híbrido).'}
        </span>
      </div>
    </div>
  )
}
