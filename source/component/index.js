import { _document } from '../_'
import store from '../store'
import render from '../render'

export default function() {

  const template = arguments
  return function(selector, state, abstract) {  
    const root = _document.querySelector(selector)
    root.innerHTML = ""
    const component = render(root, template)
    return store(component, state, abstract)
  }

}

export { compose } from './compose'
export { element } from './element'
export { route } from './route'


