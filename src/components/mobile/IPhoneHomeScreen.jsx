import IPhoneAppIcon from './IPhoneAppIcon'
import { SECTIONS } from '../../data/sections'
import { ABOUT_DATA } from '../../data/about'
import { CONTACT_CHANNELS } from '../../data/contact'
import styles from './IPhone.module.css'

const APP_GRADIENTS = {
  readme: 'linear-gradient(180deg, #ffd60a 0%, #f59e0b 100%)',
  resume: 'linear-gradient(180deg, #ff453a 0%, #d70015 100%)',
  about: 'linear-gradient(180deg, #6366f1 0%, #4338ca 100%)',
  stack: 'linear-gradient(180deg, #30d158 0%, #15803d 100%)',
  experience: 'linear-gradient(180deg, #0a84ff 0%, #0056b3 100%)',
  contact: 'linear-gradient(180deg, #ff9f0a 0%, #c97500 100%)',
  projects: 'linear-gradient(180deg, #007aff 0%, #0051ba 100%)',
  'status-check': 'linear-gradient(180deg, #1c1c1e 0%, #09090b 100%)'
}

export default function IPhoneHomeScreen({
  onOpenApp,
  onOpenAppSwitcher,
  lang = 'pt',
  onToggleLang,
  onNotify,
  t
}) {
  const isEn = lang === 'en'

  // Canais de contato para as ações da barra de tarefas inferior
  const githubChannel = CONTACT_CHANNELS.find((c) => c.id === 'github')
  const linkedinChannel = CONTACT_CHANNELS.find((c) => c.id === 'linkedin')
  const emailChannel = CONTACT_CHANNELS.find((c) => c.id === 'email')

  // 4 aplicativos fixados na barra de tarefas inferior estilo iOS:
  // GitHub, LinkedIn, E-mail e o novo App de Configurações / Tradução
  const dockItems = [
    {
      id: 'github',
      title: 'GitHub',
      gradient: 'linear-gradient(180deg, #24292f 0%, #0d1117 100%)',
      onClick: () => {
        if (githubChannel) {
          window.open(githubChannel.href, '_blank', 'noopener,noreferrer')
        }
      }
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      gradient: 'linear-gradient(180deg, #0a66c2 0%, #004182 100%)',
      onClick: () => {
        if (linkedinChannel) {
          window.open(linkedinChannel.href, '_blank', 'noopener,noreferrer')
        }
      }
    },
    {
      id: 'email',
      title: isEn ? 'Email (pgpmoser@gmail.com)' : 'E-mail (pgpmoser@gmail.com)',
      gradient: 'linear-gradient(180deg, #0a84ff 0%, #0056b3 100%)',
      onClick: () => {
        if (emailChannel) {
          navigator.clipboard.writeText(emailChannel.value).then(() => {
            onNotify && onNotify({
              title: t?.system?.emailToastTitle || (isEn ? 'Clipboard' : 'Área de Transferência'),
              message: t?.system?.emailToastMessage || (isEn ? 'Email copied to clipboard!' : 'E-mail copiado para a área de transferência!'),
              icon: '📋'
            })
          })
          window.location.href = emailChannel.href
        }
      }
    },
    {
      id: 'settings-translate',
      title: isEn ? 'Mudar idioma para Português (PT)' : 'Translate all to English (EN)',
      gradient: 'linear-gradient(180deg, #007aff 0%, #4338ca 100%)',
      onClick: () => {
        onToggleLang && onToggleLang()
        onNotify && onNotify({
          title: isEn ? 'Idioma' : 'Language',
          message: isEn ? 'Idioma alterado para Português (PT)' : 'Language switched to English (EN)',
          icon: '🌐'
        })
      }
    }
  ]

  // Lista ordenada dos 8 aplicativos do portfólio na tela de início
  const homeSections = SECTIONS

  return (
    <div className={styles.homeScreen}>
      {/* ========================================================
          WIDGETS SUPERIORES ESTILO iOS (2 CARDS LADO A LADO)
          ======================================================== */}
      <section className={styles.widgetsArea}>
        {/* Widget 1: Card de Perfil & Status */}
        <button
          type="button"
          onClick={() => onOpenApp('about')}
          className={styles.widgetCard}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={styles.widgetAvatar}>
              <img
                src={ABOUT_DATA.avatarUrl || '/profile.jpg'}
                alt={ABOUT_DATA.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className={styles.widgetName}>{ABOUT_DATA.name}</h2>
              <p className={styles.widgetRole}>
                {isEn ? 'Junior Developer' : 'Dev Júnior'}
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <div className={styles.widgetBadge}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="truncate">{isEn ? 'Available' : 'Disponível'}</span>
            </div>
            <p className={styles.widgetSubInfo}>
              {isEn ? 'ADS @ Unisinos • 7th sem' : 'ADS @ Unisinos • 7º sem'}
            </p>
          </div>
        </button>

        {/* Widget 2: Card de Tecnologias / Stack */}
        <button
          type="button"
          onClick={() => onOpenApp('stack')}
          className={styles.widgetCard}
        >
          <div className="flex items-center justify-between min-w-0">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider truncate">
              {isEn ? 'Tech Stack' : 'Stack'}
            </span>
            <span className="text-xs flex-shrink-0">⚡</span>
          </div>

          <div className={styles.stackPillGrid}>
            <span className={styles.stackMiniPill}>PHP</span>
            <span className={styles.stackMiniPill}>React</span>
            <span className={styles.stackMiniPill}>SQL</span>
            <span className={styles.stackMiniPill}>Node</span>
          </div>

          <div className="flex items-center justify-between text-[9px] text-neutral-400 font-medium min-w-0">
            <span className="truncate">{isEn ? 'Tap to view' : 'Toque p/ ver'}</span>
            <span className="flex-shrink-0">↗</span>
          </div>
        </button>
      </section>

      {/* ========================================================
          GRADE DE APPS ESTILO iOS (2 FILEIRAS DE 4 APPS)
          ======================================================== */}
      <section className={styles.appsGridContainer}>
        <div className={styles.appsGrid}>
          {homeSections.map((section) => {
            const title = t?.sections?.[section.id]?.shortLabel || section.shortLabel || section.title
            const gradient = APP_GRADIENTS[section.id] || 'linear-gradient(180deg, #007aff 0%, #0051ba 100%)'

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onOpenApp(section.id)}
                className={styles.appItem}
              >
                {/* Ícone Squircle iOS com Gradiente e Sombra */}
                <div
                  className={styles.appIconWrapper}
                  style={{
                    background: gradient
                  }}
                >
                  <IPhoneAppIcon appId={section.id} size={32} />

                  {/* Badges de notificação iOS */}
                  {section.id === 'readme' && (
                    <span className={styles.appBadgeNumber}>1</span>
                  )}
                  {section.id === 'resume' && (
                    <span className={styles.appBadgePdf}>PDF</span>
                  )}
                </div>

                {/* Rótulo do App */}
                <span className={styles.appLabel}>{title}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ========================================================
          INDICADOR DE PÁGINAS (PONTINHOS iOS)
          ======================================================== */}
      <div className={styles.pageDots}>
        <span className={styles.dotActive} />
        <span className={styles.dotInactive} />
      </div>

      {/* ========================================================
          DOCK INFERIOR ESTILO iOS (FROSTED GLASS FLUTUANTE)
          4 Apps: GitHub, LinkedIn, Email e Tradutor/Configurações
          ======================================================== */}
      <nav aria-label="iOS Dock" className={styles.dockContainer}>
        {dockItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            title={item.title}
            aria-label={item.title}
            className={styles.dockIconWrapper}
            style={{
              background: item.gradient
            }}
          >
            <IPhoneAppIcon appId={item.id} size={30} />
          </button>
        ))}
      </nav>

      {/* ========================================================
          HOME INDICATOR BAR (BARRA INFERIOR DESLIZÁVEL iOS)
          ======================================================== */}
      <button
        type="button"
        onClick={onOpenAppSwitcher}
        title={isEn ? 'Multitask / App Switcher' : 'Ver Abas / Multitarefa'}
        className={styles.homeIndicatorBar}
      />
    </div>
  )
}
