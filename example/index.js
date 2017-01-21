'use strict'

const title = store => {
  console.log('title', store)
  return ['h1', { className: 'test' }, "Hello"]
}

const dispatch = x(
  Title,
  People
)('#app', state)