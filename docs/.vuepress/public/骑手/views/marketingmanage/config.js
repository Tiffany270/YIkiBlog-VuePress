import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'
export const searchItems = [
  {
    label: '活动状态',
    key: 'username',
    type: FormItemTypesEnum.SELECT,
    placeholder: '请选择活动状态'
  },
  {
    label: '启用状态',
    key: 'mobile',
    option: [],
    type: FormItemTypesEnum.SELECT,
    placeholder: '请选择启用状态'
  }
]

/** --------------- 表格 -------------------- */

export const columns = self => {
  return [
    {
      type: 'index',
      width: 100
    },
    {
      label: '活动日期',
      prop: 'mobile',
      minWidth: 100
    },
    {
      label: '活动标题',
      prop: 'wechatNickname',
      minWidth: 100
    },
    {
      label: '活动状态',
      prop: 'name',
      minWidth: 100
    },
    {
      label: '累计发放奖励金额（元）',
      prop: 'cardNo',
      minWidth: 200
    },
    {
      label: '启用状态',
      prop: 'contributeVideo',
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
            label: '详情',
            fn: item => {
              self.openDetailDialog(item.id)
            }
          },
          {
            label: '编辑',
            fn: item => {
              self.openEditDialog(item.id)
            }
          }
        ]
        return config
      }
    }
  ]
}
