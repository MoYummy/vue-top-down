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
    if (this[VTD.RENDER]) {
      return this[VTD.RENDER]
    }
    const od = outerDom(this.$el.outerHTML, this[VTD.MAPPING], this[VTD.ROOT])
    this[VTD.RENDER] = dom2render(h, od)
    return this[VTD.RENDER]
  }
}

export { VueTopDown }
