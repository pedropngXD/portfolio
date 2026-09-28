import { useState, useEffect, useRef } from 'react'
import MacWifiIcon from './MacWifiIcon'
import { playToggle } from '../../utils/soundEffects'
import styles from '../MenuBar.module.css'

const CONNECTED_WIFI = {
  name: 'Pedro-Net_5GHz',
  speed: '1.2 Gbps',
  band: '5 GHz • Wi-Fi 6',
  ip: '192.168.1.104'
}

export default function WifiControl({ t }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)
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

  return (
    <div className={styles.wifiWrapper} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.statusItem} ${isOpen ? styles.statusItemActive : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        title={
          isEnabled
            ? `Wi-Fi: ${CONNECTED_WIFI.name} (${CONNECTED_WIFI.speed})`
            : t?.wifi?.disconnected || 'Wi-Fi Desconectado'
        }
        aria-label="Wi-Fi"
      >
        <MacWifiIcon isConnected={isEnabled} size={15} />
      </button>

      {isOpen && (
        <div className={styles.wifiPopover} role="dialog" aria-label="Ajustes de Wi-Fi">
          <div className={styles.popoverHeader}>
            <span>{t?.wifi?.title || 'Wi-Fi'}</span>
            <button
              type="button"
              className={`${styles.switchToggle} ${isEnabled ? styles.switchToggleActive : ''}`}
              onClick={() => {
                playToggle()
                setIsEnabled((prev) => !prev)
              }}
              title={isEnabled ? t?.wifi?.turnOff || 'Desativar Wi-Fi' : t?.wifi?.turnOn || 'Ativar Wi-Fi'}
              aria-label="Alternar Wi-Fi"
            >
              <span className={styles.switchKnob} />
            </button>
          </div>

          {isEnabled ? (
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
              <span className={styles.connectedCheck} title="Conexão ativa">
                ✓
              </span>
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '0.75rem 0',
                color: 'var(--window-text-muted)',
                fontSize: '0.8rem'
              }}
            >
              {t?.wifi?.disconnected || 'Wi-Fi Desconectado'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
