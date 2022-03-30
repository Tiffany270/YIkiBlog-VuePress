/**
 * 渠道类型（发放服务的）
 * @enum
 * @readonly
 */
export const ChannelEnum = {
  PABANK: 'PABANK', // 平安银行
  MYBANK: 'MYBANK', // 网商银行
  MMPAY: 'MMPAY', // 微信支付
  ALIPAY: 'ALIPAY', // 支付宝
  ULPAY: 'ULPAY', // 合众易宝
  SPDBANK: 'SPDBANK', // 浦发银行
  ICBCBANK: 'ICBCBANK', // 工商银行
  ANTBANK: 'ANTBANK', // 蚂蚁银行
  OFFLINE: 'OFFLINE' // 线下发放
}

/**
 * 渠道类型 - 下拉选项
 * @enum
 * @readonly
 */
export const channelOptions = [
  {
    label: '平安银行',
    value: ChannelEnum.PABANK
  },
  // {
  //   label: '网商银行',
  //   value: ChannelEnum.MYBANK
  // },
  {
    label: '微信支付',
    value: ChannelEnum.MMPAY
  },
  {
    label: '支付宝',
    value: ChannelEnum.ALIPAY
  },
  // {
  //   label: '合众易宝',
  //   value: ChannelEnum.ULPAY
  // },
  {
    label: '浦发银行',
    value: ChannelEnum.SPDBANK
  }
  // {
  //   label: '工商银行',
  //   value: ChannelEnum.ICBCBANK
  // }
  // {
  //   label: '蚂蚁银行',
  //   value: ChannelEnum.ANTBANK
  // }
]

/**
 * 是否为ChannelEnum的值
 * @param {any} val
 * @return {void}
 */
export function isChannelEnumOrFail(val) {
  if (!Object.values(ChannelEnum).includes(val)) {
    throw new TypeError(`ChannelEnum中不存在此枚举值: ${val}, 请检查自身代码，或询问后端进行补充`)
  }
}
