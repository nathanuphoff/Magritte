import { _null } from '../../_'

export function setAttribute(node, key, value, namespace) {
  if (value == _null || value === false) {
    namespace
      ? node.removeAttributeNS(namespace, key)
      : node.removeAttribute(key)
  }
  else {
    if (value === true) value = ''
    namespace
      ? node.setAttributeNS(namespace, key, value)
      : node.setAttribute(key, value)
  }
}