import { useEffect } from 'react'
import SystemIcon from './SystemIcon'
import styles from './Window.module.css'

export default function Window({
  title,
  tag,
  iconType,
  accentColor,
  onClose,
  children
}) {
  // Fecha a janela ao pressionar a tecla ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && onClose) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className={styles.windowContainer}
      role="dialog"
      aria-label={title}
      aria-modal="true"
    >
      {/* Barra de Título (Header estilo Finder/Explorer) */}
      <header className={styles.windowHeader}>
        {/* Controles de Janela (Fechar, Minimizar, Maximizar) */}
        <div className={styles.windowControls}>
          <button
            type="button"
            className={`${styles.controlButton} ${styles.btnClose}`}
            onClick={onClose}
            title="Fechar janela (Esc)"
            aria-label="Fechar janela"
          />
          <span
            className={`${styles.controlButton} ${styles.btnMinimize}`}
            title="Minimizar (visual)"
            aria-hidden="true"
          />
          <span
            className={`${styles.controlButton} ${styles.btnMaximize}`}
            title="Maximizar (visual)"
            aria-hidden="true"
          />
        </div>

        {/* Título Centralizado com Ícone e Cor de Acento */}
        <div className={styles.windowTitle}>
          {iconType && (
            <SystemIcon
              type={iconType}
              size={16}
              color={accentColor || 'currentColor'}
            />
          )}
          <span>{title}</span>
        </div>

        {/* Lado Direito: Tag da seção ou Badge */}
        <div className={styles.headerSpacer}>
          {tag && <span className={styles.tagBadge}>{tag}</span>}
        </div>
      </header>

      {/* Conteúdo rolável da janela */}
      <section className={styles.windowBody}>
        {children}
      </section>
    </div>
  )
}
