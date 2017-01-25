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