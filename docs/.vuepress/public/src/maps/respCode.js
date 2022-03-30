export default {
  SUCCESS: 0, // 成功
  ACCOUNT_NOT_EXIST: 100000, // 账号不存在
  ACCOUNT_NOT_LOGIN: 100001, // 用户未登录
  FORCED_LOGOUT: 100002, // 用户已在其他设备登录
  LOGIN_EXPIRED: 100003, //  登录过期
  ACCOUNT_LOCK: 100004, // 账号已锁定
  PSW_ERROR: 100005, // 账号或者密码错误
  SMS_ERROR: 100006, // 验证码错误
  LOGIN_METHOD_NOT_SUPPORT: 100007, // 不支持该方式登录
  TENANT_NOT_EXIST: 100008 // 商户不存在
}
