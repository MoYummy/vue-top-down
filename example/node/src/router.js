import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from './components/Page'
import HelloVue from './components/HelloVue'

Vue.use(VueRouter)

const routes = [
  { path: '/hello-vue', component: HelloVue },
  { path: '/page', component: Page },
  { path: '*', redirect: '/page' }
]

export default new VueRouter({
  routes
})
