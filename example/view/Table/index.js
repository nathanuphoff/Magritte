'use strict'

const testSVG = false
const size = {
  small: 1e3,
  large: 1e4,
}

// Events (ideally in its own file)
const events = {
  
  update10thRow({ model }) {
    model.table(appendNthString(10))
  },

  deleteAll({ model }) {
    // model.table('hello') // this will result in a content warning
    model.table(null) // null resets table to its initial state
  },

  createNumberOfRows: amount => ({ model }) => {
    model.table(createTableRows(amount))
  },

  addNumberOfRows: amount => ({ model }) => {
    model.table(concat(createTableRows(amount)))
  },

  swapRows({ model }) {

    const swapArrayValues = (a, b) => array => {
      const result = array.slice()
      result[a] = array[b]
      result[b] = array[a]
      return result
    }
    
    model.table(swapArrayValues(4, 8))
    
  },

}

// Table component
const Table = ({ state, model }) => {
    
  const { table, selected } = model
  if (table.hasChanged() || selected.hasChanged()) {
    
    const { title, table, selected } = state
    const { deleteAll, createNumberOfRows, addNumberOfRows, update10thRow, swapRows } = events

    return [ 'div', { className: 'container' },
      ['div', { className: 'jumbotron' },
        ['div', { className: 'row' },
          ['div', { className: 'col-md-6' },
            ['h1', title],
          ],
          ['div', { className: 'col-md-6' },
            ['div', { className: 'col-sm-6 smallpad' },
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: createNumberOfRows(size.small) }, 'Create 1.000 rows'],
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: addNumberOfRows(size.small) }, 'Append 1.000 rows'],
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: deleteAll }, 'Clear'],
            ],
            ['div', { className: 'col-sm-6 smallpad' },
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: createNumberOfRows(size.large) }, 'Create 10.000 rows'],
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: update10thRow }, 'Update every 10th row'],
              ['button', { className: 'btn btn-primary btn-block', type: 'button', onclick: swapRows }, 'Swap Rows'],
            ],
          ],
        ],
      ],
      [ 'table', { className: 'table table-hover table-striped test-data' },
        [ 'tbody', { id: 'tbody' }, ...map(TableRow(selected))(table)],
      ],
    ]

  }

}

const removeLabel = testSVG
  ? ['svg', { viewBox: '0 0 24 24', stroke: "red", strokeWidth: 2 }, ['use', { xlinkHref: '#i:remove' }]]
  : ['span', { ariaHidden: true, className: 'glyphicon glyphicon-remove' }]
  
  
const TableRowEvents = id => ({
  
  deleteRow({ model }) {
    model.table(filter(item => id !== item.id))
  },
  
  selectRow({ event, model }) {
    event.preventDefault()  
    model.selected(id)
  },
  
})

// TableRow component
const TableRow = selected => item => {

  const { id, text, href, active } = item
  const { selectRow, deleteRow } = TableRowEvents(id)
  const className = selected === id ? 'danger' : ''
  
  return [ 'tr', { className },
    [ 'td', { className: 'id' }, id], 
    [ 'td', { className: 'item' },
        [ 'a', { onclick: selectRow, href: "afaf" }, text],
    ],
    [ 'td', { className: 'action' },
      [ 'a', { onclick: deleteRow }, removeLabel],
    ],
    [ 'td', { className: 'action' }],
  ]

}



