import { slice } from '../../_'

export function compose() {
  const base = slice(arguments)
  return function() {
    return base.concat(slice(arguments))
  }
}
