import { assign, freeze, _null } from '../_'

export default function store(component, state, abstract) {
  
  const initialState = assign({}, state)
  const model = defineStructure(state)

  function dispatch(action) {

    const start = performance.now()

    while (typeof action == 'function') action = action({ state, model, dispatch })

    if (action === _null) action = initialState

    if (action == '[object Object]') {
      state = freeze(assign({}, state, action))      
      abstract = component({ state, model, dispatch }, abstract)
    }
    else if (action != _null) {
      console.warn("action is expected to be a function, plain Object, null, or undefined", action)
    }

    const duration = Math.floor((performance.now() - start) * 100) / 100
    console.log('frame time: ' + duration + 'ms, ' + Math.floor(1e3 / duration) + 'fps')

    return dispatch

  }

  return dispatch(state)

}

//

function assignPrimitive(value) {
  console.log('test', value)
  return value
}

const primitiveTypes = {
  string: true,
  number: true,
  boolean: true,
}

const isArray = Array.isArray

const testContent = {
  Array: isArray,
  content: isPrimitiveValue
}

let timestamp
function defineStructure(value, path) {
  
  
  if (isPlainObject(value)) {
    const model = {}
    for (const key in value) model[key] = defineStructure(value[key], key)
    return model
  }
  else {
    
    let type = typeof value
    const structure = {
      value,
      path,
      time: Date.now(),
      changed() {
        console.log('get changed', value)
        return structure.time === timestamp && value !== structure.value 
      },
    }

    const isPrimitiveValue = isPritiveValue(value)
    if (isPrimitiveValue || isArray(value)) {
      
      type = isPrimitiveValue ? 'content' : 'Array'
      
      function push(update) {
        timestamp = Date.now()
        structure.time = timestamp        
        structure.value = value
        value = update
      }
      
      return assign(push, structure, { type })
      
    }
    else console.warn("state value is not valid:", value)
    
  }
  
}

function isPlainObject(value) {
  return typeof value != 'string' && value == '[object Object]'
}

function isPritiveValue(value) {
  return value == null || primitiveTypes[typeof value]
}





