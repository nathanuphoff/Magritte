import { component } from './component'

export default function render(root, template) {
  return function(store, abstract) {
    return component(root, template, abstract, store)
  }
}