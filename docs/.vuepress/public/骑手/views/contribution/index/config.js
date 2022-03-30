/**yiki
 * 原始票据管理 manage
 */
import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'

export const statusEnums = {
  TO_BE_REVIEW: '未审核',
  PASS: '已通过',
  NOT_PASS: '未通过',
  RELEASED: '已发布'
}

export const statusOptions = [
  {
    value: 'TO_BE_REVIEW',
    label: '未审核'
  },
  {
    value: 'PASS',
    label: '已通过'
  },
  {
    value: 'NOT_PASS',
    label: '未通过'
  },
  {
    value: 'RELEASED',
    label: '已发布'
  }
]

/* 查询条件 */
export const searchList = [
  {
    label: '手机号码',
    key: 'mobile',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请输入手机号码'
  },
  {
    label: '投稿主题',
    key: 'topicId',
    option: [],
    type: FormItemTypesEnum.SELECT,
    placeholder: '请选择投稿主题'
  },
  {
    label: '当前状态',
    key: 'status',
    type: FormItemTypesEnum.SELECT,
    option: statusOptions,
    placeholder: '请选择当前状态'
  }
]

/** --------------- 表格 -------------------- */

export const columns = self => {
  return [
    {
      type: 'selection',
      width: 60
    },
    {
      type: 'index',
      width: 100
    },
    {
      label: '微信昵称',
      prop: 'wechatNickname',
      minWidth: 300
    },
    {
      label: '手机号码',
      prop: 'mobile',
      minWidth: 150
    },
    {
      label: '投稿主题',
      prop: 'topicName',
      minWidth: 200
    },
    {
      label: '投稿内容',
      prop: 'contributeContent',
      minWidth: 300,
      slot: 'contributeContent'
    },
    {
      label: '视频/图片',
      prop: 'contributeVideo',
      minWidth: 100,
      slot: 'photo'
    },
    {
      label: '投稿时间',
      prop: 'createTime',
      minWidth: 180
    },
    {
      label: '当前状态',
      prop: 'contributionStatus',
      minWidth: 100,
      callback: row => {
        return row.contributionStatus && row.contributionStatus.label
      }
    },
    {
      label: '操作',
      type: 'action',
      width: 130,
      config: () => {
        let config = []
        config = [
          {
            label: '审核',
            fn: item => {
              self.openApprovalDialog(item.id)
            }
          },
          {
            label: '删除',
            fn: item => {
              self.deleteContributionById(item.id)
            }
          }
        ]
        return config
      }
    }
  ]
}
