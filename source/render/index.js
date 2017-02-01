import { cache, freeze } from '../_'
import { renderElement } from './renderElement'

export default function(node, template, abstract) {
  
  return function(store) {
    abstract = renderElement(node, template, abstract, store)
    return store
  }
  
}