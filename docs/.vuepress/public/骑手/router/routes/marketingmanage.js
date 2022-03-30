// 用户管理
import Layout from '@views/layout/index'
export default [
  {
    path: '/marketingmanage',
    name: 'Marketingmanage',
    meta: { title: '营销管理' },
    icon: 'icon-nav-home',
    component: Layout,
    redirect: '/marketingmanage/manage',
    children: [
      {
        path: 'manage',
        name: 'MarketingmanageIndex',
        meta: { title: '转介绍有奖' },
        component: () => import('@views/marketingmanage/index')
      },
      {
        path: 'user-reward',
        name: 'UserReward',
        meta: { title: '用户奖励' },
        component: () => import('@views/marketingmanage/userReward')
      }
    ]
  }
]
