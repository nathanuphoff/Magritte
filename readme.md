# Magritte

A tiny reactive view library for the browser that relies on functional composition, and utilises a DOM abstraction with incremental updates. A one-directional data store is included that prevents runtime changes to the ‘kind of data’ of the state. From the initial state a store model is created that is used as a dispatcher, it keeps track of changes in the state and renders a new immutable state on each render cycle.

Key features are API simplicity, functional composition, store immutability, and *very little* boilerplate. 

[Give it a try on JSFiddle](https://jsfiddle.net/s110ax9g/3/)

To get started locally run `npm install` && `npm start`, then open [localhost:10001/example/](http://localhost:10001/example/) in your browser. This is not production ready.

## Features
- JSONML template syntax,
- A DOM abstraction with incremental rendering,
- A built in immutable store with a one-directional data flow,
- Full SVG support including xlink-attributes,
- Element attribute middleware,
- A functional interface,
- No build pipeline required,
- Give or take 5Kb in size (2Kb gzipped).

## Coming Soon™
- A router,
- Component lifecycle methods,
- Investigate JSX-compatibility (see magritte.element)

## Roadmap...
- Isomorphic rendering,
- Unit tests,
- Performance tests,
- Full documentation.


## Hello World!

You’ll need a root element,
```html
<div id="root"></div>
```

a component,
```javascript
const events = model => ({
	onclick: event => model.name('Jane')
})

const Title = ({ state, model }) => ['h1', events(model), `Hello ${state.name}!`]
```

an initial state,
```javascript
const initialState = { name: 'World' }
```

and some composition...
```javascript
// create a component
const component = magritte(Title) 

// and mount it to the #root element using the initialState
component('#root', initialState) 
```

## Component
A component can either be:
- A function: functions are resolved using the `store` as its arguments,
- A plain attributes-Object: `{ className: 'hello' }`,
- A content string or number: `'abc'` or `123`,
- An JSONML template as following: `['tagName', <child component>, <child component>, ...]`.

In addition `null`, `true`, or `false` are valid as well:
- Return `null` to remove an element from the DOM.
- Return `true` to force a re-render of the component using the augmented virtual DOM.
- Return `false` to skip rendering for the component and leave it as is.
- Return `undefined` to skip rendering for the component and leave it as is.

## Store
The store is an object that is passed to every component function, its properties are `state` and `model`.

### state
The state is a frozen object (no property reassignment) that keeps track of the application state. Supported data types are the same as those of JSON; null, a string, a number, an Array, or a child object. The state is a reflection of the state/model that was initially passed at component initialisation, this model should provide the data structure for the entire lifecycle of the application (see example/model). 

> By defining the model beforehand the developer is sure to abide to an existing data structure (no runtime changes) which at the same time has been documented as well.

### model
The `model` is a reflection of the state structure and will be passed to every functional component, its dispatch methods accept either:
- A function: functions are resolved using the current state value and the entire state object as its arguments, its return value is used to update the DOM.
- An Array: this will only update the state if its value was initially an Array, a warning will be logged otherwise.
- A string or number: this will only update the state if its value was initially a string or number, a warning will be logged otherwise.
- A boolean: this will only update the state if its value was initially a boolean, a warning will be logged otherwise.
- `undefined`: there will be no change, the component render method will not be initiated.
- `null`: this renders the `component` using the state that it was initially given (not implemented yet).


## API
### magritte

Magritte is a function that accepts any number of components, passing components returns another function that accepts a query-selector and the initial state.

```javasript
const component = x(One, Two, Three)

const selector = '#root'
const state = { greeting: "Hello Operator!" }

component(selector, state)
```

### #compose

Compose is a method that allows you to predefine element structures, this may be helpful to define global structural elements:

```javascript
// define an element structure
const pageSection = magritte.compose('page', { className: 'section' })

// ...and use it anywhere you like.
pageSection('This is a page section')
```

You can override the initial attributes by passing an alternative to the composed method:

```javascript
// set the input type to "text" by default
const input = magritte.compose('input', { type: 'text' })

// ...and override it if need be
input({ type: 'email', ... }) 
```

### #element
The `element` method is a wrapper for the JSONML interface and reminiscent of [hyperscript](https://github.com/dominictarr/hyperscript), it can be used as an alternative to the default syntax. It was designed as a foundation for JSX-compability (under consideration).

The following element...
```javascript
const Header = ({ state }) => ['header', { className: 'page' },
	['h1', state.title],
]
```

... can also be written like this:
```javascript
const { element } = magritte

const Header = ({ state }) => element('header', { className: 'page' },
	element('h1', state.title),
)
```
These two snippets above have an identical outcome.

### #handleAttributes
With handleAttributes you can define middleware that is responsible for setting attributes to an element. By default aria, data, viewBox, and xlink-attributes use a bespoke attribute handler to ensure compatibility with the DOM-API. By default the attribute value is set directly as the node property value, therefor a `class` attribute must be defined using the `Node.className` property name.

> The default bespoke methods are located at ./source/middleware/attributeHandlers.

### #route
Not implemented yet, will be used to define routed components.
