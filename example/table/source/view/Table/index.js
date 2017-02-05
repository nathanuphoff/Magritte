import { map } from '../../controller'
import { TableRow } from '../TableRow'
import { events } from './events'

export const Table = ({ state, model }) => {
    
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
              ['button', { id: 'run', className: 'btn btn-primary btn-block', type: 'button', onclick: createNumberOfRows(1e3) }, 'Create 1.000 rows'],
            ],
            ['div', { className: 'col-sm-6 smallpad' },
              ['button', { id: 'runlots', className: 'btn btn-primary btn-block', type: 'button', onclick: createNumberOfRows(1e4) }, 'Create 10.000 rows'],
            ],
            ['div', { className: 'col-sm-6 smallpad' },
              ['button', { id: 'add', className: 'btn btn-primary btn-block', type: 'button', onclick: addNumberOfRows(1e3) }, 'Append 1.000 rows'],
            ],
            ['div', { className: 'col-sm-6 smallpad' },
              ['button', { id: 'update', className: 'btn btn-primary btn-block', type: 'button', onclick: update10thRow }, 'Update every 10th row'],
            ],
            ['div', { className: 'col-sm-6 smallpad' },
              ['button', { id: 'clear', className: 'btn btn-primary btn-block', type: 'button', onclick: deleteAll }, 'Clear'],
            ],
            ['div', { className: 'col-sm-6 smallpad' },
              ['button', { id: 'swaprows', className: 'btn btn-primary btn-block', type: 'button', onclick: swapRows }, 'Swap Rows'],
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


