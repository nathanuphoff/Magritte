'use strict'
const assign = Object.assign

const concat = data => array => array.concat(data)
const filter = callback => array => array.filter(callback)
const map = callback => array => array.map(callback)

let id = 0
const controller = {
  
  appendNthString: n => map((item, index) => {
    if (index % n < 1) item.text += '!'
    return item
  }),
  
  createTableRows(amount) {
    
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

  },

}

