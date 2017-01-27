'use strict'
const { compose } = x

const PageHeader = compose('header', { className: 'page', ariaRole: "Title" })

const TitleEvents = ({ model }) => ({
	onclick(event) {
		model.title(value => value + "!")
	},
})

const Title = ({ state }) => {
	return PageHeader(['h1', TitleEvents, state.title])
}
