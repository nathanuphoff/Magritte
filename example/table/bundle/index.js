document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
(function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

function getType(value) {
  return typeof value;
}

var name = 'Magritte';

var _Object$1 = Object;
var _Array = Array;
var _document = typeof document != 'undefined' ? document : {};
var _isNaN = isNaN;
var _console = console;
var warn = _console.warn;
var error$1 = _console.error;
var functionType = getType(getType);
var booleanType = getType(!0);
var objectType = getType({});
var stringType = getType('');
var numberType = getType(0);

var listKind = 'list';
var booleanKind = 'a ' + booleanType;
var arrayKind = 'an Array';
var contentKind = 'a ' + stringType + ' or ' + numberType;
var modelValues = ['null', contentKind, booleanKind, 'or ' + arrayKind].join(', ');

var _undefined = undefined;
var _null = null;
var _true = true;

var emptyObject = {};

var w3Domain = 'http://www.w3.org/';
var svgNameSpace = w3Domain + '2000/svg';
var xlinkNameSpace = w3Domain + '1999/xlink';

var _pattern_ = 'p';
var _methods_ = 'm';

var assign = _Object$1.assign;

function concat(array, addition) {
  return array.concat(addition);
}

function createPropertyHandlers(cache) {

  return function (object) {
    var methods = assign(cache[_methods_] || {}, object);
    cache[_methods_] = methods;
    cache[_pattern_] = new RegExp('^' + _Object$1.keys(methods).join('|'));
    return cache;
  };
}

function freezeModelToState(model) {
  var state = {};
  for (var key in model) {
    var value = model[key];
    state[key] = getType(value) == functionType ? value.next : freezeModelToState(value);
  }
  return state; // freeze
}

var isArray = _Array.isArray;

function isBoolean(value) {
  return getType(value) == booleanType;
}

function isContent(value) {
  var type = getType(value);
  return value === _null || type == stringType || type == numberType && !_isNaN(value);
}

function getStoreContentKind(value, type) {
  type = getType(value);
  if (isBoolean(value)) type = booleanKind;else if (isContent(value)) type = contentKind;else if (isArray(value)) type = arrayKind;
  return type;
}

function isPlainObject(value) {
  return getType(value) != stringType && value == '[object Object]';
}

function slice(value, start, end) {
  return [].slice.call(value, start, end);
}

var _testStoreContent;

var testStoreContent = (_testStoreContent = {}, defineProperty(_testStoreContent, arrayKind, isArray), defineProperty(_testStoreContent, contentKind, isContent), defineProperty(_testStoreContent, booleanKind, isBoolean), _testStoreContent);

function toLowerCase(value) {
  return value.toLowerCase(value);
}

var cache = {};

function compose() {
  var base = slice(arguments);
  return function () {
    return concat(base, slice(arguments));
  };
}

function element() {
  return arguments;
}

var handleAttributes = createPropertyHandlers({});

function jsx$1(tag, attributes, children) {

  if (children) {
    var firstChild = children[0];
    if (getType(firstChild[0]) != stringType) children = firstChild;
  }

  return concat([tag, attributes], children);
}

// Public API methods

function resolveChild(content, abstract, store, type, name$$1) {

  type = typeof content;
  while (type == functionType) {
    name$$1 = content.name;
    content = content(store);
    type = typeof content;
  }

  if (content === _true) {
    name$$1 = content.name;
    content = abstract.content;
    type = content.type;
  }

  if (type != booleanType) {
    if (content == _null) content = _null;else if (type == stringType || type == numberType) type = contentKind;else if (_typeof(content[0]) == stringType) type = listKind;
  }

  return [content, type, name$$1];
}

//
function createStore(component, state, selector) {

  var time = void 0; // global timestamo
  var model = createStoreModel(state);

  return component({ state: freezeModelToState(model), model: model });

  function createStoreModel(value, host, key, path) {

    var structure = {};

    // plain Objects defined the structure of the model
    if (isPlainObject(value)) {
      for (var _key in value) {
        structure[_key] = createStoreModel(value[_key], structure, _key, (path || 'model') + '.' + _key);
      }
      return structure;
    }
    // other types of values are considered content
    else {
        var _ret = function () {

          var kind = getStoreContentKind(value);
          if (testStoreContent[kind]) {
            var dispatch = function dispatch(value) {

              var last = structure.next;

              // resolve callback into value using the current value
              while (getType(value) == functionType) {
                value = value(last);
              } // reset the state of the value if ‘next’ equals null
              if (value === _null) value = structure.null;

              // proceed to typechecking otherwise
              if (value !== _undefined && value !== last) {

                // update the view if next has the proper content kind...
                if (testStoreContent[kind](value)) {

                  var object = host[key];
                  time = Date.now(); // update the store time

                  assign(object, { next: value, last: last, time: time });
                  assign(structure, object);

                  return component({ state: freezeModelToState(model), model: model });
                }
                // ...or log a warning otherwise
                else contentWarning(value, path, kind);
              }
            };

            var hasChanged = function hasChanged(deep) {
              return structure.time === time;
            };

            assign(structure, {
              next: value,
              last: _undefined,
              null: kind == arrayKind ? [] : value,
              time: time,
              path: path,
              kind: kind,
              hasChanged: hasChanged
            });

            return {
              v: assign(dispatch, structure)
            };
          } else contentWarning(value, path, modelValues);
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
  }
}

function contentWarning(value, path, expected) {
  warn(name + ': invalid model value. (In \'' + path + '(value)\', value is "' + value + '" where ' + expected + ' was expected)');
}

function setAttribute(node, key, value, namespace) {
  if (value == _null || value === false) {
    namespace ? node.removeAttributeNS(namespace, key) : node.removeAttribute(key);
  } else {
    if (value === true) value = '';
    namespace ? node.setAttributeNS(namespace, key, value) : node.setAttribute(key, value);
  }
}

var attributeHandlers = handleAttributes({
  aria: function aria(node, key, value, store) {
    key = toLowerCase(key.replace(/([a-z])([A-Z])/g, '$1-$2'));
    setAttribute(node, key, value);
  },
  data: function data(node, key, value, store) {
    key = toLowerCase(key[4]) + key.substr(5);
    node.dataset[key] = value;
  },
  on: function on(node, key, value) {
    node[key] = handle;
    function handle(event) {
      value(assign({}, cache['#root'], { event: event }));
    }
  },

  viewBox: setAttribute,

  xlink: function xlink(node, key, value) {
    key = toLowerCase(key.replace(/([a-z])([A-Z])/g, '$1:$2'));
    setAttribute(node, key, value, xlinkNameSpace);
  }
});

var elementCache = {};
function createElement(type, namespace) {

  if (!elementCache[type]) {
    elementCache[type] = namespace ? _document.createElementNS(namespace, type) : _document.createElement(type);
  }

  return elementCache[type].cloneNode(false);
}

function renderContent(parent, content, abstract, store) {

  var createNode = !abstract.node || abstract.type;
  var node = createNode ? _document.createTextNode(content) : abstract.node;

  if (abstract && abstract.type) parent.replaceChild(node, abstract.node);else if (createNode) parent.appendChild(node);else if (abstract.content !== content) node.nodeValue = content;

  return { node: node, content: content };
}

function renderAttributes(node, content, abstract, store, namespace) {

  abstract = abstract || emptyObject;
  for (var key in content) {

    var value = content[key];
    if (value !== abstract[key]) {
      if (attributeHandlers[_pattern_].test(key)) {
        var match = key.match(attributeHandlers[_pattern_])[0];
        attributeHandlers[_methods_][match](node, key, value, store);
      } else if (namespace) setAttribute(node, key, value);else node[key] = value;
    }
  }

  return content;
}

// const mount = _document.createEvent('Event').initEvent('mount', true, true)

function renderElement(parent, template, abstract, store, name$$1, namespace) {

  var type = abstract.node === parent ? _null : template[0];
  if (type === 'svg') namespace = svgNameSpace;

  var createNode = abstract.name !== name$$1 || abstract.type !== type;
  var node = createNode ? createElement(type, namespace) : abstract.node;
  var vdom = createNode ? [type] : abstract.vdom;
  var attributes = {};

  // render element children
  var length = template.length;
  var index = !!type - 1;
  while (++index < length) {

    var child = vdom[index] || emptyObject;

    var resolved = resolveChild(template[index], child, store);
    var content = resolved[0];
    var _type = resolved[1];
    var _name = resolved[2];

    if (_type == contentKind) {
      vdom[index] = renderContent(node, content, child, store);
    } else if (_type == listKind) {
      vdom[index] = renderElement(node, content, child, store, _name, namespace);
    } else if (_type == objectType) {
      vdom[index] = _null;
      if (content == _null) {
        var childNode = child.node;
        if (childNode) node.removeChild(childNode);
      } else assign(attributes, content);
    } else vdom[index] = child;
  }

  // render element attributes
  assign(attributes, renderAttributes(node, attributes, abstract.attributes, store, namespace));

  // add/remove children
  if (createNode) parent.appendChild(node);else while (index < vdom.length) {
    var _child = vdom[index];
    if (_child.node) node.removeChild(_child.node);
    index++;
  }
  vdom.length = length;

  // experimental: trigger custom lifecycle events
  // if (createNode && attributes['onmount']) {
  //   node.addEventListener('mount', attributes['onmount'], false)
  //   node.dispatchEvent(mount)
  // }

  return { node: node, type: type, name: name$$1, vdom: vdom, attributes: attributes };
}

var render$1 = function (node, selector, template, abstract) {

  return function (store) {
    cache[selector] = store;
    abstract = renderElement(node, template, abstract, store);
    return store;
  };
};

function factory(selector) {

  var template = slice(arguments, 1);
  var node = _document.querySelector(selector);

  if (selector in cache) error$1(name + ': selector must be unique. (In \'magritte(selector), selector \'' + selector + '\' is used before)');else cache[selector] = {};

  return node ? function (state) {

    node.innerHTML = ""; // todo: create abstract DOM from node.childNodes
    var component = render$1(node, selector, template, {
      node: node,
      type: null,
      vdom: [],
      attributes: {}
    });

    return createStore(component, state).model;
  } : error$1(name + ': root element does not exist. (In \'magritte(selector), selector \'' + selector + '\' does not match any document element)');
}

var index = assign(factory, { cache: cache, compose: compose, element: element, handleAttributes: handleAttributes, jsx: jsx$1 });

var index_1$1 = index;

var storeModel = {
  title: "Magritte",
  table: [],
  selected: null
};

var concat$1 = function concat$1(data) {
  return function (array) {
    return array.concat(data);
  };
};
var filter = function filter(callback) {
  return function (array) {
    return array.filter(callback);
  };
};
var map = function map(callback) {
  return function (array) {
    return array.map(callback);
  };
};

var appendNthString = function appendNthString(n) {
  return map(function (item, index) {
    if (index % n < 1) item.text += ' !!!';
    return item;
  });
};

var swapArrayValues = function swapArrayValues(a, b) {
  return function (array) {
    var length = array.length;
    if (a < length && b < length) {
      var result = array.slice();
      result[a] = array[b];
      result[b] = array[a];
      return result;
    } else return array;
  };
};

// Table creation, taken from Vue benchmark
var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];

var colors = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];

var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];

