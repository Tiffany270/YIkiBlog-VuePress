import { FormItemTypes } from '@/maps/enum'
import { channelOptions, ChannelEnum } from '@/maps/enums/ChannelEnum'
import { toThousands } from '@/utils/util'

/**
 * 渠道类型对应的颜色
 * @readonly
 */
export const getChannelColor = channel => {
  const map = {
    [ChannelEnum.ALIPAY]: {
      mainColor: '#3360E1',
      subColor: '#D4DDF7'
    },
    [ChannelEnum.SPDBANK]: {
      mainColor: '#03A92C',
      subColor: '#CDEED5'
    },
    [ChannelEnum.PABANK]: {
      mainColor: '#ED802D',
      subColor: '#FCEBDD'
    },
    [ChannelEnum.MMPAY]: {
      mainColor: '#03A82C',
      subColor: '#CEEFD6'
    },
    [ChannelEnum.MYBANK]: {
      mainColor: '#CC3333',
      subColor: '#F5D6D6'
    }
  }
  return (
    map[channel] || {
      mainColor: '#CC3333',
      subColor: '#F5D6D6'
    }
  )
}

// 钱包搜索项
export const WalletSearchList = [
  {
    label: '交易时间',
    key: 'startDate&endDate',
    type: FormItemTypes.Cascader,
    placeholder: '请选择'
  },
  {
    label: '交易类型',
    key: 'walletFlowViewType',
    type: FormItemTypes.Select,
    placeholder: '请选择',
    option: []
  },
  {
    label: '交易渠道',
    key: 'channel',
    type: FormItemTypes.Select,
    placeholder: '请选择',
    option: channelOptions
  }
]

// 钱包列表
export const WalletList = {
  mounted() {
    this.tableColumns = [
      {
        type: 'index'
      },
      {
        label: '交易流水号',
        prop: 'flowNo'
      },
      {
        label: '交易金额(元)',
        prop: 'amount',
        callback: row => {
          const amount = toThousands(row.amount)
          return row.positive ? amount : `-${amount}`
        }
      },
      {
        label: '交易类型',
        prop: 'walletFlowViewType'
      },
      {
        label: '交易渠道',
        prop: 'channel',
        callback: row => {
          return row.channel && row.channel.label
        }
      },
      {
        label: '账户余额(元)',
        prop: 'balance',
        callback: row => {
          return toThousands(row.balance)
        }
      },
      {
        label: '交易时间',
        prop: 'createTime'
      }
      // {
      //   label: '备注',
      //   prop: 'remark'
      // }
    ]
  }
}
