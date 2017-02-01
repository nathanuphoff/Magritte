import { _Object } from '../_constants'
import { assign } from '../assign'

const methodsKey = 'm'
const patternKey = 'p'

export function createPropertyHandlers(defaultPattern) {
  
  const cache = {
    [methodsKey]: {},
  }
  
  return function(object) {
    const methods = assign(cache[methodsKey], object)
    const pattern = new RegExp('^' + _Object.keys(methods).join('|'))
    return assign(cache, { [methodsKey]: methods, [patternKey]: pattern })
  }

}