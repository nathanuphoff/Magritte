import { assign, toLowerCase, functionType, xlinkNameSpace } from '../../_'
import { handleAttributes } from '../../component'
import { setAttribute } from '../../document'

export const attributeHandlers = handleAttributes({
  
  aria(node, key, value, store) {
    key = toLowerCase(key.replace(/([a-z])([A-Z])/g, '$1-$2'))
    setAttribute(node, key, value)
  },
  
  data(node, key, value, store) {
    key = toLowerCase(key[4]) + key.substr(5)
    node.dataset[key] = value
  },

  on(node, key, value, store) {
    node[key] = handle
    function handle(event) {
      value(assign(store, { event }))
    }
  },
  
  viewBox: setAttribute,
  
  xlink(node, key, value) {
    key = toLowerCase(key.replace(/([a-z])([A-Z])/g, '$1:$2'))    
    setAttribute(node, key, value, xlinkNameSpace)
  },

})