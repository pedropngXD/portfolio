import { useRef, useState } from 'react'
import SystemIcon from './SystemIcon'
import styles from './DesktopIcon.module.css'

export default function DesktopIcon({
  id,
  title,
  iconType,
  accentColor,
  isActive,
  position = { x: 24, y: 24 },
  onClick,
  onDrop,
  onMove,
  onContextMenu,
  t
}) {
  const isEn = t?.system?.langLabel === 'EN'
  const [isDragging, setIsDragging] = useState(false)
  const [dragPos, setDragPos] = useState(null)
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    hasMoved: false
  })

  const startDrag = (clientX, clientY) => {
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      initialX: position.x,
      initialY: position.y,
      currentX: position.x,
      currentY: position.y,
      hasMoved: false
    }

    const onPointerMove = (moveEvent) => {
      const curX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX
      const curY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY

      const deltaX = curX - dragRef.current.startX
      const deltaY = curY - dragRef.current.startY

      // Threshold de 4px para distinguir clique de arraste intencional
      if (!dragRef.current.hasMoved && (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4)) {
        dragRef.current.hasMoved = true
        setIsDragging(true)
      }

      if (dragRef.current.hasMoved) {
        // Limita o ícone dentro dos limites visíveis da tela
        const maxX = window.innerWidth - 85
        const maxY = window.innerHeight - 120
        const newX = Math.max(10, Math.min(maxX, dragRef.current.initialX + deltaX))
        const newY = Math.max(10, Math.min(maxY, dragRef.current.initialY + deltaY))

        dragRef.current.currentX = newX
        dragRef.current.currentY = newY
        setDragPos({ x: newX, y: newY })
      }
    }

    const onPointerUp = () => {
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('touchend', onPointerUp)

      setIsDragging(false)
      setDragPos(null)

      if (dragRef.current.hasMoved) {
        const finalPos = {
          x: dragRef.current.currentX,
          y: dragRef.current.currentY
        }
        if (onDrop) {
          onDrop(id, finalPos)
        } else if (onMove) {
          onMove(id, finalPos)
        }
      } else {
        onClick && onClick(id)
      }
    }

    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)
    window.addEventListener('touchmove', onPointerMove, { passive: false })
    window.addEventListener('touchend', onPointerUp)
  }

  const handleMouseDown = (e) => {
    if (e.button !== 0) return
    startDrag(e.clientX, e.clientY)
  }

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length !== 1) return
    startDrag(e.touches[0].clientX, e.touches[0].clientY)
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onContextMenu && onContextMenu(e, id)
  }

  const currentDisplayPos = isDragging && dragPos ? dragPos : position

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.iconButton} ${isActive ? styles.iconButtonActive : ''} ${isDragging ? styles.iconButtonDragging : ''}`}
      style={{
        left: currentDisplayPos.x,
        top: currentDisplayPos.y
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onContextMenu={handleContextMenu}
      title={`${title} (${isEn ? 'Drag to move, right-click for options' : 'Arraste para mover, clique direito para opções'})`}
      aria-label={title}
    >
      <div className={styles.iconBadge}>
        <div
          className={styles.iconBadgeGlow}
          style={{ backgroundColor: accentColor }}
        />
        <SystemIcon
          type={iconType}
          size={26}
          color={accentColor}
        />
      </div>
      <span className={styles.iconLabel}>{title}</span>
    </div>
  )
}
