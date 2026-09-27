import { useState, useEffect } from 'react'
import { SECTIONS } from '../data/sections'
import styles from './MenuBar.module.css'

export default function MenuBar({
  activeSection,
  onOpenSection,
  theme,
  onToggleTheme
}) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat('pt-BR', {
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
  }, [])

  return (
    <header className={styles.menuBar} role="banner">
      {/* Lado Esquerdo: Identidade do OS e Seções de Navegação */}
      <div className={styles.leftGroup}>
        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">💻</span>
          <span>Pedro</span>
        </div>

        <nav aria-label="Navegação do sistema">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`${styles.menuItem} ${activeSection === section.id ? styles.menuItemActive : ''}`}
              onClick={() => onOpenSection && onOpenSection(section.id)}
            >
              {section.shortLabel}
            </button>
          ))}
        </nav>
      </div>

      {/* Lado Direito: Status profissional, Toggle de Tema e Relógio */}
      <div className={styles.rightGroup}>
        <div className={styles.statusBadge} title="Unisinos • Credware Tecnologia">
          <span className={styles.statusDot} />
          <span>Credware Tech</span>
        </div>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
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
