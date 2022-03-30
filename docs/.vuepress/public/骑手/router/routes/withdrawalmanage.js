// 营销管理
import Layout from '@views/layout/index'
export default [
  {
    path: '/withdrawalmanage',
    name: 'Withdrawalmanage',
    meta: { title: '提现管理' },
    icon: 'icon-nav-home',
    component: Layout,
    redirect: '/usermanage/manage',
    children: [
      {
        path: 'manage',
        name: 'WithdrawalmanageIndex',
        meta: { title: '提现管理' },
        component: () => import('@views/withdrawalmanage/index')
      }
    ]
  }
]
