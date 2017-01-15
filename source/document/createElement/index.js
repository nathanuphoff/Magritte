import { _document, svgNameSpace, svgPattern } from '../../_'

const elementCache = {}

export function createElement(type) {
	
	return elementCache[type] = (elementCache[type]
		? elementCache[type]
		: svgPattern.test(type)
			? _document.createElementNS(svgNameSpace, type)
			: _document.createElement(type)
	).cloneNode(false)
	
}