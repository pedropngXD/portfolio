import SystemIcon from './SystemIcon'
import styles from './DesktopIcon.module.css'

export default function DesktopIcon({
  id,
  title,
  iconType,
  accentColor,
  isActive,
  onClick
}) {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${isActive ? styles.iconButtonActive : ''}`}
      onClick={() => onClick && onClick(id)}
      title={`Abrir janela de ${title}`}
      aria-pressed={isActive}
    >
      <div className={styles.iconBadge}>
        {/* Camada sutil com o acento de cor da respectiva seção */}
        <div
          className={styles.iconBadgeGlow}
          style={{ backgroundColor: accentColor }}
        />
        <SystemIcon
          type={iconType}
          size={26}
          color={accentColor}
        />
      </div>
      <span className={styles.iconLabel}>{title}</span>
    </button>
  )
}
