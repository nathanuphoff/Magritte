import { _document, assign } from './_'
import { attribute, compose, element, route } from './component'
import store from './store'
import render from './render'

function factory() {

  const template = arguments
  return function(selector, state, abstract) {  
    const root = _document.querySelector(selector)
    root.innerHTML = ""
    const component = render(root, template)
    return store(component, state, abstract)
  }

}

export default assign(factory, {
  attribute,
  compose,
  element,
  route,
})