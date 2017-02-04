import { 
  name, _null, _undefined, functionType, arrayKind, modelValues, warn, assign, freeze, isPlainObject,
  freezeModelToState, getType, getStoreContentKind, testStoreContent,
} from '../../_'

//
export function createStore(component, state, selector) {
  
  let time // global timestamo
  const model = createStoreModel(state)
  
  return component({ state: freezeModelToState(model), model })

  function createStoreModel(value, host, key, path) {
    
    const structure = {}
    
    // plain Objects defined the structure of the model
    if (isPlainObject(value)) {
      for (const key in value) {
        structure[key] = createStoreModel(value[key], structure, key, (path || 'model') + '.' + key)
      }
      return structure
    }
    // other types of values are considered content
    else {
      
      const kind = getStoreContentKind(value)
      if (testStoreContent[kind]) {

        assign(structure, { 
          next: value,
          last: _undefined,
          null: kind == arrayKind ? [] : value,
          time,
          path,
          kind,
          hasChanged,
        })
        
        return assign(dispatch, structure)

        function dispatch(value) {
                    
          const last = structure.next

          // resolve callback into value using the current value
          while (getType(value) == functionType) value = value(last)

          // reset the state of the value if ‘next’ equals null
          if (value === _null) value = structure.null

          // proceed to typechecking otherwise
          if (value !== _undefined && value !== last) {
            
            // update the view if next has the proper content kind...
            if (testStoreContent[kind](value)) {
              
              const object = host[key]   
              time = Date.now() // update the store time
              
              assign(object, { next: value, last, time })
              assign(structure, object)

              return component({ state: freezeModelToState(model), model })

            }
            // ...or log a warning otherwise
            else contentWarning(value, path, kind)

          }

        }

        function hasChanged(deep) { return structure.time === time }
        
      }
      else contentWarning(value, path, modelValues)
      
    }
    
  }

}

function contentWarning(value, path, expected) {
  warn(`${name}: invalid model value. (In '${path}(value)', value is "${value}" where ${expected} was expected)`)
}



