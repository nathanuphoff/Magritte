document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
var x = (function () {
'use strict';

var _Object$1 = Object;

var assign = _Object$1.assign;
var freeze = _Object$1.freeze;

var _document = document;
var _Array = Array;


var _null = null;


var objectType = 'object';
var nodeType = 'node';

function store(component, state, abstract) {

  var initialState = assign({}, state);

  function dispatch(action) {

    while (typeof action == 'function') {
      action = action({ state: state, dispatch: dispatch });
    }if (action === null) action = initialState;

    if (action == '[object Object]') {
      state = freeze(assign({}, state, action));
      abstract = component({ dispatch: dispatch, state: state }, abstract);
    } else if (action != null) {
      console.warn("action is expected to be a function, plain Object, null, or undefined", action);
    }

    return dispatch;
  }

  return dispatch(state);
}

var pipes = {};

var prepare = function prepare(key) {
  return function () {
    for (var _len = arguments.length, methods = Array(_len), _key = 0; _key < _len; _key++) {
      methods[_key] = arguments[_key];
    }

    switch (methods.length) {
      case 0:
        pipes[key] = null;
        break;
      case 1:
        pipes[key] = methods[0];
        break;
      default:
        pipes[key] = flow(methods);
    }
  };
};

var renderString = prepare('string');
var renderNumber = prepare('number');
var renderAttributes = prepare('object');

function flow(methods) {
  return function (value) {
    return methods.reduce(function (value, callback) {
      return callback(value);
    }, value);
  };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

function distill(content, store, type, kind) {

  var pipe = type === undefined;
  if (content == null) content = null;

  type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  while (type == 'function') {
    content = content(store);
    type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  }

  var flow = pipes[type];

  if (content instanceof _Array) {
    kind = content[0];
    type = 'node';
  } else if (/st|nu/.test(type)) {
    type = 'node';
  }

  return pipe && flow ? distill(flow(content), store, type) : [content, type, kind];
}

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

function renderAttributes$1(node, content, abstract) {
  if (abstract) for (var key in content) {
    if (abstract[key] !== content[key]) node[key] = content[key];
  } else for (var _key in content) {
    node[_key] = content[_key];
  }
  return content;
}

function renderElement(parent, template) {
  var abstract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var store = arguments[3];
  var namespace = arguments[4];


  var type = abstract.node === parent ? _null : template[0];
  if (type === 'svg') namespace = svgNamespace;

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
    }if (_type == nodeType) vdom[index] = (kind ? renderElement : renderContent)(node, content, child, store, namespace);else if (_type == objectType) {
      vdom[index] = _null;
      if (content == _null) {
        var childNode = child.node;
        if (childNode) node.removeChild(childNode);
      } else assign(attributes, content);
    } else vdom[index] = child;
  }

  // render element attributes
  assign(attributes, renderAttributes$1(node, attributes, abstract.attributes));

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

function component$1(node, template, abstract, store) {

  var start = performance.now();

  abstract = renderElement(node, template, abstract || {
    node: node,
    type: null,
    vdom: [],
    attributes: {}
  }, store);

  var duration = Math.floor((performance.now() - start) * 100) / 100;
  console.log('frame time: ' + duration + 'ms, fps: ' + Math.floor(1000 / duration));

  return abstract;
}

function render(root, template) {
  return function (store, abstract) {
    return component$1(root, template, abstract, store);
  };
}

var component = function () {

  var template = arguments;
  return function (selector, state, abstract) {
    var root = _document.querySelector(selector);
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
