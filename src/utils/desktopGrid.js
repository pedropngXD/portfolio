/**
 * Utilitários para alinhamento em grade e prevenção de colisão entre ícones da área de trabalho
 */
export const DESKTOP_GRID = {
  CELL_WIDTH: 92,
  CELL_HEIGHT: 96,
  OFFSET_X: 24,
  OFFSET_Y: 24,
  ICON_WIDTH: 80,
  ICON_HEIGHT: 88,
  // Limiar para detectar sobreposição visual
  COLLISION_THRESHOLD_X: 72,
  COLLISION_THRESHOLD_Y: 78
}

/**
 * Converte coordenadas (x, y) para a coluna e linha da grade mais próximas
 */
export function snapToGrid(x, y) {
  const col = Math.max(0, Math.round((x - DESKTOP_GRID.OFFSET_X) / DESKTOP_GRID.CELL_WIDTH))
  const row = Math.max(0, Math.round((y - DESKTOP_GRID.OFFSET_Y) / DESKTOP_GRID.CELL_HEIGHT))
  return { col, row }
}

/**
 * Converte coluna e linha da grade em coordenadas em pixels (x, y)
 */
export function gridToCoords(col, row) {
  return {
    x: DESKTOP_GRID.OFFSET_X + col * DESKTOP_GRID.CELL_WIDTH,
    y: DESKTOP_GRID.OFFSET_Y + row * DESKTOP_GRID.CELL_HEIGHT
  }
}

/**
 * Verifica se duas posições de ícones colidem / sobrepõem-se visualmente
 */
export function isColliding(pos1, pos2) {
  if (!pos1 || !pos2) return false
  const dx = Math.abs(pos1.x - pos2.x)
  const dy = Math.abs(pos1.y - pos2.y)
  return dx < DESKTOP_GRID.COLLISION_THRESHOLD_X && dy < DESKTOP_GRID.COLLISION_THRESHOLD_Y
}

/**
 * Encontra a posição mais próxima disponível na grade que não colida com nenhum outro ícone
 */
export function getAvailableGridPosition(
  desiredPos,
  movingId,
  currentPositions,
  viewportWidth = window.innerWidth,
  viewportHeight = window.innerHeight
) {
  const maxCols = Math.max(1, Math.floor((viewportWidth - DESKTOP_GRID.OFFSET_X - DESKTOP_GRID.ICON_WIDTH) / DESKTOP_GRID.CELL_WIDTH))
  const maxRows = Math.max(1, Math.floor((viewportHeight - DESKTOP_GRID.OFFSET_Y - 110) / DESKTOP_GRID.CELL_HEIGHT))

  const { col: rawCol, row: rawRow } = snapToGrid(desiredPos.x, desiredPos.y)
  const col = Math.max(0, Math.min(maxCols - 1, rawCol))
  const row = Math.max(0, Math.min(maxRows - 1, rawRow))

  // Células e posições já ocupadas por outros ícones
  const occupiedCells = new Set()
  const otherPositions = []

  Object.entries(currentPositions).forEach(([otherId, pos]) => {
    if (otherId === movingId || !pos) return
    const grid = snapToGrid(pos.x, pos.y)
    occupiedCells.add(`${grid.col},${grid.row}`)
    otherPositions.push(pos)
  })

  // Testa se uma célula específica está livre e sem colisão
  const isCellAvailable = (c, r) => {
    if (occupiedCells.has(`${c},${r}`)) return false
    const coords = gridToCoords(c, r)
    for (const otherPos of otherPositions) {
      if (isColliding(coords, otherPos)) return false
    }
    return true
  }

  // Se a célula desejada estiver livre, utiliza ela
  if (isCellAvailable(col, row)) {
    return gridToCoords(col, row)
  }

  // Caso contrário, busca a célula livre mais próxima (menor distância euclidiana)
  let bestCell = null
  let minDistance = Infinity

  for (let c = 0; c < maxCols; c++) {
    for (let r = 0; r < maxRows; r++) {
      if (isCellAvailable(c, r)) {
        // Distância euclidiana com preferência sutil pela mesma coluna
        const dist = Math.hypot(c - col, r - row) + (Math.abs(c - col) * 0.1)
        if (dist < minDistance) {
          minDistance = dist
          bestCell = { c, r }
        }
      }
    }
  }

  if (bestCell) {
    return gridToCoords(bestCell.c, bestCell.r)
  }

  // Fallback seguro caso a tela esteja cheia
  return gridToCoords(col, row)
}

// Ordem e agrupamento do layout padrão do desktop:
// Esquerda: Apenas informações pessoais
export const LEFT_PERSONAL_APPS = ['about', 'stack', 'experience', 'contact', 'projects']
// Direita: Documentos do sistema e status
export const RIGHT_SYSTEM_APPS = ['readme', 'resume', 'status-check']

/**
 * Retorna o layout padrão do desktop macOS:
 * - Canto esquerdo: Informações pessoais em coluna
 * - Canto direito: readme, currículo e status check alinhados à margem direita
 */
export function getDefaultDesktopPositions(
  viewportWidth = (typeof window !== 'undefined' ? window.innerWidth : 1200),
  _viewportHeight = (typeof window !== 'undefined' ? window.innerHeight : 800)
) {
  const positions = {}

  // Coluna esquerda (24px de margem)
  LEFT_PERSONAL_APPS.forEach((id, idx) => {
    positions[id] = {
      x: DESKTOP_GRID.OFFSET_X,
      y: DESKTOP_GRID.OFFSET_Y + idx * DESKTOP_GRID.CELL_HEIGHT
    }
  })

  // Coluna direita (24px da borda direita da viewport)
  const rightX = Math.max(
    DESKTOP_GRID.OFFSET_X + DESKTOP_GRID.CELL_WIDTH,
    viewportWidth - DESKTOP_GRID.OFFSET_X - DESKTOP_GRID.ICON_WIDTH
  )

  RIGHT_SYSTEM_APPS.forEach((id, idx) => {
    positions[id] = {
      x: rightX,
      y: DESKTOP_GRID.OFFSET_Y + idx * DESKTOP_GRID.CELL_HEIGHT
    }
  })

  return positions
}

/**
 * Higieniza todas as posições salvas garantindo que nenhum ícone fique sobreposto
 * e que valores vazios usem o layout padrão
 */
export function sanitizeAllPositions(
  positions = {},
  sectionIds = [],
  viewportWidth = (typeof window !== 'undefined' ? window.innerWidth : 1200),
  viewportHeight = (typeof window !== 'undefined' ? window.innerHeight : 800)
) {
  const defaultPos = getDefaultDesktopPositions(viewportWidth, viewportHeight)
  const result = {}

  sectionIds.forEach((id) => {
    const rawPos = positions[id] || defaultPos[id] || { x: DESKTOP_GRID.OFFSET_X, y: DESKTOP_GRID.OFFSET_Y }
    const validPos = getAvailableGridPosition(rawPos, id, result, viewportWidth, viewportHeight)
    result[id] = validPos
  })
  return result
}
