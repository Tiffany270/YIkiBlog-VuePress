import { FormItemTypes, SIGN_STATUS } from '@/maps/enum'

// 签约查询条件
export const signManageSearchItems = [
  {
    label: '姓名',
    key: 'realName',
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
    label: '导入时间',
    key: 'startDate&endDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择申请时间'
  },
  {
    label: '签约时间',
    key: 'signStartDate&signEndDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择申请时间'
  },
  {
    label: '签约状态',
    key: 'signStatus',
    type: FormItemTypes.Select,
    placeholder: '请选择签约状态',
    option: [
      { label: '已签约', value: SIGN_STATUS['已签约'] },
      { label: '待签约', value: SIGN_STATUS['待签约'] },
      { label: '已作废', value: SIGN_STATUS['已作废'] },
      { label: '已注销', value: SIGN_STATUS['已注销'] }
    ]
  },
  {
    label: '手机号码',
    key: 'mobile',
    type: FormItemTypes.Input,
    placeholder: '请输入手机号码'
  }
]
// 签约表格字段
export function getStudioTableCols(_this) {
  return [
    {
      type: 'selection'
    },
    {
      type: 'index'
    },
    {
      label: '姓名',
      prop: 'realName',
      minWidth: 100
    },
    {
      label: '证件号码',
      prop: 'certNo',
      minWidth: 200
    },
    {
      label: '手机号码',
      prop: 'mobile',
      minWidth: 150
    },
    {
      label: '协议编号',
      prop: 'agreementNo',
      minWidth: 150
    },
    {
      label: '签约状态',
      prop: 'signStatus.label',
      minWidth: 100
    },
    {
      label: '实名认证状态',
      prop: 'certStatus.label',
      minWidth: 120
    },
    {
      label: '导入时间',
      prop: 'createTime',
      minWidth: 200
    },
    {
      label: '签约时间',
      prop: 'signDate',
      minWidth: 200
    },
    {
      label: '操作',
      type: 'action',
      fixed: 'right',
      width: 250,
      config: row => {
        const config = [
          {
            label: '查看合同',
            permission: _this.checkPermission('signManage-checkContract'),
            fn: row => {
              _this.contractCheck(row.id)
            }
          }
        ]
        if (row.signStatus.value === SIGN_STATUS['待签约']) {
          config.push({
            label: '合同作废',
            permission: _this.checkPermission('signManage-invalidContract'),
            fn: row => {
              _this.contractInvalidHandle(row.contractId)
            }
          })
        }
        if (row.signStatus.value === SIGN_STATUS['已签约']) {
          config.push({
            label: '合同注销',
            permission: _this.checkPermission('signManage-invalidContract'),
            fn: row => {
              _this.contractCancellationHandle(row.contractId)
            }
          })
        }
        return config
      }
    }
  ]
}

// 核对名单查询
export const signManageListSearchItems = [
  {
    label: '姓名',
    key: 'realName',
    type: FormItemTypes.Input,
    placeholder: '请输入姓名'
  },
  {
    label: '身份证号',
    key: 'certNo',
    type: FormItemTypes.Input,
    placeholder: '请输入身份证号'
  },
  {
    label: '手机号码',
    key: 'mobile',
    type: FormItemTypes.Input,
    placeholder: '请输入手机号码'
  }
]

// 核对名单表格字段

export function signManageListTableCols(_this) {
  return [
    {
      type: 'selection',
      minWidth: 50
    },
    {
      type: 'index',
      minWidth: 50
    },
    {
      label: '姓名',
      prop: 'realName',
      minWidth: 100
    },
    {
      label: '身份证号',
      prop: 'certNo',
      minWidth: 200
    },
    {
      label: '手机号',
      prop: 'mobile',
      minWidth: 150
    },
    {
      label: '失败原因',
      prop: 'remark',
      minWidth: 150
    },
    {
      label: '操作',
      type: 'action',
      fixed: 'right',
      minWidth: 200,
      config: () => {
        const config = [
          {
            label: '编辑',
            permission: true,
            fn: row => {
              _this.$refs.DialogEdit.updateView(row)
            }
          },
          {
            label: '删除',
            permission: true,
            fn: row => {
              _this.delMsg([row.id])
            }
          }
        ]
        return config
      }
    }
  ]
}
export function signManageListTableColsSuccess() {
  return [
    {
      type: 'index',
      width: 50
    },
    {
      label: '姓名',
      prop: 'realName',
      width: 100
    },
    {
      label: '身份证号',
      prop: 'certNo',
      width: 200
    },
    {
      label: '手机号',
      prop: 'mobile',
      minWidth: 150
    }
  ]
}

// 编辑表单字段
export const createStudioForm = {
  mobile: '',
  realName: '',
  cerNo: ''
}

// 确认提交名单表格字段
export function getSubmitFailList() {
  return [
    {
      type: 'index',
      minWidth: 50
    },
    {
      label: '姓名',
      prop: 'realName',
      minWidth: 100
    },
    {
      label: '身份证号',
      prop: 'certNo',
      minWidth: 200
    },
    {
      label: '手机号',
      prop: 'mobile',
      minWidth: 150
    },
    {
      label: '失败原因',
      prop: 'remark',
      minWidth: 150
    }
  ]
}
export function getSubmitSuccessList() {
  return [
    {
      type: 'index',
      width: 50
    },
    {
      label: '姓名',
      prop: 'realName',
      width: 100
    },
    {
      label: '身份证号',
      prop: 'certNo',
      width: 200
    },
    {
      label: '手机号',
      prop: 'mobile',
      minWidth: 150
    }
  ]
}
