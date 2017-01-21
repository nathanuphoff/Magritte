const Person = ({ dispatch }) => (value, index, list) => {

  const events = {
    onclick: event => {
      dispatch({ list: removeAtIndex(index)(list) })
    },
  }
  
  return ['li',
    value,
    ['button', events, { type: 'button', name: 'remove-person' }, '×']
  ]

}

const ListPeople = store => map(Person(store))

const People = ({ state, dispatch }) => {
  // console.log(state.list)
  return ['section',
    h2("People"),
    state.list.length 
      ? ul(...ListPeople({ state, dispatch })(state.list)) 
      : h3("Nothing here"),
  ]
}