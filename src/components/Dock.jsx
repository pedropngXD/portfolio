import { useState, useRef } from 'react'
import { SECTIONS } from '../data/sections'
import { CONTACT_CHANNELS } from '../data/contact'
import SystemIcon from './SystemIcon'
import styles from './Dock.module.css'

/**
 * Move um elemento de uma posição para outra dentro de um array
 */
function arrayMove(array, fromIndex, toIndex) {
  const newArray = [...array]
  const [removed] = newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, removed)
  return newArray
}

export default function Dock({
  windows = {},
  dockAppIds = [],
  dockRightIds = ['github', 'linkedin', 'email', 'theme'],
  isHidden = false,
  isRevealed = false,
  onMouseEnter,
  onMouseLeave,
  onSelectSection,
  onContextMenu,
  onNotify,
  theme,
  onToggleTheme,
  onReorderLeft,
  onReorderRight,
  t
}) {
  const isEffectivelyHidden = isHidden && !isRevealed
  const [isEmailCopied, setIsEmailCopied] = useState(false)
  const [dragState, setDragState] = useState(null)
  const isDraggingRef = useRef(false)
  const blockClickRef = useRef(false)
  const sys = t?.system || {}

  // Apps abertos que não estão na lista de fixados no Dock
  const openUnpinnedIds = Object.keys(windows).filter(
    (id) => windows[id]?.isOpen && !dockAppIds.includes(id)
  )

  // Combina os fixados com os abertos não fixados
  const effectiveAppIds = [...dockAppIds, ...openUnpinnedIds]

  // Seções da esquerda ordenadas de acordo com effectiveAppIds
  const orderedSections = effectiveAppIds
    .map((id) => SECTIONS.find((sec) => sec.id === id))
    .filter(Boolean)

  const githubChannel = CONTACT_CHANNELS.find((c) => c.id === 'github')
  const linkedinChannel = CONTACT_CHANNELS.find((c) => c.id === 'linkedin')
  const emailChannel = CONTACT_CHANNELS.find((c) => c.id === 'email')

  const handleCopyEmail = () => {
    if (!emailChannel) return
    navigator.clipboard.writeText(emailChannel.value).then(() => {
      setIsEmailCopied(true)
      onNotify && onNotify({
        title: sys.emailToastTitle || 'Área de Transferência',
        message: sys.emailToastMessage || 'E-mail copiado para a área de transferência!',
        icon: '📋'
      })
      setTimeout(() => setIsEmailCopied(false), 2400)
    })
  }

  // Previne clique acidental ao soltar um arraste
  const handleItemClick = (e, callback) => {
    if (blockClickRef.current) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    callback()
  }

  // Inicia o arraste isolado por seção
  const handlePointerDown = (e, index, sectionType, itemsCount) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return

    const startX = e.clientX
    const startY = e.clientY
    const rect = e.currentTarget.getBoundingClientRect()
    // Pitch do item (largura + gap de 8px)
    const itemPitch = rect.width + 8

    isDraggingRef.current = false

    const onPointerMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      if (!isDraggingRef.current && (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4)) {
        isDraggingRef.current = true
        blockClickRef.current = true
      }

      if (isDraggingRef.current) {
        setDragState({
          section: sectionType,
          dragIndex: index,
          deltaX,
          itemPitch,
          itemsCount
        })
      }
    }

    const onPointerUp = (upEvent) => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)

      if (isDraggingRef.current) {
        const deltaX = upEvent.clientX - startX
        const minDeltaX = -index * itemPitch
        const maxDeltaX = (itemsCount - 1 - index) * itemPitch
        const clampedDeltaX = Math.max(minDeltaX, Math.min(maxDeltaX, deltaX))
        const slotShift = Math.round(clampedDeltaX / itemPitch)
        const targetIndex = Math.max(0, Math.min(itemsCount - 1, index + slotShift))

        if (targetIndex !== index) {
          if (sectionType === 'left') {
            const reordered = arrayMove(effectiveAppIds, index, targetIndex)
            const nextPinned = reordered.filter((id) => dockAppIds.includes(id))
            onReorderLeft && onReorderLeft(nextPinned)
          } else if (sectionType === 'right') {
            const next = arrayMove(dockRightIds, index, targetIndex)
            onReorderRight && onReorderRight(next)
          }
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

  // Calcula o deslocamento visual de cada item durante o arraste
  const getItemStyle = (i, sectionType) => {
    if (!dragState || dragState.section !== sectionType) {
      return {
        transform: 'translateX(0px)',
        transition: 'transform 0.22s cubic-bezier(0.2, 0.9, 0.4, 1)',
        zIndex: 1
      }
    }

    const { dragIndex, deltaX, itemPitch, itemsCount } = dragState
    const minDeltaX = -dragIndex * itemPitch
    const maxDeltaX = (itemsCount - 1 - dragIndex) * itemPitch
    const clampedDeltaX = Math.max(minDeltaX, Math.min(maxDeltaX, deltaX))
    const slotShift = Math.round(clampedDeltaX / itemPitch)
    const targetIndex = Math.max(0, Math.min(itemsCount - 1, dragIndex + slotShift))

    if (i === dragIndex) {
      return {
        transform: `translateX(${clampedDeltaX}px) scale(1.15)`,
        zIndex: 50,
        transition: 'none',
        pointerEvents: 'none'
      }
    }

    let shift = 0
    if (dragIndex < targetIndex) {
      if (i > dragIndex && i <= targetIndex) {
        shift = -itemPitch
      }
    } else if (dragIndex > targetIndex) {
      if (i >= targetIndex && i < dragIndex) {
        shift = itemPitch
      }
    }

    return {
      transform: `translateX(${shift}px)`,
      transition: 'transform 0.22s cubic-bezier(0.2, 0.9, 0.4, 1)',
      zIndex: 1
    }
  }

  // Renderiza cada um dos itens da seção direita
  const renderRightItem = (actionId, index) => {
    const itemStyle = getItemStyle(index, 'right')
    const isThisItemDragging = dragState?.section === 'right' && dragState?.dragIndex === index

    switch (actionId) {
      case 'github':
        if (!githubChannel) return null
        return (
          <div
            key="github"
            className={`${styles.dockItemWrapper} ${isThisItemDragging ? styles.dockItemWrapperActiveDrag : ''}`}
            style={itemStyle}
            onPointerDown={(e) => handlePointerDown(e, index, 'right', dockRightIds.length)}
          >
            <span className={styles.tooltip}>GitHub</span>
            <button
              type="button"
              className={styles.dockButton}
              onClick={(e) =>
                handleItemClick(e, () =>
                  window.open(githubChannel.href, '_blank', 'noopener,noreferrer')
                )
              }
              aria-label="Acessar perfil do GitHub de Pedro"
            >
              <SystemIcon
                type="github"
                size={22}
                color="var(--window-text-primary)"
              />
            </button>
          </div>
        )

      case 'linkedin':
        if (!linkedinChannel) return null
        return (
          <div
            key="linkedin"
            className={`${styles.dockItemWrapper} ${isThisItemDragging ? styles.dockItemWrapperActiveDrag : ''}`}
            style={itemStyle}
            onPointerDown={(e) => handlePointerDown(e, index, 'right', dockRightIds.length)}
          >
            <span className={styles.tooltip}>LinkedIn</span>
            <button
              type="button"
              className={styles.dockButton}
              onClick={(e) =>
                handleItemClick(e, () =>
                  window.open(linkedinChannel.href, '_blank', 'noopener,noreferrer')
                )
              }
              aria-label="Acessar perfil do LinkedIn de Pedro"
            >
              <SystemIcon
                type="linkedin"
                size={20}
                color="var(--window-text-primary)"
              />
            </button>
          </div>
        )

      case 'email':
        if (!emailChannel) return null
        return (
          <div
            key="email"
            className={`${styles.dockItemWrapper} ${isThisItemDragging ? styles.dockItemWrapperActiveDrag : ''}`}
            style={itemStyle}
            onPointerDown={(e) => handlePointerDown(e, index, 'right', dockRightIds.length)}
          >
            <span className={styles.tooltip}>
              {isEmailCopied ? (sys.copySuccess || '✓ Copiado!') : (sys.emailLabel || 'Email')}
            </span>
            <a
              href={emailChannel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.dockButton}
              onClick={(e) => {
                if (blockClickRef.current) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onContextMenu && onContextMenu(e, 'email', 'dock')
              }}
              aria-label={`Enviar e-mail para ${emailChannel.value}`}
            >
              <SystemIcon
                type="mail"
                size={21}
                color={isEmailCopied ? 'var(--accent-stack)' : 'var(--window-text-primary)'}
              />
            </a>
          </div>
        )

      case 'theme':
        return (
          <div
            key="theme"
            className={`${styles.dockItemWrapper} ${isThisItemDragging ? styles.dockItemWrapperActiveDrag : ''}`}
            style={itemStyle}
            onPointerDown={(e) => handlePointerDown(e, index, 'right', dockRightIds.length)}
          >
            <span className={styles.tooltip}>
              {theme === 'dark' ? (sys.switchThemeLight || 'Modo Claro') : (sys.switchThemeDark || 'Modo Escuro')}
            </span>
            <button
              type="button"
              className={styles.dockButton}
              onClick={(e) => handleItemClick(e, onToggleTheme)}
              aria-label={theme === 'dark' ? (sys.switchThemeLight || 'Modo Claro') : (sys.switchThemeDark || 'Modo Escuro')}
            >
              <SystemIcon
                type={theme === 'dark' ? 'sun' : 'moon'}
                size={20}
                color="var(--window-text-primary)"
              />
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <footer
      className={`${styles.dockContainer} ${isEffectivelyHidden ? styles.dockHidden : ''} ${dragState ? styles.dockContainerDragging : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Barra de tarefas"
    >
      {/* SEÇÃO ESQUERDA: Atalhos para as janelas do sistema operacional (reordenáveis apenas entre si) */}
      {orderedSections.map((section, index) => {
        const win = windows[section.id]
        const isOpen = win?.isOpen
        const isMinimized = win?.isMinimized
        const itemStyle = getItemStyle(index, 'left')
        const isThisItemDragging = dragState?.section === 'left' && dragState?.dragIndex === index
        const sectionTitle = t?.sections?.[section.id]?.title || section.title

        return (
          <div
            key={section.id}
            className={`${styles.dockItemWrapper} ${isThisItemDragging ? styles.dockItemWrapperActiveDrag : ''}`}
            style={itemStyle}
            onPointerDown={(e) => handlePointerDown(e, index, 'left', orderedSections.length)}
          >
            <span className={styles.tooltip}>
              {sectionTitle} {isMinimized ? `(${sys.minimized || 'Minimizada'})` : isOpen ? `(${sys.open || 'Aberta'})` : ''}
            </span>

            <button
              type="button"
              data-dock-id={section.id}
              className={styles.dockButton}
              onClick={(e) =>
                handleItemClick(e, () => onSelectSection && onSelectSection(section.id, { fromDock: true }))
              }
              onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onContextMenu && onContextMenu(e, section.id, 'dock')
              }}
              aria-label={`Abrir ${section.title}`}
              aria-pressed={isOpen && !isMinimized}
            >
              <div
                className={styles.dockButtonGlow}
                style={{ backgroundColor: section.accentColor }}
              />
              <SystemIcon
                type={section.iconType}
                size={24}
                color={section.accentColor}
              />
            </button>

            {/* Pontinho indicador de aplicativo em execução no SO */}
            {isOpen && <span className={styles.activeDot} />}
          </div>
        )
      })}

      {/* DIVISOR VERTICAL: Barreira rígida entre as duas seções */}
      <div className={styles.separator} aria-hidden="true" />

      {/* SEÇÃO DIREITA: Atalhos e utilitários (reordenáveis apenas entre si) */}
      {dockRightIds.map((actionId, index) => renderRightItem(actionId, index))}
    </footer>
  )
}
