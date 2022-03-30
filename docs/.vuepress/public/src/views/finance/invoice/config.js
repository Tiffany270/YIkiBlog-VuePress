import { FormItemTypes } from '@/maps/enum'
import { toThousands } from '@/utils/util'
// 开票状态
const INVOICE_STATUS_ENUM = {
  删除: 'DELETE',
  待处理: 'CHECK_PENDING',
  完成: 'SUCCESS',
  驳回: 'NO_PASS'
}
// 开票查询条件
export const invoiceSearchItems = [
  {
    label: '申请时间',
    key: 'startDate&endDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择申请时间'
  },
  {
    label: '处理状态',
    key: 'status',
    type: FormItemTypes.Select,
    placeholder: '请选择处理状态',
    option: [
      { label: '处理中', value: 'RUNNING' },
      { label: '待处理', value: 'CHECK_PENDING' },
      { label: '完成', value: 'SUCCESS' },
      { label: '驳回', value: 'NO_PASS' },
      { label: '已撤销', value: 'WITHDRAW' }
    ]
  },
  // {
  //   label: '账单号',
  //   key: 'billNo',
  //   type: FormItemTypes.Input,
  //   placeholder: '请输入账单号'
  // },
  {
    label: '开票编号',
    key: 'flow',
    type: FormItemTypes.Input,
    placeholder: '请输入开票编号'
  },
  {
    label: '开票时间',
    key: 'invoiceStartDate&invoiceEndDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择开票时间'
  }
]
// 开票表格字段
export function getInvoiceTableColumns(_this) {
  return [
    {
      type: 'index',
      width: 100
    },
    {
      label: '开票方式',
      prop: 'invoiceCreateType',
      minWidth: 120,
      callback: row => {
        return row.invoiceCreateType && row.invoiceCreateType.label
      }
    },
    {
      label: '开票编号',
      prop: 'flow',
      minWidth: 200
    },
    {
      label: '申请时间',
      prop: 'createTime',
      minWidth: 200
    },
    // {
    //   label: '关联账单数量',
    //   prop: 'billNos',
    //   minWidth: 200,
    //   callback: row => {
    //     return row.billNos && row.billNos.length
    //   }
    // },
    // {
    //   label: '关联账单号',
    //   prop: 'billNos1',
    //   minWidth: 200,
    //   callback: row => {
    //     return row.billNos && row.billNos.join(',')
    //   }
    // },
    {
      label: '开票金额(元)',
      prop: 'amount',
      minWidth: 200,
      callback: row => {
        return toThousands(row.amount)
      }
    },
    {
      label: '开票时间',
      prop: 'invoiceTime',
      minWidth: 200
    },
    {
      label: '处理状态',
      prop: 'status',
      minWidth: 100,
      fixed: 'right',
      callback: row => {
        return row.status && row.status.label
      }
    },
    {
      label: '备注',
      prop: 'remark',
      minWidth: 200
    },
    {
      label: '操作',
      type: 'action',
      width: 120,
      config: row => {
        const config = [
          {
            label: '详情',
            permission: _this.checkPermission('invoiceManage-detail'),
            fn: row => {
              _this.goToDetail(row)
            }
          }
        ]
        if (row.status && row.status.value === INVOICE_STATUS_ENUM['待处理']) {
          config.push({
            label: '撤销',
            permission: _this.checkPermission('invoiceManage-cancel'),
            fn: row => {
              _this.handleRevokeInvoice(row.id)
            }
          })
        }
        return config
      }
    }
  ]
}
// 账单表格查询条件
export const billSearchItems = [
  {
    label: '账单月份',
    key: 'belongMonth',
    type: FormItemTypes.Month,
    placeholder: '请选择账单月份'
  },
  {
    label: '账单周期',
    key: 'billStartDate&billEndDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择账单周期'
  }
]
// 账单表格字段
export const billColumns = [
  {
    type: 'selection'
  },
  {
    label: '账单编号',
    prop: 'billNo',
    minWidth: 200
  },
  {
    label: '账单月份',
    prop: 'belongMonth',
    minWidth: 200
  },
  {
    label: '账单类型',
    prop: 'billType',
    minWidth: 200,
    callback: row => {
      return row.billType.label
    }
  },
  {
    label: '账单周期',
    prop: 'billRound',
    minWidth: 200
  },
  {
    label: '账单金额（元）',
    prop: 'totalPay',
    minWidth: 200,
    callback: row => {
      return toThousands(row.totalPay)
    }
  },
  {
    label: '可开票金额（元）',
    prop: 'canInvoiceAmount',
    minWidth: 200,
    callback: row => {
      return toThousands(row.canInvoiceAmount)
    }
  }
]
//  发票-详情-申请明细
export const applyDetailColumns = [
  {
    label: '账单编号',
    prop: 'billNo',
    minWidth: 200
  },
  // {
  //   label: '账单月份',
  //   prop: 'belongMonth',
  //   minWidth: 200
  // },
  {
    label: '账单类型',
    prop: 'billType',
    minWidth: 200,
    callback: row => {
      return row.billType.label
    }
  },
  {
    label: '账单周期',
    prop: 'billRound',
    minWidth: 200
  },
  {
    label: '账单金额（元）',
    prop: 'totalPay',
    minWidth: 200,
    callback: row => {
      return toThousands(row.totalPay)
    }
  },
  {
    label: '开票金额（元）',
    prop: 'invoiceAmount',
    minWidth: 200,
    callback: row => {
      return toThousands(row.invoiceAmount)
    }
  }
]
//  发票-详情-发票信息
export const invoiceInfoColumns = [
  // {
  //   type: 'selection'
  // },
  {
    type: 'index'
  },
  {
    label: '发票代码',
    prop: 'invoiceCode',
    minWidth: 200
  },
  {
    label: '发票号码',
    prop: 'invoiceNumber',
    minWidth: 200
  },
  {
    label: '开票金额（价税合计）',
    prop: 'amount',
    minWidth: 200,
    callback: row => {
      return toThousands(row.amount)
    }
  },
  {
    label: '开票类型',
    prop: 'invoiceType',
    minWidth: 200,
    callback: row => {
      return row.invoiceType && row.invoiceType.label
    }
  },
  {
    label: '开票内容',
    prop: 'content',
    minWidth: 200
  }
]
