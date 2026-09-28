import { useState, useEffect } from 'react'
import { playToggle } from '../utils/soundEffects'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pedro-os-theme')
    if (saved) return saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pedro-os-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    playToggle()
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, setTheme, toggleTheme }
}
