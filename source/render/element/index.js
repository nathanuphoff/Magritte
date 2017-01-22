import { contentPattern, assign, svgNameSpace } from '../../_'
import { createElement } from '../../document'
import { distill } from '../../content'
import { renderContent } from '../content'
import { renderAttributes } from '../attributes'

export function renderElement(parent, template, abstract = {}, store, namespace) {

  const type = abstract.node === parent ? null : template[0]
  if (type === 'svg') namespace = svgNamespace

  const createNode = type !== abstract.type
  const node = createNode ? createElement(type, namespace) : abstract.node
  
  const vdom = createNode ? [type] : abstract.vdom
  const attributes = {}

  const length = template.length
  let index = !!type - 1

  while (++index < length) {

    let [content, type, kind] = distill(template[index], store)
    const child = vdom[index] || {}
        
    if (content === true) [content, type, kind] = distill(child.vdom)
        
    else if (type == 'node') {
      // console.log('child', kind, child)
      vdom[index] = (kind ? renderElement : renderContent)(node, content, child, store, namespace)
    }
    else if (type == 'object') {
      vdom[index] = null
      if (content == null) {
        const childNode = child.node
        if (childNode) node.removeChild(childNode)
      }
      else assign(attributes, content)
    }
    else vdom[index] = child

  }
  
  assign(attributes, renderAttributes(node, attributes, abstract.attributes))
  
  if (createNode) {
    // console.log('createNode', type, node)
    // console.log('createNode', type, domNode)
    parent.appendChild(node)
  }
   
  // remove excess children
  while (index < vdom.length) {
    const child = vdom[index]
    if (child) node.removeChild(child.node)
    index++
  }
  vdom.length = length

  // add/replace child elements
   

  return { type, node, vdom, attributes }

}