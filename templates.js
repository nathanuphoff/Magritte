const events2 = dispatch => ({
  onclick: event => { 
    dispatch({ title: "Goodbye" })
  }
})

const Title = ({ dispatch }) =>
  ['h1', events2(dispatch), state.title]
