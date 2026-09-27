import { useState } from 'react'
import { EDUCATION_DATA, CONTACT_CHANNELS } from '../../data/contact'
import SystemIcon from '../SystemIcon'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <h2 className={styles.title}>Formação Acadêmica & Contato</h2>
        <p className={styles.subtitle}>
          Graduação em andamento e canais diretos para oportunidades de estágio e desenvolvimento de software.
        </p>
      </div>

      {/* Bloco 1: Formação Acadêmica */}
      <section className={styles.sectionBlock} aria-label="Formação Acadêmica">
        <h3 className={styles.blockTitle}>
          <span>🎓</span>
          <span>Graduação Superior</span>
        </h3>

        <article className={styles.educationCard}>
          <div className={styles.eduHeader}>
            <div>
              <h4 className={styles.courseTitle}>{EDUCATION_DATA.course}</h4>
              <p className={styles.institution}>{EDUCATION_DATA.institution}</p>
            </div>
            <span className={styles.statusBadge}>{EDUCATION_DATA.status}</span>
          </div>

          <p className={styles.graduationDate}>{EDUCATION_DATA.graduationDate} • {EDUCATION_DATA.location}</p>

          <div className={styles.subjectsSection}>
            <span className={styles.subjectsLabel}>Fundamentos & Disciplinas aplicadas:</span>
            <ul className={styles.subjectsList}>
              {EDUCATION_DATA.coreSubjects.map((sub, idx) => (
                <li key={idx} className={styles.subjectTag}>
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* Bloco 2: Canais de Contato Direto */}
      <section className={styles.sectionBlock} aria-label="Canais de Contato">
        <h3 className={styles.blockTitle}>
          <span>📫</span>
          <span>Canais de Comunicação</span>
        </h3>

        <div className={styles.contactsGrid}>
          {CONTACT_CHANNELS.map((item) => (
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
                  <h4 className={styles.contactLabel}>{item.label}</h4>
                  <p className={styles.contactValue}>{item.value}</p>
                </div>
              </div>

              {item.actionType === 'copy' ? (
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={() => handleCopy(item.id, item.value)}
                  title="Copiar endereço de e-mail"
                >
                  <span>{copiedId === item.id ? '✓ Copiado!' : 'Copiar E-mail'}</span>
                </button>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                >
                  <span>Acessar Perfil</span>
                  <span>↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Chamada de Disponibilidade */}
      <div className={styles.footerCallout}>
        <span aria-hidden="true">💼</span>
        <span>
          Disponível para novas oportunidades de estágio e vagas júnior em desenvolvimento de software (remoto ou híbrido).
        </span>
      </div>
    </div>
  )
}
