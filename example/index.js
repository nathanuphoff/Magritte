'use strict'

// x.attribute({
//   on(node, key, value, match) {
//     node[key] = value
//   },
// })

const { createTableRows, removeAtIndex } = controller
const { state } = model

const render = x(Table)

const dispatch = render('#root', state)