import { _document, _null, listKind, objectType, contentKind, assign, svgNameSpace, emptyObject } from '../../_'
import { resolveChild } from '../../middleware'
import { createElement } from '../createElement'
import { renderContent } from '../renderContent'
import { renderAttributes } from '../renderAttributes'

const mount = _document.createEvent('Event').initEvent('mount', true, true)

export function renderElement(parent, template, abstract, store, name, namespace) {

  const type = abstract.node === parent ? _null : template[0]
  if (type === 'svg') namespace = svgNameSpace

  const createNode = abstract.name !== name || abstract.type !== type
  const node = createNode ? createElement(type, namespace) : abstract.node
  const vdom = createNode ? [type] : abstract.vdom
  const attributes = {}

  // render element children
  const length = template.length
  let index = !!type - 1
  while (++index < length) {
    
    let [content, type, kind, name] = resolveChild(template[index], store)
    let child = vdom[index] || emptyObject
    
    if (content === true) [content, type, kind, name] = transformChild(child.vdom)

    if (type == contentKind) {
      vdom[index] = renderContent(node, content, child, store)
    }
    else if (type == listKind) {
      vdom[index] = renderElement(node, content, child, store, name, namespace)
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
  assign(attributes, renderAttributes(node, attributes, abstract.attributes, namespace))

  // add/remove children
  if (createNode) parent.appendChild(node)
  else while (index < vdom.length) {
    const child = vdom[index]
    if (child.node) node.removeChild(child.node)
    index++
  }
  vdom.length = length
  
  // experimental: trigger custom lifecycle events
  if (createNode && attributes['onmount']) {
    node.addEventListener('mount', attributes['onmount'], false)
    node.dispatchEvent(mount)
  }

  return { node, type, vdom, name, attributes }

}