function _random(max) {
  return Math.round(Math.random() * 1000) % max;
}

var id = 1;
var createTableRows = function createTableRows(count) {
  var data = new Array(count);
  for (var i = 0; i < count; i++) {
    data[i] = {
      id: id++,
      text: adjectives[_random(adjectives.length)] + ' ' + (colors[_random(colors.length)] + ' ') + ('' + nouns[_random(nouns.length)]),
      mtime: -1
    };
  }
  return data;
};

var events = function events(id) {
	return {
		deleteRow: function deleteRow(_ref) {
			var model = _ref.model;

			model.table(filter(function (item) {
				return id !== item.id;
			}));
		},
		selectRow: function selectRow(_ref2) {
			var event = _ref2.event,
			    model = _ref2.model;

			event.preventDefault();
			model.selected(id);
		}
	};
};

var TableRow = function TableRow(selected) {
	return function (item) {
		var id = item.id,
		    text = item.text,
		    href = item.href,
		    active = item.active;

		var _events = events(id),
		    selectRow = _events.selectRow,
		    deleteRow = _events.deleteRow;

		return ['tr', { className: selected === id ? 'danger' : '' }, ['td', { className: 'id' }, id], ['td', { className: 'item' }, ['a', { onclick: selectRow }, text]], ['td', { className: 'action' }, ['a', { onclick: deleteRow }, ['span', { ariaHidden: true, className: 'glyphicon glyphicon-remove' }]]], ['td', { className: 'action' }]];
	};
};

