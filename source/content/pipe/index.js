export const pipes = {}

export const prepare = key => (...methods) => {
  switch (methods.length) {
    case 0: pipes[key] = null
    break
    case 1: pipes[key] = methods[0]
    break
    default: pipes[key] = flow(methods)
  }
}

export const renderContent = prepare('content')
export const renderAttributes = prepare('object')

function flow(methods) {
  return value => methods.reduce((value, callback) => callback(value), value)
}