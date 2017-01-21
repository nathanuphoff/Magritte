export function renderAttributes(node, content) {
  for (const key in content) {      
    node[key] = content[key]
  }
  return content
}

export function updateAttributes(node, content, abstract) {
  for (const key in content) {
    node[key] = abstract[key] = content[key]
  }
  return content
}