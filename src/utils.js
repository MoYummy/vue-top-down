import VTD from './constants'

export function outerDom (outerHTML, mapping = {}, rootSelector = '*') {
  const dom = str2dom(outerHTML, rootSelector)
  typeof mapping === 'object' && Object.keys(mapping).forEach(k => {
    const comp = mapping[k]
    let els = []
    try {
      els = dom.querySelectorAll(k)
    } catch (err) { }
    els.forEach(n => {
      n.setAttribute(
        VTD.COMPONENT,
        (typeof comp === 'string') ? kebab(comp) : kebab(comp.name)
      )
    })
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
        [VTD.OUTER_HTML]: el.outerHTML,
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
  } catch (error) {
    console.error(err)
    const el = document.createElement(tag)
    el.setAttribute([VTD.FAILURE], '')
    return el
  }
}
