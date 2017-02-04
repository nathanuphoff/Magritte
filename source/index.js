import { name, _document, error, assign, slice } from './_'
import { cache, compose, element, handleAttributes, jsx } from './component'
import { createStore } from './middleware'
import render from './render'

function factory(selector) {
  
  const template = slice(arguments, 1)
  const node = _document.querySelector(selector)
  
  if (selector in cache) error(`${name}: selector must be unique. (In 'magritte(selector), selector '${selector}' is used before)`)
  else cache[selector] = {}
  
  return node 
  ? function(state) {
    
      node.innerHTML = "" // todo: create abstract DOM from node.childNodes  
      const component = render(node, selector, template, {
        node,
        type: null,
        vdom: [],
        attributes: {},
      })
      
      return createStore(component, state).model
      
    }
  : error(`${name}: root element does not exist. (In 'magritte(selector), selector '${selector}' does not match any document element)`)

}

export default assign(factory, { cache, compose, element, handleAttributes, jsx })