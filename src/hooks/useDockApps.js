import { useState, useEffect } from 'react'
import { SECTIONS } from '../data/sections'
import { playSnap } from '../utils/soundEffects'

export const DEFAULT_DOCK_APPS = ['about', 'stack', 'experience', 'contact', 'projects']
const DEFAULT_RIGHT_APPS = ['github', 'linkedin', 'email', 'theme']

const DOCK_STORAGE_KEY = 'pedro-os-dock-pinned-v3'

export function useDockApps() {
  const [dockAppIds, setDockAppIds] = useState(() => {
    // Remove chaves antigas que possam conter apps não fixados gravados por engano
    try {
      localStorage.removeItem('pedro-os-dock-apps-v2')
      localStorage.removeItem('pedro-os-dock-apps')
    } catch (e) {
      /* ignore */
    }

    const saved = localStorage.getItem(DOCK_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.filter((id) => id !== 'resume' && id !== 'status-check')
          return cleaned.length > 0 ? cleaned : DEFAULT_DOCK_APPS
        }
      } catch (e) {
        /* ignore */
      }
    }
    return DEFAULT_DOCK_APPS
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
    localStorage.setItem(DOCK_STORAGE_KEY, JSON.stringify(dockAppIds))
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
    setDockAppIds(DEFAULT_DOCK_APPS)
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
