export const contentColumns = [
  {
    label: '求职投递',
    prop: 'toudi',
    minWidth: 184
  },
  {
    label: '评论',
    prop: 'pinglun',
    minWidth: 184
  },
  {
    label: '内容',
    prop: 'neirong',
    minWidth: 184
  },
  {
    label: '投稿',
    prop: 'tougao',
    minWidth: 184
  },
  {
    label: '意见反馈',
    prop: 'yijianfankui',
    minWidth: 184
  }
]

export const appendixColumns = self => [
  {
    type: 'index',
    label: '序号',
    width: 110
  },
  {
    label: '文件预览',
    prop: 'yulan',
    width: 700
  },
  {
    label: '操作',
    type: 'action',
    width: 100,
    config: () => {
      let config = []
      config = [
        {
          label: '下载',
          fn: item => {
            self.dowloadFile(item.id)
          }
        }
      ]
      return config
    }
  }
]

export const successColumns = [
  {
    type: 'index',
    label: '序号',
    minWidth: 110
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 200
  },
  {
    label: '姓名',
    prop: 'name',
    minWidth: 200
  },
  {
    label: '奖励金额',
    prop: 'money',
    minWidth: 200
  }
]

export const failColumns = [
  {
    type: 'index',
    label: '序号',
    minWidth: 110
  },
  {
    label: '手机号码',
    prop: 'mobile',
    minWidth: 200
  },
  {
    label: '姓名',
    prop: 'name',
    minWidth: 200
  },
  {
    label: '奖励金额',
    prop: 'money',
    minWidth: 200
  },
  {
    label: '失败原因',
    prop: 'reason',
    minWidth: 200
  }
]
