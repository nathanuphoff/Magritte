import { distill } from '../../content'
import { renderElement } from '../element'

export function component(node, template, abstract, store) {
  
  const start = performance.now()
  
  abstract = renderElement(node, template, abstract || {
    node,
    type: null,    
    vdom: [],    
    attributes: {},
  }, store)
  
  const duration = Math.floor((performance.now() - start) * 100) / 100
  console.log('frame time: ' + duration + 'ms, ' + Math.floor(1000 / duration) + 'fps')
  
  return abstract
  
}