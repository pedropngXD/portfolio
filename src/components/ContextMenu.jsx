import { useEffect, useRef } from 'react'
import styles from './ContextMenu.module.css'

export default function ContextMenu({ x, y, items = [], onClose }) {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) return
      onClose && onClose()
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose && onClose()
    }

    // Delay para garantir que o próprio clique que abriu o menu não o feche no mesmo frame
    const timer = setTimeout(() => {
      window.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('touchstart', handleClickOutside)
      window.addEventListener('keydown', handleKeyDown)
    }, 40)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('touchstart', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Ajusta se o menu sair da tela à direita ou embaixo
  const adjustedX = Math.min(x, window.innerWidth - 180)
  const adjustedY = Math.min(y, window.innerHeight - (items.length * 36 + 20))

  return (
    <div
      ref={menuRef}
      className={styles.menu}
      style={{ left: adjustedX, top: adjustedY }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {items.map((item, idx) => {
        if (item.separator) {
          return <div key={idx} className={styles.separator} />
        }
        return (
          <button
            key={idx}
            type="button"
            className={`${styles.menuItem} ${item.danger ? styles.dangerItem : ''}`}
            onClick={() => {
              item.onClick && item.onClick()
              onClose && onClose()
            }}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
