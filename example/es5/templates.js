'use strict'

const events2 = dispatch => ({
  onclick: event => { 
    dispatch.title("Goodbye")
  }
})

const Title = ({ dispatch, state }) =>
  ['h1', events2(dispatch), state.title]
