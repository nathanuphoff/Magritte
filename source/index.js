import { _document, assign, slice } from './_'
import { compose, element, handleAttributes } from './component'
import { createStore } from './middleware'
import render from './render'

function factory(selector) {

  const template = slice(arguments, 1)
  return function(state) {
    
    const node = _document.querySelector(selector)
    node.innerHTML = "" // todo: create initial abstract DOM tree from node.childNodes
        
    const component = render(node, template, {
      node,
      type: null,
      vdom: [],
      attributes: {},
    })
        
    return createStore(component, state).model
    
  }

}

export default assign(factory, { compose, element, handleAttributes })