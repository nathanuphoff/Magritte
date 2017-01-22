export function renderAttributes(node, content, abstract) {
  if (abstract) for (const key in content) {
    if (abstract[key] !== content[key]) node[key] = content[key]
  }
  else for (const key in content) {      
    node[key] = content[key]
  }
  return content
}