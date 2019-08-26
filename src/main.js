import Vue from 'vue'
import ElementUI from 'element-ui' // 引入ElementUI插件
import 'element-ui/lib/theme-chalk/index.css' // 引入ElementUI的css样式
import App from './App.vue'

import router from '@/router'
import axios from '@/api'
Vue.prototype.$http = axios

Vue.use(ElementUI) // 注册ElementUI

Vue.config.productionTip = false

// eslint-disable-next-line no-new

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
