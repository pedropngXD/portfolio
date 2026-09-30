import { TEXT_DESKTOP_PT, TEXT_DESKTOP_EN, TEXT_MOBILE_PT, TEXT_MOBILE_EN } from '../../data/readme'
import { useState, useEffect } from 'react'
import styles from './ReadmeSection.module.css'

export default function ReadmeSection({ t, isMobile: isMobileProp }) {
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileScreen
  const isEn = t?.system?.langLabel === 'EN'

  let textContent
  if (isMobile) {
    textContent = isEn ? TEXT_MOBILE_EN : TEXT_MOBILE_PT
  } else {
    textContent = isEn ? TEXT_DESKTOP_EN : TEXT_DESKTOP_PT
  }

  return (
    <div className={styles.container}>
      <pre className={styles.notepadBody}>
        {textContent}
      </pre>
    </div>
  )
}
