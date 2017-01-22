import { pipe } from '../../_'
export const pipes = {}

export const prepare = key => (...methods) => {
  const length = methods.length
  if (length) {
    if (length > 1) pipes[key] = pipe(methods)
    else pipes[key] = methods[0]
  }
}

export const renderString = prepare('string')
export const renderNumber = prepare('number')
export const renderAttributes = prepare('object')