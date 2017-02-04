import { _null, _methods_, _pattern_, emptyObject } from '../../_'
import { attributeHandlers } from '../../middleware'
import { setAttribute } from '../../document'

export function renderAttributes(node, content, abstract, store, namespace) {
  
  abstract = abstract || emptyObject
  for (const key in content) {
    
    const value = content[key]
    if (value !== abstract[key]) {
      if (attributeHandlers[_pattern_].test(key)) {
        const match = key.match(attributeHandlers[_pattern_])[0]
        attributeHandlers[_methods_][match](node, key, value, store)
      }
      else if (namespace) setAttribute(node, key, value)
      else node[key] = value
    }

  }

  return content

}