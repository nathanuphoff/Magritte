export { pipe } from './pipe'
export { assign } from './assign'

export const _document = document
export const _Array = Array
export const _Object = Object

export const freeze = _Object.freeze

export const _undefined = undefined
export const _null = null

export const functionType = 'function'
export const booleanType = 'boolean'
export const objectType = 'object'
export const stringType = 'string'
export const numberType = 'number'
export const nodeType = 'node'

export const svgNameSpace = 'http://www.w3.org/2000/svg'
export const svgAttributeNameSpace = 'http://www.w3.org/1999/xlink'

export const contentTypes = {
  [stringType]: true,
  [numberType]: true,
}