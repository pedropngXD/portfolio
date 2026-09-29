import { useState, useRef } from 'react'
import SystemIcon from '../SystemIcon'
import { SECTIONS } from '../../data/sections'
import { ABOUT_DATA } from '../../data/about'
import { CONTACT_CHANNELS } from '../../data/contact'
import { playToggle } from '../../utils/soundEffects'
import styles from './IPhone.module.css'

function arrayMove(array, fromIndex, toIndex) {
  const newArray = [...array]
  const [removed] = newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, removed)
  return newArray
}

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
  theme = 'dark',
  onToggleTheme,
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
      iconType: 'github',
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
      iconType: 'linkedin',
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
      iconType: 'mail',
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
      iconType: 'translate',
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

  // Ordem reordenável dos aplicativos da tela de início (com persistência no localStorage)
  const [appOrder, setAppOrder] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pedro-os-mobile-app-order')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const ordered = parsed
              .map((id) => SECTIONS.find((s) => s.id === id))
              .filter(Boolean)
            const missing = SECTIONS.filter((s) => !parsed.includes(s.id))
            return [...ordered, ...missing]
          }
        }
      } catch (err) {}
    }
    return SECTIONS
  })

  const [dragState, setDragState] = useState(null)
  const isDraggingRef = useRef(false)
  const blockClickRef = useRef(false)

  // Manipulador de arraste estilo iPhone (funciona com Touch e Mouse)
  const handlePointerDown = (e, index) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return

    const startX = e.clientX
    const startY = e.clientY
    isDraggingRef.current = false
    blockClickRef.current = false

    const onPointerMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      if (!isDraggingRef.current && (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6)) {
        isDraggingRef.current = true
        blockClickRef.current = true
      }

      if (isDraggingRef.current) {
        // Encontra o elemento de app sob o cursor/dedo
        const el = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY)
        const targetAppEl = el?.closest('[data-app-index]')
        let currentOver = index
        if (targetAppEl && targetAppEl.dataset.appIndex !== undefined) {
          const parsedIdx = parseInt(targetAppEl.dataset.appIndex, 10)
          if (!isNaN(parsedIdx)) {
            currentOver = parsedIdx
          }
        }

        setDragState({
          dragIndex: index,
          deltaX,
          deltaY,
          overIndex: currentOver
        })
      }
    }

    const onPointerUp = (upEvent) => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)

      if (isDraggingRef.current) {
        const el = document.elementFromPoint(upEvent.clientX, upEvent.clientY)
        const targetAppEl = el?.closest('[data-app-index]')
        let targetIndex = index
        if (targetAppEl && targetAppEl.dataset.appIndex !== undefined) {
          const parsedIdx = parseInt(targetAppEl.dataset.appIndex, 10)
          if (!isNaN(parsedIdx)) {
            targetIndex = parsedIdx
          }
        }

        if (targetIndex !== index) {
          playToggle()
          setAppOrder((prev) => {
            const next = arrayMove(prev, index, targetIndex)
            try {
              localStorage.setItem(
                'pedro-os-mobile-app-order',
                JSON.stringify(next.map((s) => s.id))
              )
            } catch (err) {}
            return next
          })
          onNotify && onNotify({
            title: isEn ? 'Home Screen' : 'Tela de Início',
            message: isEn ? 'App position updated' : 'Posição do aplicativo atualizada',
            icon: '📱'
          })
        }

        setDragState(null)
        setTimeout(() => {
          blockClickRef.current = false
          isDraggingRef.current = false
        }, 80)
      } else {
        setDragState(null)
        blockClickRef.current = false
        isDraggingRef.current = false
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  return (
    <div className={styles.homeScreen}>
      {/* ========================================================
          CABEÇALHO DA TELA DE INÍCIO COM BOTÃO DE MODO CLARO / ESCURO
          ======================================================== */}
      <header className={styles.homeHeader}>
        <span className={styles.homeBrand}>pedroOS</span>
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className={styles.themeTogglePill}
            aria-label={theme === 'dark' ? (isEn ? 'Switch to Light Mode' : 'Modo Claro') : (isEn ? 'Switch to Dark Mode' : 'Modo Escuro')}
          >
            <SystemIcon
              type={theme === 'dark' ? 'sun' : 'moon'}
              size={14}
              color={theme === 'dark' ? '#fbbf24' : '#6366f1'}
            />
            <span>
              {theme === 'dark' ? (isEn ? 'Light Mode' : 'Modo Claro') : (isEn ? 'Dark Mode' : 'Modo Escuro')}
            </span>
          </button>
        )}
      </header>

      {/* ========================================================
          WIDGET SUPERIOR: SOBRE MIM (CARD ÚNICO EXPANDIDO ESTILO iOS)
          ======================================================== */}
      <button
        type="button"
        onClick={() => onOpenApp('about')}
        className={styles.profileWidgetCard}
        title={isEn ? 'Tap to view full profile' : 'Toque para ver perfil completo'}
      >
        {/* Linha Superior: Foto de perfil, Nome, Cargo e Badge Disponível */}
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className={styles.profileWidgetAvatar}>
              <img
                src={ABOUT_DATA.avatarUrl || '/profile.jpg'}
                alt={ABOUT_DATA.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-[16px] text-white tracking-tight truncate">
                  {ABOUT_DATA.name}
                </h2>
                <span className="text-[10px] text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Dev Júnior
                </span>
              </div>
              <p className="text-[12.5px] text-neutral-300 truncate mt-1 font-medium">
                {isEn ? 'Software Engineering • Unisinos' : 'Engenharia de Software • Unisinos'}
              </p>
            </div>
          </div>

          <div className={styles.profileWidgetBadge}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="truncate">{isEn ? 'Available' : 'Disponível'}</span>
          </div>
        </div>

        {/* Linha Divisória Sutil */}
        <div className="w-full h-[1px] bg-white/10 my-3" />

        {/* Linha Inferior: Stack Técnica & Call-to-action */}
        <div className="flex items-center justify-between w-full min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={styles.profileTechPill}>PHP</span>
            <span className={styles.profileTechPill}>React</span>
            <span className={styles.profileTechPill}>SQL</span>
            <span className={styles.profileTechPill}>Node</span>
            <span className={styles.profileTechPill}>Vite</span>
          </div>

          <div className="flex items-center gap-1 text-[12px] text-purple-400 font-semibold flex-shrink-0 ml-2">
            <span>{isEn ? 'View bio' : 'Ver bio'}</span>
            <span className="text-xs">↗</span>
          </div>
        </div>
      </button>

      {/* ========================================================
          GRADE DE APPS ESTILO iOS (2 FILEIRAS DE 4 APPS)
          ======================================================== */}
      <section className={styles.appsGridContainer}>
        <div className={styles.appsGrid}>
          {appOrder.map((section, index) => {
            const title = t?.sections?.[section.id]?.shortLabel || section.shortLabel || section.title
            const gradient = APP_GRADIENTS[section.id] || 'linear-gradient(180deg, #007aff 0%, #0051ba 100%)'
            const isDraggingThis = dragState?.dragIndex === index
            const isOverThis = dragState?.overIndex === index && !isDraggingThis
            const isAnyDragging = !!dragState

            const itemStyle = isDraggingThis
              ? {
                  transform: `translate3d(${dragState.deltaX}px, ${dragState.deltaY}px, 0) scale(1.15)`,
                  zIndex: 60,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.55)',
                  cursor: 'grabbing'
                }
              : isOverThis
              ? {
                  transform: 'scale(1.1)',
                  zIndex: 10,
                  transition: 'transform 0.2s cubic-bezier(0.2, 0.9, 0.4, 1)'
                }
              : isAnyDragging
              ? {
                  animationDelay: `${(index % 4) * 0.05}s`
                }
              : {}

            return (
              <button
                key={section.id}
                type="button"
                data-app-index={index}
                data-app-id={section.id}
                onPointerDown={(e) => handlePointerDown(e, index)}
                onClick={(e) => {
                  if (blockClickRef.current) {
                    e.preventDefault()
                    e.stopPropagation()
                    return
                  }
                  onOpenApp(section.id)
                }}
                className={`${styles.appItem} ${isDraggingThis ? styles.appItemDragging : ''} ${isOverThis ? styles.appItemOver : ''} ${isAnyDragging && !isDraggingThis ? styles.appItemJiggle : ''}`}
                style={itemStyle}
              >
                {/* Ícone Squircle iOS com Gradiente e Sombra */}
                <div
                  className={styles.appIconWrapper}
                  style={{
                    background: gradient
                  }}
                >
                  <SystemIcon type={section.iconType} size={28} color="#ffffff" />

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
          DOCK INFERIOR ESTILO iOS (FROSTED GLASS FLUTUANTE)
          Menor, mais transparente e com 4 aplicativos fixados
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
            <SystemIcon type={item.iconType} size={28} color="#ffffff" />

            {/* Badge de notificação 1 no e-mail (idêntico ao app de Mensagens no iPhone do Pedro) */}
            {item.id === 'email' && (
              <span className={styles.appBadgeNumber}>1</span>
            )}
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
