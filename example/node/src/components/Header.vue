<template>
  <header :class="clazz">
    <a href="../..">Back</a>
    <router-link
      v-for="(r, i) of routes" :key="i"
      :to="r.href">{{ r.title }}</router-link>
  </header>
</template>

<script>
import { VueTopDownItem } from 'vue-top-down'

export default {
  name: 'Header',
  mixins: [VueTopDownItem],
  computed: {
    routes () {
      return [
        { href: '/page', title: 'Page' },
        { href: '/hello-vue', title: 'HelloVue' }
      ]
    }
  }
}
</script>
