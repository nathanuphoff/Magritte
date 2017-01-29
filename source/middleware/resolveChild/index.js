import { _null, pipe, functionType, booleanType, listType, stringType, contentTypes } from '../../_'

export function resolveChild(content, store, type, kind, name) {
  
  // const pipe = type === _undefined
  type = typeof content
  while (type == functionType) {
    name = content.name
    content = content(store)
    type = typeof content
  }
  
  // const flow = pipes[type]

  if (type != booleanType) {
    if (content == _null) content = _null
    else if (!contentTypes[type] && typeof content[0] == stringType) type = listType
  }

  return [content, type, kind, name]
  // return pipe && flow
  //   ? distill(flow(content), store, type)
  //   : [content, type, kind]

}