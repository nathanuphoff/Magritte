'use strict'
const assign = Object.assign

export const concat = data => array => array.concat(data)
export const filter = callback => array => array.filter(callback)
export const map = callback => array => array.map(callback)

export const appendNthString = n => map((item, index) => {
  if (index % n < 1) item.text += ' !!!'
  return item
})

export const swapArrayValues = (a, b) => array => {
  const length = array.length	
  if (a < length && b < length) {
    const result = array.slice()
    result[a] = array[b]
    result[b] = array[a]
    return result
  }
  else return array
}

// Table creation, taken from Vue benchmark
const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", 
  "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", 
  "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"]
  
const colors = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", 
  "black", "orange"]

const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", 
  "burger", "pizza", "mouse", "keyboard"]
    
function _random(max) {
  return Math.round(Math.random() * 1000) % max
}

let id = 1
export const createTableRows = count => {
  const data = new Array(count)
  for (let i = 0; i < count; i++) {
    data[i] = ({
      id: id++,
      text: `${adjectives[_random(adjectives.length)]} ` +
        `${colors[_random(colors.length)]} ` +
        `${nouns[_random(nouns.length)]}`,
      mtime: -1,
    })
  }
  return data
}