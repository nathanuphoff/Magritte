// under construction
import { _null } from '../../_'

export function structure(assert) {	
	
	return function(template) {
		return function(data, b, c, d, e, f) {
			return true ? template(data, b, c, d, e, f) : _null
		}
	}
	
}