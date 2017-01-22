'use strict'

const state = {
  title: "Hello World!",
  list: ["Nathan", "Irene", "Hans"],
}

// by uncommenting the rules below all element textContent will be in uppercase
// const toUpperCase = value => value.toUpperCase()
// x.renderString(toUpperCase)

const dispatch = x(
  Title,
  People
)('#app', state)