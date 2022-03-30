import Layout from '@/views/layout/index'
export default [
  {
    path: '/studio',
    name: 'Studio',
    meta: { title: '工作室管理' },
    component: Layout,
    redirect: '/studio/list',
    children: [
      {
        path: 'list',
        name: 'StudioManage',
        meta: { title: '工作室管理' },
        component: () => import(/* webpackChunkName: "StudioManage" */ '@/views/studio/index.vue')
      },
      {
        path: 'checkProcress',
        name: 'CheckStudioImportProcress',
        meta: { hideMenu: true, parent: 'StudioManage' },
        component: () =>
          import(/* webpackChunkName: "CheckStudioImportProcress" */ '@/views/studio/checkProcress/index.vue')
      },
      {
        path: 'result',
        name: 'StudioImportResultList',
        meta: { hideMenu: true, parent: 'StudioManage' },
        component: () => import(/* webpackChunkName: "StudioImportResultList" */ '@/views/studio/result/index.vue')
      }
    ]
  }
]
