import { functionType } from '../_constants'
import { freeze } from '../freeze'
import { getType } from '../getType'

export function freezeModelToState(model) {
  const state = {}
  for (const key in model) {
    const value = model[key]
    state[key] = getType(value) == functionType
      ? value.next
      : freezeModelToState(value)
  }
  return freeze(state)
}