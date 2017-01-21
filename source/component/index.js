import { _document, svgNameSpace, svgPattern } from '../_'
import store from '../store'
import render from '../render'

export default function() {

  const template = arguments
  return (selector, state, vDOM = []) => {  
    const root = _document.querySelector(selector)
    const component = render(root, template)
    return store(component, state, vDOM)
  }

}

export function route() {
  const parameters = arguments
  return template => store => true ? template : null
}
