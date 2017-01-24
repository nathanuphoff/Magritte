import { svgAttributeNameSpace } from '../../_'

export function renderAttributes(node, content, abstract = {}) {
  for (const key in content) {
    const value = content[key]
    if (value !== abstract[key]) setAttribute(node, key, value)
  }
  return content
}

function setAttribute(node, key, value) {
  const isDataAttribute = key.match(/^data([A-Z])(\w+)/)
  if (isDataAttribute) {
    const key = isDataAttribute[1].toLowerCase() + isDataAttribute[2]
    node.dataset[key] = value
  }
  else node[key] = value
}

export function renderSVGAttributes(node, content, abstract = {}) {
  for (const key in content) {
    const value = content[key]
    if (abstract[key] !== content[key]) {
      /^xlink/.test(key)
        ? node.setAttributeNS(svgAttributeNameSpace, key, content[key])
        : node.setAttribute(key, content[key])
    }
  }
  return content
}