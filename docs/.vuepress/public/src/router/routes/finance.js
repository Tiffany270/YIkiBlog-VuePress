import Layout from '@/views/layout/index'
export default [
  {
    path: '/finance',
    name: 'Finance',
    meta: { title: '财务管理' },
    component: Layout,
    redirect: '/finance/accountInfo',
    children: [
      {
        path: 'invoice',
        name: 'InvoiceManage',
        meta: { title: '开票管理' },
        component: () => import(/* webpackChunkName: "InvoiceManage" */ '@/views/finance/invoice/index.vue')
      },
      {
        path: 'invoiceDetail',
        name: 'InvoiceDetail',
        meta: { title: '开票详情', hideMenu: true, parent: 'InvoiceManage' },
        component: () => import(/* webpackChunkName: "InvoiceDetail" */ '@/views/finance/invoice/detail/index.vue')
      },
      {
        path: 'bill',
        name: 'Bill',
        meta: { title: '账单列表', hideMenu: true, parent: 'InvoiceManage' },
        component: () => import(/* webpackChunkName: "Bill" */ '@/views/finance/invoice/bill/index.vue')
      },
      {
        path: 'submitInvoice',
        name: 'SubmitInvoice',
        meta: { title: '提交开票', hideMenu: true, parent: 'InvoiceManage' },
        component: () => import(/* webpackChunkName: "SubmitInvoice" */ '@/views/finance/invoice/create/index.vue')
      },
      {
        path: 'receipt',
        name: 'SettlementReceipt',
        meta: { title: '结算账单' },
        component: () => import(/* webpackChunkName: "SettlementReceipt" */ '@/views/finance/settlement/index.vue')
      },
      {
        path: 'receiptDetail',
        name: 'SettlementReceiptDetail',
        meta: { title: '结算账单详情', hideMenu: true, parent: 'SettlementReceipt' },
        component: () =>
          import(/* webpackChunkName: "SettlementReceiptDetail" */ '@/views/finance/settlement/detail.vue')
      },
      {
        path: 'statement',
        name: 'SettlementStatement',
        meta: { title: '结算对账单' },
        component: () => import(/* webpackChunkName: "SettlementStatement" */ '@/views/finance/statement/index.vue')
      },
      {
        path: 'statementDetail',
        name: 'StatementDetail',
        meta: { title: '结算对账单详情', hideMenu: true, parent: 'SettlementStatement' },
        component: () => import(/* webpackChunkName: "StatementDetail" */ '@/views/finance/statement/detail/index.vue')
      },
      {
        path: 'clientStatementLetter',
        name: 'ClientStatementLetter',
        meta: { title: '结算函' },
        component: () =>
          import(/* webpackChunkName: "ClientStatementLetter" */ '@/views/finance/settleLetter/index.vue')
      },
      {
        path: 'account',
        name: 'AccountInfo',
        meta: { title: '账户信息' },
        component: () => import(/* webpackChunkName: "AccountInfo" */ '@/views/finance/account/index.vue')
      }
    ]
  }
]
