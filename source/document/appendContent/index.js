export function appendContent(parent, content) {
  parent.appendChild(document.createTextNode(content))
  return content
}