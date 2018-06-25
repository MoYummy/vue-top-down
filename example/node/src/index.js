import Vue from 'vue'
import router from './router'
import { VueTopDown, VTDConstants } from 'vue-top-down'
const HeaderComp = () => import('./components/Header')
const MiddleComp = () => import('./components/MiddleComp')
const FooterComp = () => import('./components/Footer')

Vue.config.devtools = true

new Vue({
  router,
  mixins: [VueTopDown],
  components: {
    HeaderComp,
    FooterComp,
    MiddleComp
  },
  data () {
    return {
      [VTDConstants.MAPPING]: {
        'header': HeaderComp,
        'footer': FooterComp,
        '.middle': MiddleComp
      }
    }
  }
}).$mount('#app')
