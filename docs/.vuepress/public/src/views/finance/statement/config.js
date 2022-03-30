import { FormItemTypes } from '@/maps/enum'
import { toThousands } from '@/utils/util'

/** 结算对账单
 * 数据统计
 */
export const statementDisplay = [
  {
    key: 'sumSuccessExpspay',
    title: '代发成功金额合计'
  },
  {
    key: 'sumFailExpspay',
    title: '代发失败金额合计'
  },
  {
    key: 'paidSumServiceCharge',
    title: '已支付服务费及税金合计'
  },
  {
    key: 'unpaidSumServiceCharge',
    title: '未支付服务费及税金合计'
  },
  {
    key: 'serviceChargeAmount',
    title: '服务费及税金总额合计'
  },
  {
    key: 'totalAmount',
    title: '费用总金额合计'
  }
]

/** 结算对账单
 * 查询表单
 */
export const searchList = [
  {
    label: '所属月份',
    key: 'belongMonth',
    type: FormItemTypes.Month,
    placeholder: '请选择所属月份',
    option: []
  }
]
/** 结算对账单
 * 表格字段
 */
export const getCustomerStatementColumns = self => [
  {
    type: 'selection',
    minWidth: 100
  },
  {
    type: 'index',
    minWidth: 80
  },
  {
    label: '所属月份',
    prop: 'belongMonth',
    minWidth: 80
  },
  {
    label: '成功笔数,失败笔数',
    prop: 'successCount&failCount',
    minWidth: 150,
    callback: row => {
      return row.successCount + ',' + row.failCount
    }
  },
  {
    label: '代发成功金额(元)',
    prop: 'sumSuccessExpspay',
    minWidth: 150,
    callback: row => {
      return toThousands(row.sumSuccessExpspay)
    }
  },
  {
    label: '代发失败金额(元)',
    prop: 'sumFailExpspay',
    minWidth: 150,
    callback: row => {
      return toThousands(row.sumFailExpspay)
    }
  },
  {
    label: '已支付服务费及税金(元)',
    prop: 'paidSumServiceCharge',
    minWidth: 200,
    callback: row => {
      return toThousands(row.paidSumServiceCharge)
    }
  },
  {
    label: '未支付服务费及税金(元)',
    prop: 'unpaidSumServiceCharge',
    minWidth: 200,
    callback: row => {
      return toThousands(row.unpaidSumServiceCharge)
    }
  },
  {
    label: '服务费及税金总额合计(元)',
    prop: 'serviceChargeAmount',
    minWidth: 200,
    callback: row => {
      return toThousands(row.serviceChargeAmount)
    }
  },
  {
    label: '费用总金额(元)',
    prop: 'totalAmount',
    minWidth: 120,
    callback: row => {
      return toThousands(row.totalAmount)
    }
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 200
  },
  {
    label: '操作',
    type: 'action',
    width: 60,
    config: row => [
      {
        label: '详情',
        permission: self.checkPermission('settlementStatement-detail'),
        fn: () => {
          self.$router.push({
            name: 'StatementDetail',
            query: { id: row.id, belongMonth: row.belongMonth }
          })
        }
      }
    ]
  }
]
