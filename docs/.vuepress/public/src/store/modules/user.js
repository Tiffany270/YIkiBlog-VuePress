import { queryUserInfo, queryProjecInfoByUser, queryAuthMenu, queryLogoInfoByDomain } from '@/apis/user'
import { constantRoutes, asyncRoutes } from '@/router/routes/index'
// 将权限菜单和本地路由进行映射
const getAccesRoutes = (asyncRoutes, menus) => {
  return menus.reduce((menuList, menu) => {
    let menuItem = {}
    asyncRoutes.map(item => {
      // 权限菜单和本地路由菜单映射
      if (item.name === menu.permission) {
        menuItem = {
          path: item.path,
          name: item.name,
          meta: { buttons: menu.actions, title: menu.name },
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
      if (item.meta && item.meta.hideMenu && !menuList.find(item1 => item1.name === item.name)) {
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
  // return asyncRoutes.reduce((routeList, route) => {
  //   let routeItem = {}
  //   menus.map(item => {
  //     // 权限菜单和本地路由菜单映射
  //     if (route.name === item.permission) {
  //       routeItem = {
  //         path: route.path,
  //         name: route.name,
  //         meta: { buttons: item.actions, ...route.meta },
  //         component: route.component,
  //         redirect: route.redirect,
  //         icon: item.icon ? item.icon : ''
  //       }
  //       if (route.children && route.children.length) {
  //         routeItem.children = getAccesRoutes(route.children, item.children)
  //       }
  //     }
  //   })
  //   // 不展示在菜单的二级路由
  //   if (route.meta && route.meta.hideMenu) {
  //     routeList.push({
  //       path: route.path,
  //       name: route.name,
  //       meta: { ...route.meta },
  //       component: route.component
  //     })
  //   } else {
  //     'name' in routeItem && routeList.push(routeItem)
  //   }
  //   return routeList
  // }, [])
}

const user = {
  state: {
    // 用户信息
    userInfo: {},
    // 用户权限
    userRoles: [],
    // 项目id
    projectId: '',
    // 菜单栏宽度
    sideMenuWidth: '180',
    // 用户菜单
    userMenus: [],
    // 权限路由
    userRoutes: constantRoutes,
    // 是否已经获取过路由
    hasGetMenu: false,
    // 用户项目
    userProject: {},
    // 发放渠道
    payChanels: [],
    // 微信应用
    wechatApps: [],
    // 服务商信息
    serviceProviderInfo: {}
  },
  mutations: {
    GET_USER_INFO(state, payload) {
      state.userInfo = payload || {}
    },
    GET_USER_ROLES(state, payload) {
      state.userRoles = payload || {}
    },
    GET_PROJECT_ID(state, id) {
      state.projectId = id
    },
    GET_USER_PROJECT(state, payload) {
      state.userProject = payload || {}
    },
    SET_SIDEMENU_WIDTH(state, payload) {
      state.sideMenuWidth = payload || '180'
    },
    SET_USER_AUTH_MENU(state, payload) {
      state.userMenus = payload || []
    },
    CONCAT_ROUTES(state, payload) {
      // 将权限路由和非权限路由进行合并
      state.userRoutes = constantRoutes.concat(payload)
      state.hasGetMenu = true
    },
    SET_PAY_CHANELS(state, payload) {
      state.payChanels = payload
    },
    GET_SERVICE_PROVIDER_INFO(state, payload) {
      document.title = payload.productName || '安薪宝-服务商平台客户端'
      state.serviceProviderInfo = payload || {}
    },
    SET_WECHAT_APPS(state, payload) {
      state.wechatApps = payload || []
    }
  },
  actions: {
    getUserInfo({ commit }) {
      const p1 = new Promise((resolve, reject) => {
        queryUserInfo()
          .then(data => {
            commit('GET_USER_INFO', data.data)
            commit('GET_USER_ROLES', data.data.attrs.roles)
            commit('GET_PROJECT_ID', data.data.attrs.projectId)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
      const p2 = new Promise((resolve, reject) => {
        queryProjecInfoByUser()
          .then(data => {
            commit('GET_USER_PROJECT', data.data)
            commit('SET_PAY_CHANELS', data.data.payChannels)
            commit('SET_WECHAT_APPS', data.data.wechatApps)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
      return Promise.all([p1, p2])
    },
    // 获取用户权限菜单
    getUserAuthMenu({ commit }) {
      return new Promise((resolve, reject) => {
        queryAuthMenu()
          .then(data => {
            commit('SET_USER_AUTH_MENU', data.data)
            resolve(data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 将权限菜单和路由映射
    concatRoutes({ commit }, menus) {
      return new Promise((resolve, reject) => {
        try {
          const routes = getAccesRoutes(asyncRoutes, menus)
          commit('CONCAT_ROUTES', routes)
          resolve(routes)
        } catch (error) {
          reject(error)
        }
      })
    },
    // 获取服务商信息
    async getServiceProviderInfo({ commit }, domain) {
      const { data } = await queryLogoInfoByDomain({ domain })
      if (data) {
        commit('GET_SERVICE_PROVIDER_INFO', data)
      }
    }
  }
}
export default user
