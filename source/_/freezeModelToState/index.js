import { functionType } from '../_constants'
import { freeze } from '../freeze'

export function freezeModelToState(model) {
  const state = {}
  for (const key in model) {
    const value = model[key]
    state[key] = typeof value == functionType
      ? value.next
      : freezeModelToState(value)
  }
  return freeze(state)
}