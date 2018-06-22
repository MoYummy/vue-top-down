import { linkMapping, outerDom, dom2render, debugObj } from './utils'
import VTD from './constants'

const VueTopDown = {
  props: {
    [VTD.OUTER_HTML]: String,
    [VTD.CLASS]: Array,
    [VTD.STYLE]: String
  },
  inheritAttrs: false,
  data () {
    return {
      [VTD.ROOT]: '*',
      [VTD.MAPPING]: {},
      [VTD.RENDER]: null,
      [VTD.OUTER_DOM]: null,
      [VTD.LIMIT]: 0
    }
  },
  computed: {
    [VTD.OUTER_DOM] () {
      const outerHTML = this.$props[VTD.OUTER_HTML] ? this.$props[VTD.OUTER_HTML] : this.$el.outerHTML
      const mapping = linkMapping(this.$data[VTD.MAPPING], this.$options.components)
      return outerDom(outerHTML, mapping, this.$data[VTD.ROOT])
    }
  },
  render (h) {
    if (this.$data[VTD.LIMIT] > 1000) {
      console.warn('Too many times for render function to be called')
      setTimeout(() => { this.$data[VTD.LIMIT] = 0 }, 60000)
      return this.$data[VTD.RENDER]
    }
    this.$data[VTD.LIMIT] += 1
    this.$data[VTD.RENDER] = dom2render(h, this[VTD.OUTER_DOM])
    // debugObj(this.$data[VTD.RENDER])
    return this.$data[VTD.RENDER]
  }
}

export { VueTopDown }
