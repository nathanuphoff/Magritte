'use strict'

const testSVG = false
const size = {
  small: 1e3,
  large: 1e4,
}

// Events
const TableEvents = ({ dispatch, state }) => ({

  deleteRow: index => event => {
    const table = removeAtIndex(index)(state.table)
    dispatch({ table })
  },

  updateNthRow: n => event => {
    const table = map((item, index) => {
      if (index % n < 1) item.text += '!'
      return item
    })(state.table)
    if (table.length) dispatch({ table })
  },

  selectRow: id => event => {
    event.preventDefault()
    if (id != state.selected) dispatch({ selected: id })
  },

  deleteAll: event => {
    const { table } = state
    if (table.length) dispatch({ table: [] })
  },

  createNumberOfRows: amount => event => {
    const table = createTableRows(amount)
    dispatch({ table })
  },

  addNumberOfRows: amount => event => {
    const table = state.table.concat(createTableRows(amount))
    dispatch({ table })
  },

  swapRows: event => {
    const { table } = state
    if (table.length) {
      var a = table[4]
      table[4] = table[8]
      table[8] = a
      dispatch({ table })
    }
  },

})

let a = 0
const Table = ({ state, dispatch }) => {

  const { table, selected } = state
  const events = TableEvents({ state, dispatch })
  const { deleteAll, createNumberOfRows, addNumberOfRows, updateNthRow, swapRows } = events
  
  return [ 'div', { className: 'container' },
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
      [ 'tbody', { id: 'tbody' }, ...map(TableRow(events, selected, ++a))(table)]
    ]
  ]

}

const removeLabel = testSVG
  ? ['svg', { viewBox: '0 0 24 24', stroke: "red", strokeWidth: 2 }, ['use', { xlinkHref: '#i:remove' }]]
  : "x"

const TableRow = (events, selected, a) => ({ id, text, href, active }, index) => {

  const { selectRow, deleteRow } = events
  const className = selected === id ? 'active' : ''

  const y = a % 2 < 1 && [ 'tr', { className, key: id },
      [ 'td', { className: 'id' }, id ], 
      [ 'td', { className: 'item' },
          [ 'a', { href, onclick: selectRow(id) }, text ]
      ],
      [ 'td', { className: 'action' },
        [ 'button', { type: 'button', onclick: deleteRow(index) }, removeLabel],
      ],
      [ 'td', { className: 'action' }],
    ]

  // console.log('template', y)
  return y

}



