import { _document } from '../../_'

export function route() {
  const parameters = arguments
  return function(template) {
    return true ? template : _null
  }
}