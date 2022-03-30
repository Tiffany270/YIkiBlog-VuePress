import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'

export const rewardSearchItems = [
  {
    label: '用户手机号码',
    key: 'mobile',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请填写用户手机号码'
  },
  {
    label: '用户姓名',
    key: 'username',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请填写用户姓名'
  },
  {
    label: '状态',
    key: 'status',
    type: FormItemTypesEnum.SELECT,
    placeholder: '请选择状态'
  }
]
export const rewardColumns = [
  {
    type: 'index',
    width: 50
  },
  {
    label: '用户手机号码',
    prop: 'mobile',
    minWidth: 80
  },
  {
    label: '用户姓名',
    prop: 'name',
    minWidth: 80
  },
  {
    label: '奖励节点',
    prop: 'node',
    minWidth: 80
  },
  {
    label: '奖励金额',
    prop: 'money',
    minWidth: 80
  },
  {
    label: '状态',
    prop: 'status',
    minWidth: 80
  },
  {
    label: '奖励时间',
    prop: 'time',
    minWidth: 80
  }
]

export const withdrawalSearchItems = [
  {
    label: '用户手机号码',
    key: 'username',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请填写用户手机号码'
  },
  {
    label: '提现流水号',
    key: 'flowNo',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请填写提现流水号'
  },
  {
    label: '提现状态',
    key: 'status',
    type: FormItemTypesEnum.SELECT,
    placeholder: '请选择提现状态'
  }
]
export const withdrawalColumns = self => [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50
  },
  {
    label: '提现流水号',
    prop: 'flowNo',
    minWidth: 80
  },
  {
    label: '用户手机号码',
    prop: 'mobile',
    minWidth: 100
  },
  {
    label: '用户姓名',
    prop: 'name',
    minWidth: 120
  },
  {
    label: '提现金额',
    prop: 'money',
    minWidth: 100
  },
  {
    label: '剩余可提现金额',
    prop: 'money1',
    minWidth: 100
  },
  {
    label: '提现时间',
    prop: 'time',
    minWidth: 80
  },
  {
    label: '提现状态',
    prop: 'status',
    minWidth: 80
  },
  {
    label: '操作',
    type: 'action',
    width: 140,
    config: () => {
      let config = []
      config = [
        {
          label: '审核',
          fn: row => {
            self.openDialogApproval(row)
          }
        },
        {
          label: '查看详情',
          fn: row => {
            self.openDialogDetail(row)
          }
        }
      ]
      return config
    }
  }
]
