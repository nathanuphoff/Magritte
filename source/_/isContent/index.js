import { _null, _isNaN, stringType, numberType } from '../_constants'

export function isContent(value) {
  return value === _null || typeof value == stringType || (typeof value == numberType && !_isNaN(value))
}