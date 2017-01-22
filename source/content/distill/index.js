import { _Array } from '../../_'
import { pipes } from '../pipe'

export function distill(content, store, type, kind) {
  
  const pipe = type === undefined
  if (content == null) content = null

  type = typeof content
  while (type == 'function') {
    content = content(store)
    type = typeof content
  }

  const flow = pipes[type]
  
  if (content instanceof _Array) {
    kind = content[0]
    type = 'node'
  }
  else if (/st|nu/.test(type)) {
    type = 'node'
  }
  
  return pipe && flow
    ? distill(flow(content), store, type)
    : [content, type, kind]

}