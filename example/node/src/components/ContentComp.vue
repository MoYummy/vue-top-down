<template>
  <router-view :clazz="clazz" :outerHTML="outerHTML"></router-view>
</template>

<script>
import { VueTopDownItem } from 'vue-top-down'

export default {
  name: 'ContentComp',
  mixins: [VueTopDownItem]
}
</script>
