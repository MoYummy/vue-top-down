import * as utils from '../../../src/utils'
import { domEqual } from './test_utils'

describe ('utils', () => {
  describe (utils.outerDom.name, () => {
    let input = {}
    before(() => {
    })
    beforeEach(() => {
      input = Object.assign({}, {
        outerHTML: '<div></div>',
        mapping: {},
        rootSelector: '*'
      })
    })
    afterEach(() => {
    })
    after(() => {
    })
    it ('should do nothing by default', () => {
      input.outerHTML = '<div id=app><header>Header</header><h1>Title</h1><p>Content</p><footer>Footer</footer></div>'
      const outerDom = utils.outerDom(input.outerHTML, input.mapping, input.rootSelector)
      expect(domEqual(outerDom.outerHTML, input.outerHTML)).to.equal(true)
    })

    it ('should add attribte for component', () => {
      input.outerHTML = '<div><div class=comp></div></div>'
      input.mapping = { '.comp': { name: 'SomeComponent' } }
      const outerDom = utils.outerDom(input.outerHTML, input.mapping, input.rootSelector)
      expect(domEqual(outerDom.outerHTML, '<div><div class=comp _vuetopdown_component=some-component></div></div>')).to.equal(true)
    })

    it ('should return subnode for rootSelector', () => {
      input.outerHTML = '<div><div class=sub><div class=comp></div></div></div>'
      input.mapping = { '.comp': { name: 'SomeComponent' } }
      input.rootSelector = '.sub'
      const outerDom = utils.outerDom(input.outerHTML, input.mapping, input.rootSelector)
      expect(domEqual(outerDom.outerHTML, '<div class="sub"><div class="comp" _vuetopdown_component="some-component"></div></div>')).to.equal(true)
    })

    it ('should return root for unfound rootSelector', () => {
      /*
      input.outerHTML = '<div><div class=sub><div class=comp></div></div></div>'
      input.mapping = { '.comp': { name: 'SomeComponent' } }
      input.rootSelector = '.unfound'
      const outerDom = utils.outerDom(input.outerHTML, input.mapping, input.rootSelector)
      expect(domEqual(outerDom.outerHTML, '<div><div class=sub _vuetopdown_component=some-component></div></div>')).to.equal(true)
      */
    })
  }),
  describe (utils.dom2render.name, () => {
    let input = { }
    beforeEach(() => {
      input = Object.assign({}, {
        h: (tag) => document.createElement(tag),
        el: document.createElement('div')
      })
    })
    it ('should render component', () => {
      const el = document.createElement('div')
      el.setAttribute('_vuetopdown_component', 'some-component')
      input.el = el
      const render = utils.dom2render(input.h, input.el)
      expect(domEqual(render.outerHTML, '<some-component></some-component>')).to.equal(true)
    })
    it ('should skip non function', () => {
      input.h = ''
      const render = utils.dom2render(input.h, input.el)
      expect(render).to.equal(null)
    })
  })
})