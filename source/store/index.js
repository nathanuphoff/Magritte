import { assign, freeze, _null } from '../_'

export default function store(component, state, abstract) {
  
  const initialState = assign({}, state)
  const model = defineStructure(state)
  const nextState = structureToState(model, 'next')

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
    // console.log('frame time: ' + duration + 'ms, ' + Math.floor(1e3 / duration) + 'fps')

    return dispatch

  }

  return dispatch(state)

}

//

const primitiveTypes = {
  string: true,
  number: true,
  boolean: true,
}

const isArray = Array.isArray

const testContent = {
  Array: isArray,
  primitive: isPrimitive
}

function structureToState(structure, cycle) {
  const state = {}
  for (const key in structure) {
    const value = structure[key]
    state[key] = typeof value == 'function'
      ? value[cycle]
      : structureToState(value, cycle)
  }
  return freeze(state)
}


function defineStructure(value, host, path) {
  
  let time = Date.now()
  const structure = {}

  if (isPlainObject(value)) {
    for (const key in value) {
      const location = path ? path + '.' + key : key
      structure[key] = defineStructure(value[key], structure, location)
    }
    return structure
  }
  else {
    
    const isPrimitiveValue = isPrimitive(value)
    if (isPrimitiveValue || isArray(value)) {
      
      const type = isPrimitiveValue ? 'primitive' : 'Array'
      const next = value
      
      assign(structure, { next, time, path, type, changed })

      function changed(deep) {
        return time !== structure.time && structure.last !== structure.next
      }
      
      function dispatch(next) {
        const last = structure.next
        if (testContent[type](next)) {
          if (last !== next) {
            const object = host[path]            
            assign(object, { next, last, time: Date.now() })
            assign(structure, object)
          }
        }
        else console.warn("The ‘next’ value  provided to dispatch." + path + "() is of the wrong type: ", { last, next })
      }
      
      return assign(dispatch, structure)
      
    }
    else console.warn("state value is not valid, expected a" + type, value)
    
  }
  
}

function isPlainObject(value) {
  return typeof value != 'string' && value == '[object Object]'
}

function isPrimitive(value) {
  return value == null || primitiveTypes[typeof value]
}





