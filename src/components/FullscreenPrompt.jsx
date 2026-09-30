import React, { useState, useEffect } from 'react'
import { playWindowMaximize } from '../utils/soundEffects'
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
    setIsDismissed(true)
  }

  const isHidden = isFullscreen || isDismissed

  return (
    <aside
      className={`${styles.wrapper} ${isHidden ? styles.hidden : ''}`}
      aria-hidden={isHidden}
    >
      <div
        role="button"
        tabIndex={0}
        className={styles.bannerCard}
        onClick={handleRequestFullscreen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleRequestFullscreen()
          }
        }}
        title={t?.system?.fullscreenPrompt || 'Pressione F11 ou clique aqui para tela cheia'}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleDismiss}
          title={t?.system?.fullscreenClose || 'Fechar aviso'}
          aria-label={t?.system?.fullscreenClose || 'Fechar aviso'}
        >
          ×
        </button>

        <div className={styles.iconWrapper} aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </div>

        <div className={styles.content}>
          <div className={styles.headerRow}>
            <span className={styles.tagBadge}>
              {t?.system?.fullscreenPromptTitle || 'Experiência Completa'}
            </span>
            <kbd className={styles.keycap}>F11</kbd>
          </div>

          <p className={styles.message}>
            {t?.system?.fullscreenPrompt ||
              'Pressione F11 ou clique aqui para tela cheia e ter a experiência máxima do sistema operacional'}
          </p>

          <span className={styles.actionHint}>
            <span>{t?.system?.openAsWindow ? 'Tela Cheia' : 'Fullscreen'}</span>
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
    </aside>
  )
}
