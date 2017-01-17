const TableRow = (item, index) => ({ dispatch, state }) => {

  const { id, text, href, selected } = item
  const { updateRowSelected, deleteRow } = events(dispatch)

  return [ 'tr', { className:selected && 'selected' },
    ['td', { className:'col-md-1' }, id],
    ['td', { className:'col-md-4' },
      ['a', { href, onclick:updateRowSelected(index) }, text, id > 50 ? 'a' : 'b']
    ],
    ['td', { className:'col-md-1' },
      ['button', { type:'button', onclick:deleteRow(index) },
        ['span', { className:'glyphicon glyphicon-remove', 'aria-hidden':true }, 'X'],
      ],
    ],
    ['td', { className:'col-md-4' }],
  ]

}

const Table = ({ dispatch, state }) => {

  const { data, list } = state.table
  const { updateTableData, createDataRows } = events(dispatch)
  const amount = 10
  
  return ['section',
    ['button', { type:'button', onclick: createDataRows(amount) }, `Add ${amount} rows` ],
    ['button', { type:'button', onclick: updateTableData }, `Replace all ${data.length} rows` ],
    ['table', { className:'table table-hover table-striped test-data' },
      ['tbody', ...data.map(TableRow)]
    ]
  ]

}

const Reverse = ({ dispatch, state }) => {
  const { updateTableData } = events(dispatch)
  return ['button', { onclick:updateTableData }, 'Reverse'] 
}

const ListHref= (item, index) => ['li', ['a', {href: '#' + index}, item]]
const ListItem = item => ['p', item]
const List = ({ state }) => ['ul', ...state.table.data.map(ListHref) ]


const Link = ({ dispatch, state }) => {
  const { query, hash } = events(dispatch)
  const message = randomWord()
  return ['div',
    ['a', { href: '/', onclick: query({ message }, message) }, `Replace ${message}` ],
    ['a', { href: `#${message}`, onclick: hash(message, message) }, `Push ${message}` ]
  ]
}


const { replace, push } = route
const events = dispatch => ({

  query: (parameters, title) => event => {
    event.preventDefault()
    dispatch.route(replace.query(parameters, title))
  },

  hash: (path, title) => event => {
    event.preventDefault()
    dispatch.route(push.hash(path, title))
  },

  updateTableData: event => {
    dispatch.table(state => Object.assign(state, { data: state.data.reverse() }))
  },

  updateRowSelected: id => event => {         
    event.preventDefault()
    dispatch.table(state => {
      const data = state.data.map(item => {
        item.selected = item.id === id
        return item
      })
      return Object.assign(state, { data })
    })
  },

  deleteRow: key => event => {
    dispatch.table(state => {
      const data = state.data.filter((item, index) => {
        return key !== index
      })
      return Object.assign(state, { data })
    })
  },

  createDataRows: amount => event => {
    dispatch.table(state => {
      const data = state.data.concat(tableRows(amount))
      return Object.assign(state, { data })
    })
  },

})