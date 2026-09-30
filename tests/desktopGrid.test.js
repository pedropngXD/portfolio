import test from 'node:test'
import assert from 'node:assert/strict'
import { gridToCoords, snapToGrid, getAvailableGridPosition, isColliding } from '../src/utils/desktopGrid.js'

test('grid round trip and negative coordinates', () => {
  for (let col = 0; col < 8; col++) for (let row = 0; row < 6; row++) {
    const { x, y } = gridToCoords(col, row)
    assert.deepEqual(snapToGrid(x, y), { col, row })
  }
  assert.deepEqual(snapToGrid(-500, -500), { col: 0, row: 0 })
})

test('occupied destination finds another cell and excludes the moving icon', () => {
  const origin = gridToCoords(0, 0)
  const available = getAvailableGridPosition(origin, 'stack', { about: origin }, 1440, 900)
  assert.equal(isColliding(origin, available), false)
  assert.deepEqual(getAvailableGridPosition(origin, 'about', { about: origin }, 1440, 900), origin)
})
