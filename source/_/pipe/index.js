export function pipe(methods) {
	return value => methods.reduce((value, callback) => callback(value), value)
}