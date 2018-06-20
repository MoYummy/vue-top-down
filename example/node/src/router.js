import Vue from 'vue'
import VueRouter from 'vue-router'
const Page = () => import('./components/Page')
const HelloVue = () => import('./components/HelloVue')

Vue.use(VueRouter)

const routes = [
  { path: '/hello-vue', component: HelloVue },
  { path: '/page', component: Page },
  { path: '*', redirect: '/page' }
]

export default new VueRouter({
  routes
})
