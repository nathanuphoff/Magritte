import { _Object, _methods_, _pattern_ } from '../_constants'
import { assign } from '../assign'

const methodsKey = 'm'
const patternKey = 'p'

export function createPropertyHandlers(cache) {
  
  return function(object) {
    const methods = assign(cache[_methods_] || {}, object)
    cache[_methods_] = methods
    cache[_pattern_] = new RegExp('^' + _Object.keys(methods).join('|'))
    return cache
  }

}