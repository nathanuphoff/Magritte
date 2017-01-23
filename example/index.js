'use strict'

const state = {
  title: "Hello World!",
  list: ["a", "b", "c"],
  table: {
    data: [],
    search: '',
  },
}

// by uncommenting the rules below all element textContent will be in uppercase
// const toUpperCase = value => value.toUpperCase()
// x.renderString(toUpperCase)

const component = x(Table)

const dispatch = component('#root', state)

let id = 0
function createTableRows(amount) {

  const string = 'The HTML tables allow web authors to arrange data like text, images, links, other tables, etc. into rows and columns of cells'
  const stringLength = string.length

  const randomInt = ceiling => {
    return Math.round(Math.random() * ceiling)
  }

  const randomSlice = (string, length) => {
    const halfway = Math.round(length / 2)
    const offset = randomInt(halfway)
    return string.substring(offset, halfway + offset)
  }

  const toHash = string => string.trim().replace(/\W+/g, '-').toLowerCase()

  const rowCount = amount
  const rows = []
  let index = -1

  while (++index < rowCount) { 
    const value = randomSlice(string, stringLength)
    rows[index] = {
      id: id++,
      text: value,
      href: 'http://' + toHash(value),
      active: false,
    }
  }

  return rows

}
