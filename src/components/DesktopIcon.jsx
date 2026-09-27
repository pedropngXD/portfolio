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
  onMove,
  onContextMenu
}) {
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0, hasMoved: false })

  const handleMouseDown = (e) => {
    // Apenas botão esquerdo dispara o arraste
    if (e.button !== 0) return

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
      hasMoved: false
    }

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.startX
      const deltaY = moveEvent.clientY - dragStartRef.current.startY

      // Threshold de 4px para distinguir clique de arrastar
      if (!dragStartRef.current.hasMoved && (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4)) {
        dragStartRef.current.hasMoved = true
        setIsDragging(true)
      }

      if (dragStartRef.current.hasMoved) {
        // Limita o ícone dentro da tela
        const maxX = window.innerWidth - 90
        const maxY = window.innerHeight - 150
        const newX = Math.max(10, Math.min(maxX, dragStartRef.current.initialX + deltaX))
        const newY = Math.max(10, Math.min(maxY, dragStartRef.current.initialY + deltaY))

        onMove && onMove(id, { x: newX, y: newY })
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      setIsDragging(false)

      // Se não moveu, foi apenas um clique
      if (!dragStartRef.current.hasMoved) {
        onClick && onClick(id)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    onContextMenu && onContextMenu(e, id)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.iconButton} ${isActive ? styles.iconButtonActive : ''} ${isDragging ? styles.iconButtonDragging : ''}`}
      style={{
        left: position.x,
        top: position.y
      }}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      title={`${title} (Arraste para mover, clique direito para opções)`}
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
