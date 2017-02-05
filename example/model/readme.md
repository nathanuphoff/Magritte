# The Store Model Explained
## Initialising
Attempting to add anything other than null, a string or number, a boolean, or an Array
will result in a contentWarning.

Nested Objects will be used to define the data structure, each content-property will be transformed 
to a dispatcher and recursively be frozen to a state Object on every render cycle. Both the 
model and state will be available from function components and event handlers (automatically). 

## Content properties
A boolean will be stored as a boolean-kind and its initial value will be cached, the same
concept applies to a string or number which share the same ‘content-kind’. By passing ‘null’ to 
the dispatch-method the state value will be reset to that of the initial storeModel.

An Array is of the Array-kind and its initial ‘null’-value does not encompass the values it holds.
If you pass ‘null’ to the dispatch-method of an Array it will be replaced by a new, empty Array.

The ‘kind of content’ cannot be changed during run-time, it will result in a contentWarning and
the value dispatched to the state will be ignored. 

Motivation for the store to be this strict:
- Immutability and fixed kinds of content prevent obscure run-time changes,
- This index.js with its storeModel as seen below will act as the documentation for the entire
	data structure of the application which makes it easy to reason about.