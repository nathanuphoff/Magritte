import { _null, _true, getType, functionType, booleanType, listKind, numberType, stringType, contentKind } from '../../_'

export function resolveChild(content, abstract, store, type, name) {
  
  type = getType(content)
  while (type == functionType) {
    name = content.name
    content = content(store)
    type = getType(content)
  }
  
  if (content === _true) {
    name = content.name
    content = abstract.content
    type = content.type
  }

  if (type != booleanType) {
    if (content == _null) content = _null
    else if (type == stringType || type == numberType) type = contentKind
    else if (getType(content[0]) == stringType) type = listKind
  }

  return [content, type, name]

}