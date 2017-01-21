import { contentPattern } from '../../_'
import { createElement } from '../../document'
import { distill } from '../../content'
import { renderContent } from '../content'

export function renderElement(parent, x, template, abstract = [], store) {

  const type = template[0]
  const newElement = abstract.type !== type
  const node = newElement ? createElement(type) : abstract.node
  const children = abstract.children || []
  let childCount = 0
  let child = node.firstChild

  const length = template.length
  let index = 0
  while (++index < length) {

    const [content, type, kind] = distill(template[index], store)

    if (type == 'node') {
      const method = kind ? renderElement : renderContent
      children[childCount] = method(node, child, content, children[childCount], store)
      if (child) child = child.nextSibling
      childCount++
    }
    else if (type == 'object') Object.assign(node, content)

  }
  
  if (newElement) {
    console.log(node)
    if (abstract.node) {
      parent.replaceChild(node, abstract.node)
    }
    else parent.appendChild(node)
  }
  else if (childCount < abstract.childCount) {
    while (child) {
      node.removeChild(child)
      child = child.nextSibling
    }
    children.length = childCount
  }

  return { type, node, children, childCount }

}