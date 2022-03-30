import request from '@/utils/request'
// 首页统计-统计签约人数及未签约人数
export const statisticsSign = params => {
  return request({
    url: '/sign/contract/statisticsSign',
    method: 'get',
    params
  })
}

export const homePageData = params => {
  return request({
    url: '/settle/issuedBill/homePageData',
    method: 'get',
    params
  })
}

export const subWalletCount = params => {
  return request({
    url: '/finance/subWallet/indexPage/subWalletCount',
    method: 'get',
    params
  })
}

export const indexStatistics = params => {
  return request({
    url: '/payroll/indexStatistics',
    method: 'get',
    params
  })
}
