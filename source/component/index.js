import { _document, _null, svgNameSpace, svgPattern } from '../_'
import store from '../store'
import render from '../render'

export default function() {

  const template = arguments
  return function(selector, state, abstract) {  
    const root = _document.querySelector(selector)
    const component = render(root, template)
    return store(component, state, abstract)
  }

}

export function route() {
  const parameters = arguments
  return template => store => true ? template : _null
}
