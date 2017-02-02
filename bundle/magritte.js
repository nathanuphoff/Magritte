var x = (function () {
'use strict';

var _Object$1 = Object;
var _Array = Array;
var _document = typeof document != 'undefined' ? document : {};
var _isNaN = isNaN;

var functionType = 'function';
var booleanType = 'boolean';
var objectType = 'object';
var stringType = 'string';
var numberType = 'number';

var arrayKind = 'Array';
var contentKind = 'content';
var listKind = 'list';

var _undefined = undefined;
var _null = null;



var emptyObject = {};

var w3Domain = 'http://www.w3.org/';
var svgNameSpace = w3Domain + '2000/svg';
var xlinkNameSpace = w3Domain + '1999/xlink';

var _pattern_ = 'p';
var _methods_ = 'm';

var assign = _Object$1.assign;

function createPropertyHandlers(cache) {

  return function (object) {
    var methods = assign(cache[_methods_] || {}, object);
    cache[_methods_] = methods;
    cache[_pattern_] = new RegExp('^' + _Object$1.keys(methods).join('|'));
    return cache;
  };
}

var freeze = _Object$1.freeze;

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

function freezeModelToState(model) {
  var state = {};
  for (var key in model) {
    var value = model[key];
    state[key] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == functionType ? value.next : freezeModelToState(value);
  }
  return freeze(state);
}

var isArray = _Array.isArray;

function isContent(value) {
  return value === _null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == stringType || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == numberType && !_isNaN(value);
}

function getStoreContentKind(value, type) {
  type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (isContent(value)) type = contentKind;else if (isArray(value)) type = arrayKind;
  return type;
}

function isBoolean(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == booleanType;
}

function isPlainObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) != stringType && value == '[object Object]';
}

function slice(value) {
  return [].slice.call(value, 0);
}

var _testStoreContent;

var testStoreContent = (_testStoreContent = {}, defineProperty(_testStoreContent, arrayKind, isArray), defineProperty(_testStoreContent, contentKind, isContent), defineProperty(_testStoreContent, booleanType, isBoolean), _testStoreContent);

function toLowerCase(value) {
  return value.toLowerCase(value);
}

function compose() {
  var base = slice(arguments);
  return function () {
    return base.concat(slice(arguments));
  };
}

function element() {
  return arguments;
}

var handleAttributes = createPropertyHandlers({});

// Public API methods

function resolveChild(content, store, type, kind, name) {

  type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  while (type == functionType) {
    name = content.name;
    content = content(store);
    type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  }

  if (type != booleanType) {
    if (content == _null) content = _null;else if (type == stringType || type == numberType) type = contentKind;else if (_typeof(content[0]) == stringType) type = listKind;
  }

  return [content, type, kind, name];
}

