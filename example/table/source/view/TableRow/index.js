import { events } from './events'

export const TableRow = selected => item => {

	const { id, text, href, active } = item
	const { selectRow, deleteRow } = events(id)

	return [ 'tr', { className: selected === id ? 'danger' : '' },
		[ 'td', { className: 'id' }, id], 
		[ 'td', { className: 'item' },
				[ 'a', { onclick: selectRow }, text],
		],
		[ 'td', { className: 'action' },
			[ 'a', { onclick: deleteRow },
				['span', { ariaHidden: true, className: 'glyphicon glyphicon-remove' }]
			],
		],
		[ 'td', { className: 'action' }],
	]

}
