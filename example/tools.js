
const compose = (...compostion) => (...content) => compostion.concat(content)

const h2 = compose('h2')
const h3 = compose('h3')
const ul = compose('ul')


const map = callback => array => array.map(callback)
const filter = callback => array => array.filter(callback)


const removeAtIndex = value => filter((item, index) => index !== value)
