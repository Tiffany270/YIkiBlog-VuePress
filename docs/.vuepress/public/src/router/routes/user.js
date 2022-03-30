import Layout from '@/views/layout/index'
export default [
  {
    path: '/user',
    name: 'UserManage',
    meta: { title: '商户管理' },
    component: Layout,
    redirect: '/user/userPermission',
    children: [
      {
        path: 'merchantInformation',
        name: 'MerchantInformation',
        meta: { title: '商户信息' },
        component: () => import(/* webpackChunkName: "MerchantInformation" */ '@/views/user/merchant/index.vue')
      },
      {
        path: 'settingIndex',
        name: 'SettingIndex',
        meta: { title: '系统设置' },
        component: () => import(/* webpackChunkName: "SettingIndex" */ '@/views/user/setting/index.vue')
      },
      {
        path: 'userPermission',
        name: 'UserPermission',
        meta: { title: '用户权限' },
        component: () => import(/* webpackChunkName: "UserPermission" */ '@/views/user/userPermission/index.vue')
      },
      {
        path: 'resetPassword',
        name: 'ResetPassword',
        meta: { title: '忘记密码', hideMenu: true },
        component: () => import(/* webpackChunkName: "ResetPassword" */ '@/views/user/setting/reset_password/index.vue')
      }
    ]
  }
]
