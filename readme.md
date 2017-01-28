# X

An experimental view library utilising a DOM abstraction and reactive incremental rendering. A one-way data store is built in that makes sure you won’t change the ‘kind of data’ on dispatch. In addition the model keeps track on changes in the global state making conditional rendering a breeze.

[Try it on JSFiddle](https://jsfiddle.net/s110ax9g/)

To get started locally run `npm install` && `npm start`, then open localhost:10001/example/ in your browser.

## Why
To see if I could get a reactive virtual DOM library going while favouring composition over inheritance. *X* is entirely free of `this` and the store is passed to all child content by default. The template syntax is entirely JSON compatible and could therefore in theory be pre-rendered using any language.

### Features
- A DOM abstraction,
- Incremental updates,
- Built in immutable store,
- Supports SVG including xlink-attributes,
- ~~Template middleware~~,
- A functional interface,
- No build pipeline required,
- Give or take 5Kb in size (2Kb gzipped).

### Coming Soon™
- A router,
- A way to define an expected content structure for a component,
- Component lifecycle methods,
- Investigate JSX-compatibility (see x.element)
- ~~Store immutability~~.

### Maybe one day...
- Isomorphic rendering
- Unit tests,
- Performance tests,
- Full documentation.


## Usage

You’ll need a root element...
```html
<div id="root"></div>
```
... and some components
```javascript
const state = { name: "World" }

const events = model => ({
	onclick: event => model.name("Jane")
})

const Title = ({ state, model }) => ['h1', events(model), "Hello ", state.name, "!"]

const component = x(Title)

const dispatch = component('#root', state)
```

### Components
A component can either be:
- A function: functions are resolved using the `store` as its arguments.
- A plain attributes-Object: `{ className: "hello" }`
- A content string or number: `"Hello"` or `123`
- An Array template as following: `['tagName', <any of the above>, <any of the above>, ...]`

In addition `null`, `undefined`, `true`, or `false` are valid as well:
- Return `null` or `undefined` to remove an element from the DOM.
- Return `true` to force-render the component again using the augmented virtual DOM.
- Return `false` to skip rendering for the component and leave it as is.

### Store
The store is an object that is passed to every component function, its properties are `state` and `model`.

### state
The state is a frozen object (no property reassignment) that keeps track of the application state. Supported data types are the same as those of JSON; null, a string, a number, an Array, or a child object. The state is a reflection of the state/model that was initially passed at component initialisation, this model should provide the data structure for the entire lifecycle of the application (see example/model). 

> By defining the model beforehand the developer is sure to abide to an existing data structure (no runtime changes) which at the same time has been documented as well.

#### model
The `model` is a reflection of the state structure and will be passed to every functional component, its dispatch methods accept either:
- A function: functions are resolved using the current state value and the entire state object as its arguments, its return value is used to update the DOM.
- An Array: this will only update the state if its value was initially an Array, a warning will be logged otherwise.
- A string or number: this will only update the state if its value was initially a string or number, a warning will be logged otherwise.
- A boolean: this will only update the state if its value was initially a boolean, a warning will be logged otherwise.
- `undefined`: an update won’t be done and the component render method will not be initiated.
- `null`: this renders the `component` using the state that it was initially given (not implemented yet).
