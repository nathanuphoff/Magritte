export function pipe(methods) {
  const length = methods.length
  let index = -1
	return function(value) {
    while (++index < length) value = methods[index](value)
    return value
  }
}