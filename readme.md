# Magritte
A tiny reactive view library for the browser with a functional interface and a virtual DOM abstraction. Key features include API simplicity, functional composition, store immutability, and *very little* boilerplate.

Magritte has a built in store model that provides an immutable state and a model dispatcher. The store dispatcher has a type-check mechanism that prevents runtime changes to the ‘[kind of content](https://github.com/nathanuphoff/Magritte/blob/master/example/model/index.js)’ in the state. Components that utilise functional composition are resolved using the store which means your state and model are available in every component.

## Features
- __fast__: a virtual DOM abstraction with incremental updates
- __safe__: an immutable one-directional data flow that prevents run-time changes to its structure
- __linguistic__: supports JSONML (default), hyperscript, *and* JSX template syntax
- __flexible__: attribute middleware and full SVG support including xlink-attributes
- __expressive__: A functional interface that favours composition
- __portable__: No build pipeline required
- __tiny__: a mere 5Kb minified (2Kb gzipped)

## Roadmap...
- A router,
- Component lifecycle methods,
- Isomorphic rendering,
- Unit tests,
- Performance tests,
- Full documentation.

## Getting Started
`npm install magritte` or download `bundle/magritte.js` to use it straight away. Magritte including its template syntax is plain JavaScript and can be used without any build pipeline.

[Demo on JSFiddle](https://jsfiddle.net/s110ax9g/4/)

> Beware that Magritte should not be used in production at this time and is prone to changes in its API.

### Hello World!
You’ll need a root element,
```html
<div id="root"></div>
```

a component,
```javascript
const events = {
	onclick({ model }) {
		model.name('Magritte')
	},
}

const Title = ({ state, model }) => ['h1', events, 'Hello ', state.name]
```

a store model with the initial state,
```javascript
const storeModel = { name: 'World!' }
```

and some composition...
```javascript
// create a component with a DOM selector and your root components
const component = magritte('#root', Title) 

// and render the component using the storeModel
component(storeModel) 
```

## Components
A component can be a:
- __`function`__: functions are resolved using the `store` as its arguments,
- __`string`__ or __`number`__: `'abc'` or `123`,
- an __`Object`__: `{ className: 'hello' }`,
- or an __`Array` template__: `['tagName', <child component>, <child component>, ...]`.

In addition `null`, `true`, `false`, or `undefined` are valid as well:
- __`null`__: remove an element from the DOM,
- __`true`__: force a re-render of the component using the augmented virtual DOM,
- __`false`__: skip rendering for the component and leave it as is,
- __`undefined`__: skip rendering for the component and leave it as is.

## Store
The store is an Object that is passed to every component function, its properties are `state` and `model`.

For a more detailed explanation and example see [./example/model/](https://github.com/nathanuphoff/Magritte/blob/master/example/model/index.js).

### state
The state is a frozen Object (no property reassignment) that keeps track of the application state. Supported data types are the same as those of JSON; null, a string or number, an Array, or an Object. The state is a reflection of the `storeModel` that was initially passed at component initialisation, this model should provide the data structure for the entire lifecycle of the application.

> By defining the model beforehand the developer is sure to abide to an existing data structure (no runtime changes) which at the same time has been documented as well.

### model
The `model` has a structure derived from the `storeModel` that was passed to the component at its first render and will be passed to every function in a component, its update-methods accepts a:
- __function__: resolved using the current value in the state and the entire state Object as its arguments, its return value is used to update the store and DOM if the state has changed,
- an __Array__: will update the state if its value was an `Array` initially, a warning will be logged otherwise.
- a __string__ or __number__: this will update the state if its value was initially a `string` or `number`, a warning will be logged otherwise,
- a __boolean__: this will only update the state if its value was initially a `boolean`, a warning will be logged otherwise.
- __undefined__: there will be no change, the render method will not be initiated.
- __null__: this renders the `component` using its initial storeModel state, an `Array` will be set to a new empty `Array`.


## API
### magritte(selector, children...)
Magritte is a function that accepts any number of components, the first argument however is expected to be a document query selector. After declaring the component it can be rendered using a storeModel that acts as the initial state, and the entire data structure of the component.

```javasript
const render = magritte('#root', One, Two, Three)

const storeModel = { greeting: "Hello Operator!" }

component(storeModel)
```

### magritte.compose(tagName, [children...])([children...])
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

###  magritte.element(tagName, [children...])
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

### magritte.handleAttributes(Object)
With handleAttributes you can define middleware that is responsible for setting attributes to an element. By default aria, data, viewBox, and xlink-attributes use a bespoke attribute handler to ensure compatibility with the DOM-API. By default the attribute value is set directly as the node property value, therefor a `class` attribute must be defined using the `Node.className` property name.

> The default bespoke methods are located at ./source/middleware/attributeHandlers.

### magritte.route()
Not implemented yet, will be used to define routed components.

### magritte.jsx(tagName, [attributes], [children])
Magritte can now be used with JSX, to do this use a Babel JSX plugin and set its pragma option to `'magritte.jsx'`. 

> Component child functions are no longer resolved using the `store` automatically, you can use jsx-props instead: `<Component item={item}/>` which passes an Object with an `item` property to a child component as usual.
