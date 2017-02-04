import { arrayKind, booleanKind, contentKind } from '../_constants'
import { isArray } from '../isArray'
import { isBoolean } from '../isBoolean'
import { isContent } from '../isContent'

export const testStoreContent = {
  [arrayKind]: isArray,
  [contentKind]: isContent,
  [booleanKind]: isBoolean,
}