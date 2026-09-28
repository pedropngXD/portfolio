import React from 'react'
import styles from './DeviceModeModal.module.css'
import { playToggle, playWindowOpen } from '../utils/soundEffects'

export default function DeviceModeModal({
  onSelectMode,
  lang = 'pt',
  onToggleLang,
  theme = 'dark',
  onToggleTheme,
  t
}) {
  const modeData = t?.modeSelector || {}

  const handleSelect = (mode) => {
    playWindowOpen()
    onSelectMode(mode)
  }

  const handleToggleLangInternal = () => {
    playToggle()
    onToggleLang && onToggleLang()
  }

  const handleToggleThemeInternal = () => {
    playToggle()
    onToggleTheme && onToggleTheme()
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal}>
        {/* Barra superior com Brand e controles rápidos */}
        <div className={styles.headerRow}>
          <div className={styles.brandArea}>
            <div className={styles.brandAvatar} aria-hidden="true">
              💻
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>Pedro Gabriel Pinheiro Moser</span>
              <span className={styles.brandRole}>
                {lang === 'pt' ? 'Portfólio Interativo & Sistemas' : 'Interactive Portfolio & Systems'}
              </span>
            </div>
          </div>

          <div className={styles.quickControls}>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleToggleLangInternal}
              title={lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
            >
              <span>{lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}</span>
            </button>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleToggleThemeInternal}
              title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            >
              <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </div>

        {/* Título e Subtítulo */}
        <div className={styles.titleArea}>
          <h2 id="modal-title" className={styles.mainTitle}>
            {modeData.modalTitle || 'Como você deseja visualizar?'}
          </h2>
          <p className={styles.mainSubtitle}>
            {modeData.modalSubtitle || 'Selecione o formato de experiência para acessar o portfólio'}
          </p>
        </div>

        {/* Grid de seleção dos dois formatos */}
        <div className={styles.cardsGrid}>
          {/* Card Desktop OS */}
          <div
            className={styles.optionCard}
            onClick={() => handleSelect('desktop')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSelect('desktop')
              }
            }}
          >
            <div className={styles.cardBody}>
              <span className={`${styles.badge} ${styles.badgeDesktop}`}>
                {modeData.desktopBadge || 'Experiência Completa'}
              </span>

              <div className={styles.cardIconTitle}>
                <span className={styles.cardIcon} aria-hidden="true">🖥️</span>
                <h3 className={styles.cardTitle}>{modeData.desktopTitle || 'Desktop OS'}</h3>
              </div>

              <p className={styles.cardDesc}>
                {modeData.desktopDesc || 'Sistema operacional interativo para computadores e telas amplas com janelas flutuantes, efeitos sonoros e dock.'}
              </p>

              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>{modeData.featureWindows || 'Janelas arrastáveis e redimensionáveis'}</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>{modeData.featureSounds || 'Efeitos sonoros nativos e volume'}</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>{modeData.featureDock || 'Barra de tarefas personalizável'}</span>
                </div>
              </div>
            </div>

            <button type="button" className={`${styles.cardButton} ${styles.desktopBtn}`}>
              <span>{modeData.desktopBtn || 'Acessar Desktop OS ➔'}</span>
            </button>
          </div>

          {/* Card Versão Mobile */}
          <div
            className={`${styles.optionCard} ${styles.optionCardMobile}`}
            onClick={() => handleSelect('mobile')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSelect('mobile')
              }
            }}
          >
            <div className={styles.cardBody}>
              <span className={`${styles.badge} ${styles.badgeMobile}`}>
                {modeData.mobileBadge || 'Em Desenvolvimento 🚧'}
              </span>

              <div className={styles.cardIconTitle}>
                <span className={styles.cardIcon} aria-hidden="true">📱</span>
                <h3 className={styles.cardTitle}>{modeData.mobileTitle || 'Versão Mobile'}</h3>
              </div>

              <p className={styles.cardDesc}>
                {modeData.mobileDesc || 'Interface planejada para smartphones e telas de toque verticais.'}
              </p>

              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheckMobile}>✓</span>
                  <span>{modeData.featureMobileTouch || 'Interface adaptada para telas verticais'}</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheckMobile}>✓</span>
                  <span>{modeData.featureMobileUnderDev || 'Em fase ativa de implementação'}</span>
                </div>
              </div>
            </div>

            <button type="button" className={`${styles.cardButton} ${styles.mobileBtn}`}>
              <span>{modeData.mobileBtn || 'Acessar Versão Mobile ➔'}</span>
            </button>
          </div>
        </div>

        {/* Rodapé com lembrete de cache e alternância */}
        <div className={styles.footerTip}>
          <span>{modeData.rememberChoiceTip || '💡 Sua escolha fica salva no navegador. Você pode alternar a qualquer momento.'}</span>
        </div>
      </div>
    </div>
  )
}
