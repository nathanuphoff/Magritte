import { _document, assign } from './_'
import { compose, element, handleAttributes } from './component'
import { createStore } from './middleware'
import render from './render'

function factory() {

  const template = arguments
  return function(selector, state, abstract) {
    
    const node = _document.querySelector(selector)
    node.innerHTML = "" // todo: create initial abstract DOM tree from node.childNodes
        
    const component = render(node, template, {
      node,
      type: null,
      vdom: [],
      attributes: {},
    })
    
    const store = createStore(component, state)
    
    return component(store).model
    
  }

}

export default assign(factory, { compose, element, handleAttributes })