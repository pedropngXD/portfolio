import React from 'react'
import styles from './MobilePlaceholder.module.css'
import { CONTACT_CHANNELS } from '../data/contact'
import { playToggle, playNotification } from '../utils/soundEffects'

export default function MobilePlaceholder({
  lang = 'pt',
  onToggleLang,
  theme = 'dark',
  onToggleTheme,
  onNotify,
  t
}) {
  const sys = t?.system || {}
  const mob = t?.mobile || {}

  const githubChannel = CONTACT_CHANNELS.find((c) => c.id === 'github')
  const linkedinChannel = CONTACT_CHANNELS.find((c) => c.id === 'linkedin')
  const emailChannel = CONTACT_CHANNELS.find((c) => c.id === 'email')

  const handleCopyEmail = () => {
    if (!emailChannel) return
    navigator.clipboard.writeText(emailChannel.value).then(() => {
      playNotification()
      onNotify && onNotify({
        title: sys.emailToastTitle || (lang === 'pt' ? 'Área de Transferência' : 'Clipboard'),
        message: sys.emailToastMessage || (lang === 'pt' ? 'E-mail copiado para a área de transferência!' : 'Email copied to clipboard!'),
        icon: '📋'
      })
    })
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
          <span>{mob.brand || 'Pedro • Mobile'}</span>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleToggleLangInternal}
            title={lang === 'pt' ? (sys.switchLang || 'Mudar para Inglês') : (sys.switchLang || 'Switch to Portuguese')}
          >
            <span>{lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}</span>
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleToggleThemeInternal}
            title={theme === 'dark' ? (sys.switchThemeLight || 'Modo Claro') : (sys.switchThemeDark || 'Modo Escuro')}
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
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
              <span>{mob.underConstruction || (lang === 'pt' ? 'Em Construção' : 'Under Construction')}</span>
            </span>

            <h1 className={styles.title}>
              {mob.title || (lang === 'pt' ? 'Sistema mobile em construção' : 'Mobile version under construction')}
            </h1>

            <p className={styles.description}>
              {mob.description || (lang === 'pt'
                ? 'A experiência mobile dedicada e adaptada para smartphones e telas verticais está em construção.'
                : 'The dedicated mobile experience tailored for smartphones and vertical screens is under construction.')}
            </p>

            <div className={styles.notice}>
              {mob.notice || (lang === 'pt'
                ? '💡 Para acessar o sistema operacional completo com janelas, efeitos sonoros e dock, visite este portfólio através de um computador ou desktop.'
                : '💡 To explore the full operating system experience with floating windows and dock, please visit this portfolio on a desktop computer.')}
            </div>
          </div>

          {/* Atalhos rápidos de contato */}
          <div className={styles.contactsRow}>
            <span className={styles.contactsLabel}>
              {mob.directContacts || (lang === 'pt' ? 'Contatos Diretos' : 'Direct Contacts')}
            </span>
            <div className={styles.contactsChips}>
              {githubChannel && (
                <a
                  href={githubChannel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.chip}
                >
                  <span>🐙</span>
                  <span>GitHub</span>
                </a>
              )}
              {linkedinChannel && (
                <a
                  href={linkedinChannel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.chip}
                >
                  <span>💼</span>
                  <span>LinkedIn</span>
                </a>
              )}
              {emailChannel && (
                <>
                  <a
                    href={emailChannel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.chip}
                  >
                    <span>✉️</span>
                    <span>{mob.sendEmail || (lang === 'pt' ? 'Enviar E-mail' : 'Send Email')}</span>
                  </a>
                  <button
                    type="button"
                    className={styles.chip}
                    onClick={handleCopyEmail}
                    title={lang === 'pt' ? 'Copiar endereço de e-mail' : 'Copy email address'}
                  >
                    <span>📋</span>
                    <span>{mob.copy || (lang === 'pt' ? 'Copiar' : 'Copy')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
