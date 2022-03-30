import request from '@/utils/request'
// 获取用户权限列表
export const riskControlToBPage = params => {
  return request({
    url: '/oauth/account/riskControlToBPage',
    params
  })
}

// 获取菜单
export const menuTrees = params => {
  return request({
    url: '/oauth/menu/trees',
    params
  })
}

// 新增用户权限保存
export const saveRiskControlToB = data => {
  return request({
    url: '/oauth/account/saveRiskControlToB',
    method: 'post',
    data
  })
}

// 编辑用户权限保存
export const updateRiskControlToB = data => {
  return request({
    url: '/oauth/account/updateRiskControlToB',
    method: 'post',
    data
  })
}

// 用户详情
export const riskControlToBDetail = (type, accountId) => {
  return request({
    url: `/oauth/account/riskControlToBDetail/${type}/${accountId}`
  })
}

// 用户删除
export const deleteRiskControlToB = (type, accountId) => {
  return request({
    url: `/oauth/account/deleteRiskControlToB/${type}/${accountId}`,
    method: 'post'
  })
}

// 检验的手机号码
export const checkMobile = mobile => {
  return request({
    url: `/oauth/account/checkRiskControlToB/${mobile}`
  })
}
