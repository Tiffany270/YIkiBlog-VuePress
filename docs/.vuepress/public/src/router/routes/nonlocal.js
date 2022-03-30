import Layout from '@/views/layout/index'
export default [
  {
    path: '/nonlocal',
    name: 'NonMainland',
    meta: { title: '非内地名单' },
    component: Layout,
    redirect: '/nonlocal/nonMainlandList',
    children: [
      {
        path: 'nonMainlandList',
        name: 'NonMainlandList',
        meta: { title: '非内地名单' },
        component: () => import(/* webpackChunkName: "NonMainlandList" */ '@/views/nonlocal/nonMainlandList/index.vue')
      }
    ]
  }
]
