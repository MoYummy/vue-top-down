import { linkMapping, outerDom, dom2render } from './utils'
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
      [VTD.RENDER]: null
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
    const r = dom2render(h, this[VTD.OUTER_DOM])
    return r
  }
}

export { VueTopDown }
