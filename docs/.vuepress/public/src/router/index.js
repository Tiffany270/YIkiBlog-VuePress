import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
Vue.use(VueRouter)
import { constantRoutes, errorRoutes } from './routes'
import { getToken, removeToken } from '@/utils/auth'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 获取服务商信息
  if (!Object.keys(store.getters.serviceProviderInfo).length) {
    store.dispatch(
      'getServiceProviderInfo',
      process.env.NODE_ENV === 'production' ? location.hostname.split('.')[0] : 'xinbao'
    )
  }
  const token = getToken()
  // 已登录
  if (token) {
    if (to.name === 'Login') {
      next({ name: 'Dashboard' })
    } else {
      // 判断是否有用户信息
      if (!Object.keys(store.getters.userInfo).length) {
        // 获取用户信息
        store
          .dispatch('getUserInfo')
          .then(() => {
            if (store.getters.userInfo.attrs.needResetPassword) {
              // 首次登陆重置密码
              router.push({ name: 'PasswordReset' })
              return
            }
            // 判断是否获取过菜单
            if (!store.getters.userInfo.hasGetMenu) {
              // 获取权限菜单列表
              store
                .dispatch('getUserAuthMenu')
                .then(menus => {
                  // 将权限菜单和本地路由进行映射
                  store
                    .dispatch('concatRoutes', menus)
                    .then(routes => {
                      // 获取到权限路由，动态添加到路由表中
                      // 同时需要在最后追加-404,否则刷新页面会404
                      router.addRoutes(routes.concat(errorRoutes))
                      next({ ...to, replace: true })
                    })
                    .catch(() => {
                      removeToken()
                      next({ name: 'Login' })
                    })
                })
                .catch(() => {
                  removeToken()
                  next({ name: 'Login' })
                })
            } else {
              next()
            }
          })
          .catch(() => {
            removeToken()
            next({ name: 'Login' })
          })
      } else {
        next()
      }
    }
  } else {
    // 未登录 去登陆吧
    if (to.name === 'Login') next()
    else if (to.name === 'ResetPassword') next()
    else next({ name: 'Login' })
  }
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
