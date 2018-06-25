<template>
  <footer :class="clazz">{{ vueFooter }}</footer>
</template>

<script>
import { VueTopDownItem } from 'vue-top-down'

export default {
  name: 'Footer',
  mixins: [VueTopDownItem],
  data () {
    return {
      vueFooter: 'This is Vue Footer'
    }
  }
}
</script>
