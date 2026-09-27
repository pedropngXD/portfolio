import styles from './Container.module.css'

export default function Container({ children, size = 'default', className = '' }) {
  const sizeClass = size === 'narrow' ? styles.narrow : size === 'wide' ? styles.wide : ''
  return (
    <div className={`${styles.container} ${sizeClass} ${className}`.trim()}>
      {children}
    </div>
  )
}
