'use strict'
/*
  # The Model Explained
  
  Attempting to add anything other than null, a string or number, a boolean, or an Array
  will result in a contentWarning.

  Nested Objects will be used as to the internal data structure, each property will be recursively
  frozen to a state Object on each render cycle, and transformed to a model dispatcher. Both the 
  model and state will be available from function components, and event handlers. 
  
  A boolean will be stored as of a boolean-kind and its initial value will be cached, the same
  concept applies to a string or number which share the ‘content-kind’. By passing ‘null’ to 
  the model dispatch-method the value will be reset to that of the initial storeModel.
  
  An Array is of the Array-kind and its initial ‘null’-value does not encompass the values it holds.
  If you pass ‘null’ to the dispatch-method of an Array it will be replaced by an new, empty Array.
  
  The ‘kind of content’ cannot be changed during run-time, it will result in a contentWarning and
  the value dispatched to the state will be ignored. 
  
  Motivation for the store to be as strict:
  - Immutability and fixed kinds of content prevent obscure run-time changes,
  - This file with its storeModel as seen below will act as the documentation for the entire
    data structure of the application which makes it easy to reason about.
  
*/

const storeModel = {
  
  title: "Magritte",
  table: [],
  selected: null,
  
  metadata: {
    author: "Nathan Uphoff",
  },

  // x: alert, // -> contentWarning

  nest: { // this is here to test ‘createModel’
    test: {
      string: "hello",
      boolean: true,
    },
    array: [],
  },
  
}