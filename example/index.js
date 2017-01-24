'use strict'

const { renderString } = x

const { createTableRows, removeAtIndex } = controller
const { state } = model

// renderString(toUpperCase) // string content middleware

const render = x(Title, Table)

const dispatch = render('#root', state)