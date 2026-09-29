import { useState, useEffect, useRef } from 'react'
import MacSpeakerIcon from './MacSpeakerIcon'
import styles from '../MenuBar.module.css'

export default function VolumeControl({
  volume = 0.7,
  isMuted = false,
  onIncreaseVolume,
  onDecreaseVolume,
  onSetVolume,
  onToggleMute,
  onTestSound,
  t
}) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick)
    }
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  const sys = t?.system || {}
  const isEn = sys.langLabel === 'EN'
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
    <div className={styles.volumeWrapper} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.statusItem} ${isOpen ? styles.statusItemActive : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onWheel={handleVolumeWheel}
        title={`${sys.systemVolume || 'Volume'}: ${volumePercent}%`}
        aria-label={sys.systemVolume || (isEn ? 'System volume' : 'Controle de volume do sistema')}
      >
        <MacSpeakerIcon volume={volume} isMuted={isMuted} size={15} />
      </button>

      {isOpen && (
        <div className={styles.volumePopover} role="dialog" aria-label={sys.systemVolume || (isEn ? 'Volume settings' : 'Ajuste de volume')}>
          <div className={styles.popoverHeader}>
            <span>{sys.systemVolume || 'Som'}</span>
            <span className={styles.popoverValue}>
              {isMuted ? sys.mute || 'Mudo' : `${volumePercent}%`}
            </span>
          </div>

          <div className={styles.capsuleTrack}>
            <div className={styles.capsuleFill} style={{ width: `${volumePercent}%` }} />
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
              aria-label={isEn ? 'Volume level' : 'Nível de volume'}
            />
          </div>

          <div className={styles.deviceInfoRow}>
            <div className={styles.deviceInfoLeft}>
              <span>🎧</span>
              <span>Pedro OS Web Audio</span>
            </div>
            <span className={styles.deviceCheck}>✓</span>
          </div>

          <div className={styles.popoverActions}>
            <button type="button" className={styles.popoverBtn} onClick={onToggleMute}>
              <span>{isMuted ? '🔊' : '🔇'}</span>
              <span>{isMuted ? sys.unmute || 'Ativar som' : sys.mute || 'Silenciar'}</span>
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
  )
}
