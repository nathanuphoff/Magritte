'use strict'
const map = callback => array => array.map(callback)
const filter = callback => array => array.filter(callback)
const assign = Object.assign

const toUpperCase = value => value.toUpperCase()

let id = 0

const controller = {

  removeAtIndex(value) {
    return filter((item, index) => index !== value)
  },
  
  createTableRows(amount) {

    // const start = performance.now()
    
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

    // console.log(performance.now() - start)

    return rows

  },

}

