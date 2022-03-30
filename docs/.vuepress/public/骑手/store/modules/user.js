import { findUserInfo, getCurrentUserMenu } from '@/api/user'
import { homeRoutes, asyncRoutes } from '@/router/routes/index'

// 将权限菜单和本地路由进行映射
const getAccesRoutes = (asyncRoutes, menus) => {
  return menus.reduce((menuList, menu) => {
    let menuItem = {}
    asyncRoutes.map(item => {
      // 权限菜单和本地路由菜单映射
      if (item.name === menu.code) {
        menuItem = {
          path: item.path,
          name: item.name,
          meta: { title: menu.name },
          component: item.component,
          redirect: item.redirect,
          icon: menu.icon ? menu.icon : ''
        }
        if (menu.children && menu.children.length) {
          menuItem.children = getAccesRoutes(item.children, menu.children)
        }
        menuList.push(menuItem)
      }
      // 处理非权限路由
      if (
        item.meta &&
        item.meta.hideMenu &&
        !menuList.find(item1 => item1.name === item.name)
      ) {
        menuList.push({
          path: item.path,
          name: item.name,
          meta: { ...item.meta },
          component: item.component
        })
      }
    })
    return menuList
  }, [])
}

const user = {
  state: {
    userInfo: {},
    routeList: [],
    buttons: []
  },
  mutations: {
    GET_USER_INFO(state, payload) {
      state.userInfo = payload || {}
    },
    GET_USER_ROUTE_LIST(state, payload) {
      state.routeList = payload || []
    },
    GET_USER_BUTTONS(state, payload) {
      state.buttons = payload
    }
  },
  actions: {
    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // commit('GET_USER_INFO', { a: 1 })
        // resolve()
        findUserInfo()
          .then(res => {
            commit('GET_USER_INFO', res.data)
            commit(
              'GET_USER_BUTTONS',
              (res.data && res.data.attrs && res.data.attrs.buttons) || []
            )
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getUserMenu({ commit }) {
      return new Promise((resolve, reject) => {
        getCurrentUserMenu()
          .then(res => {
            let routes = homeRoutes.concat(
              getAccesRoutes(asyncRoutes, res.data || [])
            )
            commit('GET_USER_ROUTE_LIST', routes)
            resolve(routes)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
export default user
