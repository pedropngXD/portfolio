import { useState, useEffect } from 'react'
import { playWindowMaximize, playWindowClose } from '../utils/soundEffects'
import styles from './FullscreenPrompt.module.css'

export default function FullscreenPrompt({ t }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const checkFullscreen = () => {
      const isFs = Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        (window.innerHeight >= window.screen.height - 4 && window.innerWidth >= window.screen.width - 4)
      )
      setIsFullscreen(isFs)
    }

    checkFullscreen()

    document.addEventListener('fullscreenchange', checkFullscreen)
    document.addEventListener('webkitfullscreenchange', checkFullscreen)
    document.addEventListener('mozfullscreenchange', checkFullscreen)
    document.addEventListener('MSFullscreenChange', checkFullscreen)
    window.addEventListener('resize', checkFullscreen)

    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen)
      document.removeEventListener('webkitfullscreenchange', checkFullscreen)
      document.removeEventListener('mozfullscreenchange', checkFullscreen)
      document.removeEventListener('MSFullscreenChange', checkFullscreen)
      window.removeEventListener('resize', checkFullscreen)
    }
  }, [])

  const handleRequestFullscreen = () => {
    try {
      playWindowMaximize()
    } catch {
      // ignore
    }

    const docEl = document.documentElement
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(() => {})
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen()
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen()
    }
  }

  const handleDismiss = (e) => {
    e.stopPropagation()
    try {
      playWindowClose()
    } catch {
      // ignore
    }
    setIsDismissed(true)
  }

  const isHidden = isFullscreen || isDismissed

  return (
    <aside
      className={`${styles.wrapper} ${isHidden ? styles.hidden : ''}`}
      aria-hidden={isHidden}
    >
      <div className={styles.alertCard} role="dialog" aria-modal="false" aria-labelledby="fullscreen-dialog-title">
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleDismiss}
          title={t?.system?.fullscreenClose || 'Fechar aviso'}
          aria-label={t?.system?.fullscreenClose || 'Fechar aviso'}
        >
          <svg
            className={styles.closeIcon}
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" />
          </svg>
        </button>
        <div className={styles.appIcon} aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <div className={styles.greenDotBadge}>
            <svg
              className={styles.greenDotArrows}
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 4V1h3M9 6v3H6" />
            </svg>
          </div>
        </div>
        <h3 id="fullscreen-dialog-title" className={styles.title}>
          {t?.system?.fullscreenPromptTitle || 'Modo Tela Cheia Recomendado'}
        </h3>
        <p className={styles.message}>
          {t?.system?.langLabel === 'EN' ? (
            <>
              To enjoy the full desktop operating system experience, press <kbd className={styles.keycap}>F11</kbd> or click below.
            </>
          ) : (
            <>
              Para aproveitar a experiência completa do sistema operacional no desktop, pressione <kbd className={styles.keycap}>F11</kbd> ou clique abaixo.
            </>
          )}
        </p>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleRequestFullscreen}
        >
          <span>{t?.system?.fullscreenConfirm || 'Entrar em Tela Cheia'}</span>
        </button>
      </div>
    </aside>
  )
}
