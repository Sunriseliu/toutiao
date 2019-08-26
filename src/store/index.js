
// key就是用户的信息,定义为常量
const Key = 'toutiao-lxs'
export default {
  // 把传入的数据作为参数传入(是一个对象)
  setUser (user) {
    // 把对象转换为json格式的字符串
    const jsonstr = JSON.stringify(user)
    // 保存这个字符串到sessionstorage
    window.sessionStorage.setItem(Key, jsonstr)
  },
  // 获取用户信息`
  getUser () {
    // jonstr是一个布尔值,如果有session就是true 如果没有session 就是空对象
    const jsonstr = window.sessionStorage.getItem(Key) || '{}'
    return JSON.parse(jsonstr) // 将数据转换为 JavaScript 对象。
  },
  // 删除用户信息
  delUser () {
    window.sessionStorage.removeItem(Key)
  }

}
