import { stringType } from '../_constants'

export function isPlainObject(value) {
  return typeof value != stringType && value == '[object Object]'
}