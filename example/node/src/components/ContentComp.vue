<template>
  <router-view :clazz="clazz" :innerHTML="innerHTML"></router-view>
</template>

<script>
import { VueTopDownItem, VTDConstants } from 'vue-top-down'

export default {
  name: 'ContentComp',
  mixins: [VueTopDownItem],
  computed: {
    innerHTML () {
      const root = document.createElement('div')
      root.innerHTML = this[VTDConstants.OUTER_HTML]
      return root.querySelector('*').innerHTML
    }
  }
}
</script>
