import test from 'ava'
import { isArray } from './'

test('isArray should alias Array#isArray', assert => {
  assert.is(isArray, Array.isArray)
})