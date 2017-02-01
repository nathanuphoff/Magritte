import { arrayKind, contentKind } from '../_constants'
import { isArray } from '../isArray'
import { isContent } from '../isContent'

export function getStoreContentKind(value, type) {
  type = typeof value
  if (isContent(value)) type = contentKind
  else if (isArray(value)) type = arrayKind
  return type
}