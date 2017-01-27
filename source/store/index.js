import { 
  _null, _undefined, functionType, assign, freeze, 
  isArray, isBoolean, isContent, isPlainObject, isPrimitive 
} from '../_'

// export default function store(component, state, abstract) {

//   const initialState = assign({}, state)
//   function dispatch(action) {

//     const start = performance.now()

//     while (typeof action == functionType) action = action({ state, dispatch })

//     if (action === _null) action = initialState

//     if (action == '[object Object]') {
//       state = freeze(assign({}, state, action))      
//       abstract = component({ state, dispatch }, abstract)
//     }
//     else if (action != _null) {
//       console.warn("action is expected to be a function, plain Object, null, or undefined", action)
//     }

//     const duration = Math.floor((performance.now() - start) * 100) / 100
//     console.log('frame time: ' + duration + 'ms, ' + Math.floor(1e3 / duration) + 'fps')

//     return dispatch

//   }

//   return dispatch(state)

// }

//
const testContent = {
  list: isArray,
  content: isContent,
  boolean: isBoolean,
}

export default function store(component, state, abstract) {

  const model = createModel(state)
  
  abstract = component({ state: freezeModelToState(model), model }, abstract)

  function createModel(value, host, path) {
    
    const structure = {}
    let time = Date.now()

    //
    if (isPlainObject(value)) {
      for (const key in value) {
        const location = path ? path + '.' + key : key
        structure[key] = createModel(value[key], structure, location)
      }
      return structure
    }
    //
    else {

      const kind = getContentKind(value)
      if (kind) {

        const next = value
        const last = structure.last
        assign(structure, { next, last, time, path, kind, changed })
        
        return assign(dispatch, structure)

        function dispatch(next) {

          const start = performance.now()          
          const last = structure.next

          // resolve callback into value using the current value
          while (typeof next == functionType) next = next(last)

          // reset the state of the value if ‘next’ equals null
          if (next === _null) {
            console.log('reset', kind)
          }
          // proceed to typechecking otherwise
          else if (next !== _undefined && next !== last) {
            
            time = Date.now()

            if (testContent[kind](next)) {
              const object = host[path]   
              assign(object, { next, last, time })
              assign(structure, object)

              abstract = component({ state: freezeModelToState(model), model }, abstract)

              console.log(performance.now() - start)

            }
            else contentWarning({ 
              value: next,
              expected: kind, 
              received: getContentKind(value),
              path,
            })

          }

        }

        function changed(deep) {
          return structure.last !== structure.next
        }
        
      }
      else contentWarning({ 
        value, 
        expected: 'content, boolean, or a list', 
        received: getContentKind(value),
        path,
      })
      
    }
    
  }

}








function freezeModelToState(model, cycle = 'next') {
  const state = {}
  for (const key in model) {
    const value = model[key]
    state[key] = typeof value == functionType
      ? value[cycle]
      : freezeModelToState(value, cycle)
  }
  return freeze(state)
}

function getContentKind(value, type) {
  type = typeof value
  if (isContent(value)) type = 'content'
  else if (isArray(value)) type = 'list'
  else if (type == 'boolean') type = 'boolean'
  return type
}



function contentWarning({ value, path, expected, received }) {
  received = getContentKind(value)
  console.warn("Value “" + value + "” provided to " + path + " is of the wrong kind:", {
    expected,
    received
  })
}



