import { _null, pipe, stringType, numberType, objectType } from '../../_'
export const pipes = {}

export const prepare = key => function() {
  const methods = arguments
  const length = methods.length
  pipes[key] = length > 1 ? pipe(methods) : length ? methods[0] : _null
}

export const renderString = prepare(stringType)
export const renderNumber = prepare(numberType)
export const renderAttributes = prepare(objectType)