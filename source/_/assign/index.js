export function assign() {
	
	const data = arguments
	const result = data[0]
	const length = data.length
	let index = 0
	
	while (++index < length) {
		const object = data[index]
		for (const key in object) result[key] = object[key]
	}
	
	return result
	
}