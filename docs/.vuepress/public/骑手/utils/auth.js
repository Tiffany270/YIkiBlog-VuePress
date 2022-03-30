import Cookies from 'js-cookie'
const TokenKey = 'Accounts-Admin-Token'
/**
 * 获取token
 * @returns String
 */
export function getToken() {
  return Cookies.get(TokenKey)
}
/**
 * 设置token
 * @param {*} access_token token值
 * @param {*} token_type token类型
 * @returns void
 */
export function setToken(access_token, token_type) {
  const token = token_type + ' ' + access_token
  return Cookies.set(TokenKey, token)
}
/**
 * 删除token
 */
export function removeToken() {
  Cookies.remove(TokenKey)
}
