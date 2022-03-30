import { FormItemTypes, SIGN_STATUS } from '@/maps/enum'

export const getTableCols = that => [
  {
    type: 'selection'
  },
  {
    type: 'index',
    width: 50
  },
  {
    label: '姓名',
    prop: 'name',
    minWidth: 60
  },
  {
    label: '证件号码',
    prop: 'certNo',
    minWidth: 150
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 120
  },
  {
    label: '任务状态',
    prop: 'taskStatus',
    minWidth: 100,
    callback: row => {
      return row.taskStatus && row.taskStatus.label
    }
  },
  {
    label: '签约状态',
    prop: 'signStatus',
    minWidth: 100,
    callback: row => {
      return row.signStatus && row.signStatus.label
    }
  },
  {
    label: '签约时间',
    prop: 'signDate',
    minWidth: 150,
    callback: row => {
      return row.signStatus && row.signStatus.value !== SIGN_STATUS['待签约'] ? row.signDate : '--'
    }
  },
  {
    label: '操作',
    type: 'action',
    width: 160,
    config: row => {
      const showBtns = [
        {
          label: '详情',
          permission: that.checkPermission('taskPending-detail'),
          fn: () => {
            that.showDetail(row.taskId, row.signAccountId)
          }
        },
        {
          label: '完成',
          permission: that.checkPermission('taskPending-finish'),
          fn: () => {
            that.toComplete(row)
          }
        },
        {
          label: '移除',
          permission: that.checkPermission('taskPending-remove'),
          fn: () => {
            that.removeTaskUser(row.id)
          }
        }
      ]
      return showBtns
    }
  }
]

export const searchItems = [
  {
    label: '姓名',
    key: 'userName',
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
    label: '手机号码',
    key: 'mobile',
    type: FormItemTypes.Input,
    placeholder: '请输入手机号码'
  },
  {
    label: '签约状态',
    key: 'signStatus',
    type: FormItemTypes.Select,
    placeholder: '全部',
    option: [
      { label: '已签约', value: SIGN_STATUS['已签约'] },
      { label: '待签约', value: SIGN_STATUS['待签约'] }
    ]
  },
  {
    label: '签约时间',
    key: 'signBeginDate&signEndDate',
    type: FormItemTypes.Cascader
  }
]
