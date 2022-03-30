import { FormItemTypes } from '@/maps/enum'

/**
 * 状态下拉
 */
export const provisionStatus = [
  {
    label: '待发放',
    value: 'INIT'
  },
  {
    label: '成功',
    value: 'SUCCESS'
  },
  {
    label: '失败',
    value: 'FAIL'
  }
]

/**
 * 单笔查询表格查询条件
 */
export const singleProvisionSearchItems = [
  {
    label: '申请时间',
    key: 'applyStartTime&applyEndTime',
    type: FormItemTypes.Cascader,
    placeholder: '请选择申请时间'
  },
  {
    label: '完成时间',
    key: 'finishStartTime&finishEndTime',
    type: FormItemTypes.Cascader,
    placeholder: '请选择完成时间'
  },
  {
    label: '商户订单号',
    key: 'transNo',
    type: FormItemTypes.Input,
    placeholder: '请输入商户订单号'
  },
  {
    label: '姓名',
    key: 'realName',
    type: FormItemTypes.Input,
    placeholder: '请输入姓名'
  },
  {
    label: '证件号码',
    key: 'cardNo',
    type: FormItemTypes.Input,
    placeholder: '请输入证件号码'
  },
  {
    label: '手机号码',
    key: 'mobile',
    type: FormItemTypes.Input,
    placeholder: '请输入手机号码'
  },
  {
    label: '收款账号',
    key: 'accountNo',
    type: FormItemTypes.Input,
    placeholder: '请输入收款账号'
  },
  {
    label: '状态',
    key: 'orderStatus',
    type: FormItemTypes.Select,
    placeholder: '全部',
    option: provisionStatus
  }
]
/**
 * 单笔查询表格字段
 */
export function singleProvisionColumns() {
  return [
    {
      type: 'index'
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
      label: '归属地',
      prop: 'bankCardLocation',
      minWidth: 200
    },
    {
      label: '代发金额（元）',
      prop: 'expspay',
      minWidth: 200
    },
    {
      label: '服务费及税金（元）',
      prop: 'serviceCharge',
      minWidth: 200
    },
    {
      label: '申请时间',
      prop: 'createTime',
      minWidth: 200
    },
    {
      label: '完成时间',
      prop: 'updateTime',
      minWidth: 200
    },
    {
      label: '状态',
      prop: 'orderStatus',
      minWidth: 160,
      callback: row => {
        return row.orderStatus && row.orderStatus.label
      }
    },
    {
      label: '备注',
      prop: 'remark',
      minWidth: 200
    }
  ]
}