var events$1 = {
	update10thRow: function update10thRow(_ref) {
		var model = _ref.model;

		model.table(appendNthString(10));
	},
	deleteAll: function deleteAll(_ref2) {
		var model = _ref2.model;

		model.table(null);
	},


	createNumberOfRows: function createNumberOfRows(amount) {
		return function (_ref3) {
			var model = _ref3.model;

			model.table(createTableRows(amount));
		};
	},

	addNumberOfRows: function addNumberOfRows(amount) {
		return function (_ref4) {
			var model = _ref4.model;

			model.table(concat$1(createTableRows(amount)));
		};
	},

	swapRows: function swapRows(_ref5) {
		var model = _ref5.model;

		model.table(swapArrayValues(4, 9));
	}
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Table = function Table(_ref) {
  var state = _ref.state,
      model = _ref.model;
  var table = model.table,
      selected = model.selected;

  if (table.hasChanged() || selected.hasChanged()) {
    var title = state.title,
        _table = state.table,
        _selected = state.selected;
    var deleteAll = events$1.deleteAll,
        createNumberOfRows = events$1.createNumberOfRows,
        addNumberOfRows = events$1.addNumberOfRows,
        update10thRow = events$1.update10thRow,
        swapRows = events$1.swapRows;


    return ['div', { className: 'container' }, ['div', { className: 'jumbotron' }, ['div', { className: 'row' }, ['div', { className: 'col-md-6' }, ['h1', title]], ['div', { className: 'col-md-6' }, ['div', { className: 'col-sm-6 smallpad' }, ['button', { id: 'run', className: 'btn btn-primary btn-block', type: 'button', onclick: createNumberOfRows(1e3) }, 'Create 1.000 rows']], ['div', { className: 'col-sm-6 smallpad' }, ['button', { id: 'runlots', className: 'btn btn-primary btn-block', type: 'button', onclick: createNumberOfRows(1e4) }, 'Create 10.000 rows']], ['div', { className: 'col-sm-6 smallpad' }, ['button', { id: 'add', className: 'btn btn-primary btn-block', type: 'button', onclick: addNumberOfRows(1e3) }, 'Append 1.000 rows']], ['div', { className: 'col-sm-6 smallpad' }, ['button', { id: 'update', className: 'btn btn-primary btn-block', type: 'button', onclick: update10thRow }, 'Update every 10th row']], ['div', { className: 'col-sm-6 smallpad' }, ['button', { id: 'clear', className: 'btn btn-primary btn-block', type: 'button', onclick: deleteAll }, 'Clear']], ['div', { className: 'col-sm-6 smallpad' }, ['button', { id: 'swaprows', className: 'btn btn-primary btn-block', type: 'button', onclick: swapRows }, 'Swap Rows']]]]], ['table', { className: 'table table-hover table-striped test-data' }, ['tbody', { id: 'tbody' }].concat(toConsumableArray(map(TableRow(_selected))(_table)))]];
  }
};

var render = index_1$1('#root', Table);

render(storeModel);

}());
