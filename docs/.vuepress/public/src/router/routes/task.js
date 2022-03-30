import Layout from '@/views/layout/index'
export default [
  {
    path: '/task',
    name: 'Task',
    meta: { title: '任务管理' },
    component: Layout,
    redirect: '/task/taskManage',
    children: [
      {
        path: 'taskManage',
        name: 'TaskManage',
        meta: { title: '任务列表' },
        component: () => import(/* webpackChunkName: "TaskManage" */ '@/views/task/taskManage/index.vue')
      },
      {
        path: 'taskPending',
        name: 'TaskPending',
        meta: { title: '待处理' },
        component: () => import(/* webpackChunkName: "TaskPending" */ '@/views/task/taskPending/index.vue')
      },
      {
        path: 'edit',
        name: 'EditTask',
        meta: { title: '任务详情', hideMenu: true, parent: 'TaskManage' },
        component: () => import(/* webpackChunkName: "EditTask" */ '@/views/task/edit/index.vue')
      },
      {
        path: 'taskRoster',
        name: 'TaskRoster',
        meta: { title: '任务名单', hideMenu: true, parent: 'TaskManage' },
        component: () => import(/* webpackChunkName: "TaskRoster" */ '@/views/task/taskRoster/index.vue')
      },
      // {
      //   path: 'taskRosterDetail',
      //   name: 'TaskRosterDetail',
      //   meta: { title: '任务名单详情', hideMenu: true },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "TaskDetail" */ '@/views/task/taskRosterDetail/index.vue'
      //     )
      // },
      {
        path: 'taskRosterCheck',
        name: 'TaskRosterCheck',
        meta: { title: '任务名单校验', hideMenu: true, parent: 'TaskManage' },
        component: () => import(/* webpackChunkName: "TaskRosterCheck" */ '@/views/task/taskRosterCheck/index.vue')
      },
      {
        path: 'taskRosterSubmit',
        name: 'TaskRosterSubmit',
        meta: { title: '任务名单提交', hideMenu: true, parent: 'TaskManage' },
        component: () =>
          import(/* webpackChunkName: "TaskRosterCheck" */ '@/views/task/taskRosterCheck/submitConfirm.vue')
      }
    ]
  }
]
