import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { getToken, removeToken } from '@/utils/auth'
// import store from '@/store/index'
import { homeRoutes, asyncRoutes, errorRoutes } from './routes'
Vue.use(VueRouter)
// 隐藏进度环显示
NProgress.configure({ showSpinner: false })
const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '/',
  routes: [...homeRoutes, ...asyncRoutes, ...errorRoutes]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  // if (getToken()) {
  //   if (to.name === 'Login') {
  //     // 有token直接访问登录页，跳去首页
  //     next({ name: 'Dashboard' })
  //   } else {
  //     // 获取用户信息
  //     if (!Object.keys(store.getters.userInfo).length) {
  //       store
  //         .dispatch('getUserInfo')
  //         .then(() => {
  //           if (!store.getters.routeList.length) {
  //             store.dispatch('getUserMenu').then(routes => {
  //               router.addRoutes(routes.concat(errorRoutes))
  //               next({ ...to, replace: true })
  //             })
  //           } else {
  //             next({ ...to, replace: true })
  //           }
  //         })
  //         .catch(() => {
  //           removeToken()
  //           next({ name: 'Login' })
  //         })
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  // 去登录
  //   if (to.name === 'Login') next()
  //   else next({ name: 'Login' })
  //   sessionStorage.clear()
  //   window.sessionStorage['hasLogin'] = true
  // }
})
router.afterEach(() => {
  NProgress.done()
})
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})
export default router
