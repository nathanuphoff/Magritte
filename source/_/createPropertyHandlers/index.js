import { assign } from '../assign'

export function createPropertyHandlers(defaultPattern) {
  
  const cache = {
    methods: {},
    pattern: defaultPattern, 
  }
  
  return function(object) {
    const methods = assign(cache.methods, object)
    const keys = Object.keys(methods).join('|')
    const pattern = keys ? new RegExp('^' + keys) : defaultPattern
    return assign(cache, { methods, pattern })
  }

}