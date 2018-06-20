import { outerDom, dom2render } from './utils'
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
  render (h) {
    if (this.$data[VTD.RENDER]) {
      return this.$data[VTD.RENDER]
    }
    const outerHTML = this[VTD.OUTER_HTML] ? this[VTD.OUTER_HTML] : this.$el.outerHTML
    const od = outerDom(outerHTML, this.$data[VTD.MAPPING], this.$data[VTD.ROOT])
    this.$data[VTD.RENDER] = dom2render(h, od)
    return this.$data[VTD.RENDER]
  }
}

export { VueTopDown }
