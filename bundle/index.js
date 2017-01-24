document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
var x = (function () {
'use strict';

function pipe(methods) {
  var length = methods.length;
  var index = -1;
  return function (value) {
    while (++index < length) {
      value = methods[index](value);
    }return value;
  };
}

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

var _Object = Object;

var freeze = _Object.freeze;

var _undefined = undefined;
var _null = null;

var functionType = 'function';
var booleanType = 'boolean';
var objectType = 'object';
var stringType = 'string';
var numberType = 'number';
var nodeType = 'node';

var svgNameSpace = 'http://www.w3.org/2000/svg';
var svgAttributeNameSpace = 'http://www.w3.org/1999/xlink';

var contentTypes = (_contentTypes = {}, defineProperty(_contentTypes, stringType, true), defineProperty(_contentTypes, numberType, true), _contentTypes);

function store(component, state, abstract) {

  var initialState = assign({}, state);

  function dispatch(action) {

    var start = performance.now();

    while (typeof action == 'function') {
      action = action({ state: state, dispatch: dispatch });
    }if (action === null) action = initialState;

    if (action == '[object Object]') {
      state = freeze(assign({}, state, action));
      abstract = component({ dispatch: dispatch, state: state }, abstract);
    } else if (action != null) {
      console.warn("action is expected to be a function, plain Object, null, or undefined", action);
    }

    var duration = Math.floor((performance.now() - start) * 100) / 100;
    console.log('frame time: ' + duration + 'ms, ' + Math.floor(1000 / duration) + 'fps');

    return dispatch;
  }

  return dispatch(state);
}

var elementCache = {};
function createElement(type, namespace) {

	return elementCache[type] = (elementCache[type] ? elementCache[type] : namespace ? _document.createElementNS(namespace, type) : _document.createElement(type)).cloneNode(false);
}

var pipes = {};

var prepare = function prepare(key) {
  return function () {
    var methods = arguments;
    var length = methods.length;
    pipes[key] = length > 1 ? pipe(methods) : length ? methods[0] : _null;
  };
};

var renderString = prepare(stringType);
var renderNumber = prepare(numberType);
var renderAttributes = prepare(objectType);

function distill(content, store, type, kind) {

  var pipe$$1 = type === _undefined;
  type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  while (type == functionType) {
    content = content(store);
    type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  }

  var flow = pipes[type];

  if (type != booleanType) {
    if (content == _null) content = _null;else if (contentTypes[type]) type = nodeType;else {
      kind = content[0];
      if ((typeof kind === 'undefined' ? 'undefined' : _typeof(kind)) == stringType) type = nodeType;
    }
  }

  return pipe$$1 && flow ? distill(flow(content), store, type) : [content, type, kind];
}

function renderContent(parent, content, abstract, store) {

  var createNode = !abstract.node || abstract.type;
  var node = createNode ? document.createTextNode(content) : abstract.node;

  if (abstract && abstract.type) parent.replaceChild(node, abstract.node);else if (createNode) parent.appendChild(node);else if (abstract.content !== content) node.nodeValue = content;

  return { node: node, content: content };
}

function renderAttributes$1(node, content) {
  var abstract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  for (var key in content) {
    var value = content[key];
    if (value !== abstract[key]) setAttribute(node, key, value);
  }
  return content;
}

function setAttribute(node, key, value) {
  var isDataAttribute = key.match(/^data([A-Z])(\w+)/);
  if (isDataAttribute) {
    var _key = isDataAttribute[1].toLowerCase() + isDataAttribute[2];
    node.dataset[_key] = value;
  } else node[key] = value;
}

function renderSVGAttributes(node, content) {
  var abstract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  for (var key in content) {
    var value = content[key];
    if (abstract[key] !== content[key]) {
      /^xlink/.test(key) ? node.setAttributeNS(svgAttributeNameSpace, key, content[key]) : node.setAttribute(key, content[key]);
    }
  }
  return content;
}

function renderElement(parent, template) {
  var abstract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var store = arguments[3];
  var namespace = arguments[4];


  var type = abstract.node === parent ? _null : template[0];
  if (type === 'svg') namespace = svgNameSpace;

  var createNode = type !== abstract.type;
  var node = createNode ? createElement(type, namespace) : abstract.node;

  var vdom = createNode ? [type] : abstract.vdom;
  var attributes = {};

  var length = template.length;
  var index = !!type - 1;
  while (++index < length) {
    var _distill = distill(template[index], store),
        _distill2 = slicedToArray(_distill, 3),
        content = _distill2[0],
        _type = _distill2[1],
        kind = _distill2[2];

    var child = vdom[index] || {};

    if (content === true) {
      

      var _distill3 = distill(child.vdom);

      var _distill4 = slicedToArray(_distill3, 3);

      content = _distill4[0];
      _type = _distill4[1];
      kind = _distill4[2];
    }if (_type == nodeType) {
      vdom[index] = (kind ? renderElement : renderContent)(node, content, child, store, namespace);
    } else if (_type == objectType) {
      vdom[index] = _null;
      if (content == _null) {
        var childNode = child.node;
        if (childNode) node.removeChild(childNode);
      } else assign(attributes, content);
    } else vdom[index] = child;
  }

  // render element attributes
  attributes = (namespace ? renderSVGAttributes : renderAttributes$1)(node, attributes, abstract.attributes);

  // add/remove children
  if (createNode) parent.appendChild(node);else while (index < vdom.length) {
    var _child = vdom[index];
    if (_child) node.removeChild(_child.node);
    index++;
  }
  vdom.length = length;

  // add/replace child elements


  return { node: node, type: type, vdom: vdom, attributes: attributes };
}

function render(node, template) {
  return function (store, abstract) {
    return renderElement(node, template, abstract || {
      node: node,
      type: null,
      vdom: [],
      attributes: {}
    }, store);
  };
}

var component = function () {

  var template = arguments;
  return function (selector, state, abstract) {
    var root = _document.querySelector(selector);
    root.innerHTML = "";
    var component = render(root, template);
    return store(component, state, abstract);
  };
};

var index = assign(component, {
	renderString: renderString,
	renderNumber: renderNumber,
	renderAttributes: renderAttributes
});

return index;

}());
