import { FormItemTypes } from '@/maps/enum'
import { toThousands } from '@/utils/util'

// 结算对账单详情-统计状态
export const statisticOrderStatusOptions = [
  { label: '成功', value: 'SUCCESS' },
  { label: '失败', value: 'FAIL' }
]
/** 结算对账单-详情
 * 数据统计
 */
export const statementDetailDisplay = [
  {
    key: 'sumExpspay',
    title: '佣金实发金额合计'
  },
  {
    key: 'sumServiceCharge',
    title: '服务费及税金总额合计'
  }
]

/** 结算对账单-详情
 * 查询表单
 */
export const searchList = [
  {
    label: '姓名',
    key: 'accountName',
    type: FormItemTypes.Input,
    placeholder: '请输入姓名'
  },
  {
    label: '证件号码',
    key: 'certNo',
    type: FormItemTypes.Input,
    placeholder: '请输入证件号码'
  },
  {
    label: '收款账号',
    key: 'accountNo',
    type: FormItemTypes.Input,
    placeholder: '请输入收款账号'
  },
  {
    label: '平台订单号',
    key: 'orderNo',
    type: FormItemTypes.Input,
    placeholder: '请输入平台订单号'
  },
  {
    label: '商户订单号',
    key: 'transNo',
    type: FormItemTypes.Input,
    placeholder: '请输入商户订单号'
  },
  {
    label: '扣款时间',
    key: 'paySubmitStartDate&paySubmitEndDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择扣款时间'
  },
  {
    label: '完成时间',
    key: 'finishStartDate&finishEndDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择完成时间'
  },
  {
    label: '状态',
    key: 'orderStatus',
    type: FormItemTypes.Select,
    placeholder: '全部',
    option: statisticOrderStatusOptions
  }
]
/** 结算对账单
 * 表格字段
 */
export const getCustomerStatementColumns = () => [
  {
    type: 'selection',
    minWidth: 80
  },
  {
    type: 'index',
    minWidth: 80
  },
  {
    label: '平台订单号',
    prop: 'orderNo',
    minWidth: 200
  },
  {
    label: '商户订单号',
    prop: 'transNo',
    minWidth: 200
  },
  {
    label: '姓名',
    prop: 'accountName',
    minWidth: 180
  },
  {
    label: '证件号码',
    prop: 'certNo',
    minWidth: 200
  },
  {
    label: '收款账号',
    prop: 'accountNo',
    minWidth: 200
  },
  {
    label: '佣金实发金额(元)',
    prop: 'expspay',
    minWidth: 150,
    callback: row => {
      return toThousands(row.expspay)
    }
  },
  {
    label: '服务费及税金(元)',
    prop: 'serviceCharge',
    minWidth: 150,
    callback: row => {
      return toThousands(row.serviceCharge)
    }
  },
  {
    label: '扣款时间',
    prop: 'paySubmitDate',
    minWidth: 200
  },
  {
    label: '完成时间',
    prop: 'finishDate',
    minWidth: 200
  },
  {
    label: '状态',
    prop: 'orderStatus',
    minWidth: 200,
    callback: row => {
      return row.orderStatus && row.orderStatus.label
    }
  },
  {
    label: '备注',
    prop: 'orderReason',
    minWidth: 200
  }
]
