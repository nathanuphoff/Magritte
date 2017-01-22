import { distill } from '../../content'
import { renderElement } from '../element'

export function component(node, template, abstract, store) {
  
  console.log('render start')
  abstract = renderElement(node, template, abstract || {
    attributes: {},
    vdom: [],
    type: null,
    node,
  }, store)
  
  return abstract
  
}