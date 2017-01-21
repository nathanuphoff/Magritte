import { distill } from '../../content'
import { renderElement } from '../element'

export function component(parent, child, template, abstract = [], store) {

  let index = -1
  while (++index < template.length) {
    const [content, type, kind] = distill(template[index], store)
    abstract[index] = renderElement(parent, child, content, abstract[index], store, true)
    if (child) child = child.nextSibling
  }

  return abstract
  
}