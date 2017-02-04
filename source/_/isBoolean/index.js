import { booleanType } from '../_constants'
import { getType } from '../getType'

export function isBoolean(value) {
  return getType(value) == booleanType
}