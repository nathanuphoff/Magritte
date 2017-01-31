import test from 'ava'
import { assign } from './'

test('assign should be a function', assert => {
  assert.is(typeof assign, 'function')
})

test.todo('assign should fail if any primitive value is provided')

test('assign should return its first argument', assert => {
  const assignFirstArgument = {}
  const assignReturnValue = assign(assignFirstArgument)
  assert.is(assignFirstArgument, assignReturnValue)
})

test.todo('assign should extend its first argument')