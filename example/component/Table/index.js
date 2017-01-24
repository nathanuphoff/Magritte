'use strict'

// Events
const TableEvents = ({ dispatch, state }) => ({

  deleteRow: index => event => {
    const data = removeAtIndex(index)(state.table.data)
    dispatch(assign(state.table, { data }))
  },

  updateNthRow: n => event => {
    const data = map((item, index) => {
      if (index % n < 1) item.text += '!'
      return item
    })(state.table.data)
    dispatch(assign(state.table, { data }))
  },

  selectRow: id => event => {
    event.preventDefault()
    const data = map(item => assign(item, { active: item.id === id }))(state.table.data)
    dispatch(assign(state.table, { data }))
  },
  
  searchRows: event => {
    const { target, keyCode } = event
    const { value } = target
    if (keyCode === 13 && state.table.search !== value) {
      const search = value
      dispatch(assign(state.table, { search }))
    }
  },

  deleteAll: event => {
    dispatch(assign(state.table, { data: [] }))
  },

  createNumberOfRows: amount => event => {
    const data = createTableRows(amount)
    dispatch(assign(state.table, { data }))
  },

  addNumberOfRows: amount => event => {
    const data = state.table.data.concat(createTableRows(amount))
    dispatch(assign(state.table, { data }))
  },

})

const TableRow = events => ({ id, text, href, active }, index) => {

  const { selectRow, deleteRow } = events
  const className = active ? 'active' : ''

  return [ 'tr', { className },
    [ 'td', { className: 'id' }, id ], 
    [ 'td', { className: 'item' },
        [ 'a', { href, onclick: selectRow(id) }, text ]
    ],
    [ 'td', { className: 'action' },
      [ 'button', { type: 'button', onclick: deleteRow(index) }, "x"],
    ],
  ]

}

const Table = ({ state, dispatch }) => {

  const { data, search } = state.table
  const events = TableEvents({ state, dispatch })
  const { deleteAll, createNumberOfRows, addNumberOfRows, updateNthRow } = events
  const searchPattern = search && new RegExp(search, 'i')
  
  return [ 'section',
    ['form', { dataName: { name: "hello" } },
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
      [ 'tbody', ...map(TableRow(events))(data)]
    ]
  ]

}



