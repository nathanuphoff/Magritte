import { _null, emptyObject } from '../../_'
import { attributeHandlers } from '../../middleware'
import { setAttribute } from '../../document'

export function renderAttributes(node, content, abstract, namespace) {
  
  abstract = abstract || emptyObject
  for (const key in content) {
    
    const value = content[key]
    if (value !== abstract[key]) {
      const match = key.match(attributeHandlers.pattern)
      if (match) {
        const [key, head, tail] = match
        attributeHandlers.methods[head](node, key, value, [head, tail]) 
      }
      else if (namespace) setAttribute(node, key, value)
      else node[key] = value
    }

  }

  return content

}