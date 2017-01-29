// under construction
import { _null } from '../../_'

export function route() {
  const parameters = arguments
  return function(template) {
    return true ? template : _null
  }
}