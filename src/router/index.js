import Vue from 'vue'
import VueRouter from 'vue-router' // 导入路由模块
import axios from 'axios' // 引入axios

import Login from '@/views/login'
Vue.use(VueRouter) // 注册所有的路由组件
Vue.prototype.$http = axios // 配置axios为vue的原型
// 使用实例化router对象
const router = new VueRouter({
  routes: [
    { path: '/login', name: '/login', component: Login }
  ]
})

// 导出路由对象
export default router //

// index.js是类似main.js的分支(同样功能, 只是把所有的路由组件全部放到了这里, 然后把router / index.js导入到main.js中, 更加的细分)
