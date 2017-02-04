import { renderElement } from './renderElement'
import { cache } from '../component'

export default function(node, selector, template, abstract) {
  
  return function(store) {
    cache[selector] = store
    abstract = renderElement(node, template, abstract, store)
    return store
  }
  
}