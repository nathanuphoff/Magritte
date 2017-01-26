'use strict'
const { compose } = x

const PageHeader = compose('header', { className: 'page', ariaRole: "Title" })

let i = 0
let count = 0

const TitleEvents = ({ model, state }) => ({
	onclick(event) {
		console.log(model)
	},
})

const Title = ({ state, model }) => {
	return PageHeader(['h1', TitleEvents, model.title.next])
}
