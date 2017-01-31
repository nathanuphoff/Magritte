import test from 'ava'
import { resolveChild } from './'

test('resolveChild should be a function', assert => {
  assert.is(typeof resolveChild, 'function')
})