export function isPrimitive(value) {
  return !value || !{ function: 1, object: 1 }[typeof value]
}