import React from 'react'
import styles from './MobilePlaceholder.module.css'
import { CONTACT_CHANNELS } from '../data/contact'
import { playToggle, playWindowOpen, playNotification } from '../utils/soundEffects'

export default function MobilePlaceholder({
  onGoToDesktop,
  onBackToSelect,
  lang = 'pt',
  onToggleLang,
  theme = 'dark',
  onToggleTheme,
  onNotify,
  t
}) {
  const modeData = t?.modeSelector || {}
  const sys = t?.system || {}

  const githubChannel = CONTACT_CHANNELS.find((c) => c.id === 'github')
  const linkedinChannel = CONTACT_CHANNELS.find((c) => c.id === 'linkedin')
  const emailChannel = CONTACT_CHANNELS.find((c) => c.id === 'email')

  const handleCopyEmail = () => {
    if (!emailChannel) return
    navigator.clipboard.writeText(emailChannel.value).then(() => {
      playNotification()
      onNotify && onNotify({
        title: sys.emailToastTitle || 'Área de Transferência',
        message: sys.emailToastMessage || 'E-mail copiado para a área de transferência!',
        icon: '📋'
      })
    })
  }

  const handleGoDesktopInternal = () => {
    playWindowOpen()
    onGoToDesktop && onGoToDesktop()
  }

  const handleBackToSelectInternal = () => {
    playToggle()
    onBackToSelect && onBackToSelect()
  }

  const handleToggleLangInternal = () => {
    playToggle()
    onToggleLang && onToggleLang()
  }

  const handleToggleThemeInternal = () => {
    playToggle()
    onToggleTheme && onToggleTheme()
  }

  return (
    <div className={styles.container}>
      {/* Header superior */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">📱</span>
          <span>Pedro • Mobile</span>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleToggleLangInternal}
            title={lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
          >
            <span>{lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}</span>
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleToggleThemeInternal}
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleBackToSelectInternal}
            title={modeData.backToSelect || 'Voltar à Seleção'}
          >
            <span>🚪 {modeData.exitToSelector || 'Mudar Modo'}</span>
          </button>
        </div>
      </header>

      {/* Conteúdo central com o card explicativo */}
      <main className={styles.contentArea}>
        <div className={styles.phoneCard}>
          {/* Ícone com engrenagem animada */}
          <div className={styles.iconWrapper} aria-hidden="true">
            📱
            <div className={styles.gearBadge}>⚙️</div>
          </div>

          {/* Textos informativos */}
          <div className={styles.textGroup}>
            <span className={styles.statusTag}>
              <span>🚧</span>
              <span>{modeData.mobileBadge || 'Em Desenvolvimento'}</span>
            </span>

            <h1 className={styles.title}>
              {modeData.underDevTitle || 'Versão Mobile em Desenvolvimento'}
            </h1>

            <p className={styles.description}>
              {modeData.underDevSubtitle ||
                'Estamos construindo uma experiência mobile dedicada com navegação por gestos e gavetas táteis.'}
            </p>

            <div className={styles.notice}>
              {modeData.underDevNotice ||
                'Em breve disponível! Enquanto isso, aproveite a experiência completa no modo Desktop.'}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className={styles.actionButtonGroup}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={handleGoDesktopInternal}
            >
              <span>{modeData.goToDesktop || 'Acessar Modo Desktop 💻'}</span>
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={handleBackToSelectInternal}
            >
              <span>{modeData.backToSelect || '⬅ Voltar ao Menu de Seleção'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
