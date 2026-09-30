const MIN_WIDTH = 340
const MIN_HEIGHT = 240

export function resizeWindow({ width: startWidth, height: startHeight }, { x: startPosX, y: startPosY }, direction, deltaX, deltaY) {
  let newWidth = startWidth
  let newHeight = startHeight
  let newPosX = startPosX
  let newPosY = startPosY

  if (direction.includes('e')) {
    newWidth = Math.max(MIN_WIDTH, startWidth + deltaX)
  }

  if (direction.includes('s')) {
    newHeight = Math.max(MIN_HEIGHT, startHeight + deltaY)
  }

  if (direction.includes('w')) {
    const potentialWidth = startWidth - deltaX
    if (potentialWidth >= MIN_WIDTH) {
      newWidth = potentialWidth
      newPosX = startPosX + deltaX
    }
  }

  if (direction.includes('n')) {
    const potentialHeight = startHeight - deltaY
    const potentialY = startPosY + deltaY
    if (potentialHeight >= MIN_HEIGHT && potentialY >= 0) {
      newHeight = potentialHeight
      newPosY = potentialY
    }
  }

  return { size: { width: newWidth, height: newHeight }, position: { x: newPosX, y: newPosY } }
}
