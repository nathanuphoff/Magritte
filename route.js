var route = (function(document, location, undefined) {

  var _encodeURIComponent = encodeURIComponent
  var _decodeURIComponent = decodeURIComponent
  var _Object = Object
  var _ObjectAssign = _Object.assign
  var _ObjectKeys = _Object.keys
  
  // Utilities
  // URI encode
  function encodePath(breadcrumbs) { 
    return breadcrumbs
      .map(_encodeURIComponent)
      .join('/') 
  }

  function encodeHash(breadcrumbs) { 
    return '/#' + encodePath(breadcrumbs) 
  }


  function encodeQuery(query) {
    var keys = _ObjectKeys(query)
    return keys.length
      ? '/?' + keys.map(function(key) {
          return [ key, _encodeURIComponent(query[key]) ].join('=')
        }, '?').join('&')
      : ''
  }

  // URI decode
  function decodePath(pathname) { 
    return pathname.replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .split(/\/+/)
      .map(_decodeURIComponent)
  }

  function decodeQuery(querypath) { 
    return querypath
      .replace(/^\?/, '')
      .split(/\&/g)
      .reduce(decodeParameter, {})
  }

  function decodeParameter(object, parameter) {
    parameter = parameter.split('=')
    var key = parameter[0]
    if (key) object[key] = _decodeURIComponent(parameter[1])
    return object
  }

  //
  function createURI(route) {
    return route.root
      + encodePath(route.path)
      + encodeQuery(route.query)
      + encodeHash(route.hash)
  }


  //
  function assignRoute(update) {
    return _ObjectAssign(getState(location), update)
  }

  function assignQuery(parameters) {
    return assignRoute({ query: parameters })
  }

  function assignRouteAt(key, value) {
    var object = {}
    object[key] = value instanceof Array ? value : [value]
    return assignRoute(object)
  }

  // 
  function getState(location) {
    return {
      root: location.origin + '/',
      hash: decodePath(location.hash.replace(/^\#/, '')),
      path: decodePath(location.pathname),
      query: decodeQuery(location.search.replace(/\/+$/, '')),
    }
  }

  // History API Methods
  function replaceState(state, title, href) {
    history.replaceState(state, title, href)
  }

  function pushState(state, title, href) {
    history.pushState(state, title, href)
  }
  
  function update(method, state, title) {
    method(state, title, createURI(state))
    return state
  }

  function match(pattern, path) {
    path = getState(location).path
    console.log(pattern, path)
  }

  // Library Methods
  var methods = {
    replace: replaceState,
    push: pushState,
  }
  var methodNames = _ObjectKeys(methods)

  var library = methodNames.reduce(function(object, name, index){
    
    var name = methodNames[index]
    var method = methods[name]
    object[name] = {
      
      query: function(parameters, title) {
        return update(method, assignQuery(parameters), title)
      },

      path: function(value, title) {
        return update(method, assignRouteAt('path', value), title)
      },

      hash: function(value, title) {
        return update(method, assignRouteAt('hash', value), title)
      },

    }

    return object

  }, {})

  return _ObjectAssign(library, {
    
    get state(){ 
      return getState(location) 
    },

    match: match,

  })

})(document, location)
