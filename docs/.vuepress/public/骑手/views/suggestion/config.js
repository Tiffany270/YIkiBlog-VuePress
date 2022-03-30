import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'
export const feedbackOptions = [
  {
    value: 'FUNCTION_ERROR',
    label: '功能异常'
  },
  {
    value: 'PRODUCTION_SUGGEST',
    label: '产品建议'
  },
  {
    value: ' SECURITY_BUG',
    label: '安全问题'
  },
  {
    value: 'OTHER',
    label: '其他问题'
  }
]

export const searchItems = [
  {
    label: '手机号码',
    key: 'mobile',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请输入手机号码'
  },
  {
    label: '创建时间',
    key: 'createStartTime&createEndTime',
    option: [],
    type: FormItemTypesEnum.DATERANGE,
    placeholder: ''
  },
  {
    label: '问题标签',
    key: 'feedbackType',
    type: FormItemTypesEnum.SELECT,
    option: feedbackOptions,
    placeholder: '问题标签'
  }
]

export const columns = self => {
  return [
    {
      type: 'selection',
      width: 100
    },
    {
      type: 'index',
      width: 150
    },

    {
      label: '用户昵称',
      prop: 'nickName',
      minWidth: 50
    },
    {
      label: '手机号码',
      prop: 'mobile',
      minWidth: 100
    },
    {
      label: '问题标签',
      prop: 'feedbackTypesString',
      minWidth: 150
    },

    {
      label: '创建时间',
      prop: 'createTime',
      minWidth: 100
    },
    {
      label: '操作',
      type: 'action',
      width: 130,
      config: () => {
        let config = []
        config = [
          {
            label: '查看详情',
            fn: row => {
              self.openSuggestionDialog(row)
            }
          }
        ]
        return config
      }
    }
  ]
}
