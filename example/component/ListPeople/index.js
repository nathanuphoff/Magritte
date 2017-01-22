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

const People = ({ state, dispatch }) =>
  ['section',
    state.list.length ? h2("People") : true,
    state.list.length 
      ? ul(...ListPeople({ state, dispatch })(state.list)) 
      : null,
  ]