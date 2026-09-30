import { APP_GRADIENTS } from '../../data/appGradients'
import { arrayMove } from '../../utils/arrayMove'
import { useState, useRef } from 'react'
import SystemIcon from '../SystemIcon'

import { SECTIONS } from '../../data/sections'
import { ABOUT_DATA } from '../../data/about'
import { CONTACT_CHANNELS } from '../../data/contact'
import { playToggle } from '../../utils/soundEffects'
import styles from './IPhone.module.css'
import HomeIndicator from './HomeIndicator'

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

  const defaultDockIds = ['github', 'linkedin', 'email', 'settings-translate']
  const [dockOrderIds, setDockOrderIds] = useState(() => {
    try {
      const saved = localStorage.getItem('pedro-os-mobile-dock-order')
      if (saved) {
        const parsed = JSON.parse(saved)
        const validIds = parsed.filter(id => defaultDockIds.includes(id) || id === 'settings-translate')
        const missingIds = defaultDockIds.filter(id => !validIds.includes(id))
        return [...validIds, ...missingIds].slice(0, 4)
      }
    } catch {}
    return defaultDockIds
  })

  const githubChannel = CONTACT_CHANNELS.find((c) => c.id === 'github')
  const linkedinChannel = CONTACT_CHANNELS.find((c) => c.id === 'linkedin')
  const emailChannel = CONTACT_CHANNELS.find((c) => c.id === 'email')

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
      } catch {}
    }
    return SECTIONS
  })

  const [dockDragState, setDockDragState] = useState(null)

  const handleDockPointerDown = (e, index) => {
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
        const el = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY)
        const targetAppEl = el?.closest('[data-dock-index]')
        let currentOver = index
        if (targetAppEl && targetAppEl.dataset.dockIndex !== undefined) {
          const parsedIdx = parseInt(targetAppEl.dataset.dockIndex, 10)
          if (!isNaN(parsedIdx)) {
            currentOver = parsedIdx
          }
        }

        setDockDragState({
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
        const targetAppEl = el?.closest('[data-dock-index]')
        let targetIndex = index
        if (targetAppEl && targetAppEl.dataset.dockIndex !== undefined) {
          const parsedIdx = parseInt(targetAppEl.dataset.dockIndex, 10)
          if (!isNaN(parsedIdx)) {
            targetIndex = parsedIdx
          }
        }

        if (targetIndex !== index) {
          playToggle()
          setDockOrderIds((prev) => {
            const next = arrayMove(prev, index, targetIndex)
            try {
              localStorage.setItem(
                'pedro-os-mobile-dock-order',
                JSON.stringify(next)
              )
            } catch {}
            return next
          })
        }

        setDockDragState(null)
        setTimeout(() => {
          blockClickRef.current = false
          isDraggingRef.current = false
        }, 80)
      } else {
        setDockDragState(null)
        blockClickRef.current = false
        isDraggingRef.current = false
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  const [dragState, setDragState] = useState(null)
  const isDraggingRef = useRef(false)
  const blockClickRef = useRef(false)

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
            } catch {}
            return next
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
      <header className={styles.homeHeader}>
        <span className={styles.homeBrand}>pedroOs</span>
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
      <button
        type="button"
        onClick={() => onOpenApp('about')}
        className={styles.profileWidgetCard}
        title={isEn ? 'Tap to view full profile' : 'Toque para ver perfil completo'}
      >
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
              </div>
              <p className="text-[12.5px] text-neutral-300 truncate mt-1 font-medium">
                {isEn ? 'ADS • Unisinos' : 'ADS • Unisinos'}
              </p>
            </div>
          </div>
          <div className={styles.profileWidgetBadge}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="truncate">{isEn ? 'Available' : 'Disponível'}</span>
          </div>
        </div>
        <div className="w-full h-[1px] bg-white/10 my-3" />
        <div className="flex items-center justify-between w-full min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
                className="text-[11px] text-purple-300 bg-purple-500/20 border border-purple-500/30 rounded-full font-semibold shadow-sm"
                style={{ padding: '0.28rem 0.65rem' }}
              >
                {isEn ? 'Junior Developer' : 'Desenvolvedor Júnior'}
              </span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-purple-400 font-semibold flex-shrink-0 ml-2">
            <span>{isEn ? 'View bio' : 'Ver bio'}</span>
            <span className="text-xs">↗</span>
          </div>
        </div>
      </button>
      <section className={styles.appsGridContainer}>
        <div className={styles.appsGrid}>
          {appOrder.map((section, index) => {
            const title = t?.sections?.[section.id]?.shortLabel || section.shortLabel || section.title
            const gradient = APP_GRADIENTS[section.id] || 'linear-gradient(180deg, #007aff 0%, #0051ba 100%)'
            const isDraggingThis = dragState?.dragIndex === index
            const isOverThis = dragState?.overIndex === index && !isDraggingThis
            const isAnyDragging = !!dragState

            let itemStyle = {}
            if (isDraggingThis) {
              itemStyle = {
                transform: `translate3d(${dragState.deltaX}px, ${dragState.deltaY}px, 0) scale(1.15)`,
                zIndex: 60,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.55)',
                cursor: 'grabbing'
              }
            } else if (dragState) {
              const { dragIndex, overIndex } = dragState
              let virtualIndex = index
              if (dragIndex < overIndex && index > dragIndex && index <= overIndex) virtualIndex = index - 1
              else if (dragIndex > overIndex && index >= overIndex && index < dragIndex) virtualIndex = index + 1

              if (virtualIndex !== index) {
                const cellW = typeof window !== 'undefined' && window.innerWidth < 400 ? 76 : 88
                const colDiff = (virtualIndex % 4) - (index % 4)
                const rowDiff = Math.floor(virtualIndex / 4) - Math.floor(index / 4)
                itemStyle = {
                  transform: `translate3d(${colDiff * cellW}px, ${rowDiff * 102}px, 0)`,
                  transition: 'transform 0.25s cubic-bezier(0.2, 0.9, 0.4, 1)',
                  zIndex: 10
                }
              } else if (isAnyDragging) {
                itemStyle = { animationDelay: `${(index % 4) * 0.05}s` }
              }
            }

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
                <div
                  className={styles.appIconWrapper}
                  style={{
                    background: gradient
                  }}
                >
                  <SystemIcon type={section.iconType} size={32} color="#ffffff" />
                </div>
                <span className={styles.appLabel}>{title}</span>
              </button>
            )
          })}
        </div>
      </section>
      <nav aria-label="iOS Dock" className={styles.dockContainer}>
        {dockOrderIds.map((itemId, index) => {
          const item = dockItems.find((d) => d.id === itemId)
          if (!item) return null

          const isDraggingThis = dockDragState?.dragIndex === index
          const isOverThis = dockDragState?.overIndex === index && !isDraggingThis
          const isAnyDragging = !!dockDragState

          let itemStyle = { background: item.gradient }
          if (isDraggingThis) {
            itemStyle = {
              transform: `translate3d(${dockDragState.deltaX}px, ${dockDragState.deltaY}px, 0) scale(1.15)`,
              zIndex: 60,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.55)',
              cursor: 'grabbing',
              background: item.gradient
            }
          } else if (dockDragState) {
            const { dragIndex, overIndex } = dockDragState
            let virtualIndex = index
            if (dragIndex < overIndex && index > dragIndex && index <= overIndex) virtualIndex = index - 1
            else if (dragIndex > overIndex && index >= overIndex && index < dragIndex) virtualIndex = index + 1

            if (virtualIndex !== index) {
              const diff = virtualIndex - index
              const cellW = typeof window !== 'undefined' && window.innerWidth < 400 ? 68 : 74
              itemStyle = {
                transform: `translate3d(${diff * cellW}px, 0, 0)`,
                transition: 'transform 0.25s cubic-bezier(0.2, 0.9, 0.4, 1)',
                zIndex: 10,
                background: item.gradient
              }
            } else if (isAnyDragging) {
              itemStyle.animationDelay = `${(index % 4) * 0.05}s`
            }
          }

          return (
            <button
              key={item.id}
              type="button"
              data-dock-index={index}
              onPointerDown={(e) => handleDockPointerDown(e, index)}
              onClick={(e) => {
                if (blockClickRef.current) {
                  e.preventDefault()
                  e.stopPropagation()
                  return
                }
                item.onClick()
              }}
              title={item.title}
              aria-label={item.title}
              className={`${styles.dockIconWrapper} ${isDraggingThis ? styles.appItemDragging : ''} ${isOverThis ? styles.appItemOver : ''} ${isAnyDragging && !isDraggingThis ? styles.appItemJiggle : ''}`}
              style={itemStyle}
            >
              <SystemIcon type={item.iconType} size={28} color="#ffffff" />
            </button>
          )
        })}
      </nav>
      <HomeIndicator
        onClick={onOpenAppSwitcher}
        title={isEn ? 'Multitask / App Switcher' : 'Ver Abas / Multitarefa'}
      />
    </div>
  )
}
