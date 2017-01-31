import test from 'ava'
import { createPropertyHandlers } from './'

test('createPropertyHandlers should be a function', assert => {
  assert.is(typeof createPropertyHandlers, 'function')
})