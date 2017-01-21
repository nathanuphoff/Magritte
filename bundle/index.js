document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
var x = (function () {
'use strict';

var _Object$1 = Object;

var assign = _Object$1.assign;
var freeze = _Object$1.freeze;

var _document = document;

var svgNameSpace = 'http://www.w3.org/2000/svg';
var svgPattern = /circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|symbol|text|tspan/;

function store(component, state, vDOM) {

  var initialState = assign({}, state);

  function dispatch(action) {

    while (typeof action == 'function') {
      action = action({ state: state, dispatch: dispatch });
    }if (action === null) action = initialState;

    if (action == '[object Object]') {
      state = freeze(assign({}, state, action));
      vDOM = component({ dispatch: dispatch, state: state }, vDOM);
    } else if (action != null) console.warn("action is expected to be a function, plain Object, null, or undefined", action);

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

var renderContent = prepare('content');


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

  type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  while (type == 'function') {
    content = content(store);
    type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
  }

  var flow = pipes[type];

  if (content != '[object Object]') {
    if (content instanceof Array) kind = content[0];else if (/st|nu/.test(type)) kind = null;
    type = 'node';
  }

  return pipe && flow ? distill(flow(content), store, type) : [content, type, kind];
}

var elementCache = {};
function createElement(type) {

	return elementCache[type] = (elementCache[type] ? elementCache[type] : svgPattern.test(type) ? _document.createElementNS(svgNameSpace, type) : _document.createElement(type)).cloneNode(false);
}

function renderContent$1(parent, node, content, abstract, store) {
  if (node) {
    // console.log('renderContent', node, content, abstract)
    node.nodeValue = content;
  } else {
    node = document.createTextNode(content);
    parent.appendChild(node);
  }
  return { content: content, node: node };
}

function renderElement(parent, x, template) {
  var abstract = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var store = arguments[4];


  var type = template[0];
  var newElement = abstract.type !== type;
  var node = newElement ? createElement(type) : abstract.node;
  var children = abstract.children || [];
  var childCount = 0;
  var child = node.firstChild;

  var length = template.length;
  var index = 0;
  while (++index < length) {
    var _distill = distill(template[index], store),
        _distill2 = slicedToArray(_distill, 3),
        content = _distill2[0],
        _type = _distill2[1],
        kind = _distill2[2];

    if (_type == 'node') {
      var method = kind ? renderElement : renderContent$1;
      children[childCount] = method(node, child, content, children[childCount], store);
      if (child) child = child.nextSibling;
      childCount++;
    } else if (_type == 'object') Object.assign(node, content);
  }

  if (newElement) {
    console.log(node);
    if (abstract.node) {
      parent.replaceChild(node, abstract.node);
    } else parent.appendChild(node);
  } else if (childCount < abstract.childCount) {
    while (child) {
      node.removeChild(child);
      child = child.nextSibling;
    }
    children.length = childCount;
  }

  return { type: type, node: node, children: children, childCount: childCount };
}

function component$1(parent, child, template) {
  var abstract = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var store = arguments[4];


  var index = -1;
  while (++index < template.length) {
    var _distill = distill(template[index], store),
        _distill2 = slicedToArray(_distill, 3),
        content = _distill2[0],
        type = _distill2[1],
        kind = _distill2[2];

    abstract[index] = renderElement(parent, child, content, abstract[index], store, true);
    if (child) child = child.nextSibling;
  }

  return abstract;
}

function render(root, template) {
  return function (store, vDOM) {
    return component$1(root, root.firstChild, template, vDOM, store);
  };
}

var component = function () {

  var template = arguments;
  return function (selector, state) {
    var vDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var root = _document.querySelector(selector);
    var component = render(root, template);
    return store(component, state, vDOM);
  };
};

var index = assign(component, { renderContent: renderContent });

return index;

}());
