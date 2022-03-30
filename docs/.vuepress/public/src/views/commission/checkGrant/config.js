import { FormItemTypes } from '@/maps/enum'
// 发放渠道
export const payChanels = [
  { label: '平安银行', value: 'PABANK' },
  { label: '网商银行', value: 'MYBANK' },
  { label: '浦发银行', value: 'SPDBANK' },
  { label: '支付宝', value: 'ALIPAY' }
]
export const payrollOptions = [
  { label: '待审核', value: 'PAY_CHECKING' },
  { label: '待付款', value: 'PAY_HANDLE' },
  { label: '待发放', value: 'INIT' },
  { label: '成功', value: 'SUCCESS' },
  { label: '失败', value: 'FAIL' },
  { label: '驳回', value: 'PAY_CHECKING_FAIL' },
  { label: '失效', value: 'INVALID' },
  { label: '作废', value: 'USELESS' }
]
// 发放类型
export const payModes = {
  EXPSPAY: 'expspay',
  REALPAY: 'realpay',
  BILLPAY: 'realpay'
}

// 发放查询条件
export const grantSearchItems = [
  {
    label: '更新时间',
    key: 'startDate&endDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择更新时间'
  },
  {
    label: '姓名',
    key: 'realName',
    type: FormItemTypes.Input,
    placeholder: '请输入姓名'
  },
  {
    label: '平台批次号',
    key: 'batchNo',
    type: FormItemTypes.Input,
    placeholder: '请输入平台批次号'
  },
  {
    label: '证件号码',
    key: 'cardNo',
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
    label: '手机号码',
    key: 'mobile',
    type: FormItemTypes.Input,
    placeholder: '请输入手机号码'
  },
  {
    label: '状态',
    key: 'status',
    type: FormItemTypes.Select,
    placeholder: '请选择状态',
    option: payrollOptions
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
  }
]
// 发放表格字段
export const grantTableCols = [
  {
    type: 'index',
    width: 100
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
    prop: 'realName',
    minWidth: 200
  },
  {
    label: '证件号码',
    prop: 'cardNo',
    minWidth: 200
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 200
  },
  {
    label: '收款账号',
    prop: 'accountNo',
    minWidth: 200
  },
  {
    label: '开户行',
    prop: 'bankName',
    minWidth: 200
  },
  {
    label: '代发金额(元)',
    prop: 'expspay',
    minWidth: 200
  },
  {
    label: '平台批次号',
    prop: 'batchNo',
    minWidth: 200
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 200
  },
  // {
  //   label: '状态',
  //   prop: 'orderStatus',
  //   minWidth: 200,
  //   callback: row => {
  //     return row.orderStatus.label
  //   }
  // },
  {
    label: '状态',
    prop: 'viewStatus',
    minWidth: 200,
    callback: row => {
      return row.viewStatus.label
    }
  },
  {
    label: '备注',
    prop: 'orderReason',
    minWidth: 200
  }
]
