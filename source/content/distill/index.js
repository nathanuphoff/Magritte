import { _Array, _null, _undefined, pipe, functionType, booleanType, nodeType, stringType, contentTypes } from '../../_'
import { pipes } from '../pipe'

export function distill(content, store, type, kind) {
  
  const pipe = type === _undefined
  type = typeof content
  while (type == functionType) {
    content = content(store)
    type = typeof content
  }

  const flow = pipes[type]

  if (type != booleanType) {
    if (content == _null) content = _null
    else if (contentTypes[type]) type = nodeType
    else {
      kind = content[0]
      if (typeof kind == stringType) type = nodeType
    }
  }

  return pipe && flow
    ? distill(flow(content), store, type)
    : [content, type, kind]

}