//
function createStore(component, state) {

  var time = void 0; // global timestamo
  var model = createStoreModel(state);

  return component({ state: freezeModelToState(model), model: model });

  function createStoreModel(value, host, path) {

    var structure = {};

    // plain objects form the layout of the model
    if (isPlainObject(value)) {
      for (var key in value) {
        var location = path ? path + '.' + key : key;
        structure[key] = createStoreModel(value[key], structure, location);
      }
      return structure;
    }
    // other types of values are considered content
    else {
        var _ret = function () {

          var kind = getStoreContentKind(value);
          if (kind) {
            var dispatch = function dispatch(next) {

              var last = structure.next;

              // resolve callback into value using the current value
              while ((typeof next === 'undefined' ? 'undefined' : _typeof(next)) == functionType) {
                next = next(last);
              } // reset the state of the value if ‘next’ equals null
              if (next === _null) next = structure.null;

              // proceed to typechecking otherwise
              if (next !== _undefined && next !== last) {

                // update the view if next has the proper content kind...
                if (testStoreContent[kind](next)) {

                  var object = host[path];
                  time = Date.now(); // update the store time

                  assign(object, { next: next, last: last, time: time });
                  assign(structure, object);

                  return component({ state: freezeModelToState(model), model: model });
                }
                // ...or log a warning otherwise
                else contentWarning({
                    value: next,
                    expected: kind,
                    received: getStoreContentKind(value),
                    path: path
                  });
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
          } else contentWarning({
            value: value,
            expected: 'content, boolean, or a list',
            received: getStoreContentKind(value),
            path: path
          });
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
  }
}

function contentWarning(_ref) {
  var value = _ref.value,
      path = _ref.path,
      expected = _ref.expected,
      received = _ref.received;

  console.warn("Value “" + value + "” provided to " + path + " is of the wrong kind:", {
    expected: expected,
    received: received
  });
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
  aria: function aria(node, key, value) {
    key = toLowerCase(key.replace(/([a-z])([A-Z])/g, '$1-$2'));
    setAttribute(node, key, value);
  },
  data: function data(node, key, value) {
    key = toLowerCase(key[4]) + key.substr(5);
    node.dataset[key] = value;
  },
  on: function on(node, key, value) {
    node[key] = handle;
    function handle(event) {
      value(event);
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

	return elementCache[type] = (elementCache[type] ? elementCache[type] : namespace ? _document.createElementNS(namespace, type) : _document.createElement(type)).cloneNode(false);
}

function renderContent(parent, content, abstract, store) {

  var createNode = !abstract.node || abstract.type;
  var node = createNode ? _document.createTextNode(content) : abstract.node;

  if (abstract && abstract.type) parent.replaceChild(node, abstract.node);else if (createNode) parent.appendChild(node);else if (abstract.content !== content) node.nodeValue = content;

  return { node: node, content: content };
}

function renderAttributes(node, content, abstract, namespace) {

  abstract = abstract || emptyObject;
  for (var key in content) {

    var value = content[key];
    if (value !== abstract[key]) {
      if (attributeHandlers[_pattern_].test(key)) {
        var match = key.match(attributeHandlers[_pattern_])[0];
        attributeHandlers[_methods_][match](node, key, value);
      } else if (namespace) setAttribute(node, key, value);else node[key] = value;
    }
  }

  return content;
}

var mount = _document.createEvent('Event').initEvent('mount', true, true);

function renderElement(parent, template, abstract, store, name, namespace) {

  var type = abstract.node === parent ? _null : template[0];
  if (type === 'svg') namespace = svgNameSpace;

  var createNode = abstract.name !== name || abstract.type !== type;
  var node = createNode ? createElement(type, namespace) : abstract.node;
  var vdom = createNode ? [type] : abstract.vdom;
  var attributes = {};

  // render element children
  var length = template.length;
  var index = !!type - 1;
  while (++index < length) {
    var _resolveChild = resolveChild(template[index], store),
        _resolveChild2 = slicedToArray(_resolveChild, 4),
        content = _resolveChild2[0],
        _type = _resolveChild2[1],
        kind = _resolveChild2[2],
        _name = _resolveChild2[3];

    var child = vdom[index] || emptyObject;

    if (content === true) {
      

      var _transformChild = transformChild(child.vdom);

      var _transformChild2 = slicedToArray(_transformChild, 4);

      content = _transformChild2[0];
      _type = _transformChild2[1];
      kind = _transformChild2[2];
      _name = _transformChild2[3];
    }if (_type == contentKind) {
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
  assign(attributes, renderAttributes(node, attributes, abstract.attributes, namespace));

  // add/remove children
  if (createNode) parent.appendChild(node);else while (index < vdom.length) {
    var _child = vdom[index];
    if (_child.node) node.removeChild(_child.node);
    index++;
  }
  vdom.length = length;

  // experimental: trigger custom lifecycle events
  if (createNode && attributes['onmount']) {
    node.addEventListener('mount', attributes['onmount'], false);
    node.dispatchEvent(mount);
  }

  return { node: node, type: type, vdom: vdom, name: name, attributes: attributes };
}

var render = function (node, template, abstract) {

  return function (store) {
    abstract = renderElement(node, template, abstract, store);
    return store;
  };
};

function factory() {

  var template = arguments;
  return function (selector, state, abstract) {

    var node = _document.querySelector(selector);
    node.innerHTML = ""; // todo: create initial abstract DOM tree from node.childNodes

    var component = render(node, template, {
      node: node,
      type: null,
      vdom: [],
      attributes: {}
    });

    return createStore(component, state).model;
  };
}

var index = assign(factory, { compose: compose, element: element, handleAttributes: handleAttributes });

return index;

}());
