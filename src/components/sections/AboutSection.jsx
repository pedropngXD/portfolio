import { ABOUT_DATA } from '../../data/about'
import styles from './AboutSection.module.css'

export default function AboutSection({ onNavigate }) {
  return (
    <div className={styles.container}>
      {/* Cabeçalho de Perfil */}
      <div className={styles.profileHeader}>
        <div className={styles.avatar} aria-hidden="true">
          P
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.name}>{ABOUT_DATA.name}</h1>
          <span className={styles.role}>{ABOUT_DATA.role}</span>
          <span className={styles.subInfo}>{ABOUT_DATA.education} • {ABOUT_DATA.location}</span>
        </div>
      </div>

      {/* Grid de Pílulas Rápidas para Recrutadores Técnicos */}
      <div className={styles.quickInfoGrid}>
        {ABOUT_DATA.quickInfo.map((item, idx) => (
          <div key={idx} className={styles.infoCard}>
            <span className={styles.infoLabel}>{item.label}</span>
            <span className={styles.infoValue}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Bio Técnica Direta ao Ponto */}
      <div className={styles.bioSection}>
        <h2 className={styles.headline}>{ABOUT_DATA.headline}</h2>

        {ABOUT_DATA.paragraphs.map((p, idx) => (
          <p key={idx} className={styles.paragraph}>
            {p}
          </p>
        ))}
      </div>

      {/* Ações de Navegação para Próximas Janelas */}
      <div className={styles.actionsBar}>
        <button
          type="button"
          className={styles.actionBtnPrimary}
          onClick={() => onNavigate && onNavigate('experience')}
        >
          💼 Ver Experiência na Credware
        </button>
        <button
          type="button"
          className={styles.actionBtnSecondary}
          onClick={() => onNavigate && onNavigate('stack')}
        >
          ⚡ Explorar Stack Técnica
        </button>
      </div>
    </div>
  )
}
