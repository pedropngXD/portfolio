import { useState, useEffect } from 'react'
import { SECTIONS } from '../data/sections'
import {
  getAvailableGridPosition,
  sanitizeAllPositions,
  getDefaultDesktopPositions,
  DESKTOP_GRID
} from '../utils/desktopGrid'
import { playSnap } from '../utils/soundEffects'

const STORAGE_KEY = 'pedro-os-desktop-icons-v2'

export function useDesktopIcons() {
  const [iconPositions, setIconPositions] = useState(() => {
    const sectionIds = SECTIONS.map((s) => s.id)
    const saved = localStorage.getItem(STORAGE_KEY)
    let parsed = null
    if (saved) {
      try {
        parsed = JSON.parse(saved)
      } catch (e) {
        /* ignore */
      }
    }

    if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
      return sanitizeAllPositions(parsed, sectionIds)
    }

    // Layout padrão: esquerda = pessoais, direita = readme, curriculo, status check
    return getDefaultDesktopPositions()
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(iconPositions))
  }, [iconPositions])

  // Em redimensionamento da janela, impede que ícones fiquem fora da viewport
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      setIconPositions((prev) => {
        let changed = false
        const next = { ...prev }
        const maxX = Math.max(DESKTOP_GRID.OFFSET_X, vw - DESKTOP_GRID.OFFSET_X - DESKTOP_GRID.ICON_WIDTH)
        const maxY = Math.max(DESKTOP_GRID.OFFSET_Y, vh - 120)

        Object.entries(next).forEach(([id, pos]) => {
          if (pos && (pos.x > maxX || pos.y > maxY)) {
            next[id] = {
              x: Math.min(pos.x, maxX),
              y: Math.min(pos.y, maxY)
            }
            changed = true
          }
        })
        return changed ? next : prev
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleDropIcon = (id, rawPos) => {
    playSnap()
    const cleanPos = getAvailableGridPosition(rawPos, id, iconPositions)
    setIconPositions((prev) => ({
      ...prev,
      [id]: cleanPos
    }))
  }

  const handleAlignIcons = () => {
    playSnap()
    const resetPositions = getDefaultDesktopPositions(window.innerWidth, window.innerHeight)
    setIconPositions(resetPositions)
  }

  return { iconPositions, setIconPositions, handleDropIcon, handleAlignIcons }
}
