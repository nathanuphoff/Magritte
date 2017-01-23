import { svgAttributeNameSpace } from '../../_'

export function renderAttributes(node, content, abstract) {
  if (abstract) for (const key in content) {
    const value = content[key]
    if (!/^on/.test(key) && value !== abstract[key]) {
      if (key === 'className') node.setAttribute('class', value)
      else node[key] = value
    }
  }
  else for (const key in content) {    
    setAttribute(node, key, content[key])
  }
  return content
}

function setAttribute(node, key, value) {
  if (key === 'className') node.setAttribute('class', value)
  else node[key] = value
}

export function renderSVGAttributes(node, content, abstract) {
  if (abstract) for (const key in content) {
    const value = content[key]
    if (abstract[key] !== content[key]) {
      /^xlink/.test(key)
        ? node.setAttributeNS(svgAttributeNameSpace, key, content[key])
        : node.setAttribute(key, content[key])
    }
  }
  else for (const key in content) {
    /^xlink/.test(key)
      ? node.setAttributeNS(svgAttributeNameSpace, key, content[key])
      : node.setAttribute(key, content[key])
  }
  return content
}