import Vue from 'vue'
import { VueTopDown, VueTopDownItem } from 'vue-top-down'

document.getElementById('app').innerText =
  JSON.stringify(Vue.version) +
  JSON.stringify(VueTopDown) +
  JSON.stringify(VueTopDownItem)
