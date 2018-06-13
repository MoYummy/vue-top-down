<template>
  <header :class="clazz">
    <router-link
      v-for="(r, i) of routes" :key="i"
      :to="r.href">{{ r.title }}</router-link>
  </header>
</template>

<script>
import { VueTopDownItem } from 'vue-top-down'

export default {
  name: 'HeaderComp',
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
