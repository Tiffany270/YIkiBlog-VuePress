import request from '@/utils/request'
import { passwordHandler } from '@/utils/passwordHandle'

// 获取系统设置信息
export const getSettingInfo = () => {
  return request({
    url: '/subject/accountExpandInfo/getSettingInfo',
    method: 'get'
  })
}

// 修改系统设置的数据
export const updateSettingInfo = form => {
  const data = passwordHandler(form)
  return request({
    url: `/subject/accountExpandInfo/updateSettingInfo`,
    method: 'post',
    data
  })
}

// 发送短信验证码
export const sendSms = data => {
  return request({
    url: `/subject/accountExpandInfo/sendSms`,
    method: 'post',
    data
  })
}

// 登录页-发送短信验证码
export const sendCodeByCaptcha = data => {
  return request({
    url: `/oauth/account/smsCaptchaSend`,
    method: 'post',
    data,
    headers: {
      Authorization: 'Basic d2ViOndlYkAxLjAuMA=='
    }
  })
}

// 登录页-校验短信验证码
export const forgetPassword = data => {
  return request({
    url: `/oauth/account/forgetPassword/check`,
    method: 'post',
    data,
    headers: {
      Authorization: 'Basic d2ViOndlYkAxLjAuMA=='
    }
  })
}
// 登录页-修改登录密码
export const forgetLoginPassword = form => {
  const data = passwordHandler(form)
  return request({
    url: `/oauth/account/forgetLoginPassword/update`,
    method: 'post',
    data,
    headers: {
      Authorization: 'Basic d2ViOndlYkAxLjAuMA=='
    }
  })
}

// 修改支付密码
export const forgetPayPassword = form => {
  const data = passwordHandler(form)
  return request({
    url: `/oauth/account/forgetPayPassword/update`,
    method: 'post',
    data
  })
}
