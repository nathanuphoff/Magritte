import test from 'ava'
import { attributeHandlers } from './'

test('attributeHandlers should be an object', assert => {
  assert.is(typeof attributeHandlers, 'object')
})