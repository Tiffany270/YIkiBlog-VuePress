/**------------ 内容管理content-manage ------------*/
import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'
/**
 * 内容管理
 * 当前状态-下拉
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
/** 内容管理
 * 状态-枚举
 * */
export const articleStatusEnum = {
  REVIEWED: 'REVIEWED', //待审核
  RELEASE: 'RELEASE', //已发布
  SHELF: 'SHELF', //已下架
  DELETE: 'DELETE', //用户删除
  REJECT: 'REJECT' //已驳回
}
export const statusTypeEnum = [
  {
    label: '待审核',
    value: articleStatusEnum.REVIEWED
  },
  {
    label: '已发布',
    value: articleStatusEnum.RELEASE
  },
  {
    label: '已下架',
    value: articleStatusEnum.SHELF
  },
  {
    label: '用户删除',
    value: articleStatusEnum.DELETE
  },
  {
    label: '已驳回',
    value: articleStatusEnum.REJECT
  }
]
/** 内容管理-创建人类型-枚举 */
export const userRole = {
  NORMAL_USER: 'NORMAL_USER', //用户
  ROBOT: ' ROBOT', //机器人
  ADMIN: ' ROBOT' //管理员
}
export const userRoleTypeEnum = [
  {
    label: '用户',
    value: userRole.NORMAL_USER
  },
  {
    label: '机器人',
    value: userRole.ROBOT
  },
  {
    label: '管理员',
    value: userRole.ADMIN
  }
]

//内容管理-搜索
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
    label: '当前状态',
    key: 'status',
    placeholder: '请选择当前状态',
    type: FormItemTypesEnum.SELECT,
    option: statusOptions
  }
]
// 内容管理-列表
export const tableColumns = self => {
  return [
    {
      type: 'selection',
      width: 80
    },
    {
      type: 'index',
      width: 80
    },
    {
      label: '详细内容',
      prop: 'content',
      minWidth: 100
    },
    {
      label: '标签',
      prop: 'label',
      midWidth: 100
    },
    {
      label: '创建人昵称',
      prop: 'nickname',
      midWidth: 200
    },
    {
      label: '手机号码',
      prop: 'mobile',
      midWidth: 200
    },
    {
      label: '创建人类型',
      prop: 'userRole',
      midWidth: 200,
      callback: row => {
        return row.userRole && row.userRole.label
      }
    },
    {
      label: '评论',
      prop: 'commentNum',
      midWidth: 100
    },
    {
      label: '点赞',
      prop: 'likesNum',
      midWidth: 100
    },
    {
      label: '浏览',
      prop: 'browseNum',
      midWidth: 100
    },
    {
      label: '创建时间',
      prop: 'createdDate',
      midWidth: 200
    },
    {
      label: '热力值',
      prop: 'hotValue',
      midWidth: 100
    },
    {
      label: '推荐值',
      prop: 'recommendedIndex',
      midWidth: 100
    },
    {
      label: '当前状态',
      prop: 'articleStatusEnum',
      midWidth: 100,
      callback: row => {
        return row.articleStatusEnum && row.articleStatusEnum.label
      }
    },
    {
      label: '操作',
      type: 'action',
      width: 140,
      config: () => {
        let config = []
        config = [
          {
            label: '详情',
            fn: row => {
              self.openDialogContentDetail(row)
              // 除已驳回&待审核状态，禁止其他状态审核
            }
          },
          {
            label: '编辑',
            fn: row => {
              self.openDialogContentEdit(row)
            }
          }
        ]
        return config
      }
    }
  ]
}
