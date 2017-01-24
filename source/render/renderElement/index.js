import { _null, nodeType, objectType, assign, namespaces, emptyObject } from '../../_'
import { distill } from '../../content'

import { createElement } from '../createElement'
import { renderContent } from '../renderContent'
import { renderAttributes } from '../renderAttributes'

export function renderElement(parent, template, abstract, store, namespace) {

  abstract = abstract || emptyObject
  const type = abstract.node === parent ? _null : template[0]
  namespace = namespace || namespaces[type]

  const createNode = type !== abstract.type
  const node = createNode ? createElement(type, namespace) : abstract.node
  
  const vdom = createNode ? [type] : abstract.vdom
  let attributes = {}
  
  const length = template.length
  let index = !!type - 1
  while (++index < length) {

    let [content, type, kind] = distill(template[index], store)
    const child = vdom[index] || emptyObject

    if (content === true) [content, type, kind] = distill(child.vdom)
    
    if (type == nodeType) {
      vdom[index] = (kind ? renderElement : renderContent)(node, content, child, store, namespace)
    }
    else if (type == objectType) {
      vdom[index] = _null
      if (content == _null) {
        const childNode = child.node
        if (childNode) node.removeChild(childNode)
      }
      else assign(attributes, content)
    }
    else vdom[index] = child

  }
  
  // render element attributes
  attributes = renderAttributes(node, attributes, abstract.attributes, namespace)
  
  // add/remove children
  if (createNode) parent.appendChild(node)
  else while (index < vdom.length) {
    const child = vdom[index]
    if (child) node.removeChild(child.node)
    index++
  }
  vdom.length = length   

  return { node, type, vdom, attributes }

}