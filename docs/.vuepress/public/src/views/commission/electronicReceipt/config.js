import { FormItemTypes } from '@/maps/enum'
export const payChanels = [
  { label: '平安银行', value: 'PABANK' },
  // { label: '网商银行', value: 'MYBANK' },
  { label: '浦发银行', value: 'SPDBANK' },
  { label: '支付宝', value: 'ALIPAY' }
]
// 电子回单查询条件
export const eleReceiptSearchItems = [
  {
    label: '交易时间',
    key: 'startDate&endDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择交易时间'
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
    label: '渠道',
    key: 'channelType',
    type: FormItemTypes.Select,
    placeholder: '请选择渠道',
    option: payChanels
  },
  {
    label: '平台批次号',
    key: 'batchNo',
    type: FormItemTypes.Input,
    placeholder: '请输入平台批次号'
  },
  {
    label: '姓名',
    key: 'accountName',
    type: FormItemTypes.Input,
    placeholder: '请输入姓名'
  },
  {
    label: '收款账号',
    key: 'accountNo',
    type: FormItemTypes.Input,
    placeholder: '请输入收款账号'
  },
  {
    label: '类型',
    key: 'voucherType',
    type: FormItemTypes.Select,
    placeholder: '请选择类型',
    option: [
      { label: '个人', value: 'PERSONAL' },
      { label: '汇总', value: 'SUMMARY' }
    ]
  }
]
// 电子回单表格字段
export function getEleReceiptColumns(_this) {
  return [
    {
      type: 'index'
    },
    {
      label: '交易时间',
      prop: 'createDate',
      minWidth: 200
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
      label: '渠道',
      prop: 'payChannelType',
      minWidth: 200,
      callback: row => {
        return row.payChannelType && row.payChannelType.label
      }
    },
    {
      label: '平台批次号',
      prop: 'batchNo',
      minWidth: 200
    },
    {
      label: '姓名',
      prop: 'accountName',
      minWidth: 200
    },
    {
      label: '收款账号',
      prop: 'accountNo',
      minWidth: 200
    },
    {
      label: '代发金额（元）',
      prop: 'transAmt',
      minWidth: 200
    },
    {
      label: '类型',
      prop: 'voucherType',
      minWidth: 200,
      callback: row => {
        return row.voucherType && row.voucherType.label
      }
    },
    {
      label: '交易状态',
      prop: 'status',
      minWidth: 200,
      callback: row => {
        return row.status && row.status.label
      }
    },
    {
      label: '操作',
      type: 'action',
      width: 60,
      config: () => {
        const config = [
          {
            label: '下载',
            permission: _this.checkPermission('electronicReceipt-download'),
            fn: row => {
              _this.handleDownload(row)
            }
          }
        ]
        return config
      }
    }
  ]
}
