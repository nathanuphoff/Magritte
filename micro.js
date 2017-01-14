const micro = ((document, undefined) => {

	// Core
	const getType = value => typeof value
	const getLength = value => value.length

	// Utilities	
	// typechecking
	const isString = value => getType(value) == 'string'
	const isNumber = value => getType(value) == 'number' && !isNaN(value)
	const isContent = value => isString(value) || isNumber(value)

	const isBoolean = value => getType(value) == 'boolean'
	const isUndefined = value => value === undefined
	const isNull = value => value === null

	const isNumeric = value => isNumber(parseFloat(value))
	const isInteger = value => isNumber(value) && value === Math.floor(value)
	const isFloat = value => isNumber(value) && !isInteger(value)
	const isNegative = value => value <= 0 && 1/value !== 1/0
	const isPositive = value => !isNegative(value)
	const isFinite = value => Math.abs(value) != Infinity
	const isInfinite = value => !isFinite(value)
	const isLength = value => isInteger(value) && !isNegative(value)

	const isObject = value => !isString(value) && value == '[object Object]'	
	const isFunction = value => getType(value) == 'function'
	const isPrimitive = value => getType(value) != "object" && (!isFunction(value) || !isNull(value))

	const isInstance = (value, object) => value instanceof (isUndefined(object) ? Micro : object)
	const isVoid = value => isUndefined(value) || isNull(value) || (getType(value) == 'number' && isNaN(value))	
	const isRegExp = value => isInstance(value, RegExp)
	const isDate = value => isInstance(value, Date)
	const hasArrayBuffer = value => !isPrimitive(value) && isInstance(value.buffer, ArrayBuffer)

	const isArray = value => Array.isArray(value)
	const isNodeList = value => !isString(value) && value == '[object NodeList]'
	const isHTMLCollection = value => !isString(value) && value == '[object HTMLCollection]'
	const isArguments = value => !isString(value) && value == '[object Arguments]'
	const isTypedArray = value => hasArrayBuffer(value) && /Array$/.test(value.constructor.name)
	const isList = value => isArray(value)
		|| isNodeList(value)
		|| isHTMLCollection(value)
		|| isArguments(value)
		|| isTypedArray(value)
		
	// typecasting
	const toArray = value => isList(value) ? [].slice.call(value, 0) : [value]
	const extend = (...parameters) => reduce(parameters, (result, extension) => {
		forIn(extension, (value, key) => {
			if (isUndefined(result[key])) result[key] = value
		})
		return result
	}, {})

	const assign = (...parameters) => reduce(parameters, (result, extension) => {
		forIn(extension, (value, key) => result[key] = value)
		return result
	}, {})

	// iteration
	const each = (data, callback) => isList(data) ? forEach(data, callback): forIn(data, callback)
	const some = (data, callback) => !each(data, (...parameters) => callback(...parameters) === false)
	const none = (...parameters) => !some(...parameters)

	const and = (...callbacks) => value => forEach(callbacks, callback => callback(value))
	const or = (...callbacks) => value => some(callbacks, callback => callback(value))


	// Assert
	// number
	const max = ceiling => value => value <= ceiling
	const below = ceiling => value => value < ceiling
	const min = floor => value => floor <= value
	const above = floor => value => floor < value

	// object
	const extract =  (...path) => data => {
		if (!isPrimitive(data)) {
			const key = path[0]
			return getLength(path) < 2 ? match = data[key] : extract(...limit(path, 1))(data[key])
		}
	}

	// Array
	// manipulation
	const reduce = (callback, value) => data => {
		if (isUndefined(value)) {
			if (isObject(data)) value = {}
			else {
				data = toArray(data)
				value = data.pop()
			}
		}
		each(data, (...parameters) => value = callback(value, ...parameters))
		return value
	}

	const map = callback => data => reduce(data, (result, item, index, data) => {
		result[index] = callback(item, index, data)
		return result
	}, [])

	const filter = callback => data => reduce(data, (result, item, index, data) => {
		if (callback(item, index, data) !== false) result.push(item)
		return result
	}, [])

	const add = (...parameters) => reduce(parameters, (result, item) => {
		return result.concat(toArray(item))
	}, [])

	const limit = (array, floor, ceiling) => array.slice(floor, ceiling) // todo


	// DOM // todo
	const attribute = (element, data, value) => {
		if (isObject(data)) forIn(data, (value, name) => attribute(element, name, value))
		else if (isArray(data)) reduce(data, name => attribute(element, name, value), {})
		else if (isString(data)) {
			// prepare value
			if (isObject(value)) value = reduce(value, (result, check, name) => result.concat(check && name), [])
			if (isArray(value)) value = filter(value, isContent).join(' ')
			else if (value === true) value = ''
			// attribute manipulation
			if (isContent(value) || isBoolean(value)) element[data] = value
			else if (value === false) element.removeAttribute(data)
		}
	}

	const createElement = tagName => document.createElement(tagName)
	const createTextNode = content => document.createTextNode(content + '')
	const append = (parent, childNode) => (parent.appendChild(childNode), parent)
	const clear = element => {
		element.innerHTML = ''
		return element
	}
	const mount = (vdom, selector) => {
		const element = document.querySelector(selector)
		if (element) each(toArray(vdom), module => append(element, html(module)))
		return element
	}

	const html = (value = []) => {

		if (isContent(value)) return createTextNode(value)
		else if (isArray(value)) {
			const tagName = isString(value[0]) && value[0]
			return reduce(tagName ? limit(value, 1) : value, (parent, content) => {
				if (isContent(content)) append(parent, createTextNode(content + ''))
				else if (isArray(content)) append(parent, html(content))
				else if (isObject(content)) attribute(parent, content)
				return parent
			}, createElement(tagName || 'div'))		
		}

	}

	function forEach(array, callback, descending) {

		descending = descending === true
		const length = getLength(array)
		let index = descending ? length : 0
		let continued = true

		if (descending) while (--index && continued) continued = callback(array[index], index, array) !== false
		else do { continued = callback(array[index], index, array) !== false } while (++index < length && continued)

		return continued

	}

	function forIn(object, callback) {
		let continued = true
		for (let key in object) if (object.hasOwnProperty(key)) {
			continued = callback(object[key], key, object) !== false
			if (!continued) break
		}
		return continued
	}

	return {

		isString, isNumber, isContent, 
		isBoolean, isUndefined, isNull,
		isNumeric, isInteger, isFloat, isPositive, isNegative, isFinite, isInfinite, isLength,
		isObject, isFunction, isPrimitive, isInstance, isVoid, isRegExp, isDate,
		isArray, isNodeList, isHTMLCollection, isArguments, isTypedArray, isList,

		toArray, extend, assign,

		and, or,
		max, below, min, above,
		extract,

		each, some, none,
		add,
		reduce, filter, map,

		html, append, clear, mount,

	}
		
})(document)