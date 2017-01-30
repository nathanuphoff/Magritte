import { ArrayType, contentType } from '../_constants'
import { isArray } from '../isArray'
import { isContent } from '../isContent'

export function getStoreContentKind(value, type) {
  type = typeof value
  if (isContent(value)) type = contentType
  else if (isArray(value)) type = ArrayType
  return type
}