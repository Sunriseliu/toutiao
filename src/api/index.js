import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 配置公共根地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 给每个请求头上加上token
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

// 请求拦截器
axios.interceptors.request.use(config => {
  // config是请求的默认参数(修改其中的请求头)
//   每次请求的时候都在请求头上加上token
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (err) {
  // 对响应错误做点什么

  //   判断错误响应的状态码
  if (err.response.status === 401) {
    store.delUser() // 清空过期token
    router.push('/login') // 强制跳转到登录
  }
  return Promise.reject(err)
})

export default axios
