import { ArrayType, booleanType, contentType } from '../_constants'
import { isArray } from '../isArray'
import { isBoolean } from '../isBoolean'
import { isContent } from '../isContent'

export const testStoreContent = {
  [ArrayType]: isArray,
  [contentType]: isContent,
  [booleanType]: isBoolean,
}