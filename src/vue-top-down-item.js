import VTD from './constants'

const VueTopDownItem = {
  props: {
    [VTD.OUTER_HTML]: String,
    [VTD.CLASS]: Array,
    [VTD.STYLE]: String
  },
  inheritAttrs: false,
  computed: {
    outerHTML () {
      return this[VTD.OUTER_HTML]
    },
    clazz () {
      return this[VTD.CLASS]
    }
  }
}

export { VueTopDownItem }
