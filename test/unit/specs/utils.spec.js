import * as utils from '../../../src/utils'
import { domEqual, objEqual } from './test_utils'

describe ('utils', () => {
  describe (utils.linkMapping.name, () => {
    beforeEach(() => {
      sinon.stub(console, 'warn')
    })
    afterEach(() => {
      console.warn.restore()
    })
    it ('should pick mapping', () => {
      const Exist = {}
      const Missing = {}
      const Unused = {}
      const mapping = { 'exist': Exist, 'missing': Missing }
      const components = { Exist, Unused }
      const linked = utils.linkMapping(mapping, components)
      expect(linked['exist']).to.equal('Exist')
      expect(linked['missing']).to.equal(undefined)
      expect(Object.values(linked)).not.to.include('Unused')
    })
  })
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
      sinon.stub(console, 'error')
    })
    afterEach(() => {
      console.error.restore()
    })
    after(() => {
    })
    it ('should do nothing by default', () => {
      input.outerHTML = '<div id=app><header>Header</header><h1>Title</h1><p>Content</p><footer>Footer</footer></div>'
      const outerDom = utils.outerDom(input.outerHTML, input.mapping, input.rootSelector)
      expect(domEqual(outerDom.outerHTML, input.outerHTML)).to.equal(true)
    })

    it ('should add attribute for component', () => {
      input.outerHTML = '<div><div class=comp></div></div>'
      input.mapping = { '.comp': 'SomeComponent' }
      const outerDom = utils.outerDom(input.outerHTML, input.mapping, input.rootSelector)
      expect(domEqual(outerDom.outerHTML, '<div><div class=comp _vuetopdown_component=some-component></div></div>')).to.equal(true)
    })

    it ('should return subnode for rootSelector', () => {
      input.outerHTML = '<div><div class=sub><div class=comp></div></div></div>'
      input.mapping = { '.comp': 'SomeComponent' }
      input.rootSelector = '.sub'
      const outerDom = utils.outerDom(input.outerHTML, input.mapping, input.rootSelector)
      expect(domEqual(outerDom.outerHTML, '<div class="sub"><div class="comp" _vuetopdown_component="some-component"></div></div>')).to.equal(true)
    })

    it ('should return root for invalid rootSelector', () => {
      input.outerHTML = '<div><div class=sub><div class=comp></div></div></div>'
      input.mapping = { '.comp': 'SomeComponent' }
      input.rootSelector = 123
      const outerDom = utils.outerDom(input.outerHTML, input.mapping, input.rootSelector)
      expect(domEqual(outerDom.outerHTML, '<div><div class="sub"><div class="comp" _vuetopdown_component="some-component"></div></div></div>')).to.equal(true)
    })

    it ('should return root for unfound rootSelector', () => {
      input.outerHTML = '<div><div class=sub><div class=comp></div></div></div>'
      input.mapping = { '.comp': 'SomeComponent' }
      input.rootSelector = '.unfound'
      const outerDom = utils.outerDom(input.outerHTML, input.mapping, input.rootSelector)
      expect(domEqual(outerDom.outerHTML, '<div><div class=sub><div class=comp _vuetopdown_component=some-component></div></div></div>')).to.equal(true)
    })
  }),
  describe (utils.dom2render.name, () => {
    const sandbox = sinon.createSandbox({
      properties: ["spy", "stub", "mock"]
    })
    let input = { }
    beforeEach(() => {
      input = Object.assign({}, {
        h: tag => document.createElement(tag),
        el: document.createElement('div')
      })
    })
    afterEach(() => {
      sandbox.restore()
    })
    it ('should render component', () => {
      const el = document.createElement('div')
      el.setAttribute('_vuetopdown_component', 'some-component')
      const render = utils.dom2render(input.h, el)
      expect(domEqual(render.outerHTML, '<some-component></some-component>')).to.equal(true)
    })
    it ('should skip non function', () => {
      const h = ''
      const render = utils.dom2render(h, input.el)
      expect(render).to.equal(null)
    })
    it ('should render text node', () => {
      const el = document.createTextNode('textnode')
      const render = utils.dom2render(input.h, el)
      expect(render).to.equal('textnode')
    })
    it ('should skip non element', () => {
      const els = [null, undefined, 0, '', false, 1, 'string', true]
      els.forEach(el => {
        const render = utils.dom2render(input.h, el)
        expect(render).to.equal(null)
      })
    })
    it ('should render children', () => {
      const spy = sandbox.spy(input, 'h')
      input.el.innerHTML = '<p><strong>Text</strong></p>'
      utils.dom2render(input.h, input.el)
      expect(spy.callCount).to.equal(3)
      expect(spy.getCall(0)).calledWith('STRONG', sinon.match.any, sinon.match.any)
      expect(spy.getCall(1)).calledWith('P', sinon.match.any, sinon.match.any)
      expect(spy.getCall(2)).calledWith('DIV', sinon.match.any, sinon.match.any)
    })
    it ('should render class and style', () => {
      const spy = sinon.spy(input, 'h')
      const attrs = { attrs: { class: 'some class', style: 'color: red' } }
      input.el.setAttribute('class', attrs.attrs.class)
      input.el.setAttribute('style', attrs.attrs.style)
      utils.dom2render(input.h, input.el)
      expect(spy.callCount).to.equal(1)
      expect(spy).calledWith(sinon.match.any, sinon.match(v => objEqual(v, attrs)), sinon.match.any)
    })
  })
  describe (utils.debugObj.name, () => {
    beforeEach(() => {
      localStorage.setItem('debug', 1)
      sinon.spy(console, 'dir')
    })
    afterEach(() => {
      localStorage.removeItem('debug')
      console.dir.restore()
    })
    it ('should print object', () => {
      utils.debugObj({ a: 1 })
      expect(console.dir).to.be.calledWithMatch({ a: 1 })
    })
    it ('should ignore function', () => {
      utils.debugObj({ a: function () { } })
      expect(console.dir).to.be.calledWithMatch({})
    })
    it ('should ignore for non-debug', () => {
      localStorage.removeItem('debug')
      utils.debugObj({ a: 1 })
      expect(console.dir).not.to.be.called
    })
  })
})
