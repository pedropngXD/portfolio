import { useState, useEffect } from 'react'
import { SECTIONS } from '../data/sections'
import styles from './MenuBar.module.css'

export default function MenuBar({
  focusedWindowId,
  openWindowIds = [],
  onOpenSection,
  theme,
  onToggleTheme,
  lang = 'pt',
  onToggleLang,
  t
}) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const locale = lang === 'pt' ? 'pt-BR' : 'en-US'
      const formatted = new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(now)

      setTime(formatted.replace(/\./g, ''))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [lang])

  const sys = t?.system || {}

  return (
    <header className={styles.menuBar} role="banner">
      {/* Lado Esquerdo: Identidade do OS e Seções de Navegação */}
      <div className={styles.leftGroup}>
        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">💻</span>
          <span>{sys.brand || 'Pedro'}</span>
        </div>

        <nav aria-label="Navegação do sistema">
          {SECTIONS.map((section) => {
            const isFocused = focusedWindowId === section.id
            const isOpen = openWindowIds.includes(section.id)
            const sectionLabel = t?.sections?.[section.id]?.shortLabel || section.shortLabel
            const sectionTitle = t?.sections?.[section.id]?.title || section.title

            return (
              <button
                key={section.id}
                type="button"
                className={`${styles.menuItem} ${isFocused ? styles.menuItemActive : ''}`}
                onClick={() => onOpenSection && onOpenSection(section.id)}
                title={`${sectionTitle} ${isOpen ? `(${sys.open || 'Aberta'})` : ''}`}
              >
                {sectionLabel}
                {isOpen && !isFocused && (
                  <span style={{ fontSize: '0.6rem', opacity: 0.6, marginLeft: '3px' }}>•</span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Lado Direito: Status profissional, Toggle de Idioma, Toggle de Tema e Relógio */}
      <div className={styles.rightGroup}>
        <div className={styles.statusBadge} title="Unisinos • Credware Tecnologia">
          <span className={styles.statusDot} />
          <span>{sys.statusWork || 'Credware Tech'}</span>
        </div>

        {/* Botão de Sistema para Trocar de Idioma (PT / EN) */}
        <button
          type="button"
          className={styles.langToggle}
          onClick={onToggleLang}
          title={lang === 'pt' ? 'Switch to English (US)' : 'Mudar para Português (BR)'}
          aria-label="Alternar idioma do sistema"
        >
          <span className={styles.langFlag}>{lang === 'pt' ? '🇧🇷' : '🇺🇸'}</span>
          <span className={styles.langCode}>{lang === 'pt' ? 'PT' : 'EN'}</span>
        </button>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={onToggleTheme}
          title={theme === 'dark' ? (sys.switchThemeLight || 'Modo Claro') : (sys.switchThemeDark || 'Modo Escuro')}
          aria-label="Alternar tema de cores"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <time className={styles.clock} dateTime={new Date().toISOString()}>
          {time || '--:--'}
        </time>
      </div>
    </header>
  )
}
