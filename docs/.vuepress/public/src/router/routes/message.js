import Layout from '@/views/layout/index'
export default [
  {
    path: '/message',
    name: 'NewsManagement',
    meta: { title: '消息管理', icon: 'xbicon-finance' },
    component: Layout,
    redirect: '/message/systemNewsList',
    children: [
      {
        path: 'systemNewsList',
        name: 'SystemNewsList',
        meta: { title: '系统消息' },
        component: () => import(/* webpackChunkName: "SystemNewsList" */ '@/views/message/systemNewsList/index.vue')
      }
    ]
  }
]
