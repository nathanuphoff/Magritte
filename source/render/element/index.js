import { contentPattern, assign, svgNameSpace } from '../../_'
import { createElement } from '../../document'
import { distill } from '../../content'
import { renderContent } from '../content'

export function renderElement(parent, template, abstract = {}, store, namespace) {

  const type = abstract.node === parent ? null : template[0]
  if (type === 'svg') namespace = svgNamespace

  const createNode = type !== abstract.type
  const node = createNode ? createElement(type, namespace) : abstract.node
  
  const vdom = createNode ? [] : abstract.childNodes
  const childNodes = []
  const attributes = {}

  const length = template.length
  let index = !!type - 1
  let childIndex = 0

  while (++index < length) {

    const [content, type, kind] = distill(template[index], store)
    
    if (content === true) console.log(type, kind)

    if (type == 'node') {
      const child = vdom[childIndex]
      if (content) {
        childNodes[childIndex] = (kind ? renderElement : renderContent)(node, content, child, store, namespace)
      }
      else if (child && child.node)  node.removeChild(child.node)      
      ++childIndex
    }
    else if (type == 'object') assign(attributes, content)

  }

  assign(node, attributes)

  // remove excess children
  while (childIndex < vdom.length) {
    if (vdom[childIndex]) node.removeChild(vdom[childIndex].node)
    ++childIndex
  }

  // add/replace child elements
  if (!abstract.node) parent.appendChild(node)
  else if (createNode) parent.replaceChild(node, abstract.node)

  return { type, node, childNodes, attributes }

}