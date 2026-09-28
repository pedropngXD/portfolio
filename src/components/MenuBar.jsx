import { useState, useEffect, useRef } from 'react'
import { SECTIONS } from '../data/sections'
import { playToggle } from '../utils/soundEffects'
import styles from './MenuBar.module.css'

function MacSpeakerIcon({ volume = 0.7, isMuted = false, size = 15 }) {
  if (isMuted || volume <= 0) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    )
  }

  if (volume <= 0.35) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    )
  }

  if (volume <= 0.7) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function MacWifiIcon({ isConnected = true, size = 15 }) {
  if (!isConnected) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ opacity: 0.5 }}
      >
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
        <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  )
}

const CONNECTED_WIFI = {
  name: 'Pedro-Net_5GHz',
  speed: '1.2 Gbps',
  band: '5 GHz • Wi-Fi 6',
  ip: '192.168.1.104'
}

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
  const [time, setTime] = useState('')
  const [isVolumeOpen, setIsVolumeOpen] = useState(false)
  const [isWifiOpen, setIsWifiOpen] = useState(false)
  const [isWifiEnabled, setIsWifiEnabled] = useState(true)
  const volumeRef = useRef(null)
  const wifiRef = useRef(null)

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

  // Fecha os popovers de volume e wifi se clicar fora deles
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target)) {
        setIsVolumeOpen(false)
      }
      if (wifiRef.current && !wifiRef.current.contains(e.target)) {
        setIsWifiOpen(false)
      }
    }

    if (isVolumeOpen || isWifiOpen) {
      window.addEventListener('mousedown', handleOutsideClick)
    }
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [isVolumeOpen, isWifiOpen])

  const sys = t?.system || {}
  const volumePercent = isMuted ? 0 : Math.round(volume * 100)

  const handleVolumeWheel = (e) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      onIncreaseVolume && onIncreaseVolume()
    } else {
      onDecreaseVolume && onDecreaseVolume()
    }
  }

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

      {/* Lado Direito: Status profissional, Volume macOS, Toggle de Modo, Toggle de Idioma, Toggle de Tema e Relógio */}
      <div className={styles.rightGroup}>
        <div className={styles.statusBadge} title="Unisinos • Credware Tecnologia">
          <span className={styles.statusDot} />
          <span>{sys.statusWork || 'Credware Tech'}</span>
        </div>

        {/* CONTROLE DE VOLUME ESTILO MACOS */}
        <div className={styles.volumeWrapper} ref={volumeRef}>
          <button
            type="button"
            className={`${styles.statusItem} ${isVolumeOpen ? styles.statusItemActive : ''}`}
            onClick={() => setIsVolumeOpen((prev) => !prev)}
            onWheel={handleVolumeWheel}
            title={`${sys.systemVolume || 'Volume'}: ${volumePercent}%`}
            aria-label="Controle de volume do sistema"
          >
            <MacSpeakerIcon volume={volume} isMuted={isMuted} size={15} />
          </button>

          {/* Popover estilo Central de Controle macOS */}
          {isVolumeOpen && (
            <div className={styles.volumePopover} role="dialog" aria-label="Ajuste de volume">
              <div className={styles.popoverHeader}>
                <span>{sys.systemVolume || 'Som'}</span>
                <span className={styles.popoverValue}>{isMuted ? (sys.mute || 'Mudo') : `${volumePercent}%`}</span>
              </div>

              {/* Cápsula de Volume macOS Big Sur / Sonoma */}
              <div className={styles.capsuleTrack}>
                <div
                  className={styles.capsuleFill}
                  style={{ width: `${volumePercent}%` }}
                />
                <div className={styles.capsuleSpeakerIcon}>
                  <MacSpeakerIcon volume={volume} isMuted={isMuted} size={15} />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volumePercent}
                  onChange={(e) => onSetVolume && onSetVolume(parseInt(e.target.value, 10) / 100)}
                  className={styles.capsuleInput}
                  aria-label="Nível de volume"
                />
              </div>

              {/* Informações da saída de áudio */}
              <div className={styles.deviceInfoRow}>
                <div className={styles.deviceInfoLeft}>
                  <span>🎧</span>
                  <span>Pedro OS Web Audio</span>
                </div>
                <span className={styles.deviceCheck}>✓</span>
              </div>

              {/* Ações rápidas */}
              <div className={styles.popoverActions}>
                <button
                  type="button"
                  className={styles.popoverBtn}
                  onClick={onToggleMute}
                >
                  <span>{isMuted ? '🔊' : '🔇'}</span>
                  <span>{isMuted ? (sys.unmute || 'Ativar som') : (sys.mute || 'Silenciar')}</span>
                </button>

                <button
                  type="button"
                  className={`${styles.popoverBtn} ${styles.popoverBtnTest}`}
                  onClick={onTestSound}
                >
                  <span>🎵</span>
                  <span>{sys.testSound || 'Testar som'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CONTROLE DE WI-FI ESTILO MACOS */}
        <div className={styles.wifiWrapper} ref={wifiRef}>
          <button
            type="button"
            className={`${styles.statusItem} ${isWifiOpen ? styles.statusItemActive : ''}`}
            onClick={() => {
              setIsWifiOpen((prev) => !prev)
              setIsVolumeOpen(false)
            }}
            title={isWifiEnabled ? `Wi-Fi: ${CONNECTED_WIFI.name} (${CONNECTED_WIFI.speed})` : (t?.wifi?.disconnected || 'Wi-Fi Desconectado')}
            aria-label="Wi-Fi"
          >
            <MacWifiIcon isConnected={isWifiEnabled} size={15} />
          </button>

          {/* Popover estilo Central de Controle macOS */}
          {isWifiOpen && (
            <div className={styles.wifiPopover} role="dialog" aria-label="Ajustes de Wi-Fi">
              <div className={styles.popoverHeader}>
                <span>{t?.wifi?.title || 'Wi-Fi'}</span>
                <button
                  type="button"
                  className={`${styles.switchToggle} ${isWifiEnabled ? styles.switchToggleActive : ''}`}
                  onClick={() => {
                    playToggle()
                    setIsWifiEnabled((prev) => !prev)
                  }}
                  title={isWifiEnabled ? (t?.wifi?.turnOff || 'Desativar Wi-Fi') : (t?.wifi?.turnOn || 'Ativar Wi-Fi')}
                  aria-label="Alternar Wi-Fi"
                >
                  <span className={styles.switchKnob} />
                </button>
              </div>

              {isWifiEnabled ? (
                <div className={styles.connectedCard}>
                  <div className={styles.networkInfo}>
                    <span style={{ color: '#3b82f6', marginTop: '2px' }}>
                      <MacWifiIcon isConnected={true} size={15} />
                    </span>
                    <div className={styles.networkDetails}>
                      <span className={styles.networkName}>{CONNECTED_WIFI.name}</span>
                      <span className={styles.networkMeta}>
                        {CONNECTED_WIFI.speed} • {CONNECTED_WIFI.band}
                      </span>
                      <span className={styles.networkMeta}>
                        {t?.wifi?.privateIp || 'IP Local'}: {CONNECTED_WIFI.ip}
                      </span>
                    </div>
                  </div>
                  <span className={styles.connectedCheck} title="Conexão ativa">✓</span>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '0.75rem 0', color: 'var(--window-text-muted)', fontSize: '0.8rem' }}>
                  {t?.wifi?.disconnected || 'Wi-Fi Desconectado'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botão de Idioma (PT / EN) - Estilo macOS */}
        <button
          type="button"
          className={styles.statusItem}
          onClick={onToggleLang}
          title={lang === 'pt' ? 'Switch to English (US)' : 'Mudar para Português (BR)'}
          aria-label="Alternar idioma do sistema"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className={styles.statusLabel}>{lang === 'pt' ? 'PT' : 'EN'}</span>
        </button>

        {/* Alternador de Tema - Estilo macOS */}
        <button
          type="button"
          className={styles.statusItem}
          onClick={onToggleTheme}
          title={theme === 'dark' ? (sys.switchThemeLight || 'Modo Claro') : (sys.switchThemeDark || 'Modo Escuro')}
          aria-label="Alternar tema de cores"
        >
          <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>

        {/* Relógio do Sistema */}
        <time className={styles.clock} dateTime={new Date().toISOString()}>
          {time || '--:--'}
        </time>
      </div>
    </header>
  )
}
