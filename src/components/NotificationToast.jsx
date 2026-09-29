import { useEffect, useState } from 'react'
import styles from './NotificationToast.module.css'

export default function NotificationToast({
  title = 'Sistema',
  message = '',
  icon = 'V',
  duration = 2800,
  onClose
}) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (!duration) return
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        onClose && onClose()
      }, 250)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={styles.toast + (isExiting ? ' ' + styles.toastExit : '')} role="status" aria-live="polite">
      <div className={styles.iconWrapper} aria-hidden="true">
        {icon}
      </div>
      <div className={styles.content}>
        <strong className={styles.title}>{title}</strong>
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  )
}
