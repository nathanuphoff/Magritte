document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
var x = (function () {
'use strict';

var _Object = Object;

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

function slice(value) {
  return [].slice.call(value, 0);
}

function toLowerCase(value) {
  return value.toLowerCase(value);
}

var freeze = _Object.freeze;

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

var _document = document;


var emptyObject = {};

var _null = null;

var functionType = 'function';
var booleanType = 'boolean';
var objectType = 'object';
var stringType = 'string';
var numberType = 'number';
var listType = 'list';

var contentTypes = (_contentTypes = {}, defineProperty(_contentTypes, stringType, 1), defineProperty(_contentTypes, numberType, 1), _contentTypes);

var namespaces = {
  svg: 'http://www.w3.org/2000/svg'
};

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

function store(component, state, abstract) {

  var initialState = assign({}, state);
  var model = defineStructure(state);

  function dispatch(action) {

    var start = performance.now();

    while (typeof action == 'function') {
      action = action({ state: state, model: model, dispatch: dispatch });
    }if (action === _null) action = initialState;

    if (action == '[object Object]') {
      state = freeze(assign({}, state, action));
      abstract = component({ state: state, model: model, dispatch: dispatch }, abstract);
    } else if (action != _null) {
      console.warn("action is expected to be a function, plain Object, null, or undefined", action);
    }

    var duration = Math.floor((performance.now() - start) * 100) / 100;
    console.log('frame time: ' + duration + 'ms, ' + Math.floor(1e3 / duration) + 'fps');

    return dispatch;
  }

  return dispatch(state);
}

var primitiveTypes = {
  string: true,
  number: true,
  boolean: true
};

var isArray = Array.isArray;

var timestamp = void 0;
function defineStructure(value, path) {

  if (isPlainObject(value)) {
    var model = {};
    for (var key in value) {
      model[key] = defineStructure(value[key], key);
    }return model;
  } else {
    var _ret = function () {

      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
      var structure = {
        value: value,
        path: path,
        time: Date.now(),
        changed: function changed() {
          console.log('get changed', value);
          return structure.time === timestamp && value !== structure.value;
        }
      };

      var isPrimitiveValue = isPritiveValue(value);
      if (isPrimitiveValue || isArray(value)) {
        var push = function push(update) {
          timestamp = Date.now();
          structure.time = timestamp;
          structure.value = value;
          value = update;
        };

        type = isPrimitiveValue ? 'content' : 'Array';

        return {
          v: assign(push, structure, { type: type })
        };
      } else console.warn("state value is not valid:", value);
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
}

function isPlainObject(value) {
  return typeof value != 'string' && value == '[object Object]';
}

function isPritiveValue(value) {
  return value == null || primitiveTypes[typeof value === 'undefined' ? 'undefined' : _typeof(value)];
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
