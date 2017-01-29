import { _null, emptyObject } from '../../_'
import { attributeHandlers } from '../../middleware'
import { setAttribute } from '../../document'

export function renderAttributes(node, content, abstract, namespace) {
  
  abstract = abstract || emptyObject
  for (const key in content) {
    
    const value = content[key]
    if (value !== abstract[key]) {
      if (attributeHandlers.pattern.test(key)) {
        const match = key.match(attributeHandlers.pattern)[0]
        attributeHandlers.methods[match](node, key, value) 
      }
      else if (namespace) setAttribute(node, key, value)
      else node[key] = value
    }

  }

  return content

}