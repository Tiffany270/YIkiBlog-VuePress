import { FormItemTypes, FLOW_STATE_ENUM, FLOW_STATUS_ENUM, AUTH_ROLES } from '@/maps/enum'
// 步骤条
export const STEPER_TEXT_LIST = ['校验测算', '账单确认', '密码支付']
export const payStatusOptions = [
  // { label: '导入', value: 'INIT' },
  { label: '待审核', value: 'PAY_CHECKING' },
  { label: '待付款', value: 'PAY_HANDLE' },
  { label: '正在代发', value: 'PAID' },
  // { label: '正在重发', value: 'REHANDLE_PAID' },
  // { label: '重发待审核', value: 'REHANDLE_PREPARE' },
  // { label: '重发驳回', value: 'REHANDLE_CHECKING_FAIL' },
  // { label: '重发待付款', value: 'REHANDLE_CHECKING_SUCCESS' },
  // { label: '部分完成', value: 'PAY_FAIL' },
  { label: '已完成', value: 'PAY_SUCCESS' },
  { label: '驳回', value: 'PAY_CHECKING_FAIL' },
  { label: '失效', value: 'INVALID' },
  { label: '作废', value: 'USELESS' }
]
export const dataSourcesOptions = [
  // { label: '管理端', value: 'MANAGER' },
  { label: 'B端', value: 'WEB' }
  // { label: 'API', value: 'API' },
  // { label: '闪众', value: 'SZONE' },
  // { label: 'C端', value: 'WECHAT' },
  // { label: 'H5', value: 'H5' },
  // { label: '第三方', value: 'THIRD' },
  // { label: '挂起订单发放', value: 'HANDUP' },
  // { label: '超时订单发放', value: 'EXPIRE' }
]
// 发放类型
export const payModes = {
  EXPSPAY: 'expspay',
  REALPAY: 'realpay',
  BILLPAY: 'realpay'
}
// 佣金代发查询条件
export const commissionSearchItems = [
  {
    label: '申请时间',
    key: 'startDate&endDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择申请时间'
  },
  {
    label: '完成时间',
    key: 'finishStartDate&finishEndDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择申请时间'
  },
  {
    label: '平台批次号',
    key: 'batchNo',
    type: FormItemTypes.Input,
    placeholder: '请输入平台批次号'
  },
  {
    label: '发放状态',
    key: 'status',
    type: FormItemTypes.Select,
    placeholder: '请选择发放状态',
    option: payStatusOptions
  }
  // {
  //   label: '来源',
  //   key: 'channelSource',
  //   type: FormItemTypes.Select,
  //   placeholder: '全部',
  //   option: dataSourcesOptions
  // }
]
// 佣金代发表格字段
export function getCommissionTableCols(_this) {
  return [
    {
      type: 'index',
      width: 100
    },
    {
      label: '平台批次号',
      prop: 'batchNo',
      minWidth: 200
    },
    {
      label: '总笔数(笔)',
      prop: 'totalCount',
      minWidth: 200
    },
    {
      label: '代发金额(元)',
      prop: 'totalAmount',
      minWidth: 200
    },
    {
      label: '申请时间',
      prop: 'createTime',
      minWidth: 200
    },
    {
      label: '完成时间',
      prop: 'payDate',
      minWidth: 200,
      callback: row => {
        return row.flowState.value === FLOW_STATE_ENUM['已完成'] || row.flowState.value === FLOW_STATE_ENUM['部分完成']
          ? row.payDate
          : '-'
      }
    },
    // {
    //   label: '来源',
    //   prop: 'channelSource',
    //   minWidth: 120,
    //   callback: row => {
    //     return row.channelSource && row.channelSource.label
    //   }
    // },
    {
      label: '成功笔数及金额',
      prop: 'successCount',
      minWidth: 200,
      callback: row => {
        return `成功${
          row.flowState.value === FLOW_STATE_ENUM['已完成'] || row.flowState.value === FLOW_STATE_ENUM['部分完成']
            ? row.successCount
            : 0
        }笔,${
          row.flowState.value === FLOW_STATE_ENUM['已完成'] || row.flowState.value === FLOW_STATE_ENUM['部分完成']
            ? row.successAmount
            : 0
        }元`
      }
    },
    {
      label: '失败笔数及金额',
      prop: 'failCount',
      minWidth: 200,
      callback: row => {
        return `失败${
          row.flowState.value === FLOW_STATE_ENUM['已完成'] || row.flowState.value === FLOW_STATE_ENUM['部分完成']
            ? row.failCount
            : 0
        }笔,${
          row.flowState.value === FLOW_STATE_ENUM['已完成'] || row.flowState.value === FLOW_STATE_ENUM['部分完成']
            ? row.failAmount
            : 0
        }元`
      }
    },
    {
      label: '发放状态',
      prop: 'flowState',
      minWidth: 120,
      fixed: 'right',
      callback: row => {
        let status = ''
        if (row.flowState.value === FLOW_STATE_ENUM['待付款']) {
          status = row.flowStatus.label
        } else {
          status = row.flowState.label
        }
        return status
      }
    },
    {
      label: '操作',
      type: 'action',
      width: 200,
      config: row => {
        const noDeleteStatus = ['PAID', 'PAY_SUCCESS', 'PAY_FAIL']
        const noDeleteState = ['USELESS']
        const config = [
          {
            label: '详情',
            permission: _this.checkPermission('payCommission-detail'),
            fn: row => {
              _this.$router.push({
                name: 'PayBatchDetail',
                query: { batchNo: row.batchNo }
              })
            }
          }
        ]
        if (
          row.flowStatus &&
          row.flowStatus.value === FLOW_STATUS_ENUM['待审核'] &&
          row.flowState &&
          row.flowState.value === FLOW_STATE_ENUM['待付款']
        ) {
          config.push({
            label: '审核',
            permission: _this.checkPermission('payCommission-audit'),
            fn: row => {
              _this.$router.push({
                name: 'PayBatchDetail',
                query: { batchNo: row.batchNo }
              })
            }
          })
        }
        if (row.flowState.value === FLOW_STATE_ENUM['待付款'] && row.flowStatus.value === FLOW_STATUS_ENUM['待付款']) {
          config.push({
            label: '付款',
            permission: _this.checkPermission('payCommission-payment'),
            fn: row => {
              _this.goToPay(row)
            }
          })
        }
        if (
          !noDeleteStatus.includes(row.flowStatus.value) &&
          !noDeleteState.includes(row.flowState.value) &&
          (_this.userInfo.userId === row.createId || _this.userRoles.find(item => item === AUTH_ROLES['管理员']))
        ) {
          config.push({
            label: '删除',
            permission: _this.checkPermission('payCommission-delete'),
            fn: row => {
              _this.handleDeleteBatchRow(row)
            }
          })
        }
        if (
          row.flowState.value === FLOW_STATE_ENUM['失效'] &&
          (_this.userInfo.userId === row.createId || _this.userRoles.find(item => item === AUTH_ROLES['管理员']))
        ) {
          config.push(
            {
              label: '重发',
              permission: _this.checkPermission('payCommission-resend'),
              fn: row => {
                _this.handleRepay(row)
              }
            },
            {
              label: '放弃重发',
              permission: _this.checkPermission('payCommission-giveUpResend'),
              fn: row => {
                _this.handleCancelRepay(row)
              }
            }
          )
        }
        if (
          row.flowState.value === FLOW_STATE_ENUM['部分完成'] &&
          row.successCount !== '0' &&
          (_this.userInfo.userId === row.createId || _this.userRoles.find(item => item === AUTH_ROLES['管理员']))
        ) {
          config.push(
            {
              label: '失败重发',
              permission: _this.checkPermission('payCommission-resend'),
              fn: row => {
                _this.handleRepay(row)
              }
            },
            {
              label: '放弃失败重发',
              permission: _this.checkPermission('payCommission-giveUpResend'),
              fn: row => {
                _this.handleCancelRepay(row)
              }
            }
          )
        }
        return config
      }
    }
  ]
}
// 发放校验失败列表
export function getFailColumns(_this) {
  return [
    {
      type: 'selection'
    },
    {
      type: 'index',
      width: 100
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
      label: '收款账号',
      prop: 'accountNo',
      minWidth: 200
    },
    {
      label: '代发金额(元)',
      prop: 'amount',
      minWidth: 200
    },
    {
      label: '手机号码',
      prop: 'mobile',
      minWidth: 200
    },
    {
      label: '商户备注',
      prop: 'merchantCustom',
      minWidth: 200
    },
    {
      label: '商户订单号',
      prop: 'transNo',
      minWidth: 200
    },
    {
      label: '校验结果',
      prop: 'verify',
      minWidth: 200
    },
    {
      label: '备注',
      prop: 'memo',
      minWidth: 200
    },
    {
      label: '操作',
      type: 'action',
      width: 160,
      config: () => {
        const config = [
          {
            label: '删除',
            fn: row => {
              _this.handleDeleteRowData(row)
            }
          },
          {
            label: '编辑',
            fn: row => {
              _this.handleEdit(row)
            }
          }
        ]
        return config
      }
    }
  ]
}
// 发放校验成功列表
export const successColumns = [
  {
    type: 'index',
    width: 100
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
    label: '收款账号',
    prop: 'accountNo',
    minWidth: 200
  },
  {
    label: '代发金额(元)',
    prop: 'amount',
    minWidth: 200
  },
  {
    label: '归属地',
    prop: 'bankCardLocation',
    minWidth: 200
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 200
  },
  {
    label: '商户备注',
    prop: 'merchantCustom',
    minWidth: 200
  },
  {
    label: '商户订单号',
    prop: 'transNo',
    minWidth: 200
  },
  {
    label: '校验结果',
    prop: 'verify',
    minWidth: 200
  }
]
// 发放明细列表
export const payrollDetailColumns = [
  {
    type: 'index',
    width: 100
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
  // {
  //   label: '归属地',
  //   prop: 'batchNo15',
  //   minWidth: 200
  // },
  {
    label: '代发金额（元）',
    prop: 'expspay',
    minWidth: 200
  },
  {
    label: '服务费及税金（元）',
    prop: 'serviceCharge',
    minWidth: 200
  }
  // {
  //   label: '摘要',
  //   prop: 'memo',
  //   minWidth: 200
  // }
]
// 详情 成功列表
export const paySuccessColumns = [
  {
    type: 'index',
    width: 100
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
    label: '收款账号',
    prop: 'accountNo',
    minWidth: 200
  },
  {
    label: '代发金额（元）',
    prop: 'amount',
    minWidth: 200
  },
  {
    label: '服务费及税金（元）',
    prop: 'serviceCharge',
    minWidth: 200
  },
  {
    label: '开户行',
    prop: 'bankName',
    minWidth: 200
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 200
  },
  {
    label: '商户备注',
    prop: 'merchantCustom',
    minWidth: 200
  },
  {
    label: '商户订单号',
    prop: 'transNo',
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
    label: '完成时间',
    prop: 'updateTime',
    minWidth: 200
  }
]
// 详情 失败列表
export const payFailColumns = [
  {
    type: 'index',
    width: 100
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
    label: '收款账号',
    prop: 'accountNo',
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
    label: '开户行',
    prop: 'bankName',
    minWidth: 200
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 200
  },
  {
    label: '商户备注',
    prop: 'merchantCustom',
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
    label: '失败原因',
    prop: 'orderReason',
    minWidth: 200
  },
  {
    label: '完成时间',
    prop: 'updateTime',
    minWidth: 200
  }
]
// 详情 电子回单列表
// export const payReceiptColumns = []
// 详情 未发放完成列表
export const payUnfinishColumns = [
  {
    type: 'index',
    width: 100
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
    label: '收款账号',
    prop: 'accountNo',
    minWidth: 200
  },
  {
    label: '代发金额（元）',
    prop: 'amount',
    minWidth: 200
  },
  {
    label: '服务费及税金（元）',
    prop: 'serviceCharge',
    minWidth: 200
  },
  {
    label: '开户行',
    prop: 'bankName',
    minWidth: 200
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 200
  },
  {
    label: '商户备注',
    prop: 'merchantCustom',
    minWidth: 200
  },
  {
    label: '商户订单号',
    prop: 'transNo',
    minWidth: 200
  }
  // {
  //   label: '状态',
  //   prop: 'orderStatus',
  //   minWidth: 200,
  //   callback: row => {
  //     return (row.finalStatus &&
  //       row.finalStatus.value === FLOW_STATE_ENUM['待付款']) ||
  //       row.finalStatus.value === FLOW_STATE_ENUM['失效'] ||
  //       row.finalStatus.value === FLOW_STATE_ENUM['作废']
  //       ? ''
  //       : row.orderStatus && row.orderStatus.label
  //   }
  // }
]
// 重发-数据确认
export const confirmRepayColumns = [
  {
    type: 'index',
    width: 50
  },
  {
    label: '姓名',
    prop: 'realName',
    minWidth: 60
  },
  {
    label: '证件号码',
    prop: 'cardNo',
    minWidth: 180
  },
  {
    label: '收款账号',
    prop: 'accountNo',
    minWidth: 180
  },
  {
    label: '代发金额（元）',
    prop: 'amount',
    minWidth: 100
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 130
  },
  {
    label: '失败原因',
    prop: 'orderReason',
    minWidth: 180
  }
]
