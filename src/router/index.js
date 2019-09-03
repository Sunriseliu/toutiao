import Vue from 'vue'
import VueRouter from 'vue-router' // 导入路由模块
import axios from 'axios' // 引入axios

import Login from '@/views/login'

import Home from '@/views/home' // 引入home 中vue

// import Welcome from '@/views/welcome'
import Welcome from '@/views/welcome'

import notFound from '@/views/404'
import store from '@/store'
import Article from '@/views/article'
import Images from '@/views/image'
import Publish from '@/views/publish'

import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'

Vue.use(VueRouter) // 注册所有的路由组件
Vue.prototype.$http = axios // 配置axios为vue的原型
// 使用实例化router对象
const router = new VueRouter({

  routes: [
    { path: '/login', name: '/login', component: Login },
    { path: '/',
      // name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/images', name: 'images', component: Images },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment },
        { path: '/setting', name: 'setting', component: Setting },
        { path: '/fans', name: 'fans', component: Fans }
      ]

    },
    // 设置路由 * 配配符, 这样如果跳入没有业务逻辑的路由地址,会跳转到404路由
    { path: '*', name: '404', component: notFound }
  ]
})
router.beforeEach((to, from, next) => {
  // 如果是到登录页面就直接放行
  // if (to.path === '/login') return next()
  // // 如果没有登录过,没有sessionstorage就登录
  // if (!store.getUser().token) return next('/login')
  // // 其他的状态都放行
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

// 导出路由对象
export default router //

// index.js是类似main.js的分支(同样功能, 只是把所有的路由组件全部放到了这里, 然后把router / index.js导入到main.js中, 更加的细分)
