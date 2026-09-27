import { useEffect } from 'react'
import styles from './ContextMenu.module.css'

export default function ContextMenu({ x, y, items = [], onClose }) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      onClose && onClose()
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose && onClose()
    }

    window.addEventListener('click', handleClickOutside)
    window.addEventListener('contextmenu', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('click', handleClickOutside)
      window.removeEventListener('contextmenu', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Ajusta se o menu sair da tela à direita ou embaixo
  const adjustedX = Math.min(x, window.innerWidth - 180)
  const adjustedY = Math.min(y, window.innerHeight - (items.length * 36 + 20))

  return (
    <div
      className={styles.menu}
      style={{ left: adjustedX, top: adjustedY }}
      onClick={(e) => e.stopPropagation()}
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
