import { outerDom, dom2render } from './utils'
import VTD from './constants'

const VueTopDown = {
  props: {
    [VTD.OUTER_HTML]: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      [VTD.ROOT]: '*',
      [VTD.MAPPING]: {}
    }
  },
  computed: {
    outerDom () {
      return outerDom(this[VTD.OUTER_HTML] ? this[VTD.OUTER_HTML] : this.$el.outerHTML, this[VTD.MAPPING], this[VTD.ROOT])
    }
  },
  render (h) {
    return dom2render(h, this.outerDom)
  }
}

export { VueTopDown }
