import { useState, useEffect } from 'react'
import { SECTIONS } from '../data/sections'
import { getAvailableGridPosition, sanitizeAllPositions, gridToCoords } from '../utils/desktopGrid'
import { playSnap } from '../utils/soundEffects'

export function useDesktopIcons() {
  const [iconPositions, setIconPositions] = useState(() => {
    const sectionIds = SECTIONS.map((s) => s.id)
    const saved = localStorage.getItem('pedro-os-desktop-icons')
    let parsed = {}
    if (saved) {
      try {
        parsed = JSON.parse(saved)
      } catch (e) {
        /* ignore */
      }
    }
    return sanitizeAllPositions(parsed, sectionIds)
  })

  useEffect(() => {
    localStorage.setItem('pedro-os-desktop-icons', JSON.stringify(iconPositions))
  }, [iconPositions])

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
    const resetPositions = {}
    SECTIONS.forEach((sec, idx) => {
      resetPositions[sec.id] = gridToCoords(0, idx)
    })
    setIconPositions(resetPositions)
  }

  return { iconPositions, setIconPositions, handleDropIcon, handleAlignIcons }
}
