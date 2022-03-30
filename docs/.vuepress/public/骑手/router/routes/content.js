/**
 *内容管理
 */
import Layout from '@views/layout/index'
export default [
  {
    path: '/content',
    name: 'Content',
    meta: { title: '内容管理' },
    icon: 'icon-nav-home',
    component: Layout,
    redirect: '/content/content-manage',
    children: [
      {
        path: 'content-manage',
        name: 'ContentManage',
        meta: { title: '内容管理' },
        component: () =>
          import('@views/content/manage/content-manage/index.vue')
      },
      {
        path: 'comment-manage',
        name: 'CommentManage',
        meta: { title: '评论管理' },
        component: () =>
          import('@views/content/manage/comment-manage/index.vue')
      },
      {
        path: 'contribution',
        name: 'Contribution',
        meta: { title: '骑手投稿' },
        component: () => import('@views/contribution/index')
      },
      {
        path: 'suggestion',
        name: 'Suggestion',
        meta: { title: '意见反馈' },
        component: () => import('@views/suggestion/index')
      }
    ]
  }
]

// export default [
//   {
//     path: '/contribution',
//     name: 'Contribution',
//     meta: { title: '骑手投稿' },
//     icon: 'icon-nav-home',
//     component: Layout,
//     redirect: '/contribution/list',
//     children: [
//       {
//         path: 'list',
//         name: 'ContributionIndex',
//         meta: { title: '骑手投稿' },
//         component: () => import('@views/contribution/index')
//       }
//     ]
//   }
// ]
