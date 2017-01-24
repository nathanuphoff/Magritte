'use strict'

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
    dispatch({ table })
  },

  selectRow: id => event => {
    event.preventDefault()
    const table = map(item => assign(item, { active: item.id === id }))(state.table)
    dispatch({ table })
  },

  deleteAll: event => {
    dispatch({ table: [] })
  },

  createNumberOfRows: amount => event => {
    const table = createTableRows(amount)
    dispatch({ table })
  },

  addNumberOfRows: amount => event => {
    const table = state.table.concat(createTableRows(amount))
    dispatch({ table })
  },

})

const Table = ({ state, dispatch }) => {

  const { table } = state
  const events = TableEvents({ state, dispatch })
  const { deleteAll, createNumberOfRows, addNumberOfRows, updateNthRow } = events
  
  return [ 'section', { dataKind: "table" },
    ['form',
      [ 'button', { type: 'button', onclick: createNumberOfRows(1e3) }, 'Create 1.000 rows' ],
      [ 'button', { type: 'button', onclick: createNumberOfRows(1e4) }, 'Create 10.000 rows' ],
      [ 'button', { type: 'button', onclick: addNumberOfRows(1e3) }, 'Append 1.000 rows' ],
      [ 'button', { type: 'button', onclick: updateNthRow(10) }, 'Update every 10th row' ],
      [ 'button', { type: 'button', onclick: deleteAll }, 'Clear all rows' ],
    ],
    [ 'table', { className: 'table' },
      [ 'thead',
        [ 'td', { className: 'id' }, 'id' ],
        [ 'td', { className: 'item' }, 'value' ],
        [ 'td', { className: 'action' }, 'remove' ],
      ],
      [ 'tbody', ...map(TableRow(events))(table)]
    ]
  ]

}

const testSVG = false
const removeLabel = testSVG
  ? ['svg', { viewBox: '0 0 24 24', stroke: "red", strokeWidth: 2 }, ['use', { xlinkHref: '#i:remove' }]]
  : "x"

const TableRow = events => ({ id, text, href, active }, index) => {

  const { selectRow, deleteRow } = events
  const className = active ? 'active' : ''

  return [ 'tr', { className },
    [ 'td', { className: 'id' }, id ], 
    [ 'td', { className: 'item' },
        [ 'a', { href, onclick: selectRow(id) }, text ]
    ],
    [ 'td', { className: 'action' },
      [ 'button', { type: 'button', onclick: deleteRow(index) }, removeLabel],
    ],
  ]

}



