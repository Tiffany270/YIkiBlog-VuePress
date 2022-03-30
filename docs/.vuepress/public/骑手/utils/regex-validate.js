/**
 * 校验email
 * @param {string} val
 * @returns  {boolean}
 */
export const isValidEmail = val => {
  return /^[a-zA-Z0-9_.-]+@\.{0,1}[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
    val
  )
}
/**
 * 校验电话（包含手机和座机）
 * @param {string} val
 * @returns  {boolean}
 */
export const isValidPhone = val => {
  return /(^(\d{3,4})?\d{7,8})$|(^1\d{10})$/.test(val)
}
/**
 * 校验手机
 * @param {string} val
 * @returns  {boolean}
 */
export const isValidMobile = val => {
  return /^1\d{10}$/.test(val)
}
/**
 * 校验身份证
 * @param {string} val
 * @returns  {boolean}
 */
export const isValidID = val => {
  return /(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(val)
}
export const isValidID2 = val => {
  return /^[0-9a-zA-Z]{18}$/.test(val)
}
/**
 * 统一信用代码
 * note: false 为 正确的号码
 * 用法 (!isCrediCodeFalse)
 */
export const isCrediCodeFalse = val => {
  return /^([a-zA-Z0-9-]{15}|[a-zA-Z0-9-]{18}|[a-zA-Z0-9-]{20})$/.test(val)
}

export const isEpName = val => {
  return /^.{1,50}$/.test(val)
}

/**
 * 姓名格式false
 * 适用：xx代表人/法人/联系人
 */
export const isNameFalse = val => {
  return /^[\u2E80-\u9FFF]{1,10}$/.test(val)
}

export const isContact = val => {
  return /^1[0-9]{10}$/.test(val)
}

// 验证空格
export const isBlank = val => {
  return /^\s+$/gi.test(val)
}
//银行账号格式 - true
export const isBankNo = val => {
  return /^[a-zA-Z0-9]{1,20}$/.test(val)
}
// 开户银行格式
export const isOpenBankNo = val => {
  return /^[\\u4e00-\\u9fa5A-Za-z0-9]{1,15}$/.test(val)
}
/** yiki  
 * 期初数字校验 仅(正)数字，(只)含2小数位
 note :[+-]为含负数 d{0,2} 两个小数位*/
export const validNumber = val => {
  return /^[+]?((\d*(\.\d{0,2})$)|(\d+$))/.test(val)
}
