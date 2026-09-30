import test from 'node:test'
import assert from 'node:assert/strict'
import { resizeWindow } from '../src/utils/windowGeometry.js'

const size = { width: 760, height: 500 }
const position = { x: 100, y: 100 }

test('resize all edges and corners without mutating the original bounds', () => {
  const expected = {
    n: [760, 470, 100, 130], s: [760, 530, 100, 100],
    w: [740, 500, 120, 100], e: [780, 500, 100, 100],
    nw: [740, 470, 120, 130], ne: [780, 470, 100, 130],
    sw: [740, 530, 120, 100], se: [780, 530, 100, 100]
  }
  for (const [direction, [width, height, x, y]] of Object.entries(expected)) {
    assert.deepEqual(resizeWindow(size, position, direction, 20, 30), { size: { width, height }, position: { x, y } })
  }
  assert.deepEqual(size, { width: 760, height: 500 })
  assert.deepEqual(position, { x: 100, y: 100 })
})

test('north/west keep the opposite edge anchored at minimum size and top boundary', () => {
  assert.deepEqual(resizeWindow(size, position, 'nw', 1000, 1000), { size, position })
  assert.deepEqual(resizeWindow(size, position, 'n', 0, -101), { size, position })
  assert.equal(resizeWindow(size, position, 'n', 0, -100).position.y, 0)
})

test('south/east clamp size while keeping position', () => {
  const result = resizeWindow(size, position, 'se', -1000, -1000)
  assert.deepEqual(result, { size: { width: 340, height: 240 }, position })
})
