import { 
  _null, _undefined, functionType, assign, freeze, 
  isArray, isBoolean, isContent, isPlainObject, isPrimitive 
} from '../_'

//
export default function store(component, state, abstract) {
  
  let time
  const model = createModel(state)
  const testContent = {
    list: isArray,
    content: isContent,
    boolean: isBoolean,
  }
  
  abstract = component({ state: freezeModelToState(model), model }, abstract)

  function createModel(value, host, path) {
    
    const structure = {}
    
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
        assign(structure, { next, last, time, path, kind, hasChanged })
        
        return assign(dispatch, structure)

        function dispatch(next) {

          const start = performance.now()          
          const last = structure.next

          // resolve callback into value using the current value
          while (typeof next == functionType) next = next(last)

          // reset the state of the value if ‘next’ equals null
          if (next === _null) {
            console.log('reset ' + path + ' to initial value (todo)')
          }
          // proceed to typechecking otherwise
          else if (next !== _undefined && next !== last) {
            
            if (testContent[kind](next)) {
              
              const object = host[path]   
              time = Date.now() // update the store time
              
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

        function hasChanged(deep) {
          return structure.time === time
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



