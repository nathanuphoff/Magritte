import { assign } from './_'
import component, { route } from './component'
import { renderString, renderNumber, renderAttributes } from './content'

export default assign(component, { 
	renderString, 
	renderNumber,
	renderAttributes,
})