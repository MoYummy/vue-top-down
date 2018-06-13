<template>
  <div :class="clazz" v-html="innerHTML"></div>
</template>

<script>
import { VueTopDownItem } from 'vue-top-down'

export default {
  mixins: [VueTopDownItem],
  computed: {
    innerHTML () {
      const root = document.createElement('div')
      root.innerHTML = this.outerHTML
      return root.querySelector('*').innerHTML
    }
  }
}
</script>
