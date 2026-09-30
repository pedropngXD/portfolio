import test from 'node:test'
import assert from 'node:assert/strict'
import { arrayMove } from '../src/utils/arrayMove.js'

test('reorder in both directions without mutating pinned app order', () => {
  const apps = Object.freeze(['about', 'stack', 'projects'])
  assert.deepEqual(arrayMove(apps, 0, 2), ['stack', 'projects', 'about'])
  assert.deepEqual(arrayMove(apps, 2, 0), ['projects', 'about', 'stack'])
  assert.deepEqual(arrayMove(apps, 1, 1), apps)
  assert.notEqual(arrayMove(apps, 1, 1), apps)
})
