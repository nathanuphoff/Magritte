'use strict'

const PageHeader = x.compose('header', { className: 'page', ariaRole: "Title" })

const TitleEvents = ({ model }) => ({
	onclick(event) {
		model.title("Let’s do this!")
		// console.log('changed title', model.title.changed(), model.title.next)
		// console.log('changed table', model.table.changed())
		
		// console.log('model', model)
		
		dispatch({ title: "Something something" })
	},
})

const Title = ({ state }) => {
	return PageHeader(['h1', TitleEvents, state.title])
}
