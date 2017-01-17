const map = callback => data => data.map(callback)
const reduce = (callback, value) => data => data.reduce(callback, value)

var view = (function(document, undefined) {

  const _render = methods => value => {
    return methods[value == null ? 'void' : value.constructor === Array ? 'array' : typeof value]
  }

  const update = _render({
    array: console.log,
    void: console.log,
    string: console.log,
    number: console.log,
    object: console.log,
    boolean: console.log,
  })
  
  const setAttributeContent = (node, key, content) => node[key] = content

  const setAttribute = _render({
    function: setAttributeContent,
    array: (node, key, content) => {
      const value = content.map(value => contentPattern.test(typeof value) ? value : '').join(' ').trim()
      return value.length ? node[key] = value : null
    },
    void: _ => undefined,
    string: setAttributeContent,
    number: setAttributeContent,
    boolean: (node, key, content) => (node[key] = content ? content : false, content),
  })



  var svgPattern = /circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|symbol|text|tspan/i
  var svgNameSpace = 'http://www.w3.org/2000/svg'
  var xlinkNameSpace = 'http://www.w3.org/1999/xlink'

  var contentPattern = /^st|nu/
  var typeFunction = 'function'
  var typeObject = 'object'
  var _Array = Array
  var _SVGElement = SVGElement
  function spread(value) { return [].slice.call(value) }

  // component
  function updateComponents(root, components, vDOM = [], state) {
  
    var childNodes = root.childNodes
    var length = components.length
    var index = -1

    if (vDOM.length) {

      while (++index < length) {
        
<<<<<<< Updated upstream
        const $component = childNodes[index]      
        let component = components[index]
        
        while (typeof component === typeFunction) component = component(state)
        
        if (component instanceof _Array) {
          vDOM[index] = updateElement($root, $component, component, vDOM[index], state)
        }
        else if (contentPattern.test(componentType)) {
          vDOM[index] = updateContent($root, $component, component, vDOM[index], state)
        }
        else vDOM[index] = null
                
        
=======
        var component = components[index]
        var node = childNodes[index]
        var vContent = vDOM[index]

        var type = typeof component
        while (type === typeFunction) {
          component = component(state)
          type = typeof component
        }

        if (component == null) {
          vDOM[index] = component
        }
        else if (component instanceof _Array) {
          vDOM[index] = updateElement(root, node, component, vContent, state)
        }
        else if (contentPattern.test(type)) {
          vDOM[index] = updateContent(root, node, component, vContent, state)
        }

>>>>>>> Stashed changes
      }

      while (childNodes.length > index) {
        root.removeChild(childNodes[index])
      }

    }
    else vDOM = renderComponents(root, components, state)

    return vDOM

  }

  function renderComponents(root, components, state) {
  
    var vDOM = []
    var length = components.length
    var index = -1

    while (++index < length) {

<<<<<<< Updated upstream
      let component = components[index]
      while (typeof component === typeFunction) component = component(state)
=======
      var component = components[index]
      var type = typeof component
      while (type === typeFunction) {
        component = component(state)
        type = typeof component
      }
>>>>>>> Stashed changes

      if (component instanceof _Array) {
        vDOM[index] = renderElement(root, component, state)
      }
      else if (contentPattern.test(type)) {
        vDOM[index] = renderContent(root, component)
      }
      else vDOM[index] = null

    }

    return vDOM

  }

  // element
<<<<<<< Updated upstream
  var elementCache = {} // done
  function createElement(tagName) {
  
    if (elementCache[tagName]) return elementCache[tagName].cloneNode(false) 
    else {
      var $element = svgPattern.test(tagName) 
        ? document.createElementNS(svgNameSpace, tagName)
        : document.createElement(tagName)
      elementCache[tagName] = $element
      return $element.cloneNode(false)
    }

=======
  var elementCache = {}
  function createElement(type) {
    return (elementCache[type] = elementCache[type]
      ? elementCache[type]
      : svgPattern.test(type)
        ? document.createElementNS(svgNameSpace, type)
        : document.createElement(type)
    ).cloneNode()
>>>>>>> Stashed changes
  }

  function renderElement(parent, template, state, $current) {

    var type = template[0]
    var $element = createElement(type)
    var vElement = [type]
    
    var length = template.length
    var index = 0

    while (++index < length) {

      var content = template[index]
      var type = typeof content

      while (type === typeFunction) {
        content = content(state)
        type = typeof content
      }

      if (content == null) {
        vElement[index] = null
      }
      else if (contentPattern.test(type)) {
        vElement[index] = renderContent($element, content)
      }
      else if (content instanceof _Array) {
        vElement[index] = renderElement($element, content, state)
      }
      else if (type === typeObject) {
        vElement[index] = renderAttributes($element, content)
      }

    }

    if ($current) parent.replaceChild($element, $current)
    else parent.appendChild($element)

    return vElement

  }

  function updateElement($parent, $element, element, vElement, state) {
    
    var childNodes = $element.childNodes
    var childIndex = 0

    // element Used to be of type Element
    if (vElement instanceof _Array) {

      // update $element contents
      if (element[0] === vElement[0]) {
        
        var length = element.length
        var index = 0

        while (++index < length) {

          var content = element[index]
          var vContent = vElement[index]
          var $child = childNodes[childIndex]
          var contentType = typeof content

          while (typeof content === typeFunction) content = content(state)

          if (contentPattern.test(contentType)) {
            if (content !== vContent) vElement[index] = $child.nodeValue = content
            ++childIndex
          }
          else if (content instanceof _Array) {

            if (vContent instanceof _Array) {
              if ($child) {
                vElement[index] = updateElement($element, $child, content, vContent, state)
                ++childIndex
              }
            }
            else if (contentPattern.test(typeof vContent)) {
              vElement[index] = renderElement($element, content, state, $child)
              ++childIndex
            }
            else {
              vElement[index] = renderElement($element, content, state)
              ++childIndex
            }
            
          }
          else if (content && contentType === typeObject) {
            if (contentPattern.test(typeof vContent)) {
              $element.removeChild($child)
              ++childIndex
            }
            vElement[index] = updateAttributes($element, content, vContent)
          }

        }

        // remove obsolete childNodes
        vElement.length = index // todo: test
        while (childIndex < childNodes.length) {
          $element.removeChild(childNodes[childIndex])
        }

      }

      else {
        vElement = renderElement($parent, element, state, $element)
        ++childIndex
      }

    }

    return vElement

  }

  // content
  function renderContent(parent, content) {
    parent.appendChild(document.createTextNode(content))
    return content
  }


  // attribute
  function renderAttributes(node, attributes) {
    for (const key in attributes) {      
      let value = attributes[key]
      if (key === 'className' && value == null || value === false || value == true) value = ''
      attributes[key] = setAttribute(value)(node, key, value)
    }
    return attributes
  }

  function updateAttributes(node, content, abstract) {
    for (const key in content) {
      let value = content[key]
      if (key === 'className' && value == null || value === false || value == true) value = ''
      if (value !== abstract[key]) abstract[key] = setAttribute(value)(node, key, value)
    }
    return abstract
  }

  // prototype
  var vDOM = {}
  var prototype = {

    store: function(state) {
      
      if (typeof state !== typeObject || state === null) state = { data: state }
      
      var view = this
      var dispatch = {}
      var keys = Object.keys(state)
      var length = keys.length
      var index = -1
      var key = ''

      while (++index < length) {
        
        key = keys[index]
        dispatch[key] = (function(key) {

          return function(action) {
            var update = typeof action === typeFunction ? action(state[key]) : action
            if (update != null) {
              state = Object.assign({}, state, { [key]: update })
              render(null, view, Object.freeze(state))
            }
          }

        })(key)

      }

      Object.assign(this.storage, { dispatch: dispatch })
      return render(null, this, Object.freeze(state))

    },

    mount: function(id) {
      this.id = id
      var $root = document.getElementById(id)
      if ($root) $root.innerHTML = ''
      return render(null, this)
    },

  }

  const _store = (root, template) => {

    

  }

  const _component = (selector, template) => {
    const root = document.querySelector(selector)
    return _store(root, template)
  }

  function render(root, view, state) { 

    var storage = view.storage
    if (state) storage.state = state

    var id = view.id
    var $root = document.getElementById(id)

    if ($root) vDOM[id] = updateComponents($root, view.components , vDOM[id], storage)

    return Object.assign(view, { storage: storage })

  }

  function View(components) {
    return Object.assign(this, prototype, {
      components: components,
      storage: {},
      id: '',
    })
  }

  return function() {
    return (id, state, vDOM) => new View(arguments).store(state, vDOM).mount(id)
  }

})(document)