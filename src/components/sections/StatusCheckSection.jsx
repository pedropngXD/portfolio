import { useState } from 'react'
import styles from './StatusCheckSection.module.css'

export default function StatusCheckSection() {
  const [reloadKey, setReloadKey] = useState(0)
  const url = 'https://status-check-eosin.vercel.app'

  const handleReload = () => {
    setReloadKey((prev) => prev + 1)
  }

  return (
    <div className={styles.container}>
      {/* Barra de Navegador do SO */}
      <div className={styles.browserBar}>
        <div className={styles.barLeft}>
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot} />
            <span>Online</span>
          </div>

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
            title="Recarregar aplicação"
          >
            <span>🔄</span>
            <span>Recarregar</span>
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton}
            title="Abrir diretamente em uma nova aba do navegador"
          >
            <span>Abrir no Navegador</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Frame interativo do projeto */}
      <div className={styles.iframeWrapper}>
        <iframe
          key={reloadKey}
          src={url}
          title="Status Check — Real-time AI & Cloud Telemetry"
          className={styles.iframe}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        />
      </div>
    </div>
  )
}
