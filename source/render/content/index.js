export function renderContent(parent, node, content, abstract, store) {
  if (node) {
    // console.log('renderContent', node, content, abstract)
    node.nodeValue = content
  }
  else {
    node = document.createTextNode(content)
    parent.appendChild(node)
  }
  return { content, node }
}