import Vue from 'vue'
import router from './router'
import { VueTopDown, VTDConstants } from 'vue-top-down'
const HeaderComp = () => import('./components/HeaderComp')
const FooterComp = () => import('./components/FooterComp')
const ContentComp = () => import('./components/ContentComp')

new Vue({
  router,
  mixins: [VueTopDown],
  components: {
    HeaderComp,
    FooterComp,
    ContentComp
  },
  data () {
    return {
      [VTDConstants.MAPPING]: {
        'header': HeaderComp,
        'footer': FooterComp,
        '.content': ContentComp
      }
    }
  }
}).$mount('#app')
