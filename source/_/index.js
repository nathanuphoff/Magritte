export { pipe } from './pipe'
export { assign } from './assign'
export { slice } from './slice'

export const _document = document
export const _Array = Array
export const _Object = Object

export const lastState = {}

export const freeze = _Object.freeze

export const _undefined = undefined
export const _null = null

export const emptyObject = {}

export const functionType = 'function'
export const booleanType = 'boolean'
export const objectType = 'object'
export const stringType = 'string'
export const numberType = 'number'
export const nodeType = 'node'

export const svgAttributeNameSpace = 'http://www.w3.org/1999/xlink'

export const contentTypes = {
  [stringType]: true,
  [numberType]: true,
}

export const namespaces = {
  svg: 'http://www.w3.org/2000/svg'
}

export function setAttribute(node, key, value) {
  if (value == _null || value === false) node.removeAttribute(key)
  else {
    if (value === true) value = ''
    node.setAttribute(key, value)
  }
}

export const attributeHandlers = {
  
  data(node, key, value, match) {    
    const tail = match[2]
    key = tail[0].toLowerCase() + tail.substr(1)
    node.dataset[key] = value
  },
  
  xlink(node, key, value, match) {
    node.setAttributeNS(svgAttributeNameSpace, 'xlink:href', value)
  },

  viewBox: setAttribute,

  aria(node, key, value, match) {
    key = match[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    setAttribute(node, key, value)
  },

}

export function createAttributeHandlePattern(handlers) {
  const keys = _Object.keys(handlers).join('|')
  return new RegExp('^(' + keys + ')(.*)')
}

export const handledAttributesPattern = createAttributeHandlePattern(attributeHandlers)



