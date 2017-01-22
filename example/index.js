'use strict'

const state = {
  title: "Hello World!",
  list: ["a", "b", "c"],
}

// by uncommenting the rules below all element textContent will be in uppercase
// const toUpperCase = value => value.toUpperCase()
// x.renderString(toUpperCase)

const component = x(
  Title,
  People
)

const dispatch = component('#root', state)