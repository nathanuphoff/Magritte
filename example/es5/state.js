const state = {

  title: "Hi!",

  table: {
    data: tableRows(100),
    tableRows,
  },

  route: route.state
  
}

function tableRows(amount) {
  return Array.apply(null, Array(amount)).map((_, id) => ({ id, text: "Item" }))
}




