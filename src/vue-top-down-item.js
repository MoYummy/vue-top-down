import VTD from './constants'

const VueTopDownItem = {
  props: {
    [VTD.OUTER_HTML]: String,
    [VTD.CLASS]: Array,
    [VTD.STYLE]: String
  },
  inheritAttrs: false
}

export { VueTopDownItem }
