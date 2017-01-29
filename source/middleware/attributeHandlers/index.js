import { toLowerCase, functionType } from '../../_'
import { handleAttributes } from '../../component'
import { setAttribute } from '../../document'

export const attributeHandlers = handleAttributes({
  
  aria(node, key, value) {
    key = toLowerCase(key.replace(/([a-z])([A-Z])/g, '$1-$2'))
    setAttribute(node, key, value)
  },
  
  data(node, key, value) {
    key = toLowerCase(key[4]) + key.substr(5)
    node.dataset[key] = value
  },
  
  viewBox: setAttribute,
  
  xlink(node, key, value) {
    key = toLowerCase(key.replace(/([a-z])([A-Z])/g, '$1:$2'))    
    setAttribute(node, key, value, 'http://www.w3.org/1999/xlink')
  },

})