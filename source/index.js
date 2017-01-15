import { assign } from './_'
import component from './component'
import render from './render'
import route from './route'
import store from './store'

export default assign(component, {
	render,
	route,
	store,
})