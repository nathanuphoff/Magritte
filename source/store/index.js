import { assign, freeze } from '../_'

export default function store(component, state, vDOM) {
  
  const initialState = assign({}, state)

  function dispatch(action) {

    while (typeof action == 'function') action = action({ state, dispatch })

    if (action === null) action = initialState

    if (action == '[object Object]') {
      state = freeze(assign({}, state, action))
      vDOM = component({ dispatch, state }, vDOM)
    }
    else if (action != null) console.warn("action is expected to be a function, plain Object, null, or undefined", action)
   
    return dispatch

  }

  return dispatch(state)

}