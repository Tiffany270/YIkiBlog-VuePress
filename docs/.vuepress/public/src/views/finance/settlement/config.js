import { FormItemTypes } from '@/maps/enum'
import { numberConverter } from '@/mixins/NumberConverter'
// 账单数据统计
export const BillSummaryDisplay = [
  {
    key: 'sumRealPay',
    title: '佣金实发金额合计'
  },
  {
    key: 'sumServiceTaxCharge',
    title: '服务费及税金额合计'
  },
  {
    key: 'sumTotalPay',
    title: '账单金额合计'
  },
  {
    key: 'sumPaidAmount',
    title: '已支付金额合计'
  },
  {
    key: 'sumUnpaidAmount',
    title: '未支付金额合计'
  }
]
// 账单搜索项
export const searchItems = {
  mounted() {
    this.searchList = [
      {
        label: '账单类型',
        key: 'billType',
        type: FormItemTypes.Select,
        placeholder: '请选择账单类型',
        option: billTypeOptions
      },
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
      },
      {
        label: '账单状态',
        key: 'billStatus',
        type: FormItemTypes.Select,
        placeholder: '全部',
        option: [
          { label: '已结清', value: 'ALLPAID' },
          { label: '待结清', value: 'UNPAID' }
        ]
      }
    ]
  }
}

// 账单类型-枚举
export const billTypeEnums = {
  ORIGINBILL: 'ORIGINBILL', // 普通账单
  MONTH_SERVICE_BILL: 'MONTH_SERVICE_BILL', // 月结账单
  MONTH_SERVICE_ADJUST_BILL: 'MONTH_SERVICE_ADJUST_BILL', // 月结调整
  MANUAL_BILL: 'MANUAL_BILL' // 人工调整
}
// 账单类型- 下拉
export const billTypeOptions = [
  {
    label: '普通账单',
    value: 'billTypeEnums.ORIGINBILL'
  },
  {
    label: '月结账单',
    value: 'billTypeEnums.MONTH_SERVICE_BILL'
  },
  {
    label: '月结调整',
    value: 'billTypeEnums.MONTH_SERVICE_ADJUST_BILL'
  },
  {
    label: '人工调整',
    value: 'billTypeEnums.MANUAL_BILL'
  }
]
// 账单状态-枚举
export const billStatusEnums = {
  ALLPAID: 'ALLPAID', // 已结清
  UNPAID: 'UNPAID' // 待结清
}

