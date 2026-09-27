import { useEffect } from 'react'
import styles from './NotificationToast.module.css'

export default function NotificationToast({
  title = 'Sistema',
  message = '',
  icon = '✓',
  duration = 2800,
  onClose
}) {
  useEffect(() => {
    if (!duration) return
    const timer = setTimeout(() => {
      onClose && onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={styles.toast} role="status" aria-live="polite">
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
