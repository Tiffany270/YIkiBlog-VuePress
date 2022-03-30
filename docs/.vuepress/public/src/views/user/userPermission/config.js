import { FormItemTypes } from '@/maps/enum.js'

/**
 * 用户权限管理 - 搜索项
 */
export const searchList = [
  {
    label: '用户名',
    key: 'name',
    type: FormItemTypes.Input,
    placeholder: '请输入用户名'
  },
  {
    label: '手机号',
    key: 'mobile',
    type: FormItemTypes.Input,
    placeholder: '请输入手机号'
  },
  {
    label: '权限类型',
    key: 'type',
    type: FormItemTypes.Select,
    option: [
      { label: '制单权限', value: 'PREPARE' },
      { label: '审核权限', value: 'AUDIT' },
      { label: '发放权限', value: 'EXECUTE' },
      { label: '查看权限', value: 'VIEW' }
    ],
    placeholder: '全部'
  }
]

/**
 * 角色管理 - 表头
 */
export const getTableColumnsConfig = that => [
  {
    type: 'index'
  },
  {
    label: '用户名',
    prop: 'name',
    minWidth: 100
  },
  {
    label: '手机号',
    prop: 'mobile',
    minWidth: 240
  },
  {
    label: '权限类型',
    minWidth: 150,
    prop: 'roleName'
  },
  {
    label: '操作',
    type: 'action',
    width: 220,
    fixed: 'right',
    config: () => {
      const config = [
        {
          label: '编辑',
          permission: that.checkPermission('userPermission-edit'),
          fn: row => {
            row.title = '用户编辑'
            row.actionType = 'edit'
            that.$refs['diglogRole'].updateView(row)
          }
        },
        {
          label: '删除',
          permission: that.checkPermission('userPermission-delete'),
          fn: row => {
            that.deleteUser(row.roleType, row.accountId)
          }
        }
      ]
      return config
    }
  }
]
