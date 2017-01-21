'use strict'
const goodbye = "Goodbye"

const events = ({ state, dispatch }) => ({

  onclick(event) {
    dispatch(state.title === goodbye ? null : { title: goodbye })
  },

})

const Title = ({ state }) =>
  ['h1', events, state.title, "!"]
