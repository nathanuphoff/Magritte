// under construction
import { _null } from '../../_'

export function structure(assert) {	
	
	return function(template) {
		return function(data) {
			return true ? template(data) : _null
		}
	}
	
}