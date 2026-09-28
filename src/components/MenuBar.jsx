import { useState, useEffect, useRef } from 'react'
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
  volume = 0.7,
  isMuted = false,
  onIncreaseVolume,
  onDecreaseVolume,
  onSetVolume,
  onToggleMute,
  onTestSound,
  onExitMode,
  t
}) {
  const [time, setTime] = useState('')
  const [isVolumeOpen, setIsVolumeOpen] = useState(false)
  const volumeRef = useRef(null)

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

  // Fecha o popover de volume se clicar fora dele
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target)) {
        setIsVolumeOpen(false)
      }
    }

    if (isVolumeOpen) {
      window.addEventListener('mousedown', handleOutsideClick)
    }
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [isVolumeOpen])

  const sys = t?.system || {}

  const getVolumeIcon = () => {
    if (isMuted || volume <= 0) return '🔇'
    if (volume <= 0.35) return '🔈'
    if (volume <= 0.7) return '🔉'
    return '🔊'
  }

  const volumePercent = isMuted ? 0 : Math.round(volume * 100)

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

      {/* Lado Direito: Status profissional, Volume, Toggle de Idioma, Toggle de Tema e Relógio */}
      <div className={styles.rightGroup}>
        <div className={styles.statusBadge} title="Unisinos • Credware Tecnologia">
          <span className={styles.statusDot} />
          <span>{sys.statusWork || 'Credware Tech'}</span>
        </div>

        {/* CONTROLE DE VOLUME DO SISTEMA COM BOTÕES DE AUMENTAR E DIMINUIR */}
        <div className={styles.volumeGroup} ref={volumeRef}>
          {/* Botão de Diminuir Volume (-10%) */}
          <button
            type="button"
            className={styles.volumeBtn}
            onClick={onDecreaseVolume}
            title={sys.decreaseVolume || "Diminuir volume (-10%)"}
            aria-label="Diminuir volume"
          >
            ➖
          </button>

          {/* Indicador de Volume e Abertura do Painel */}
          <button
            type="button"
            className={styles.volumeIndicator}
            onClick={() => setIsVolumeOpen((prev) => !prev)}
            title={sys.systemVolume || "Volume do Sistema"}
            aria-label="Controle de volume do sistema"
          >
            <span>{getVolumeIcon()}</span>
            <span>{volumePercent}%</span>
          </button>

          {/* Botão de Aumentar Volume (+10%) */}
          <button
            type="button"
            className={styles.volumeBtn}
            onClick={onIncreaseVolume}
            title={sys.increaseVolume || "Aumentar volume (+10%)"}
            aria-label="Aumentar volume"
          >
            ➕
          </button>

          {/* Popover Flutuante de Ajuste Fino de Volume */}
          {isVolumeOpen && (
            <div className={styles.volumePopover} role="dialog" aria-label="Ajuste de volume">
              <div className={styles.popoverHeader}>
                <span>{sys.systemVolume || "Volume do Sistema"}</span>
                <button
                  type="button"
                  className={styles.muteToggleBtn}
                  onClick={onToggleMute}
                >
                  {isMuted ? (sys.unmute || 'Ativar som') : (sys.mute || 'Silenciar')}
                </button>
              </div>

              {/* Slider de Volume Interativo */}
              <div className={styles.sliderRow}>
                <span style={{ fontSize: '0.85rem' }}>🔈</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volumePercent}
                  onChange={(e) => onSetVolume && onSetVolume(parseInt(e.target.value, 10) / 100)}
                  className={styles.volumeSlider}
                  aria-label="Nível de volume"
                />
                <span style={{ fontSize: '0.85rem' }}>🔊</span>
              </div>

              {/* Atalhos Rápidos de Porcentagem */}
              <div className={styles.presetsRow}>
                {[0, 0.25, 0.5, 0.75, 1.0].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={styles.presetBtn}
                    onClick={() => onSetVolume && onSetVolume(val)}
                  >
                    {Math.round(val * 100)}%
                  </button>
                ))}
              </div>

              {/* Botão para Testar Efeito Sonoro */}
              <button
                type="button"
                className={styles.testSoundBtn}
                onClick={onTestSound}
              >
                <span>🎵</span>
                <span>{sys.testSound || "Testar som"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Botão de Trocar Modo / Sair para Menu de Seleção */}
        <button
          type="button"
          className={styles.modeSwitchBtn}
          onClick={onExitMode}
          title={t?.modeSelector?.changeModeTooltip || 'Mudar modo de visualização (Desktop / Mobile)'}
          aria-label="Mudar modo de visualização"
        >
          <span className={styles.modeSwitchIcon} aria-hidden="true">💻⇄📱</span>
          <span className={styles.modeSwitchText}>{t?.modeSelector?.exitToSelector || 'Mudar Modo'}</span>
        </button>

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

        {/* Alternador de Tema */}
        <button
          type="button"
          className={styles.themeToggle}
          onClick={onToggleTheme}
          title={theme === 'dark' ? (sys.switchThemeLight || 'Modo Claro') : (sys.switchThemeDark || 'Modo Escuro')}
          aria-label="Alternar tema de cores"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Relógio do Sistema */}
        <time className={styles.clock} dateTime={new Date().toISOString()}>
          {time || '--:--'}
        </time>
      </div>
    </header>
  )
}
