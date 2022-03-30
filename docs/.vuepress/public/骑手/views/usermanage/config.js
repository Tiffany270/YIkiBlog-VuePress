import { FormItemTypesEnum } from '@/static/enums/FormItemTypesEnum'
export const searchItems = [
  {
    label: '用户手机号',
    key: 'username',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请输入用户手机号'
  },
  {
    label: '用户昵称',
    key: 'mobile',
    option: [],
    type: FormItemTypesEnum.INPUT,
    placeholder: '请输入用户昵称'
  },
  {
    label: '用户姓名',
    key: 'name',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请输入用户姓名'
  },
  {
    label: '用户身份证',
    key: 'cardNo',
    type: FormItemTypesEnum.INPUT,
    placeholder: '请输入用户身份证'
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
      label: '手机号码',
      prop: 'mobile',
      minWidth: 100
    },
    {
      label: '昵称',
      prop: 'wechatNickname',
      minWidth: 100
    },
    {
      label: '姓名',
      prop: 'name',
      minWidth: 100
    },
    {
      label: '身份证号码',
      prop: 'cardNo',
      minWidth: 200
    },
    {
      label: '累计奖励金额',
      prop: 'contributeVideo',
      minWidth: 100
    },
    {
      label: '已提现金额',
      prop: 'address',
      minWidth: 100
    },
    {
      label: '剩余可提现金额',
      prop: 'number1',
      minWidth: 120
    },

    {
      label: '注册时间',
      prop: 'number2',
      minWidth: 100
    },
    {
      label: '最近登录时间',
      prop: 'number3',
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
          }
        ]
        return config
      }
    }
    /*     {
      label: '当前状态',
      prop: 'userStatus',
      minWidth: 100,
      callback: row => {
        return row.userStatus && row.userStatus.label
      }
    },
    {
      label: '操作',
      type: 'action',
      width: 130,
      config: row => {
        let config = []
        if (row.userStatus) {
          config = [
            {
              label: '禁用',
              fn: item => {
                self.changeUserStatusById(item.id)
              }
            }
          ]
        } else {
          config = [
            {
              label: '启用',
              fn: item => {
                self.changeUserStatusById(item.id)
              }
            }
          ]
        }

        return config
      }
    } */
  ]
}
