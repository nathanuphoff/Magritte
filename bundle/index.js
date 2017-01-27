document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
var x = (function () {
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

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _contentTypes;

var _Object = Object;
var _Array = Array;
var _document = document;
var _isNaN = isNaN;

var functionType = 'function';
var booleanType = 'boolean';
var objectType = 'object';
var stringType = 'string';
var numberType = 'number';
var listType = 'list';

var _undefined = undefined;
var _null = null;



var emptyObject = {};
var contentTypes = (_contentTypes = {}, defineProperty(_contentTypes, stringType, 1), defineProperty(_contentTypes, numberType, 1), _contentTypes);

var namespaces = {
  svg: 'http://www.w3.org/2000/svg'
};

function assign() {

	var data = arguments;
	var result = data[0];
	var length = data.length;
	var index = 0;

	while (++index < length) {
		var object = data[index];
		for (var key in object) {
			result[key] = object[key];
		}
	}

	return result;
}

function createPropertyHandlers(defaultPattern) {

  var cache = {
    methods: {},
    pattern: defaultPattern
  };

  return function (object) {
    var methods = assign(cache.methods, object);
    var keys = Object.keys(methods).join('|');
    var pattern = keys ? new RegExp('^(' + keys + ')(.*)') : defaultPattern;
    return assign(cache, { methods: methods, pattern: pattern });
  };
}

var freeze = _Object.freeze;

function isArray(value) {
  return _Array.isArray(value);
}

function isBoolean(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == booleanType;
}

function isContent(value) {
  return value === _null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == stringType || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == numberType && !_isNaN(value);
}

function isPlainObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) != stringType && value == '[object Object]';
}

function slice(value) {
  return [].slice.call(value, 0);
}

function toLowerCase(value) {
  return value.toLowerCase(value);
}

var attribute = createPropertyHandlers(/(?!)/);

function compose() {
  var base = slice(arguments);
  return function () {
    return base.concat(slice(arguments));
  };
}

function element() {
  return arguments;
}

function route() {
  var parameters = arguments;
  return function (template) {
    return template;
  };
}

// export default function store(component, state, abstract) {

//   const initialState = assign({}, state)
//   function dispatch(action) {

//     const start = performance.now()

//     while (typeof action == functionType) action = action({ state, dispatch })

//     if (action === _null) action = initialState

//     if (action == '[object Object]') {
//       state = freeze(assign({}, state, action))      
//       abstract = component({ state, dispatch }, abstract)
//     }
//     else if (action != _null) {
//       console.warn("action is expected to be a function, plain Object, null, or undefined", action)
//     }

//     const duration = Math.floor((performance.now() - start) * 100) / 100
//     console.log('frame time: ' + duration + 'ms, ' + Math.floor(1e3 / duration) + 'fps')

//     return dispatch

//   }

//   return dispatch(state)

// }

//
var testContent = {
  list: isArray,
  content: isContent,
  boolean: isBoolean
};

