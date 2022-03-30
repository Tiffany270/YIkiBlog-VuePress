import Layout from '@/views/layout/index'
import studio from './studio'
import commission from './commission'
import nonlocal from './nonlocal'
import sign from './sign'
import finance from './finance'
import task from './task'
import user from './user'
import message from './message'
export const asyncRoutes = [...commission, ...nonlocal, ...sign, ...task, ...studio, ...finance, ...user, ...message]
// 不做权限控制得路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index')
  },
  {
    path: '/passwordReset',
    name: 'PasswordReset',
    component: () => import(/* webpackChunkName: "PasswordReset" */ '@/views/password/reset/index')
  },
  {
    path: '/passwordEdit',
    name: 'PasswordEdit',
    component: () => import(/* webpackChunkName: "PasswordEdit" */ '@/views/password/edit/index')
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "ResetPassword" */ '@/views/user/setting/reset_password/index')
  },

  {
    path: '',
    name: 'Home',
    component: Layout,
    redirect: '/dashboard',
    icon: 'xbicon-home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: '首页'
        },
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/home/index.vue')
      }
    ]
  }
]
export const errorRoutes = [
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]
