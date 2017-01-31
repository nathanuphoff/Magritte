import test from 'ava'
import { getStoreContentKind } from './'

test('getStoreContentKind should be a function', assert => {
  assert.is(typeof getStoreContentKind, 'function')
})