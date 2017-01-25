export { _Object } from './_Object'
export { pipe } from './pipe'
export { createPropertyHandlers } from './createPropertyHandlers' 
export { assign } from './assign'
export { slice } from './slice'
export { toLowerCase } from './toLowerCase'
export { freeze } from './freeze'

export const _document = document
export const _Array = Array

export const emptyObject = {}
export const _undefined = undefined
export const _null = null

export const functionType = 'function'
export const booleanType = 'boolean'
export const objectType = 'object'
export const stringType = 'string'
export const numberType = 'number'
export const listType = 'list'

export const contentTypes = {
  [stringType]: 1,
  [numberType]: 1,
}

export const namespaces = {
  svg: 'http://www.w3.org/2000/svg',
}


