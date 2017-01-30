import test from 'ava'
import { freeze } from './'

test('freeze should alias Object#freeze', assert => {
  assert.is(freeze, Object.freeze)
})