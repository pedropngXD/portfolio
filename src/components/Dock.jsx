import { useState } from 'react'
import { SECTIONS } from '../data/sections'
import { CONTACT_CHANNELS } from '../data/contact'
import SystemIcon from './SystemIcon'
import styles from './Dock.module.css'

export default function Dock({
  windows = {},
  dockAppIds = [],
  isHidden = false,
  onSelectSection,
  onContextMenu,
  onNotify,
  theme,
  onToggleTheme
}) {
  const [isEmailCopied, setIsEmailCopied] = useState(false)

  const visibleSections = SECTIONS.filter((sec) => dockAppIds.includes(sec.id))

  const githubChannel = CONTACT_CHANNELS.find((c) => c.id === 'github')
  const linkedinChannel = CONTACT_CHANNELS.find((c) => c.id === 'linkedin')
  const emailChannel = CONTACT_CHANNELS.find((c) => c.id === 'email')

  const handleCopyEmail = () => {
    if (!emailChannel) return
    navigator.clipboard.writeText(emailChannel.value).then(() => {
      setIsEmailCopied(true)
      onNotify && onNotify({
        title: 'Área de Transferência',
        message: 'E-mail copiado para a área de transferência!',
        icon: '📋'
      })
      setTimeout(() => setIsEmailCopied(false), 2400)
    })
  }

  return (
    <footer
      className={`${styles.dockContainer} ${isHidden ? styles.dockHidden : ''}`}
      role="region"
      aria-label="Barra de tarefas"
    >
      {/* Atalhos para as janelas do sistema operacional */}
      {visibleSections.map((section) => {
        const win = windows[section.id]
        const isOpen = win?.isOpen
        const isMinimized = win?.isMinimized

        return (
          <div key={section.id} className={styles.dockItemWrapper}>
            <span className={styles.tooltip}>
              {section.title} {isMinimized ? '(Minimizada)' : isOpen ? '(Aberta)' : ''}
            </span>

            <button
              type="button"
              className={styles.dockButton}
              onClick={() => onSelectSection && onSelectSection(section.id)}
              onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onContextMenu && onContextMenu(e, section.id, 'dock')
              }}
              aria-label={`Abrir ${section.title}`}
              aria-pressed={isOpen && !isMinimized}
            >
              <div
                className={styles.dockButtonGlow}
                style={{ backgroundColor: section.accentColor }}
              />
              <SystemIcon
                type={section.iconType}
                size={24}
                color={section.accentColor}
              />
            </button>

            {/* Pontinho indicador de aplicativo em execução no SO */}
            {isOpen && <span className={styles.activeDot} />}
          </div>
        )
      })}

      {/* Divisor vertical */}
      <div className={styles.separator} aria-hidden="true" />

      {/* Atalho externo direto para o GitHub */}
      {githubChannel && (
        <div className={styles.dockItemWrapper}>
          <span className={styles.tooltip}>GitHub ({githubChannel.value})</span>
          <a
            href={githubChannel.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.dockButton}
            aria-label="Acessar perfil do GitHub de Pedro"
          >
            <SystemIcon
              type="github"
              size={22}
              color="var(--window-text-primary)"
            />
          </a>
        </div>
      )}

      {/* Atalho externo direto para o LinkedIn */}
      {linkedinChannel && (
        <div className={styles.dockItemWrapper}>
          <span className={styles.tooltip}>LinkedIn ({linkedinChannel.value})</span>
          <a
            href={linkedinChannel.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.dockButton}
            aria-label="Acessar perfil do LinkedIn de Pedro"
          >
            <SystemIcon
              type="linkedin"
              size={20}
              color="var(--window-text-primary)"
            />
          </a>
        </div>
      )}

      {/* Atalho direto para copiar E-mail com notificação */}
      {emailChannel && (
        <div className={styles.dockItemWrapper}>
          <span className={styles.tooltip}>
            {isEmailCopied ? '✓ Copiado!' : `Copiar E-mail (${emailChannel.value})`}
          </span>
          <button
            type="button"
            className={styles.dockButton}
            onClick={handleCopyEmail}
            aria-label="Copiar e-mail de Pedro para a área de transferência"
          >
            <SystemIcon
              type="mail"
              size={21}
              color={isEmailCopied ? 'var(--accent-stack)' : 'var(--window-text-primary)'}
            />
          </button>
        </div>
      )}

      {/* Atalho para alternar Modo Claro / Modo Escuro */}
      <div className={styles.dockItemWrapper}>
        <span className={styles.tooltip}>
          {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
        </span>
        <button
          type="button"
          className={styles.dockButton}
          onClick={onToggleTheme}
          aria-label="Alternar tema de cores"
        >
          <span style={{ fontSize: '1.25rem' }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </span>
        </button>
      </div>
    </footer>
  )
}
