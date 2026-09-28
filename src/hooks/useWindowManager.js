import { useState, useCallback } from 'react'
import { SECTIONS } from '../data/sections'

export const DEFAULT_WINDOW_SIZE = {
  width: 760,
  height: 500
}

/**
 * Calcula dimensões e posição inicial padrão para a janela de uma seção
 */
export function getInitialWindowBounds(sectionId) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640
  const initialWidth = isMobile ? Math.min(window.innerWidth * 0.94, 760) : DEFAULT_WINDOW_SIZE.width
  const initialHeight = isMobile ? Math.min(window.innerHeight * 0.72, 500) : DEFAULT_WINDOW_SIZE.height

  const initialX = typeof window !== 'undefined'
    ? Math.max(20, Math.round((window.innerWidth - initialWidth) / 2))
    : 80
  const initialY = typeof window !== 'undefined'
    ? Math.max(50, Math.round((window.innerHeight - initialHeight) / 2) - 20)
    : 80

  const idx = SECTIONS.findIndex((s) => s.id === sectionId)
  const offset = idx >= 0 ? idx * 26 : 0

  return {
    position: {
      x: initialX + offset,
      y: initialY + offset
    },
    size: {
      width: initialWidth,
      height: initialHeight
    }
  }
}

export function useWindowManager() {
  const [windows, setWindows] = useState(() => {
    const initialMap = {}
    SECTIONS.forEach((sec) => {
      const bounds = getInitialWindowBounds(sec.id)
      initialMap[sec.id] = {
        id: sec.id,
        isOpen: sec.id === 'about',
        isMinimized: false,
        isMaximized: false,
        zIndex: sec.id === 'about' ? 100 : 10,
        position: bounds.position,
        size: bounds.size,
        prevBounds: null
      }
    })
    return initialMap
  })

  const [topZIndex, setTopZIndex] = useState(100)
  const [focusedWindowId, setFocusedWindowId] = useState('about')

  // Foca em uma janela (traz para frente)
  const focusWindow = useCallback((id) => {
    setTopZIndex((prevZ) => {
      const nextZ = Math.max(prevZ + 1, 100)
      setWindows((prev) => {
        if (!prev[id] || !prev[id].isOpen) return prev
        return {
          ...prev,
          [id]: {
            ...prev[id],
            isMinimized: false,
            zIndex: prev[id].isMaximized ? Math.max(nextZ, 950) : nextZ
          }
        }
      })
      return nextZ
    })
    setFocusedWindowId(id)
  }, [])

  // Abre ou foca
  const openWindow = useCallback((id) => {
    setTopZIndex((prevZ) => {
      const nextZ = Math.max(prevZ + 1, 100)
      setWindows((prev) => {
        const current = prev[id]
        if (!current) return prev

        // Se já está aberta e focada, minimiza; se estava minimizada ou em segundo plano, foca
        if (current.isOpen && !current.isMinimized && focusedWindowId === id) {
          return {
            ...prev,
            [id]: { ...current, isMinimized: true }
          }
        }

        // Se já está aberta (estava minimizada ou em segundo plano), traz para a frente mantendo seu tamanho atual
        if (current.isOpen) {
          return {
            ...prev,
            [id]: {
              ...current,
              isMinimized: false,
              zIndex: current.isMaximized ? Math.max(nextZ, 950) : nextZ
            }
          }
        }

        // CASO A JANELA NÃO ESTEJA ABERTA (!current.isOpen):
        // Sempre abre com as dimensões e posição originais da primeira vez!
        const initialBounds = getInitialWindowBounds(id)

        return {
          ...prev,
          [id]: {
            ...current,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            position: initialBounds.position,
            size: initialBounds.size,
            prevBounds: null,
            zIndex: nextZ
          }
        }
      })
      return nextZ
    })
    setFocusedWindowId(id)
  }, [focusedWindowId])

  const closeWindow = useCallback((id) => {
    setWindows((prev) => {
      const current = prev[id]
      if (!current) return prev

      const initialBounds = getInitialWindowBounds(id)

      return {
        ...prev,
        [id]: {
          ...current,
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
          position: initialBounds.position,
          size: initialBounds.size,
          prevBounds: null
        }
      }
    })
    setFocusedWindowId((current) => (current === id ? null : current))
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => {
      const current = prev[id]
      if (!current) return prev
      return {
        ...prev,
        [id]: {
          ...current,
          isMinimized: true
        }
      }
    })
    setFocusedWindowId((current) => (current === id ? null : current))
  }, [])

  // Maximiza cobrindo 100% da tela abaixo da MenuBar (e cobrindo o Dock)
  const toggleMaximizeWindow = useCallback((id) => {
    setWindows((prev) => {
      const current = prev[id]
      if (!current) return prev

      if (current.isMaximized) {
        // Restaura tamanho e posição guardados (ou tamanho padrão)
        const initialBounds = getInitialWindowBounds(id)
        return {
          ...prev,
          [id]: {
            ...current,
            isMaximized: false,
            position: current.prevBounds?.position || initialBounds.position,
            size: current.prevBounds?.size || initialBounds.size,
            prevBounds: null
          }
        }
      } else {
        // Maximiza ocupando toda a tela até a base
        const menubarH = 32
        const maxWidth = window.innerWidth
        const maxHeight = window.innerHeight - menubarH

        return {
          ...prev,
          [id]: {
            ...current,
            isMaximized: true,
            zIndex: 960, // Fica acima do Dock (que é 900)
            prevBounds: {
              position: { ...current.position },
              size: { ...current.size }
            },
            position: { x: 0, y: menubarH },
            size: { width: maxWidth, height: maxHeight }
          }
        }
      }
    })
    focusWindow(id)
  }, [focusWindow])

  const updateWindowPosition = useCallback((id, newPos) => {
    setWindows((prev) => {
      const current = prev[id]
      if (!current || current.isMaximized) return prev
      return {
        ...prev,
        [id]: {
          ...current,
          position: newPos
        }
      }
    })
  }, [])

  const updateWindowSize = useCallback((id, newSize, newPos) => {
    setWindows((prev) => {
      const current = prev[id]
      if (!current || current.isMaximized) return prev
      return {
        ...prev,
        [id]: {
          ...current,
          size: newSize,
          position: newPos || current.position
        }
      }
    })
  }, [])

  return {
    windows,
    focusedWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  }
}
