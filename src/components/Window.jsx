import { useRef, useState, useEffect } from 'react'
import SystemIcon from './SystemIcon'
import styles from './Window.module.css'

const MIN_WIDTH = 340
const MIN_HEIGHT = 240

export default function Window({
  id,
  title,
  tag,
  iconType,
  accentColor,
  isMaximized,
  animState = 'idle',
  zIndex,
  position,
  size,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  t,
  children
}) {
  const [isInteracting, setIsInteracting] = useState(false)
  const isDraggingRef = useRef(false)
  const isResizingRef = useRef(false)

  // ========================================================
  // ARRASTAR JANELA (DRAG)
  // ========================================================
  const handleHeaderMouseDown = (e) => {
    if (e.target.closest(`.${styles.controlButton}`)) return
    if (isMaximized) return

    onFocus && onFocus(id)
    isDraggingRef.current = true
    setIsInteracting(true)

    const startX = e.clientX
    const startY = e.clientY
    const startPos = { ...position }

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      // Limite: não subir além do topo do container (0px)
      const newY = Math.max(0, startPos.y + deltaY)
      const newX = startPos.x + deltaX

      onMove && onMove(id, { x: newX, y: newY })
    }

    const onMouseUp = () => {
      isDraggingRef.current = false
      setIsInteracting(false)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // ========================================================
  // REDIMENSIONAR JANELA (RESIZE EM 8 DIREÇÕES)
  // ========================================================
  const handleResizeStart = (e, direction) => {
    e.preventDefault()
    e.stopPropagation()
    if (isMaximized) return

    onFocus && onFocus(id)
    isResizingRef.current = true
    setIsInteracting(true)

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = size.width
    const startHeight = size.height
    const startPosX = position.x
    const startPosY = position.y

    const onMouseMove = (moveEvent) => {
      if (!isResizingRef.current) return

      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      let newWidth = startWidth
      let newHeight = startHeight
      let newPosX = startPosX
      let newPosY = startPosY

      // Leste (direita)
      if (direction.includes('e')) {
        newWidth = Math.max(MIN_WIDTH, startWidth + deltaX)
      }
      // Sul (baixo)
      if (direction.includes('s')) {
        newHeight = Math.max(MIN_HEIGHT, startHeight + deltaY)
      }
      // Oeste (esquerda)
      if (direction.includes('w')) {
        const potentialWidth = startWidth - deltaX
        if (potentialWidth >= MIN_WIDTH) {
          newWidth = potentialWidth
          newPosX = startPosX + deltaX
        }
      }
      // Norte (cima)
      if (direction.includes('n')) {
        const potentialHeight = startHeight - deltaY
        const potentialY = startPosY + deltaY
        if (potentialHeight >= MIN_HEIGHT && potentialY >= 0) {
          newHeight = potentialHeight
          newPosY = potentialY
        }
      }

      onResize && onResize(id, { width: newWidth, height: newHeight }, { x: newPosX, y: newPosY })
    }

    const onMouseUp = () => {
      isResizingRef.current = false
      setIsInteracting(false)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // Transição suave EXCLUSIVAMENTE ao maximizar ou restaurar tamanho de tela cheia
  const [isMaximizingTransition, setIsMaximizingTransition] = useState(false)
  const prevMaximizedRef = useRef(isMaximized)

  useEffect(() => {
    if (prevMaximizedRef.current !== isMaximized) {
      prevMaximizedRef.current = isMaximized
      setIsMaximizingTransition(true)
      const timer = setTimeout(() => setIsMaximizingTransition(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isMaximized])

  // Cálculo preciso da distância do centro da janela até o ícone correspondente no Dock
  const getDockTargetCoords = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return { x: 0, y: 350 }
    }

    const winW = window.innerWidth
    const winH = window.innerHeight
    const menubarHeight = 32

    // Centro da janela em coordenadas da viewport
    const windowCenterX = isMaximized ? winW / 2 : position.x + size.width / 2
    const windowCenterY = isMaximized
      ? (winH - menubarHeight) / 2 + menubarHeight
      : position.y + menubarHeight + size.height / 2

    // Busca o botão correspondente deste app no Dock
    const dockEl = document.querySelector(`[data-dock-id="${id}"]`)
    if (dockEl) {
      const rect = dockEl.getBoundingClientRect()
      const dockCenterX = rect.left + rect.width / 2
      // Se o Dock estiver recolhido (fora da tela), a posição Y onde ele ficaria quando visível
      const dockCenterY = rect.top < winH ? rect.top + rect.height / 2 : winH - 36
      return {
        x: Math.round(dockCenterX - windowCenterX),
        y: Math.round(dockCenterY - windowCenterY)
      }
    }

    // Fallback: centro inferior da tela
    return {
      x: Math.round(winW / 2 - windowCenterX),
      y: Math.round(winH - 36 - windowCenterY)
    }
  }

  const { x: dockTargetX, y: dockTargetY } = getDockTargetCoords()

  const animClass =
    animState === 'minimizing'
      ? styles.windowMinimizing
      : animState === 'restoring'
      ? styles.windowRestoring
      : ''
  const maxTransitionClass = isMaximizingTransition ? styles.windowMaximizingTransition : ''
  const interactingClass = isInteracting ? styles.windowInteracting : ''

  const sys = t?.system || {}
  const isEn = sys.langLabel === 'EN'
  const closeTitle = sys.closeWindow || (isEn ? 'Close window' : 'Fechar janela')
  const minimizeTitle = sys.minimizeWindow || (isEn ? 'Minimize window' : 'Minimizar janela')
  const maximizeTitle = isMaximized
    ? (sys.restoreWindow || (isEn ? 'Restore size' : 'Restaurar tamanho'))
    : (sys.maximizeWindow || (isEn ? 'Maximize window' : 'Maximizar janela'))

  return (
    <div
      className={`${styles.windowContainer} ${isMaximized ? styles.windowContainerMaximized : ''} ${maxTransitionClass} ${animClass} ${interactingClass}`}
      style={{
        zIndex,
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - var(--menubar-height))' : size.height,
        '--dock-target-x': `${dockTargetX}px`,
        '--dock-target-y': `${dockTargetY}px`
      }}
      onMouseDown={() => onFocus && onFocus(id)}
      role="dialog"
      aria-label={title}
    >
      {/* Barra de Título */}
      <header
        className={styles.windowHeader}
        onMouseDown={handleHeaderMouseDown}
        onDoubleClick={() => onMaximize && onMaximize(id)}
      >
        <div className={styles.windowControls}>
          <button
            type="button"
            className={`${styles.controlButton} ${styles.btnClose}`}
            onClick={(e) => {
              e.stopPropagation()
              onClose && onClose(id)
            }}
            title={closeTitle}
            aria-label={closeTitle}
          />
          <button
            type="button"
            className={`${styles.controlButton} ${styles.btnMinimize}`}
            onClick={(e) => {
              e.stopPropagation()
              onMinimize && onMinimize(id)
            }}
            title={minimizeTitle}
            aria-label={minimizeTitle}
          />
          <button
            type="button"
            className={`${styles.controlButton} ${styles.btnMaximize}`}
            onClick={(e) => {
              e.stopPropagation()
              onMaximize && onMaximize(id)
            }}
            title={maximizeTitle}
            aria-label={maximizeTitle}
          />
        </div>

        <div className={styles.windowTitle}>
          {iconType && (
            <SystemIcon
              type={iconType}
              size={15}
              color={accentColor || 'currentColor'}
            />
          )}
          <span>{title}</span>
        </div>

        <div className={styles.headerSpacer}>
          {tag && <span className={styles.tagBadge}>{tag}</span>}
        </div>
      </header>

      {/* Conteúdo Rolável */}
      <section className={styles.windowBody}>
        {children}
      </section>

      {/* 8 Handles de Redimensionamento */}
      {!isMaximized && (
        <>
          <div className={`${styles.resizeHandle} ${styles.handleN}`} onMouseDown={(e) => handleResizeStart(e, 'n')} />
          <div className={`${styles.resizeHandle} ${styles.handleS}`} onMouseDown={(e) => handleResizeStart(e, 's')} />
          <div className={`${styles.resizeHandle} ${styles.handleW}`} onMouseDown={(e) => handleResizeStart(e, 'w')} />
          <div className={`${styles.resizeHandle} ${styles.handleE}`} onMouseDown={(e) => handleResizeStart(e, 'e')} />
          <div className={`${styles.resizeHandle} ${styles.handleNW}`} onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className={`${styles.resizeHandle} ${styles.handleNE}`} onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className={`${styles.resizeHandle} ${styles.handleSW}`} onMouseDown={(e) => handleResizeStart(e, 'sw')} />
          <div className={`${styles.resizeHandle} ${styles.handleSE}`} onMouseDown={(e) => handleResizeStart(e, 'se')} />
        </>
      )}
    </div>
  )
}
