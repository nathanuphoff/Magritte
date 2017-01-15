var view = (function(document, undefined) {

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
  function updateComponents($root, components, vDOM, state) {
  
    var vDOM = vDOM || []
    var childNodes = $root.childNodes
    var length = components.length
    var index = -1

    if (vDOM.length) {
      while (++index < length) {
        
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
                
        
      }
      while (childNodes.length > index) {
        $root.removeChild(childNodes[index])
      }
    }
    else vDOM = renderComponents($root, components, state)

    return vDOM

  }

  function renderComponents($root, components, state) {
  
    var vDOM = []
    var length = components.length
    var index = -1

    while (++index < length) {

      let component = components[index]
      while (typeof component === typeFunction) component = component(state)

      if (component instanceof _Array) {
        vDOM[index] = renderElement($root, component, state)
      }
      else if (contentPattern.test(componentType)) {
        vDOM[index] = renderContent($root, component)
      }

    }

    return vDOM

  }

  // element
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

  }

  function renderElement($parent, element, state, $current) {

    var tagName = element[0]
    var $element = createElement(tagName)
    var vElement = [ tagName ]
    
    var length = element.length
    var index = 0

    while (++index < length) {

      var content = element[index]
      var contentType = typeof content

      if (contentType === typeFunction) content = content(state)

      if (content instanceof _Array) {
        vElement[index] = renderElement($element, content, state)
      }
      else if (contentPattern.test(contentType)) {
        vElement[index] = renderContent($element, content)
      }
      else if (content && contentType === typeObject) {
        vElement[index] = renderAttributes($element, content)
      }

    }

    if ($current) $parent.replaceChild($element, $current)
    else $parent.appendChild($element)

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
            if (content !== vContent) renderContent($element, content, $child)
            vElement[index] = content
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
  function renderContent($parent, content, $current) {
    var $content = document.createTextNode(content)
    if ($current) $parent.replaceChild($content, $current)
    else $parent.appendChild($content)
    return content
  }


  // attribute
  function renderAttributes($element, attributes) {

    var vAttributes = {}
    var isSVG = $element instanceof _SVGElement
    var keys = Object.keys(attributes)
    var length = keys.length
    var index = -1

    while (++index < length) {   

      var key = keys[index]
      var value = attributes[key]
      var valueType = typeof value

      if (valueType === typeFunction) $element[key] = value
      else if (isSVG && key === 'xlink:href') {
        var nameSpace = xlinkNameSpace
        if (value instanceof _Array) {
          value = renderAttributeValue(value)
          $element.setAttributeNS(nameSpace, key, value)
        }
        else if (value === true) $element.setAttributeNS(nameSpace, key, '')
        else if (contentPattern.test(valueType)) $element.setAttributeNS(nameSpace, key, value)
      }
      else if (key in $element) {
        if (value instanceof _Array) value = renderAttributeValue(value)
        $element[key] = value
      }

      vAttributes[key] = value

    }

    return vAttributes

  }

  function updateAttributes($element, attributes, oldAttributes) {

    oldAttributes = oldAttributes || {}
    var vAttributes = {}
    var isSVG = $element instanceof _SVGElement
    var keys = Object.keys(attributes)
    var length = keys.length
    var index = -1

    while (++index < length) {

      var key = keys[index]
      var value = attributes[key]
      var oldValue = oldAttributes[key]
      
      if (typeof value === typeFunction) $element[key] = value
      else if (typeof oldValue === typeFunction) $element[key] = null
      else if (isSVG) {
        var nameSpace = key === 'xlink:href' ? 'http://www.w3.org/1999/xlink' : svgNameSpace
        if (value instanceof _Array) {
          value = renderAttributeValue(value)
          $element.setAttributeNS(nameSpace, key, value)
        }
        if (value !== oldAttributes[key]) {
          if (value === null || value === false || value === undefined) {
            $element.removeAttributeNS(nameSpace, key)
          }
          else if (value === true) $element.setAttributeNS(nameSpace, key, '')
          else $element.setAttributeNS(nameSpace, key, value)
        }
      }
      else if (key in $element) {
        if (value instanceof _Array) value = renderAttributeValue(value)
        if (value !== oldAttributes[key]) $element[key] = value
      }
      
      vAttributes[key] = value

    }

    return vAttributes

  }

  function renderAttributeValue(array) {

    var result = []
    var length = array.length
    var index = -1

    while (++index < length) {
      var value = array[index]
      result[index] = contentPattern.test(typeof value) ? value : ''
    }

    return result.join(' ')

  }

  function compose() {
    const template = spread(arguments)

    return function() {
      return template.concat(spread(arguments))
    }
  }

  // methods
  Object.assign(constructor, {    
    compose: compose,
  })

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
            if (update !== undefined) {
              Object.assign(state[key], update)
              render(view, state)
            }
          }

        })(key)

      }

      Object.assign(this.storage, { dispatch: dispatch })
      return render(this, state)

    },

    mount: function(id) {
      this.id = id
      var $root = document.getElementById(id)
      if ($root) $root.innerHTML = ''
      return render(this)
    },

  }

  function render(view, state) { 
    var start = performance.now()

    var storage = view.storage
    if (state) storage.state = state

    var id = view.id
    var $root = document.getElementById(id)

    if ($root) {
      vDOM[id] = updateComponents($root, view.components , vDOM[id], storage)
      view.storage.on.mount = false
    }

    return Object.assign(view, { storage: storage })

  }

  function View(components) {
    return Object.assign(this, prototype, {
      components: components,
      storage: { on: { mount: false }},
      id: '',
    })
  }

  function constructor() {
    return new View(arguments) 
  }

  return constructor


})(document)