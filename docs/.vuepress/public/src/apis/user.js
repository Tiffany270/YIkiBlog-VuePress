import request from '@/utils/request'
// 获取验证码
export const getSmsCode = data => {
  return request({
    url: '/oauth/user/login/send',
    method: 'post',
    data,
    headers: {
      Authorization: 'Basic d2ViOndlYkAxLjAuMA=='
    }
  })
}
// 登录接口
export const login = data => {
  return request({
    url: '/oauth/user/login',
    method: 'post',
    data,
    headers: {
      Authorization: 'Basic d2ViOndlYkAxLjAuMA=='
    }
  })
}

// 重置登录密码
export const resetLoginPassword = data => {
  return request({
    url: '/subject/accountExpandInfo/resetLoginPassword',
    method: 'post',
    data
  })
}

// 发送修改登录密码的短信验证码
export const sendUpdatePwdSms = data => {
  return request({
    url: '/subject/accountExpandInfo/sendUpdatePwdSms',
    method: 'post',
    data
  })
}

// 修改登录密码
export const updateLoginPassword = data => {
  return request({
    url: '/subject/accountExpandInfo/updateLoginPassword',
    method: 'post',
    data
  })
}

// 获取用户信息
export const queryUserInfo = () => {
  return request({
    url: '/oauth/user/principal',
    method: 'get'
  })
}
// 获取登录用户的项目信息
export const queryProjecInfoByUser = () => {
  return request({
    url: '/subject/project/baseInfo',
    method: 'get'
  })
}
// 获取登录用户的项目列表
export const queryProjectListByUser = () => {
  return request({
    url: '/subject/project/getPrincipalProjectList',
    method: 'get'
  })
}
// 切换项目
export const switchProject = id => {
  return request({
    url: `/subject/project/switch/${id}`,
    method: 'post'
  })
}
// 获取用户菜单接口
export const queryAuthMenu = () => {
  return request({
    url: '/oauth/menu/treesByUser',
    method: 'get'
  })
}
// 登出
export const logout = () => {
  return request({
    url: '/oauth/user/logout',
    method: 'get'
  })
}
// 根据domain登录页获取页面login
export const queryLogoInfoByDomain = params => {
  return request({
    url: '/subject/tenant/custom/myselfPic',
    method: 'get',
    params,
    skipOssCheck: true
  })
}
