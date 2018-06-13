import VTD from './constants'

export function outerDom (outerHTML, mapping = {}, rootSelector = '*') {
  const dom = str2dom(outerHTML, rootSelector)
  typeof mapping === 'object' && Object.keys(mapping).forEach(k => {
    dom.querySelectorAll(k).forEach(n => {
      n.setAttribute(VTD.COMPONENT, kebab(mapping[k].name))
    })
  })
  return dom
}

function str2dom (outerHTML, rootSelector = '*') {
  const dom = document.createElement('div')
  dom.setAttribute('id', 'root')
  dom.innerHTML = outerHTML
  try {
    const el = dom.querySelector(rootSelector)
    return el === null ? dom : el
  } catch (err) {
    console.error(err)
    return dom
  }
}

function kebab (str = '') {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function dom2render (h, el, depth = 0) {
  if (!(h instanceof Function)) {
    return null
  }

  if (!el) {
    return null
  }
  if (el instanceof Text) {
  // white space or dangling text node
    return el.data
  }
  if (!(el instanceof HTMLElement)) {
    return null
  }

  try {
    const vueComponent = el.getAttribute(VTD.COMPONENT)
    if (vueComponent) {
      return h(vueComponent, {
        props: {
          [VTD.OUTER_HTML]: el.outerHTML,
          [VTD.CLASS]: (el.getAttribute('class') || '').split(' '),
          [VTD.STYLE]: el.getAttribute('style')
        }
      })
    } else {
      const children = []
      el.childNodes.forEach(n => {
        const vnode = dom2render(h, n, depth + 1)
        vnode && children.push(vnode)
      })
      const attrs = {}
      el.getAttributeNames().forEach(attr => {
        attrs[attr] = el.getAttribute(attr)
      })
      return h(el.tagName, {
        attrs
      }, children)
    }
  } catch (err) {
    console.error(err)
    return h('div', {
      attrs: {
        class: 'render-failure'
      }
    })
  }
}
