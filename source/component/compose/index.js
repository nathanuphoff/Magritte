import { slice, concat } from '../../_'

export function compose() {
  const base = slice(arguments)
  return function() {
    return concat(base, slice(arguments))
  }
}
