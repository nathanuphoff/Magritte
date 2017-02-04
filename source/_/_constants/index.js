import { getType } from '../getType'

export const name = 'Magritte'

export const _Object = Object
export const _Array = Array
export const _document = typeof document != 'undefined' ? document : {} 
export const _isNaN = isNaN
export const { warn, error } = console

export const functionType = getType(getType)
export const booleanType = getType(!0)
export const objectType = getType({})
export const stringType = getType('')
export const numberType = getType(0)

export const listKind = 'list'
export const booleanKind = 'a ' + booleanType
export const arrayKind = 'an Array'
export const contentKind = 'a ' + stringType + ' or ' + numberType
export const modelValues = ['null', contentKind, booleanKind, 'or ' + arrayKind].join(', ')

export const _undefined = undefined
export const _null = null
export const _true = true
export const _false = false

export const emptyObject = {}

export const w3Domain = 'http://www.w3.org/'
export const svgNameSpace = w3Domain + '2000/svg'
export const xlinkNameSpace = w3Domain + '1999/xlink'

export const _pattern_ = 'p'
export const _methods_ = 'm'