import { stringType } from '../_constants'
import { getType } from '../getType'

export function isPlainObject(value) {
  return getType(value) != stringType && value == '[object Object]'
}