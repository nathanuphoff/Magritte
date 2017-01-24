import { _document, _null } from '../_'
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

export function route() {
  const parameters = arguments
  return template => store => 'todo: test for match' ? template : _null
}
