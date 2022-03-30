import Layout from '@/views/layout/index'
export default [
  {
    path: '/commission',
    name: 'Commission',
    meta: { title: '发放管理' },
    component: Layout,
    redirect: '/commission/payCommission',
    children: [
      {
        path: 'payCommission',
        name: 'PayCommission',
        meta: { title: '批量打款' },
        component: () => import(/* webpackChunkName: "PayCommission" */ '@/views/commission/payCommission/index.vue')
      },
      {
        path: 'payBatchDetail',
        name: 'PayBatchDetail',
        meta: { title: '批量打款详情', hideMenu: true, parent: 'PayCommission' },
        component: () =>
          import(/* webpackChunkName: "PayBatchDetail" */ '@/views/commission/payCommission/detail/index.vue')
      },
      {
        path: 'handleToPay',
        name: 'HandleToPay',
        meta: {
          title: '校验测算',
          hideMenu: true,
          parent: 'PayCommission'
        },
        component: () => import(/* webpackChunkName: "HandleToPay" */ '@/views/commission/payCommission/handleToPay')
      },
      {
        path: 'confirmToPay',
        name: 'ConfirmToPay',
        meta: {
          title: '账单确认',
          hideMenu: true,
          parent: 'PayCommission'
        },
        component: () => import(/* webpackChunkName: "ConfirmToPay" */ '@/views/commission/payCommission/confirmToPay')
      },
      {
        path: 'passToPay',
        name: 'PassToPay',
        meta: {
          title: '密码支付',
          hideMenu: true,
          parent: 'PayCommission'
        },
        component: () => import(/* webpackChunkName: "PassToPay" */ '@/views/commission/payCommission/passToPay')
      },
      {
        path: 'checkGrant',
        name: 'CheckGrant',
        meta: { title: '批量打款明细' },
        component: () => import(/* webpackChunkName: "CheckGrant" */ '@/views/commission/checkGrant/index.vue')
      },
      {
        path: 'singleProvisionQuery',
        name: 'SingleProvisionQuery',
        meta: { title: '单笔发放查询' },
        component: () =>
          import(/* webpackChunkName: "SingleProvisionQuery" */ '@/views/commission/singleProvisionQuery/index.vue')
      },
      {
        path: 'electronicReceipt',
        name: 'ElectronicReceipt',
        meta: { title: '电子回单' },
        component: () =>
          import(/* webpackChunkName: "ElectronicReceipt" */ '@/views/commission/electronicReceipt/index.vue')
      }
    ]
  }
]
