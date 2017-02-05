import { filter } from '../../controller'

export const events = id => ({

	deleteRow({ model }) {
		model.table(filter(item => id !== item.id))
	},

	selectRow({ event, model }) {
		event.preventDefault()  
		model.selected(id)
	},

})