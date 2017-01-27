import { booleanType } from '../_constants'

export function isBoolean(value) {
  return typeof value == booleanType
}