import { _null, listType, objectType, contentTypes, assign, namespaces, emptyObject } from '../../_'
import { transformChild } from '../../middleware'
import { createElement } from '../createElement'
import { renderContent } from '../renderContent'
import { renderAttributes } from '../renderAttributes'

const mount = document.createEvent('Event')
mount.initEvent('mount', true, true)

export function renderElement(parent, template, abstract, store, name, namespace) {


  const type = abstract.node === parent ? _null : template[0]
  namespace = namespace || namespaces[type]

  const createNode = abstract.name !== name || abstract.type !== type
  const node = createNode ? createElement(type, namespace) : abstract.node
  const vdom = createNode ? [type] : abstract.vdom
  const attributes = {}

  // render element child content
  const length = template.length
  let index = !!type - 1
  while (++index < length) {

    let [content, type, kind, name] = transformChild(template[index], store)
    let child = vdom[index] || emptyObject

    if (content === true) [content, type, kind, name] = transformChild(child.vdom)

    if (contentTypes[type]) {
      vdom[index] = renderContent(node, content, child, store)
    }
    else if (type == listType) {
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

  // experimental: trigger custom lifecycle events
  if (createNode && attributes['onmount']) {
    node.addEventListener('mount', attributes['onmount'], false)
    node.dispatchEvent(mount)
  }

  // add/remove children
  if (createNode) parent.appendChild(node)
  else while (index < vdom.length) {
    const child = vdom[index]
    if (child.node) node.removeChild(child.node)
    index++
  }
  vdom.length = length   

  return { node, type, vdom, name, attributes }

}