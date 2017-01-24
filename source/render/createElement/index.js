import { _document } from '../../_'

const elementCache = {}
export function createElement(type, namespace) {
	
	return elementCache[type] = (
		elementCache[type]
			? elementCache[type]
			: namespace ? _document.createElementNS(namespace, type) : _document.createElement(type)
	).cloneNode(false)
	
}