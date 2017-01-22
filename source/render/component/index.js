import { distill } from '../../content'
import { renderElement } from '../element'

export function component(node, template, abstract, store) {
  
  return renderElement(node, template, abstract || {
    childNodes: [],
    attributes: {},
    type: null,
    node,
  }, store)
  
}