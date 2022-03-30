import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'
export const searchItems = [
  {
    label: '邀请人手机号码',
    key: 'username',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请填写邀请人手机号码'
  },
  {
    label: '邀请人姓名',
    key: 'name',
    option: [],
    type: FormItemTypesEnum.INPUT,
    placeholder: '请填写邀请人姓名'
  },
  {
    label: '受邀请用户手机号码',
    key: 'mobile',
    option: [],
    type: FormItemTypesEnum.INPUT,
    placeholder: '请填写受邀请用户手机号码'
  }
]

export const columns = [
  {
    type: 'index',
    width: 50
  },
  {
    label: '邀请人手机号码',
    prop: 'mobile',
    minWidth: 80
  },
  {
    label: '邀请人姓名',
    prop: 'name',
    minWidth: 60
  },
  {
    label: '受邀请用户手机号码',
    prop: 'mobile1',
    minWidth: 120
  },
  {
    label: '奖励节点',
    prop: 'node',
    minWidth: 100
  },
  {
    label: '返现时间',
    prop: 'time',
    minWidth: 100
  },
  {
    label: '奖励金额（元）',
    prop: 'money',
    minWidth: 80
  }
]
