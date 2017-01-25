import { toLowerCase, functionType } from '../../_'
import { attribute } from '../../component'
import { setAttribute } from '../../document'

export const attributeHandlers = attribute({
  
  data(node, key, value, [head, tail]) {    
    key = toLowerCase(tail[0]) + tail.substr(1)
    node.dataset[key] = value
  },
  
  xlink(node, key, value, [head, tail]) {
    key = head + ':' + toLowerCase(tail)
    setAttribute(node, key, value, 'http://www.w3.org/1999/xlink')
  },

  viewBox(node, key, value) {
    setAttribute(node, key, value)
  },

  aria(node, key, value) {
    key = toLowerCase(key.replace(/([a-z])([A-Z])/g, '$1-$2'))
    setAttribute(node, key, value)
  },

})