import { SECTIONS } from '../data/sections'
import SystemIcon from './SystemIcon'
import styles from './Dock.module.css'

export default function Dock({
  windows = {},
  dockAppIds = [],
  isHidden = false,
  onSelectSection,
  onContextMenu,
  theme,
  onToggleTheme
}) {
  const visibleSections = SECTIONS.filter((sec) => dockAppIds.includes(sec.id))

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
              aria-label={`Abrir ${section.title} (clique direito para opções)`}
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
