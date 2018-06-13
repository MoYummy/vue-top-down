const HeaderComp = {
  name: 'HeaderComp',
  template: `<header :class="clazz">
  <router-link
    v-for="(r, i) of routes" :key="i"
    :to="r.href">{{ r.title }}</router-link>
</header>`,
  mixins: [VueTopDown.VueTopDownItem],
  computed: {
    routes () {
      return [
        { href: '/page', title: 'Page' },
        { href: '/hello-vue', title: 'HelloVue' }
      ]
    }
  }
}

const FooterComp = {
  name: 'FooterComp',
  template: `<footer :class="clazz">{{ vueFooter }}</footer>`,
  mixins: [VueTopDown.VueTopDownItem],
  data () {
    return {
      vueFooter: 'This is Vue Footer'
    }
  }
}

const ContentComp = {
  name: 'ContentComp',
  template: `<router-view :clazz="clazz" :outerHTML="outerHTML"></router-view>`,
  mixins: [VueTopDown.VueTopDownItem]
}

const HelloVue = {
  template: `<div :class="clazz">Hello Vue</div>`,
  mixins: [VueTopDown.VueTopDownItem]
}

const Page = {
  template: `<div :class="clazz" v-html="innerHTML"></div>`,
  mixins: [VueTopDown.VueTopDownItem],
  computed: {
    innerHTML () {
      const root = document.createElement('div')
      root.innerHTML = this.outerHTML
      return root.querySelector('*').innerHTML
    }
  }
}

const router = new VueRouter([
  { path: '/hello-vue', component: HelloVue },
  { path: '/page', component: Page },
  { path: '*', redirect: '/page' }
])

const inst = new Vue({
  router,
  mixins: [VueTopDown.VueTopDown],
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
})

inst.$mount('#app')