import { _null, _isNaN, stringType, numberType } from '../_constants'
import { getType } from '../getType'

export function isContent(value) {
  const type = getType(value)
  return value === _null || type == stringType || (type == numberType && !_isNaN(value))
}