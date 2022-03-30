import Layout from '@/views/layout/index'
export default [
  {
    path: '/sign',
    name: 'Sign',
    meta: { title: '签约管理' },
    component: Layout,
    redirect: '/sign/signManage',
    children: [
      {
        path: 'sign',
        name: 'SignManage',
        meta: { title: '签约管理' },
        component: () => import(/* webpackChunkName: "SignManage" */ '@/views/sign/signManage/index.vue')
      },
      {
        path: 'signManageCheck',
        name: 'SignManageCheck',
        meta: { title: '核对名单', hideMenu: true, parent: 'SignManage' },
        component: () => import(/* webpackChunkName: "SignManageCheck" */ '@/views/sign/signManage/check.vue')
      },
      {
        path: 'submitConfirm',
        name: 'SubmitConfirm',
        meta: { title: '提交确认', hideMenu: true, parent: 'SignManage' },
        component: () => import(/* webpackChunkName: "SubmitConfirm" */ '@/views/sign/signManage/submitConfirm.vue')
      }
    ]
  }
]
