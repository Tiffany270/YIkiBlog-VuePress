/* eslint-disable */
let val // 声明变量

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function isvalidURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function isvalidLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function isvalidUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function isvalidAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 邮编 */
export function isvalidZipcode(val) {
  return /^[1-9]\d{5}$/.test(val)
}

/* 邮编 */
export function isvalidTelephone(val) {
  return (
    /^\(?0[1-9]\d{1,2}\)?[\s\-]?[2-9]\d{3}[\s\-]?\d{3,4}$/.test(val) || /^[\s\-]?[2-9]\d{3}[\s\-]?\d{3,4}$/.test(val)
  )
}

/* 手机 */
export function isvalidMobile(val) {
  return /^1\d{10}$/.test(val)
}

/* 身份证 */
export function isvalidId(val) {
  return /(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(val)
}

/* 大小写字母加数字*/
export function isvalidAlphanumeric(str) {
  const reg = /^[0-9A-Za-z]+$/
  return reg.test(str)
}

/* 纯数字*/
export function isvalidNumeric(str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}

/* 中文*/
export function isvalidZH(str) {
  const reg = /^[\u4E00-\u9FA5]+$/
  return reg.test(str)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* 必须是8~20位字母加数字的混合密码*/
/* 不能使用连续或重复4个以上字符（例如：8888）*/
export const validate_newPassword = (rule, value, cb) => {
  val = value // 赋值
  if (/([0-9a-zA-Z])\1{3}/.test(value) || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(value)) {
    cb(new Error('密码不符合要求，请重新设置'))
  } else {
    cb()
  }
}

/* 确认密码*/
export const validate_surePassword = (rule, value, cb) => {
  if (value !== val) {
    cb(new Error('两次输入的密码不一致'))
  } else {
    cb()
  }
}
