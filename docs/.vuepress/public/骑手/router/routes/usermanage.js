// 用户管理
import Layout from '@views/layout/index'
export default [
  {
    path: '/usermanage',
    name: 'Usermanage',
    meta: { title: '用户管理' },
    icon: 'icon-nav-home',
    component: Layout,
    redirect: '/usermanage/manage',
    children: [
      {
        path: 'manage',
        name: 'UsermanageIndex',
        meta: { title: '用户管理' },
        component: () => import('@views/usermanage/index')
      }
    ]
  }
]
