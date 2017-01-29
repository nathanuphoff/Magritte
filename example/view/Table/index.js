'use strict'

const testSVG = false
const size = {
  small: 1e3,
  large: 1e4,
}

// Events (ideally in its own file)
const TableEvents = model => ({

  deleteRow: index => event => {
    // dispatch({ table: removeAtIndex(index)(state.table) }) -> depricated
    model.table(removeAtIndex(index))
  },

  updateNthRow: n => event => {
  
    // in this example ‘updateNthItem’ is expected to be defined elsewhere
    const updateNthItem = n => map((item, index) => {
      if (index % n < 1) item.text += '!'
      return item
    })

    // if (table.length) {
    //   dispatch({ table: map(updateNthItem)(state.table) }) -> depricated
    // }

    model.table(updateNthItem(n))

  },

  selectRow: id => event => {
    event.preventDefault()    
    // if (id !== state.selected) dispatch({ selected: id }) -> depricated
    model.selected(id)
  },

  deleteAll: event => {
    // const { table } = state -> now obsolete
    // if (table.length) dispatch({ table: [] }) -> depricated
    model.table([])
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
  
  onmount: ({ target }) => {
    console.log(target.children)
  },

})

// Table component
const Table = ({ state, model }) => {
  
  const { table, selected } = model
  if (table.hasChanged() || selected.hasChanged()) {

    const { table, selected } = state
    const events = TableEvents(model)
    const { deleteAll, createNumberOfRows, addNumberOfRows, updateNthRow, swapRows, onmount } = events
    
    return [ 'div', { className: 'container', onmount },
      ['div', { className: 'jumbotron' },
        ['div', { className: 'row' },
          ['div', { className: 'col-md-6' },
            ['h1', "X"]
          ],
          ['div', { className: 'col-md-6' },
            ['div', { className: 'col-sm-6 smallpad' },
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: createNumberOfRows(size.small) }, 'Create 1.000 rows'],
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: addNumberOfRows(size.small) }, 'Append 1.000 rows'],
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: deleteAll }, 'Clear'],
            ],
            ['div', { className: 'col-sm-6 smallpad' },
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: createNumberOfRows(size.large) }, 'Create 10.000 rows'],
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: updateNthRow(10) }, 'Update every 10th row'],
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: swapRows }, 'Swap Rows'],
            ],
          ],
        ],
      ],
      [ 'table', { className: 'table table-hover table-striped test-data' },
        [ 'tbody', { id: 'tbody' }, ...map(TableRow(events, selected))(table)]
      ]
    ]
    
  }

}

const removeLabel = testSVG
  ? ['svg', { viewBox: '0 0 24 24', stroke: "red", strokeWidth: 2 }, ['use', { xlinkHref: '#i:remove' }]]
  : ['span', { ariaHidden: true, className: 'glyphicon glyphicon-remove' }]

// TableRow component
const TableRow = (events, selected) => ({ id, text, href, active }, index) => {

  const { selectRow, deleteRow, onmount } = events
  const className = selected === id ? 'danger' : ''

  return [ 'tr', { className },
      [ 'td', { className: 'id' }, id ], 
      [ 'td', { className: 'item' },
          [ 'a', { onclick: selectRow(id) }, text ]
      ],
      [ 'td', { className: 'action' },
        [ 'a', { onclick: deleteRow(index) }, removeLabel],
      ],
      [ 'td', { className: 'action' }],
    ]

}



