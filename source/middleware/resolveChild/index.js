import { _null, functionType, booleanType, listKind, numberType, stringType, contentKind } from '../../_'

export function resolveChild(content, store, type, kind, name) {
  
  type = typeof content
  while (type == functionType) {
    name = content.name
    content = content(store)
    type = typeof content
  }

  if (type != booleanType) {
    if (content == _null) content = _null
    else if (type == stringType || type == numberType) type = contentKind
    else if (typeof content[0] == stringType) type = listKind
  }

  return [content, type, kind, name]

}