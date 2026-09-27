import { SECTIONS } from '../data/sections'
import SystemIcon from './SystemIcon'
import styles from './Dock.module.css'

export default function Dock({
  activeSection,
  onSelectSection,
  theme,
  onToggleTheme
}) {
  return (
    <footer className={styles.dockContainer} role="region" aria-label="Dock de aplicativos">
      {/* Atalhos para as janelas do sistema operacional */}
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id

        return (
          <div key={section.id} className={styles.dockItemWrapper}>
            <span className={styles.tooltip}>{section.title}</span>

            <button
              type="button"
              className={styles.dockButton}
              onClick={() => onSelectSection && onSelectSection(section.id)}
              aria-label={`Abrir ${section.title}`}
              aria-pressed={isActive}
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

            {/* Pontinho indicador de aplicativo aberto */}
            {isActive && <span className={styles.activeDot} />}
          </div>
        )
      })}

      {/* Divisor vertical */}
      <div className={styles.separator} aria-hidden="true" />

      {/* Atalho externo direto para o GitHub */}
      <div className={styles.dockItemWrapper}>
        <span className={styles.tooltip}>GitHub (pedropngXD)</span>
        <a
          href="https://github.com/pedropngXD"
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
