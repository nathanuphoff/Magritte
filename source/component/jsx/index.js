import { concat, stringType } from '../../_'

export function jsx(tag, attributes, children) {

	if (children) {
		const firstChild = children[0]
		if (typeof firstChild[0] != stringType) children = firstChild
	}

	return concat([tag, attributes], children)

}