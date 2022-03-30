import { FormItemTypes, TASK_STATUS } from '@/maps/enum'
import { formatMoney } from '@/utils/util'

export const getTableCols = that => [
  {
    type: 'index',
    width: 50
  },
  {
    label: '任务名称',
    prop: 'taskName',
    minWidth: 150
  },
  {
    label: '任务名额',
    prop: 'quota',
    minWidth: 100
  },
  {
    label: '任务金额（元）',
    prop: 'money',
    minWidth: 200,
    callback: row => {
      const moneyArr = row.money.split('-')
      return formatMoney(moneyArr[0]) + ' - ' + formatMoney(moneyArr[1])
    }
  },
  {
    label: '结算方式',
    prop: 'settleType',
    minWidth: 100,
    callback: row => {
      return row.settleType && row.settleType.label
    }
  },
  {
    label: '任务有效期',
    prop: 'expireDate',
    minWidth: 200,
    callback: row => {
      return row.expireDate && row.expireDate.split(' ')[0]
    }
  },
  {
    label: '创建时间',
    prop: 'createTime',
    minWidth: 200
  },
  {
    label: '状态',
    prop: 'status',
    minWidth: 100,
    callback: row => {
      return row.status && row.status.label
    }
  },
  {
    label: '备注',
    prop: 'verifyMsg',
    minWidth: 160
  },
  {
    label: '操作',
    type: 'action',
    width: 160,
    config: row => {
      const showBtns = [
        {
          label: '详情',
          permission: that.checkPermission('taskManage-detail'),
          fn: () => {
            that.UPDATE_CAN_USE_AGREEMENTS().then(() => {
              that.$router.push({
                name: 'EditTask',
                query: { id: row.id }
              })
            })
          }
        }
      ]
      if (row.status.value === TASK_STATUS['待审核']) {
        showBtns.push(
          {
            label: '编辑',
            permission: that.checkPermission('taskManage-edit'),
            fn: () => {
              that.UPDATE_CAN_USE_AGREEMENTS().then(() => {
                that.$router.push({
                  name: 'EditTask',
                  query: { id: row.id, isEditStatus: true }
                })
              })
            }
          },
          {
            label: '撤回',
            permission: that.checkPermission('taskManage-retract'),
            fn: () => {
              that.withDrawTask(row.id)
            }
          }
        )
      }
      if (row.status.value === TASK_STATUS['已上线'] || row.status.value === TASK_STATUS['已下线']) {
        showBtns.push({
          label: '任务名单',
          permission: that.checkPermission('taskManage-list'),
          fn: () => {
            that.$router.push({
              name: 'TaskRoster',
              query: { id: row.id }
            })
          }
        })
      }
      return showBtns
    }
  }
]

export const searchItems = [
  {
    label: '任务名称',
    key: 'taskName',
    type: FormItemTypes.Input,
    placeholder: '请输入任务名称'
  },
  {
    label: '任务有效期',
    key: 'expireBeginTime&expireEndTime',
    type: FormItemTypes.Cascader,
    placeholder: '请选择任务有效期'
  },
  {
    label: '任务状态',
    key: 'status',
    type: FormItemTypes.Select,
    option: [
      {
        label: '待审核',
        value: TASK_STATUS['待审核']
      },
      {
        label: '已上线',
        value: TASK_STATUS['已上线']
      },
      {
        label: '已下线',
        value: TASK_STATUS['已下线']
      },
      {
        label: '已撤回',
        value: TASK_STATUS['已撤回']
      },
      {
        label: '驳回',
        value: TASK_STATUS['驳回']
      }
    ],
    placeholder: '全部'
  }
]
