import Vue from 'vue'
import ElementUI from 'element-ui' // 引入ElementUI插件
import 'element-ui/lib/theme-chalk/index.css' // 引入ElementUI的css样式
import App from './App.vue'

import router from '@/router'

Vue.use(ElementUI) // 注册ElementUI

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  router, // 挂载router
  el: '#app', // 联系到了index.html中的容器
  render: h => h(App) // 使用APP.vue覆盖
})
