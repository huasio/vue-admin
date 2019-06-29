import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/global-guards'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import '@/icons'

import { i18n } from '@/language/i18n'

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

