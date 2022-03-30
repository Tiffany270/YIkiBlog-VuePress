import request from '@/utils/request/index'
/**
 * 获取登录验证码
 */
export const findLoginSmsCode = data => {
  return request({
    // url: '/admin/login/sms/sendCaptcha',
    url: '/admin/login/sms/sendCaptcha/v2',
    method: 'post',
    data
  })
}
/**
 * 验证码登录接口
 * @param { object } data 登录表单数据
 * @returns { Promise<object> }
 */
export const updateLoginBySMS = data => {
  return request({
    // url: '/admin/login/sms/token',
    url: '/admin/login/sms/token/v2',
    method: 'post',
    data
    // transformRequest: [
    //   function (data) {
    //     let ret = ''
    //     for (const it in data) {
    //       ret +=
    //         encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //     }
    //     return ret.substring(0, ret.length - 1)
    //   }
    // ]
  })
}

/**
 * 获取菜单
 */
export const getCurrentUserMenu = () => {
  return request({
    url: '/accounts-admin/menu/getCurrentUserMenu',
    method: 'get'
  })
}

/**
 * 获取用户信息
 */
export const findUserInfo = () => {
  return request({
    url: '/accounts-admin/account/info',
    method: 'get'
  })
}
/**
 * 登出
 * @param params
 * @returns
 */
export const updateLogout = params => {
  return request({
    url: '/admin/logout/token',
    method: 'post',
    params
  })
}
