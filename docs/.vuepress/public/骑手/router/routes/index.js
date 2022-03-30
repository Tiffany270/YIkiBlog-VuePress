import Layout from '@views/layout/index'
import content from './content'
import usermanage from './usermanage'
import marketingmanage from './marketingmanage'
import withdrawalmanage from './withdrawalmanage'

// 常规路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录页'
    },
    component: () =>
      import(/* webpackChunkName: "Login" */ '@/views/login/index')
  }
]
export const homeRoutes = [
  {
    path: '',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'icon-nav-home'
    },
    icon: 'icon-nav-home',
    children: [
      {
        path: 'home',
        name: 'Dashboard',
        meta: { title: '首页', icon: 'icon-nav-home' },
        component: () =>
          import(/* webpackChunkName: "Home" */ '@views/home/index.vue')
      }
    ]
  }
]
// 异步路由
export const asyncRoutes = [
  ...content,
  ...usermanage,
  ...marketingmanage,
  ...withdrawalmanage
]

// 错误路由
export const errorRoutes = [
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/errorPage/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]