function store(component, state, abstract) {

  var model = createModel(state);

  abstract = component({ state: freezeModelToState(model), model: model }, abstract);

  function createModel(value, host, path) {

    var structure = {};
    var time = Date.now();

    //
    if (isPlainObject(value)) {
      for (var key in value) {
        var location = path ? path + '.' + key : key;
        structure[key] = createModel(value[key], structure, location);
      }
      return structure;
    }
    //
    else {
        var _ret = function () {

          var kind = getContentKind(value);
          if (kind) {
            var dispatch = function dispatch(next) {

              var start = performance.now();
              var last = structure.next;

              // resolve callback into value using the current value
              while ((typeof next === 'undefined' ? 'undefined' : _typeof(next)) == functionType) {
                next = next(last);
              } // reset the state of the value if ‘next’ equals null
              if (next === _null) {
                console.log('reset', kind);
              }
              // proceed to typechecking otherwise
              else if (next !== _undefined && next !== last) {

                  time = Date.now();

                  if (testContent[kind](next)) {
                    var object = host[path];
                    assign(object, { next: next, last: last, time: time });
                    assign(structure, object);

                    abstract = component({ state: freezeModelToState(model), model: model }, abstract);

                    console.log(performance.now() - start);
                  } else contentWarning({
                    value: next,
                    expected: kind,
                    received: getContentKind(value),
                    path: path
                  });
                }
            };

            var changed = function changed(deep) {
              return structure.last !== structure.next;
            };

            var next = value;
            var last = structure.last;
            assign(structure, { next: next, last: last, time: time, path: path, kind: kind, changed: changed });

            return {
              v: assign(dispatch, structure)
            };
          } else contentWarning({
            value: value,
            expected: 'content, boolean, or a list',
            received: getContentKind(value),
            path: path
          });
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
  }
}

function freezeModelToState(model) {
  var cycle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'next';

  var state = {};
  for (var key in model) {
    var value = model[key];
    state[key] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == functionType ? value[cycle] : freezeModelToState(value, cycle);
  }
  return freeze(state);
}

function getContentKind(value, type) {
  type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (isContent(value)) type = 'content';else if (isArray(value)) type = 'list';else if (type == 'boolean') type = 'boolean';
  return type;
}

function contentWarning(_ref) {
  var value = _ref.value,
      path = _ref.path,
      expected = _ref.expected,
      received = _ref.received;

  received = getContentKind(value);
  console.warn("Value “" + value + "” provided to " + path + " is of the wrong kind:", {
    expected: expected,
    received: received
  });
}

function transformChild(content, store, type, kind) {

  // const pipe = type === _undefined
  type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  while (type == functionType) {
    content = content(store);
    type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  }

  // const flow = pipes[type]

  if (type != booleanType) {
    if (content == _null) content = _null;else if (!contentTypes[type] && _typeof(content[0]) == stringType) type = listType;
  }

  return [content, type, kind];
  // return pipe && flow
  //   ? distill(flow(content), store, type)
  //   : [content, type, kind]
}

function setAttribute(node, key, value, namespace) {
  if (value == _null || value === false) {
    namespace ? node.removeAttributeNS(namespace, key) : node.removeAttribute(key);
  } else {
    if (value === true) value = '';
    namespace ? node.setAttributeNS(namespace, key, value) : node.setAttribute(key, value);
  }
}

var attributeHandlers = attribute({
  data: function data(node, key, value, _ref) {
    var _ref2 = slicedToArray(_ref, 2),
        head = _ref2[0],
        tail = _ref2[1];

    key = toLowerCase(tail[0]) + tail.substr(1);
    node.dataset[key] = value;
  },
  xlink: function xlink(node, key, value, _ref3) {
    var _ref4 = slicedToArray(_ref3, 2),
        head = _ref4[0],
        tail = _ref4[1];

    key = head + ':' + toLowerCase(tail);
    setAttribute(node, key, value, 'http://www.w3.org/1999/xlink');
  },
  viewBox: function viewBox(node, key, value) {
    setAttribute(node, key, value);
  },
  aria: function aria(node, key, value) {
    key = toLowerCase(key.replace(/([a-z])([A-Z])/g, '$1-$2'));
    setAttribute(node, key, value);
  }
});

var elementCache = {};
function createElement(type, namespace) {

	return elementCache[type] = (elementCache[type] ? elementCache[type] : namespace ? _document.createElementNS(namespace, type) : _document.createElement(type)).cloneNode(false);
}

function renderContent(parent, content, abstract, store) {

  var createNode = !abstract.node || abstract.type;
  var node = createNode ? document.createTextNode(content) : abstract.node;

  if (abstract && abstract.type) parent.replaceChild(node, abstract.node);else if (createNode) parent.appendChild(node);else if (abstract.content !== content) node.nodeValue = content;

  return { node: node, content: content };
}

function renderAttributes(node, content, abstract, namespace) {

  abstract = abstract || emptyObject;
  for (var key in content) {

    var value = content[key];
    if (value !== abstract[key]) {
      var match = key.match(attributeHandlers.pattern);
      if (match) {
        var _match = slicedToArray(match, 3),
            _key = _match[0],
            head = _match[1],
            tail = _match[2];

        attributeHandlers.methods[head](node, _key, value, [head, tail]);
      } else if (namespace) setAttribute(node, key, value);else node[key] = value;
    }
  }

  return content;
}

function renderElement(parent, template, abstract, store, namespace) {

  abstract = abstract || emptyObject;
  var type = abstract.node === parent ? _null : template[0];
  namespace = namespace || namespaces[type];

  var createNode = type !== abstract.type;
  var node = createNode ? createElement(type, namespace) : abstract.node;

  var vdom = createNode ? [type] : abstract.vdom;
  var attributes = {};

  // render element child content
  var length = template.length;
  var index = !!type - 1;
  while (++index < length) {
    var _transformChild = transformChild(template[index], store),
        _transformChild2 = slicedToArray(_transformChild, 3),
        content = _transformChild2[0],
        _type = _transformChild2[1],
        kind = _transformChild2[2];

    var child = vdom[index] || emptyObject;

    if (content === true) {
      

      var _transformChild3 = transformChild(child.vdom);

      var _transformChild4 = slicedToArray(_transformChild3, 3);

      content = _transformChild4[0];
      _type = _transformChild4[1];
      kind = _transformChild4[2];
    }if (contentTypes[_type]) {
      vdom[index] = renderContent(node, content, child, store);
    } else if (_type == listType) {
      vdom[index] = renderElement(node, content, child, store, namespace);
    } else if (_type == objectType) {
      vdom[index] = _null;
      if (content == _null) {
        var childNode = child.node;
        if (childNode) node.removeChild(childNode);
      } else assign(attributes, content);
    } else vdom[index] = child;
  }

  // render element attributes
  attributes = renderAttributes(node, attributes, abstract.attributes, namespace);

  // add/remove children
  if (createNode) parent.appendChild(node);else while (index < vdom.length) {
    var _child = vdom[index];
    if (_child.node) node.removeChild(_child.node);
    index++;
  }
  vdom.length = length;

  return { node: node, type: type, vdom: vdom, attributes: attributes };
}

var render = function (node, template) {
  return function (store, abstract) {
    return renderElement(node, template, abstract || {
      node: node,
      type: null,
      vdom: [],
      attributes: {}
    }, store);
  };
};

function factory() {

  var template = arguments;
  return function (selector, state, abstract) {
    var root = _document.querySelector(selector);
    root.innerHTML = "";
    var component = render(root, template);
    return store(component, state, abstract);
  };
}

var index = assign(factory, {
  attribute: attribute,
  compose: compose,
  element: element,
  route: route
});

return index;

}());
