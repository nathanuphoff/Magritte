import { assign } from './_'
import component, { compose, element, route } from './component'
import { renderString, renderNumber, renderAttributes } from './content'

export default assign(component, {
  compose,
  element,
	renderString, 
	renderNumber,
	renderAttributes,
})