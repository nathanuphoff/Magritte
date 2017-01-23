# X

This is an experimental view library using a virtual DOM. Updates to the DOM and virtual DOM are made simultaneously using recursion. There are no tests and no bundler is used. This is *not* production anything.

To try it run `npm install` && `npm start`, then open localhost:10001/example/ in your browser.

## Why
This is an experiment to see if I could get a reactive virtual DOM library going while favouring composition over inheritance. *X* is entirely free of `this` and all props are passed through children by default. The template syntax is entirely JSON compatible and could therefore theoretically be pre-rendered using any language.

## Features
- Virtual DOM,
- Incremental updates,
- Supports SVG including namespaced attributes,
- Built in store and dispatcher,
- Template middleware,
- A functional interface,
- No build pipeline required,
- Modular,
- Give or take 4Kb in size (1.5Kb with gzip).

## Coming Soon™
- A decoupled DOM (for isomorphic rendering),
- A router,
- Store immutability.

## Possibly never
- Unit tests,
- Performance tests,
- Full documentation.

## Basic Usage

You’ll need a root element...
```html
<div id="root"></div>
```
... and some components
```javascript
const state = { name: "World!" }

const Title = ({ state }) => ['h1', "Hello", state.name]

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
The store is a plain Object and is passed to every function component. Its properties are `state` and `dispatch`. The dispatcher is also returned when the component is mounted as seen in the snippet above.

#### Dispatch
The `dispatch` method is passed to every functional component, it accepts eiter:
- A function: functions are resolved using the current state as its argument, its return value is used to update the DOM.
- An object: you may directly pass an object which will be used to update the DOM.
- `undefined`: the dispatcher won’t be called and the DOM will not be updated.
- `null`: this renders the `component` using the state that it was initially given.