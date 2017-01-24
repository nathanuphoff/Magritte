import { renderElement } from './element'

export default function render(node, template) {
  return function(store, abstract) {
    return renderElement(node, template, abstract || {
      node,
      type: null,    
      vdom: [],    
      attributes: {},
    }, store)
  }
}