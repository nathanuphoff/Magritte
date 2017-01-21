import { component } from './component'

export default function render(root, template) {
  return function(store, vDOM) {
    return component(root, root.firstChild, template, vDOM, store)
  }
}