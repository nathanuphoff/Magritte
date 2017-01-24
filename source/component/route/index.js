import { _document } from '../../_'

export function route() {
  const parameters = arguments
  return template => store => 'todo: test for match' ? template : _null
}