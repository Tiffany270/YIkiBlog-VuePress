/**------------- 评论管理content-manage -------------*/
import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'
/** 评论管理
 * 状态-下拉
 * */
export const statusOptions = [
  {
    label: '待审核',
    value: '0'
  },
  {
    label: '已发布',
    value: '1'
  },
  {
    label: '已下架',
    value: '2'
  },
  {
    label: '用户删除',
    value: '3'
  },
  {
    label: '已驳回',
    value: '4'
  }
]
/** 评论管理
 * 状态-枚举
 * */
export const status = {
  REVIEWED: 'REVIEWED', //待审核
  OFF_THE_SHELF: 'OFF_THE_SHELF', //已下架
  PUBLISHED: 'PUBLISHED', //已发布
  DELETED: 'DELETED', //用户删除
  REJECT: 'REJECT' //已驳回
}
export const statusTypeEnum = [
  {
    label: '已发布',
    value: '1'
  },
  {
    label: '已下架',
    value: '2'
  },
  {
    label: '用户删除',
    value: '3'
  },
  {
    label: '待审核',
    value: '0'
  },
  {
    label: '已驳回',
    value: '4'
  }
]

/** 评论管理-创建人类型-枚举 */
export const role = {
  NORMAL_USER: 'NORMAL_USER', //用户
  ROBOT: ' ROBOT', //机器人
  ADMIN: ' ROBOT' //管理员
}
export const roleTypeEnum = [
  {
    label: '用户',
    value: role.NORMAL_USER
  },
  {
    label: '机器人',
    value: role.ROBOT
  },
  {
    label: '管理员',
    value: role.ADMIN
  }
]
/** 评论管理-创建人类型-下拉*/
export const typeOptions = [
  {
    label: '用户',
    value: '0'
  },
  {
    label: '管理员',
    value: '1'
  }
]
// 评论管理-搜索
export const searchList = [
  {
    label: '手机号码',
    key: 'mobile',
    placeholder: '请输入手机号码',
    type: FormItemTypesEnum.INPUT
  },
  {
    label: '创建时间',
    key: 'createdStartDate&createdEndDate',
    placeholder: '请选择创建时间',
    type: FormItemTypesEnum.DATERANGE,
    createdStartDate: '开始时间',
    createdEndDate: '结束时间'
  },
  {
    label: '状态',
    key: 'status',
    placeholder: '请选择状态',
    type: FormItemTypesEnum.SELECT,
    option: statusOptions
  },
  {
    label: '创建人类型',
    key: 'role',
    placeholder: '请选择创建人类型',
    type: FormItemTypesEnum.SELECT,
    option: typeOptions
  }
]

// 评论管理-列表
export const tableColumns = self => {
  return [
    {
      type: 'selection',
      width: 60
    },
    {
      type: 'index',
      width: 60
    },
    {
      label: '创建人昵称',
      prop: 'nickname',
      midWidth: 300
    },
    {
      label: '手机号码',
      prop: 'mobile',
      midWidth: 300
    },
    {
      label: '评论详情',
      prop: 'comment',
      midWidth: 300
    },
    {
      label: '评论内容',
      prop: 'content',
      midWidth: 300
    },
    {
      label: '评论内容类型',
      prop: 'type',
      midWidth: 300,
      callback: row => {
        return row.type && row.type.label
      }
    },
    {
      label: '创建人类型',
      prop: 'role',
      midWidth: 100,
      callback: row => {
        return row.role && row.role.label
      }
    },
    {
      label: '点赞',
      prop: 'likesNum',
      midWidth: 100
    },
    {
      label: '创建时间',
      prop: 'createdDate',
      midWidth: 300
    },
    {
      label: '热力值',
      prop: 'hotValue',
      midWidth: 100
    },
    {
      label: '状态',
      prop: 'status',
      midWidth: 100,
      callback: row => {
        return row.status && row.status.label
      }
    },
    {
      label: '操作',
      type: 'action',
      width: 100,
      config: () => {
        let config = []
        config = [
          {
            label: '详情',
            fn: row => {
              self.openDialogCommentDetail(row)
            }
          }
        ]
        return config
      }
    }
  ]
}
