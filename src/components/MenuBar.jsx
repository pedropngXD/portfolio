import React from 'react'
import { SECTIONS } from '../data/sections'
import Clock from './menubar/Clock'
import VolumeControl from './menubar/VolumeControl'
import WifiControl from './menubar/WifiControl'
import styles from './MenuBar.module.css'

export default function MenuBar({
  focusedWindowId,
  openWindowIds = [],
  onOpenSection,
  theme,
  onToggleTheme,
  lang = 'pt',
  onToggleLang,
  volume = 0.7,
  isMuted = false,
  onIncreaseVolume,
  onDecreaseVolume,
  onSetVolume,
  onToggleMute,
  onTestSound,
  t
}) {
  const sys = t?.system || {}

  return (
    <header className={styles.menuBar} role="banner">
      {/* Lado Esquerdo: Identidade do OS e Seções de Navegação */}
      <div className={styles.leftGroup}>
        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">
            💻
          </span>
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

      {/* Lado Direito: Status, Controles e Relógio */}
      <div className={styles.rightGroup}>
        <div className={styles.statusBadge} title="Unisinos • Credware Tecnologia">
          <span className={styles.statusDot} />
          <span>{sys.statusWork || 'Credware Tech'}</span>
        </div>

        {/* Controle de Volume macOS */}
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onIncreaseVolume={onIncreaseVolume}
          onDecreaseVolume={onDecreaseVolume}
          onSetVolume={onSetVolume}
          onToggleMute={onToggleMute}
          onTestSound={onTestSound}
          t={t}
        />

        {/* Controle de Wi-Fi macOS */}
        <WifiControl t={t} />

        {/* Alternador de Idioma (PT / EN) */}
        <button
          type="button"
          className={styles.statusItem}
          onClick={onToggleLang}
          title={lang === 'pt' ? 'Switch to English (US)' : 'Mudar para Português (BR)'}
          aria-label="Alternar idioma do sistema"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className={styles.statusLabel}>{lang === 'pt' ? 'PT' : 'EN'}</span>
        </button>

        {/* Relógio do Sistema */}
        <Clock lang={lang} className={styles.clock} />
      </div>
    </header>
  )
}
