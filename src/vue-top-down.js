import { outerDom, dom2render } from './utils'

const VueTopDown = {
  props: {
    outerHTML: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      root: '*',
      mapping: {}
    }
  },
  computed: {
    outerDom () {
      return outerDom(
        this.outerHTML ? this.outerHTML : this.$el.outerHTML,
        this.mapping, this.root)
    }
  },
  render (h) {
    return dom2render(h, this.outerDom)
  }
}

export { VueTopDown }
