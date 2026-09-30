import { useState } from 'react'
import styles from './StatusCheckSection.module.css'

export default function StatusCheckSection({ t, isAppSwitcher = false }) {
  const [reloadKey, setReloadKey] = useState(0)
  const url = 'https://status-check-eosin.vercel.app'
  const isEn = t?.system?.langLabel === 'EN'
  const sys = t?.system || {}
  const statusData = t?.statusCheck || {}

  const handleReload = () => {
    setReloadKey((prev) => prev + 1)
  }

  return (
    <div className={styles.container} style={isAppSwitcher ? { pointerEvents: 'none', overflow: 'hidden' } : undefined}>
      <div className={styles.browserBar}>
        <div className={styles.barLeft}>
          <div className={styles.urlBar} title={url}>
            <span className={styles.lockIcon}>🔒</span>
            <span>{url}</span>
          </div>
        </div>
        <div className={styles.barRight}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleReload}
            title={statusData.reloadTitle || (isEn ? 'Reload application' : 'Recarregar aplicação')}
          >
            <span>🔄</span>
            <span>{statusData.reload || (isEn ? 'Reload' : 'Recarregar')}</span>
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton}
            title={statusData.openTitle || (isEn ? 'Open directly in a new browser tab' : 'Abrir diretamente em uma nova aba do navegador')}
          >
            <span>{sys.openInBrowser || (isEn ? 'Open in Browser ↗' : 'Abrir no Navegador ↗')}</span>
          </a>
        </div>
      </div>
      <div className={styles.iframeWrapper}>
        <iframe
          key={reloadKey}
          src={url}
          title="Status Check — Real-time AI & Cloud Telemetry"
          className={styles.iframe}
          style={isAppSwitcher ? { pointerEvents: 'none', touchAction: 'none' } : undefined}
          tabIndex={isAppSwitcher ? -1 : undefined}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        />
      </div>
    </div>
  )
}
