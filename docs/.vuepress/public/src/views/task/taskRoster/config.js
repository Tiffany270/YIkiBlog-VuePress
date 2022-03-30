import { FormItemTypes, SIGN_STATUS } from '@/maps/enum'
import { TASK_STATUS } from '../config'

export const getTableCols = that => [
  {
    type: 'index',
    width: 50
  },
  {
    label: '姓名',
    prop: 'name',
    minWidth: 80
  },
  {
    label: '证件号码',
    prop: 'certNo',
    minWidth: 120
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 100
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
    label: '接单时间',
    prop: 'signStatus',
    minWidth: 120,
    callback: row => {
      return row.signStatus && row.signStatus.value !== TASK_STATUS['待接单'] ? row.acceptTaskDate : '--'
    }
  },
  {
    label: '签约时间',
    prop: 'signDate',
    minWidth: 120,
    callback: row => {
      return row.signStatus && row.signStatus.value !== SIGN_STATUS['待签约'] ? row.signDate : '--'
    }
  },
  {
    label: '操作',
    type: 'action',
    width: 160,
    config: row => {
      const showBtns = []
      if (row.taskStatus) {
        if (
          row.taskStatus.value === TASK_STATUS['已接单'] ||
          row.taskStatus.value === TASK_STATUS['已完成'] ||
          row.taskStatus.value === TASK_STATUS['已移除']
        ) {
          showBtns.push({
            label: '详情',
            permission: true,
            fn: () => {
              that.showDetail(row.taskId, row.signAccountId)
              // that.$router.push({
              //   name: 'TaskRosterDetail',
              //   query: { signAccountId: row.signAccountId }
              // })
            }
          })
        }
        if (row.taskStatus.value === TASK_STATUS['待接单'] || row.taskStatus.value === TASK_STATUS['已接单']) {
          showBtns.push({
            label: '移除',
            permission: true,
            fn: () => {
              that.removeTaskUser(row.id)
            }
          })
        }
      }
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
    label: '任务状态',
    key: 'status',
    type: FormItemTypes.Select,
    option: [
      {
        label: '待接单',
        value: TASK_STATUS['待接单']
      },
      {
        label: '已接单',
        value: TASK_STATUS['已接单']
      },
      {
        label: '已完成',
        value: TASK_STATUS['已完成']
      }
    ],
    placeholder: '全部'
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
    label: '接单时间',
    key: 'acceptTaskBeginDate&acceptTaskEndDate',
    type: FormItemTypes.Cascader
  },
  {
    label: '签约时间',
    key: 'signBeginDate&signEndDate',
    type: FormItemTypes.Cascader
  }
]
