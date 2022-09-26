import router from '@/router'
import store from '@/store'
// console.log(store)
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // next(false)
  // 1、判断token是否存在
  // 1.1、存在，是否去往登录页，如果是，跳转到首页，如果是跳转到其他页面，则放行
  // 1.2 不存在 判断是否在白名单，如果在，放行，如果不在跳转到登录页

  if (store.getters.token) {
    // 登录状态
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 没有登录
    // 判断白名单里面是否有，有返回true
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
