import { outerDom, dom2render } from './utils'
import VTD from './constants'

const VueTopDown = {
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
    const od = outerDom(this.$el.outerHTML, this.$data[VTD.MAPPING], this.$data[VTD.ROOT])
    this.$data[VTD.RENDER] = dom2render(h, od)
    return this.$data[VTD.RENDER]
  }
}

export { VueTopDown }
