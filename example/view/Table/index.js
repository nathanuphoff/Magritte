'use strict'

const testSVG = false
const size = {
  small: 1e3,
  large: 1e4,
}

// Events
const TableEvents = ({ model, state }) => ({

  deleteRow: index => event => {
    // dispatch({ table: removeAtIndex(index)(state.table) }) -> depricated
    model.table(removeAtIndex(index))
  },

  updateNthRow: n => event => {

    function updateNthItem(item, index) {
      if (index % n < 1) item.text += '!'
      return item
    }

    // if (table.length) {
    //   dispatch({ table: map(updateNthItem)(state.table) }) -> depricated
    // }

    model.table(map(updateNthItem))

  },

  selectRow: id => event => {
    event.preventDefault()    
    if (id !== state.selected) {
      // dispatch({ selected: id }) -> depricated
      model.selected(id)
    }
  },

  deleteAll: event => {
    const { table } = state
    if (table.length) {
      // dispatch({ table: [] }) -> depricated
      model.table([])
    }
  },

  createNumberOfRows: amount => event => {
    // dispatch({ table: createTableRows(amount) }) -> depricated
    model.table(createTableRows(amount))
  },

  addNumberOfRows: amount => event => {
    
    // const table = state.table.concat(createTableRows(amount)) -> now obsolete
    // dispatch({ table }) ->depricated

    // in this example ‘concat’ is expected to be defined elsewhere
    const concat = data => array => array.concat(data)
    model.table(concat(createTableRows(amount)))

  },

  swapRows: event => {
    
    // const { table } = state -> now obsolete
    // if (table.length) {
    //   var a = table[4]
    //   table[4] = table[8]
    //   table[8] = a
    //   dispatch({ table }) -> depricated
    // }

    // the above would require a deep compare to attest wheter a change was made (bad)
    // let’s refactore:
    const swapArrayValues = (a, b) => array => {
      const result = array.slice()
      result[a] = array[b]
      result[b] = array[a]
      return result
    }
    
     model.table(swapArrayValues(4, 8)) 
    // now a new array is dispatched which allows for referential comparison

  },

})

const Table = ({ state, model }) => {

  console.log('table changed', model.table.changed())

  const { table, selected } = state
  const events = TableEvents({ state, model })
  const { deleteAll, createNumberOfRows, addNumberOfRows, updateNthRow, swapRows } = events
  
  return model.table.changed() && [ 'div', { className: 'container' },
    ['div', { className: 'jumbotron' },
      ['div', { className: 'row' },
        ['div', { className: 'col-md-6' },
          ['h1', "X"]
        ],
        ['div', { className: 'col-md-6' },
          ['button', { type: 'button', onclick: createNumberOfRows(size.small) }, 'Create 1.000 rows'],
          ['button', { type: 'button', onclick: createNumberOfRows(size.large) }, 'Create 10.000 rows'],
          ['button', { type: 'button', onclick: addNumberOfRows(size.small) }, 'Append 1.000 rows'],
          ['button', { type: 'button', onclick: updateNthRow(10) }, 'Update every 10th row'],
          ['button', { type: 'button', onclick: deleteAll }, 'Clear'],
          ['button', { type: 'button', onclick: swapRows }, 'Swap Rows'],
        ],
      ],
    ],
    [ 'table', { className: 'table' },
      [ 'tbody', { id: 'tbody' }, ...map(TableRow(events, selected))(table)]
    ]
  ]

}

const removeLabel = testSVG
  ? ['svg', { viewBox: '0 0 24 24', stroke: "red", strokeWidth: 2 }, ['use', { xlinkHref: '#i:remove' }]]
  : "x"

const TableRow = (events, selected) => ({ id, text, href, active }, index) => {

  const { selectRow, deleteRow } = events
  const className = selected === id ? 'active' : ''

  return [ 'tr', { className, key: id },
      [ 'td', { className: 'id' }, id ], 
      [ 'td', { className: 'item' },
          [ 'a', { href, onclick: selectRow(id) }, text ]
      ],
      [ 'td', { className: 'action' },
        [ 'button', { type: 'button', onclick: deleteRow(index) }, removeLabel],
      ],
      [ 'td', { className: 'action' }],
    ]

}



