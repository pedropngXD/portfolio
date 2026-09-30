import { useState, useEffect } from 'react'
import { playToggle } from '../utils/soundEffects'

export function useSystemWifi() {
  const [isWifiEnabled, setIsWifiEnabled] = useState(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem('pedro-os-wifi')
    return saved === null ? true : saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('pedro-os-wifi', isWifiEnabled.toString())
  }, [isWifiEnabled])

  const toggleWifi = (forcedState) => {
    playToggle()
    setIsWifiEnabled((prev) => (typeof forcedState === 'boolean' ? forcedState : !prev))
  }

  return { isWifiEnabled, setIsWifiEnabled, toggleWifi }
}
