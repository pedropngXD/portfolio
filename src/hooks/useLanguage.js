import { useState, useEffect } from 'react'
import { TRANSLATIONS } from '../data/translations'
import { playToggle } from '../utils/soundEffects'

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('pedro-os-lang') || 'pt'
  })

  useEffect(() => {
    localStorage.setItem('pedro-os-lang', language)
    document.documentElement.setAttribute('lang', language === 'pt' ? 'pt-BR' : 'en')
  }, [language])

  const toggleLanguage = () => {
    playToggle()
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'))
  }

  const t = TRANSLATIONS[language] || TRANSLATIONS.pt

  return { language, setLanguage, toggleLanguage, t }
}
