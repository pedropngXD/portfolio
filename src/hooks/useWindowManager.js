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

/**
 * Garante que a janela alvo receba um zIndex estritamente maior que todas as outras janelas abertas.
 * Normaliza os zIndexes quando necessário para manter ampla folga abaixo da MenuBar (1000) e do Dock (1060).
 */
function getNextWindowZIndex(windowsMap, targetId) {
  const entries = Object.entries(windowsMap)
    .filter(([id, win]) => win.isOpen && id !== targetId)
    .sort((a, b) => (a[1].zIndex || 10) - (b[1].zIndex || 10))

  const highestZ = entries.length > 0 ? entries[entries.length - 1][1].zIndex || 100 : 100

  // Se o maior zIndex passar de 850, normaliza a pilha para manter folga abaixo do MenuBar (1000)
  if (highestZ > 850) {
    let base = 100
    const normalized = { ...windowsMap }
    for (const [id, win] of entries) {
      normalized[id] = { ...win, zIndex: base++ }
    }
    return { nextMap: normalized, nextZ: base }
  }

  return { nextMap: windowsMap, nextZ: Math.max(highestZ + 1, 101) }
}

export function useWindowManager() {
  const [windows, setWindows] = useState(() => {
    const initialMap = {}
    SECTIONS.forEach((sec) => {
      const bounds = getInitialWindowBounds(sec.id)
      initialMap[sec.id] = {
        id: sec.id,
        isOpen: sec.id === 'readme',
        isMinimized: false,
        isMaximized: false,
        animState: 'idle',
        zIndex: sec.id === 'readme' ? 100 : 10,
        position: bounds.position,
        size: bounds.size,
        prevBounds: null
      }
    })
    return initialMap
  })

  const [focusedWindowId, setFocusedWindowId] = useState('readme')

  // Foca em uma janela (traz para frente como camada superior absoluta)
  const focusWindow = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id] || !prev[id].isOpen) return prev
      const { nextMap, nextZ } = getNextWindowZIndex(prev, id)
      return {
        ...nextMap,
        [id]: {
          ...nextMap[id],
          isMinimized: false,
          zIndex: nextZ
        }
      }
    })
    setFocusedWindowId(id)
  }, [])

  // Abre ou foca janelas no SO
  // Quando o clique vem da barra de tarefas (fromDock = true): executa a animação macOS Genie (sugar/cuspir)
  // Quando o clique vem da área de trabalho (fromDock = false): a janela apenas aparece instantaneamente sem animação
  const openWindow = useCallback((id, { fromDock = false } = {}) => {
    setWindows((prev) => {
      const current = prev[id]
      if (!current) return prev

      // Se o clique foi feito na BARRA DE TAREFAS e a janela já está aberta, visível e focada:
      // Minimiza ("sugada pra dentro da barra de tarefas")
      if (fromDock && current.isOpen && !current.isMinimized && focusedWindowId === id) {
        setTimeout(() => {
          setWindows((p) => {
            if (!p[id]) return p
            return {
              ...p,
              [id]: {
                ...p[id],
                isMinimized: true,
                animState: 'idle'
              }
            }
          })
          setFocusedWindowId((curr) => (curr === id ? null : curr))
        }, 220)

        return {
          ...prev,
          [id]: { ...current, animState: 'minimizing' }
        }
      }

      const { nextMap, nextZ } = getNextWindowZIndex(prev, id)

      // Se já está aberta (estava minimizada ou em segundo plano)
      if (current.isOpen) {
        const wasMinimized = current.isMinimized
        const shouldAnimate = fromDock && wasMinimized

        if (shouldAnimate) {
          setTimeout(() => {
            setWindows((p) => {
              if (!p[id]) return p
              return {
                ...p,
                [id]: {
                  ...p[id],
                  animState: 'idle'
                }
              }
            })
          }, 220)
        }

        return {
          ...nextMap,
          [id]: {
            ...current,
            isMinimized: false,
            animState: shouldAnimate ? 'restoring' : 'idle',
            zIndex: nextZ
          }
        }
      }

      // CASO A JANELA NÃO ESTEJA ABERTA (!current.isOpen):
      // Abre com as dimensões e posição originais
      // A animação de cuspida acontece APENAS se o clique for feito na barra de tarefas
      const initialBounds = getInitialWindowBounds(id)
      const shouldAnimate = fromDock

      if (shouldAnimate) {
        setTimeout(() => {
          setWindows((p) => {
            if (!p[id]) return p
            return {
              ...p,
              [id]: {
                ...p[id],
                animState: 'idle'
              }
            }
          })
        }, 220)
      }

      return {
        ...nextMap,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          animState: shouldAnimate ? 'restoring' : 'idle',
          position: initialBounds.position,
          size: initialBounds.size,
          prevBounds: null,
          zIndex: nextZ
        }
      }
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
          animState: 'idle',
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
      if (!current || !current.isOpen || current.isMinimized || current.animState === 'minimizing') return prev

      setTimeout(() => {
        setWindows((p) => {
          if (!p[id]) return p
          return {
            ...p,
            [id]: {
              ...p[id],
              isMinimized: true,
              animState: 'idle'
            }
          }
        })
        setFocusedWindowId((curr) => (curr === id ? null : curr))
      }, 220)

      return {
        ...prev,
        [id]: {
          ...current,
          animState: 'minimizing'
        }
      }
    })
  }, [])

  // Maximiza cobrindo 100% da tela abaixo da MenuBar (e cobrindo o Dock)
  const toggleMaximizeWindow = useCallback((id) => {
    setWindows((prev) => {
      const current = prev[id]
      if (!current) return prev

      const { nextMap, nextZ } = getNextWindowZIndex(prev, id)

      if (current.isMaximized) {
        // Restaura tamanho e posição guardados (ou tamanho padrão)
        const initialBounds = getInitialWindowBounds(id)
        return {
          ...nextMap,
          [id]: {
            ...current,
            isMaximized: false,
            position: current.prevBounds?.position || initialBounds.position,
            size: current.prevBounds?.size || initialBounds.size,
            prevBounds: null,
            zIndex: nextZ
          }
        }
      } else {
        // Maximiza ocupando toda a tela até a base
        const menubarH = 32
        const maxWidth = typeof window !== 'undefined' ? window.innerWidth : 1280
        const maxHeight = typeof window !== 'undefined' ? window.innerHeight - menubarH : 768

        return {
          ...nextMap,
          [id]: {
            ...current,
            isMaximized: true,
            zIndex: nextZ,
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
    setFocusedWindowId(id)
  }, [])

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