export const payChanels = [
  { label: '平安银行', value: 'PABANK' },
  { label: '浦发银行', value: 'SPDBANK' },
  { label: '支付宝', value: 'ALIPAY' },
  { label: '微信支付', value: 'MMPAY' },
  { label: '线下发放', value: 'OFFLINE' }
]
// 表格字段
export const getTableCols = self => [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50
  },
  {
    label: '账单编号',
    prop: 'billNo',
    minWidth: 150
  },
  {
    label: '账单类型',
    prop: 'billType',
    callback: row => {
      return row.billType && row.billType.label
    },
    minWidth: 100
  },
  {
    label: '账单月份',
    prop: 'belongMonth',
    minWidth: 100
  },
  {
    label: '账单周期',
    prop: 'billStartDate&billEndDate',
    minWidth: 200,
    callback: row => {
      return row.billStartDate + '至' + row.billEndDate
    }
  },
  {
    label: '佣金实发金额(元)',
    prop: 'realPay',
    minWidth: 150,
    callback: row => {
      return numberConverter.moneyConvert(row.realPay)
    }
  },
  {
    label: '服务费及税金(元)',
    prop: 'serviceTaxCharge',
    minWidth: 160,
    callback: row => {
      return numberConverter.moneyConvert(row.serviceTaxCharge)
    }
  },
  {
    label: '账单金额(元)',
    prop: 'totalPay',
    minWidth: 120,
    callback: row => {
      return numberConverter.moneyConvert(row.totalPay)
    }
  },
  {
    label: '已支付金额(元)',
    prop: 'paidAmount',
    minWidth: 120,
    callback: row => {
      return numberConverter.moneyConvert(row.paidAmount)
    }
  },
  {
    label: '未支付金额(元)',
    prop: 'unpaidAmount',
    minWidth: 120,
    callback: row => {
      return numberConverter.moneyConvert(row.unpaidAmount)
    }
  },
  {
    label: '生成时间',
    prop: 'createTime',
    minWidth: 180
  },
  {
    label: '结清时间',
    prop: '',
    minWidth: 180
  },
  {
    label: '账单状态',
    prop: 'billStatus',
    with: 100,
    fixed: 'right',
    callback: row => {
      return row.billStatus && row.billStatus.label
    }
  },
  {
    label: '操作',
    type: 'action',
    width: 200,
    config: row => {
      const actions = []
      const billStatus = row.billStatus.name
      const billType = row.billType.name
      if (billType !== billTypeEnums.MANUAL_BILL) {
        actions.push({
          label: '详情', // 非人工调账的账单
          permission: self.checkPermission('settlementReceipt-detail'),
          fn: () => {
            self.$router.push({
              name: 'SettlementReceiptDetail',
              query: { id: row.id }
            })
          }
        })
      } else if (row.fileId) {
        actions.push({
          label: '附件', // 人工调账的账单 无附件不展示
          permission: self.checkPermission('settlementReceipt-file'),
          fn: () => {
            self.handleDownLoad(row.fileId)
          }
        })
      }
      if (billStatus === billStatusEnums.UNPAID && billType === billTypeEnums.MONTH_SERVICE_BILL) {
        actions.push({
          label: '结款', // 待结清状态且为月结账单
          permission: self.checkPermission('settlementReceipt-settle'),
          fn: () => {
            const params = {
              id: row.id,
              unpaidAmount: row.unpaidAmount,
              totalPay: row.totalPay
            }
            self.$refs.DialogBillSettlement.updateView(params)
          }
        })
      }
      return actions
    }
  }
]
// 详情表格字段
export const getTableDetailCols = () => [
  {
    type: 'index',
    width: 50
  },
  {
    label: '姓名',
    prop: 'realName'
  },
  {
    label: '商户订单号',
    prop: 'transNo'
  },
  {
    label: '申报类型',
    prop: 'declareType',
    width: 100,
    callback: row => {
      return row.declareType && row.declareType.label
    }
  },
  {
    label: '证件号码',
    prop: 'certNo',
    width: 200
  },
  {
    label: '收款账号',
    prop: 'bankAccount'
  },
  {
    label: '平台批次号',
    prop: 'batchNo'
  },
  {
    label: '扣款时间',
    prop: 'paySubmitTime',
    minWidth: 150
  },
  {
    label: '完成时间',
    prop: 'payTime',
    minWidth: 150
  },
  {
    label: '代发金额(元)',
    prop: 'realPay',
    minWidth: 100,
    callback: row => {
      return numberConverter.moneyConvert(row.realPay)
    }
  },
  {
    label: '服务费及税金(元)',
    prop: 'serviceTaxCharge',
    minWidth: 100,
    callback: row => {
      return numberConverter.moneyConvert(row.serviceTaxCharge)
    }
  }
]

// 账单详情搜索项
export const searchDetailItems = {
  mounted() {
    this.searchList = [
      {
        label: '姓名',
        key: 'realName',
        type: FormItemTypes.Input,
        placeholder: '请输入姓名'
      },
      {
        label: '商户订单号',
        key: 'transNo',
        type: FormItemTypes.Input,
        placeholder: '请输入商户订单号'
      },
      // {
      //   label: '账单周期',
      //   key: 'billStartDate&billEndDate',
      //   type: FormItemTypes.Cascader,
      //   placeholder: '请选择账单周期'
      // },
      // {
      //   label: '支付渠道',
      //   key: 'billType',
      //   type: FormItemTypes.Select,
      //   placeholder: '请选择支付渠道',
      //   option: billTypeOptions
      // },
      {
        label: '平台批次号',
        key: 'batchNo',
        type: FormItemTypes.Input,
        placeholder: '请输入平台批次号'
      },
      {
        label: '完成时间',
        key: 'payTimeStart&payTimeEnd',
        type: FormItemTypes.Cascader,
        placeholder: '请选择完成时间'
      },
      {
        label: '扣款时间',
        key: 'paySubmitTimeStart&paySubmitTimeEnd',
        type: FormItemTypes.Cascader,
        placeholder: '请选择扣款时间'
      }
    ]
  }
}
