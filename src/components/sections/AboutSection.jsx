import { ABOUT_DATA } from '../../data/about'
import styles from './AboutSection.module.css'

export default function AboutSection({ onNavigate, t }) {
  const data = t?.about || ABOUT_DATA
  const paragraphs = data.paragraphs || ABOUT_DATA.paragraphs
  const quickInfo = data.quickInfo || ABOUT_DATA.quickInfo
  const isEn = t?.system?.langLabel === 'EN'

  return (
    <div className={styles.container}>
      {/* Cabeçalho de Perfil */}
      <div className={styles.profileHeader}>
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
          <span className={styles.subInfo}>{(data.education || ABOUT_DATA.education)} • {(data.location || ABOUT_DATA.location)}</span>
        </div>
      </div>

      {/* Grid de Pílulas Rápidas para Recrutadores Técnicos */}
      <div className={styles.quickInfoGrid}>
        {quickInfo.map((item, idx) => (
          <div key={idx} className={styles.infoCard}>
            <span className={styles.infoLabel}>{item.label}</span>
            <span className={styles.infoValue}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Bio Técnica Direta ao Ponto */}
      <div className={styles.bioSection}>
        <h2 className={styles.headline}>{data.headline || ABOUT_DATA.headline}</h2>

        {paragraphs.map((p, idx) => (
          <p key={idx} className={styles.paragraph}>
            {p}
          </p>
        ))}
      </div>

      {/* Ações de Navegação para Próximas Janelas */}
      <div className={styles.actionsBar}>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.actionBtnExperience}`}
          onClick={() => onNavigate && onNavigate('experience')}
        >
          <span>💼</span>
          <span>{data.btnExperience || (isEn ? 'View Professional Experience' : 'Ver Experiências Profissionais')}</span>
        </button>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.actionBtnStack}`}
          onClick={() => onNavigate && onNavigate('stack')}
        >
          <span>⚡</span>
          <span>{data.btnStack || (isEn ? 'Explore Tech Stack' : 'Explorar Stack Técnica')}</span>
        </button>
      </div>
    </div>
  )
}
