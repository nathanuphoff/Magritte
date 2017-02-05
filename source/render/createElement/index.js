import { _document, _false } from '../../_'

const elementCache = {}
export function createElement(type, namespace) {
			
	if (!elementCache[type]) {
		elementCache[type] = namespace 
			? _document.createElementNS(namespace, type) 
			: _document.createElement(type)
	}
	
	return elementCache[type].cloneNode(false)
	
}