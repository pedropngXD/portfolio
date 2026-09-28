import { useState, useEffect } from 'react'
import { SECTIONS } from '../data/sections'
import { playSnap } from '../utils/soundEffects'

const DEFAULT_RIGHT_APPS = ['github', 'linkedin', 'email', 'theme']

export function useDockApps() {
  const [dockAppIds, setDockAppIds] = useState(() => {
    const saved = localStorage.getItem('pedro-os-dock-apps')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        /* ignore */
      }
    }
    return SECTIONS.map((s) => s.id)
  })

  const [dockRightIds, setDockRightIds] = useState(() => {
    const saved = localStorage.getItem('pedro-os-dock-right-apps')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        /* ignore */
      }
    }
    return DEFAULT_RIGHT_APPS
  })

  useEffect(() => {
    localStorage.setItem('pedro-os-dock-apps', JSON.stringify(dockAppIds))
  }, [dockAppIds])

  useEffect(() => {
    localStorage.setItem('pedro-os-dock-right-apps', JSON.stringify(dockRightIds))
  }, [dockRightIds])

  const handleRemoveFromDock = (sectionId) => {
    setDockAppIds((prev) => prev.filter((id) => id !== sectionId))
  }

  const handleAddToDock = (sectionId) => {
    setDockAppIds((prev) => (prev.includes(sectionId) ? prev : [...prev, sectionId]))
  }

  const handleResetDock = () => {
    playSnap()
    setDockAppIds(SECTIONS.map((s) => s.id))
    setDockRightIds(DEFAULT_RIGHT_APPS)
  }

  return {
    dockAppIds,
    dockRightIds,
    setDockAppIds,
    setDockRightIds,
    handleAddToDock,
    handleRemoveFromDock,
    handleResetDock
  }
}
