import { assign, freeze, _null } from '../_'

export default function store(component, state, abstract) {
  
  const initialState = assign({}, state)

  function dispatch(action) {

    const start = performance.now()

    while (typeof action == 'function') action = action({ state, dispatch })

    if (action === _null) action = initialState

    if (action == '[object Object]') {
      state = freeze(assign({}, state, action))      
      abstract = component({ dispatch, state }, abstract)
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

const contentTypes = {
  string: true,
  number: true,
  object: true,
  list: true,
  undefined: true,
}

const dispatch = defineStructure({ 
  meta: {
    title: "Define structure",
  },
  list: [], 
  name: "Nathan" 
})

dispatch.name("Hans")
dispatch.list([1, 2, 3])

console.log('last', dispatch.list.last)
console.log('next', dispatch.list.next)

dispatch.list.changed()

function defineStructure(value) {

  const type = typeof value
  let structure = {
    next: value,
    last: null,
    changed(deep) {
      return structure.next !== structure.last 
    },
    type,
  }

  function update(next) {
    structure.last = structure.next
    structure.next = next
  }

  if (type != 'string' && value == '[object Object]') {
    const props = {}
    for (const key in value) props[key] = defineStructure(value[key])
    structure = props
  }
  else {
    if (Array.isArray(value)) {
      structure.type = 'list'
      structure = assign(update, structure)
    }
    else if (contentTypes[type]) structure = assign(update, structure)
    else structure = console.warn("invalid state value supplied:", value)
  }
  
  return structure

}






