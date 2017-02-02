import { 
  _null, _undefined, functionType, arrayKind, assign, freeze, isPlainObject,
  freezeModelToState, getStoreContentKind, testStoreContent,
} from '../../_'

//
export function createStore(component, state) {
    
  let time // global timestamo
  const model = createStoreModel(state)
  
  return component({ state: freezeModelToState(model), model })

  function createStoreModel(value, host, path) {
    
    const structure = {}
    
    // plain objects form the layout of the model
    if (isPlainObject(value)) {
      for (const key in value) {
        const location = path ? path + '.' + key : key
        structure[key] = createStoreModel(value[key], structure, location)
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
          null: kind == arrayKind ? [] : value,
          time,
          path,
          kind,
          hasChanged,
        })
        
        return freeze(assign(dispatch, structure))

        function dispatch(next) {
          
          const last = structure.next

          // resolve callback into value using the current value
          while (typeof next == functionType) next = next(last)

          // reset the state of the value if ‘next’ equals null
          if (next === _null) next = structure.null

          // proceed to typechecking otherwise
          if (next !== _undefined && next !== last) {
            
            // update the view if next has the proper content kind...
            if (testStoreContent[kind](next)) {
              
              const object = host[path]   
              time = Date.now() // update the store time
              
              assign(object, { next, last, time })
              assign(structure, object)

              return component({ state: freezeModelToState(model), model })

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
        received: getStoreContentKind(value),
        path,
      })
      
    }
    
  }

}

function contentWarning({ value, path, expected, received }) {
  console.warn("Value “" + value + "” provided to " + path + " is of the wrong kind:", {
    expected,
    received
  })
}



