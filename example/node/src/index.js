import Vue from 'vue'
import router from './router'
import { VueTopDown } from 'vue-top-down'
import HeaderComp from './components/HeaderComp'
import FooterComp from './components/FooterComp'
import ContentComp from './components/ContentComp'

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
      mapping: {
        'header': HeaderComp,
        'footer': FooterComp,
        '.content': ContentComp
      }
    }
  }
}).$mount('#app')
