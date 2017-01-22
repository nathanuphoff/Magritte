'use strict'

const state = {
  title: "Hello World!",
  list: ["Nathan", "Irene", "Hans"],
}

const dispatch = x(
  Title,
  People
)('#app', state)

// console.log(dispatch.toString())