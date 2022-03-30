import request from '@/utils/request'

// 获取商户信息
export const businessInfo = () => {
  return request({
    url: '/subject/accountExpandInfo/businessInfo',
    method: 'get'
  })
}
