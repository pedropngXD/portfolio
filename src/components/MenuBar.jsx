import { useState, useEffect } from 'react'
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
      // Formata data e hora no estilo de menu de SO (ex: "dom., 27 de set. 19:20")
      const formatted = new Intl.DateTimeFormat('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(now)

      // Remove pontos finais das abreviações de dias/meses para visual limpo
      setTime(formatted.replace(/\./g, ''))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const navItems = [
    { id: 'about', label: 'Sobre' },
    { id: 'projects', label: 'Projetos' },
    { id: 'stack', label: 'Stack' },
    { id: 'contact', label: 'Contato' }
  ]

  return (
    <header className={styles.menuBar} role="banner">
      {/* Lado Esquerdo: Identidade do OS e Seções de Navegação */}
      <div className={styles.leftGroup}>
        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">💻</span>
          <span>Pedro</span>
        </div>

        <nav aria-label="Navegação do sistema">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.menuItem} ${activeSection === item.id ? styles.menuItemActive : ''}`}
              onClick={() => onOpenSection && onOpenSection(item.id)}
            >
              {item.label}
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
