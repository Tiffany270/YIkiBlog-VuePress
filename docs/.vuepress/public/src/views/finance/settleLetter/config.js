import { FormItemTypes } from '@/maps/enum'
import { toThousands } from '@/utils/util'
/**
 * 结算函
 * 状态-枚举
 */
export const statementLetterStatusEnums = {
  WAIT_TO_SIGN: 'WAIT_TO_SIGN', // 待盖章
  SIGNED: 'SIGNED', // 已盖章
  WAIT_TO_CREATE: 'WAIT_TO_CREATE' // 待生成
}
/**
 * 结算函
 * 状态
 */
export const statementLetterStatusOption = [
  { label: '待盖章', value: statementLetterStatusEnums.WAIT_TO_SIGN },
  { label: '已盖章', value: statementLetterStatusEnums.SIGNED },
  { label: '待生成', value: statementLetterStatusEnums.WAIT_TO_CREATE }
]
/** 结算函
 * 查询表单
 */
export const searchItems = [
  {
    label: '所属周期',
    key: 'beginTime&endTime',
    type: FormItemTypes.Cascader,
    placeholder: '请选择所属月份',
    options: []
  }
]
/** 结算函
 * 表格字段
 */
export const getCustomerStatementLetter = self => [
  {
    type: 'selection',
    minWidth: 100
  },
  {
    type: 'index',
    minWidth: 100
  },
  {
    label: '所属周期',
    prop: 'beginTime',
    minWidth: 150,
    callback: row => {
      return row.beginTime + '至' + row.endTime
    }
  },
  {
    label: '充值金额(元)',
    prop: 'rechargeAmount',
    minWidth: 150,
    callback: row => {
      return toThousands(row.rechargeAmount)
    }
  },
  {
    label: '佣金实发金额(元)',
    prop: 'realPayAmount',
    minWidth: 150,
    callback: row => {
      return toThousands(row.realPayAmount)
    }
  },
  {
    label: '服务费及税金(元)',
    prop: 'serviceTaxChargeAmount',
    minWidth: 150,
    callback: row => {
      return toThousands(row.serviceTaxChargeAmount)
    }
  },
  {
    label: '账单金额(元)',
    prop: 'billAmount',
    minWidth: 120,
    callback: row => {
      return toThousands(row.billAmount)
    }
  },
  {
    label: '已支付金额(元)',
    prop: 'paidAmount',
    minWidth: 120,
    callback: row => {
      return toThousands(row.paidAmount)
    }
  },
  {
    label: '未支付金额(元)',
    prop: 'waitPaidAmount',
    minWidth: 120,
    callback: row => {
      return toThousands(row.waitPaidAmount)
    }
  },
  {
    label: '状态',
    prop: 'status',
    minWidth: 120,
    callback: row => {
      return row.status && row.status.label
    }
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 180
  },
  {
    label: '操作',
    type: 'action',
    width: 80,
    config: row => [
      {
        label: '查看',
        permission: self.checkPermission('clientStatementLetter-view'),
        fn: () => {
          console.log('row', row)
          console.log('yulan', row.letterFile)
          self.viewSettleLetter(row)
        }
      }
    ]
  }
]
