import { _Array, _null, _undefined, functionType, nodeType, pipe, contentPattern } from '../../_'
import { pipes } from '../pipe'

export function distill(content, store, type, kind) {
  
  const pipe = type === _undefined
  if (content == _null) content = _null

  type = typeof content
  while (type == functionType) {
    content = content(store)
    type = typeof content
  }

  const flow = pipes[type]
  
  if (content instanceof _Array) {
    kind = content[0]
    type = nodeType
  }
  else if (contentPattern.test(type)) {
    type = nodeType
  }
  
  return pipe && flow
    ? distill(flow(content), store, type)
    : [content, type, kind]

}