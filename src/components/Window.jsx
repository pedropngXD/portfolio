import { resizeWindow } from '../utils/windowGeometry'
import { useRef, useState, useEffect } from 'react'
import SystemIcon from './SystemIcon'
import styles from './Window.module.css'

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
  prevBounds,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  onRestoreFromDrag,
  isWifiEnabled = true,
  onToggleWifi,
  t,
  children
}) {
  const [isInteracting, setIsInteracting] = useState(false)
  const isFlush = id === 'readme' || id === 'resume' || id === 'status-check'
  const isDraggingRef = useRef(false)
  const isResizingRef = useRef(false)

  // Permite arrastar janelas normais e também restaurar o tamanho
  // automaticamente ao começar a arrastar uma janela maximizada

  const handleHeaderMouseDown = (e) => {
    if (e.target.closest(`.${styles.controlButton}`)) return

    onFocus && onFocus(id)
    isDraggingRef.current = true
    setIsInteracting(true)

    const wasMaximized = Boolean(isMaximized)
    const restoredWidth = prevBounds?.size?.width || size?.width || 760

    let startX = e.clientX
    let startY = e.clientY
    let startPos = { ...position }
    let hasRestoredFromMaximized = false

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return

      // Se a janela estava em tela cheia (maximizada), aguarda o início do movimento (> 4px)
      // para restaurar ao tamanho anterior antes de continuar o arrasto
      if (wasMaximized && !hasRestoredFromMaximized) {
        const deltaFromClick = Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY)
        if (deltaFromClick < 4) return

        hasRestoredFromMaximized = true

        // Calcula a posição horizontal proporcional para manter o cursor no mesmo ponto da barra de título
        const screenW = typeof window !== 'undefined' ? window.innerWidth : 1280
        const clickRatioX = Math.max(0.08, Math.min(0.92, startX / screenW))
        const grabOffsetX = Math.round(restoredWidth * clickRatioX)
        const restoredX = Math.round(moveEvent.clientX - grabOffsetX)
        // No topo, preserva o deslocamento relativo dentro da barra de título (~20px)
        const restoredY = Math.max(0, moveEvent.clientY - 20)

        startPos = { x: restoredX, y: restoredY }
        startX = moveEvent.clientX
        startY = moveEvent.clientY

        onRestoreFromDrag && onRestoreFromDrag(id, { x: restoredX, y: restoredY })
        return
      }

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

      const { size: nextSize, position: nextPosition } = resizeWindow(
        { width: startWidth, height: startHeight },
        { x: startPosX, y: startPosY },
        direction, deltaX, deltaY
      )

      onResize && onResize(id, nextSize, nextPosition)
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
      if (!isDraggingRef.current) {
        setIsMaximizingTransition(true)
        const timer = setTimeout(() => setIsMaximizingTransition(false), 300)
        return () => clearTimeout(timer)
      }
    }
  }, [isMaximized])

  const getDockTargetCoords = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return { x: 0, y: 350 }
    }

    const winW = window.innerWidth
    const winH = window.innerHeight
    const menubarHeight = 32

    const windowCenterX = isMaximized ? winW / 2 : position.x + size.width / 2
    const windowCenterY = isMaximized
      ? (winH - menubarHeight) / 2 + menubarHeight
      : position.y + menubarHeight + size.height / 2

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
      <section className={`${styles.windowBody} ${isFlush && isWifiEnabled ? styles.windowBodyFlush : ''}`}>
        {!isWifiEnabled ? (
          <div className={styles.offlineState} role="alert">
            <div className={styles.offlineIconBox} aria-hidden="true">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>
            <h4 className={styles.offlineTitle}>
              {t?.wifi?.connectionProblemTitle || 'Problema de Conexão'}
            </h4>
            <p className={styles.offlineDesc}>
              {t?.wifi?.connectionProblemDesc ||
                'O Wi-Fi do sistema está desligado. Conecte-se a uma rede para carregar o conteúdo deste aplicativo.'}
            </p>
            {onToggleWifi && (
              <button
                type="button"
                className={styles.offlineActionBtn}
                onClick={onToggleWifi}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" />
                </svg>
                <span>{t?.wifi?.reconnectBtn || t?.wifi?.turnOn || 'Ativar Wi-Fi'}</span>
              </button>
            )}
          </div>
        ) : (
          children
        )}
      </section>

      {!isMaximized && (
        <>
          {['n', 's', 'w', 'e', 'nw', 'ne', 'sw', 'se'].map((direction) => (
            <div key={direction} className={`${styles.resizeHandle} ${styles['handle' + direction.toUpperCase()]}`}
              onMouseDown={(event) => handleResizeStart(event, direction)} />
          ))}
        </>
      )}
    </div>
  )
}
