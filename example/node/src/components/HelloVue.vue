<template>
  <div :class="clazz">Hello Vue</div>
</template>

<script>
import { VueTopDownItem } from 'vue-top-down'

export default {
  mixins: [VueTopDownItem]
}
</script>
