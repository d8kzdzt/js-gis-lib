import Vue from 'vue'
import App from './App.vue'
import router from '@/routers'
import store from '@/stores'

import Element from 'element-ui'

import '@/styles/index.scss' // global css

import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.use(Element, {
  size: 'medium'
})
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
