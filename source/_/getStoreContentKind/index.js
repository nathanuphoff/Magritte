import { arrayKind, booleanKind, contentKind } from '../_constants'
import { getType } from '../getType'
import { isArray } from '../isArray'
import { isBoolean } from '../isBoolean'
import { isContent } from '../isContent'

export function getStoreContentKind(value, type) {
  type = getType(value)
  if (isBoolean(value)) type = booleanKind
  else if (isContent(value)) type = contentKind
  else if (isArray(value)) type = arrayKind
  return type
}