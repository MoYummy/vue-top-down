import VTD from './constants'

export function linkMapping (mapping = {}, components = {}) {
  const compKeys = Object.keys(components)
  const compValues = Object.values(components)
  const linked = {}
  for (const k in mapping) {
    const comp = mapping[k]
    const i = compValues.findIndex(x => x === comp)
    i === -1 && console.warn(k + ' is missing')
    linked[k] = compKeys[i]
  }
  return linked
}

export function outerDom (outerHTML, mapping = {}, rootSelector = '*') {
  const dom = str2dom(outerHTML, rootSelector)
  dom.removeAttribute(VTD.COMPONENT)
  typeof mapping === 'object' && Object.keys(mapping).forEach(k => {
    const comp = mapping[k]
    if (typeof comp !== 'string') {
      return
    }
    try {
      dom.querySelectorAll(k)
        .forEach(el => el.setAttribute(VTD.COMPONENT, kebab(comp)))
    } catch (err) { }
  })
  return dom
}

function str2dom (outerHTML, rootSelector = '*') {
  const dom = document.createElement('div')
  dom.setAttribute('id', 'root')
  dom.innerHTML = outerHTML
  let el
  try {
    el = dom.querySelector(rootSelector)
    if (el) {
      return el
    }
  } catch (err) {
    console.error(err)
  }
  try {
    el = dom.querySelector('*')
    return el ? el : dom
  } catch (err) {
    console.error(err)
    return dom
  }
}

function kebab (str = '') {
  return (typeof str === 'string') ? str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : ''
}

export function dom2render (h, el, depth = 0) {
  if (!(h instanceof Function)) {
    return null
  }

  if (el instanceof Text) {
    return el.data
  }

  if (!(el instanceof HTMLElement)) {
    return null
  }

  const vueComponent = el.getAttribute(VTD.COMPONENT)
  if (vueComponent) {
    return render(h, vueComponent, {
      props: {
        [VTD.OUTER_HTML]: el.outerHTML.replace(new RegExp(VTD.COMPONENT + '[^"]*"[^"]*"', 'i'), ''),
        [VTD.CLASS]: (el.getAttribute('class') || '').split(' '),
        [VTD.STYLE]: el.getAttribute('style')
      }
    })
  }

  const children = []
  el.childNodes.forEach(n => {
    const vnode = dom2render(h, n, depth + 1)
    vnode && children.push(vnode)
  })
  const attrs = {}
  el.getAttributeNames().forEach(attr => {
    attrs[attr] = el.getAttribute(attr)
  })
  return render(h, el.tagName, { attrs }, children)
}

function render (h, tag, opts, children) {
  try {
    return children ? h(tag, opts, children) : h(tag, opts)
  } catch (err) {
    console.error(err)
    const el = document.createElement(tag)
    el.setAttribute([VTD.FAILURE], '')
    return el
  }
}

export function debugObj(obj) {
  if (!localStorage.getItem('debug')) {
    return
  }
  const o = {}
  for (const k in obj) {
    typeof obj[k] !== 'function' && (o[k] = obj[k])
  }
  console.dir(o)
}
