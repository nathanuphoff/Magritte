import { 
  _null, _undefined, functionType, assign, slice, freeze, isPlainObject,
  freezeModelToState, getStoreContentKind, testStoreContent,
} from '../_'

//
export default function store(component, state, abstract) {
  
  let time // global timestamo
  const model = createModel(state)  
  abstract = component({ state: freezeModelToState(model), model }, abstract)

  return freeze(model)

  function createModel(value, host, path) {
    
    const structure = {}
    
    // plain objects form the layout of the model
    if (isPlainObject(value)) {
      for (const key in value) {
        const location = path ? path + '.' + key : key
        structure[key] = createModel(value[key], structure, location)
      }
      return structure
    }
    // other types of values are considered content
    else {

      const kind = getStoreContentKind(value)
      if (kind) {

        assign(structure, { 
          next: value,
          last: _undefined,
          initial: kind == 'Array' ? slice(value) : value,
          time,
          path,
          kind,
          hasChanged
        })
        
        return assign(dispatch, structure)

        function dispatch(next) {

          const start = performance.now()          
          const last = structure.next

          // resolve callback into value using the current value
          while (typeof next == functionType) next = next(last)

          // reset the state of the value if ‘next’ equals null
          if (next === _null) next = structure.initial

          // proceed to typechecking otherwise
          if (next !== _undefined && next !== last) {
            
            // update the view if next is of the proper type...
            if (testStoreContent[kind](next)) {
              
              const object = host[path]   
              time = Date.now() // update the store time
              
              assign(object, { next, last, time })
              assign(structure, object)

              abstract = component({ state: freezeModelToState(model), model }, abstract)

              console.log(performance.now() - start)

            }
            // ...or log a warning otherwise
            else contentWarning({ 
              value: next,
              expected: kind, 
              received: getStoreContentKind(value),
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

function contentWarning({ value, path, expected, received }) {
  received = getStoreContentKind(value)
  console.warn("Value “" + value + "” provided to " + path + " is of the wrong kind:", {
    expected,
    received
  })
}



