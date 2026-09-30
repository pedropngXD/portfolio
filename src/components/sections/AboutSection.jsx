import { ABOUT_DATA } from '../../data/about'
import { CONTACT_CHANNELS } from '../../data/contact'
import styles from './AboutSection.module.css'

export default function AboutSection({ t, isMaximized }) {
  const data = t?.about || ABOUT_DATA
  const paragraphs = data.paragraphs || ABOUT_DATA.paragraphs
  const quickInfo = data.quickInfo || ABOUT_DATA.quickInfo
  const isEn = t?.system?.langLabel === 'EN'

  return (
    <div className={`${styles.container} ${isMaximized ? styles.containerMaximized : ''}`}>
      <div className={styles.profileHeader}>
        <div className={styles.profileLeft}>
          <div className={styles.avatar}>
            <img
              src={ABOUT_DATA.avatarUrl || '/profile.jpg'}
              alt={ABOUT_DATA.name}
              className={styles.avatarImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <span className={styles.avatarFallback} aria-hidden="true">
              {ABOUT_DATA.name?.[0] || 'P'}
            </span>
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.name}>{ABOUT_DATA.name}</h1>
            <span className={styles.role}>{data.role || ABOUT_DATA.role}</span>
            <span className={styles.subInfo}>
              {(data.education || ABOUT_DATA.education)} • {(data.location || ABOUT_DATA.location)}
            </span>
          </div>
        </div>
        <div className={styles.profileRight}>
          <div className={styles.statusPill}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>{t?.system?.statusAvailable || (isEn ? 'Available' : 'Disponível')}</span>
          </div>
          <div className={styles.contactChips}>
            {CONTACT_CHANNELS.map((ch) => (
              <a
                key={ch.id}
                href={ch.href}
                target={ch.id !== 'email' ? '_blank' : undefined}
                rel={ch.id !== 'email' ? 'noopener noreferrer' : undefined}
                className={styles.contactChip}
                title={ch.label}
              >
                <span>{ch.id === 'github' ? '🐙' : ch.id === 'linkedin' ? '💼' : '✉️'}</span>
                <span>{ch.id === 'email' ? 'Email' : ch.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.contentLayout}>
        <div className={styles.bioColumn}>
          <div className={styles.headlineBox}>
            <h2 className={styles.headline}>{data.headline || ABOUT_DATA.headline}</h2>
          </div>
          <div className={styles.paragraphsGroup}>
            {paragraphs.map((p, idx) => (
              <p key={idx} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.sideColumn}>
          <div className={styles.quickInfoGrid}>
            {quickInfo.map((item, idx) => (
              <div key={idx} className={styles.infoCard}>
                <span className={styles.infoLabel}>{item.label}</span>
                <span className={styles.infoValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
