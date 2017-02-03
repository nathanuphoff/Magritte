import { _document } from '../../_'

const elementCache = {}
export function createElement(type, namespace) {
	
	return namespace 
		? _document.createElementNS(namespace, type) 
		: _document.createElement(type)
	
}