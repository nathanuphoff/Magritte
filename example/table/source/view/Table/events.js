import { appendNthString, createTableRows, swapArrayValues, concat } from '../../controller'

export const events = {

	update10thRow({ model }) {
		model.table(appendNthString(10))
	},

	deleteAll({ model }) {
		model.table(null)
	},

	createNumberOfRows: amount => ({ model }) => {
		model.table(createTableRows(amount))
	},

	addNumberOfRows: amount => ({ model }) => {
		model.table(concat(createTableRows(amount)))
	},

	swapRows({ model }) {
		model.table(swapArrayValues(4, 9))
	},

}