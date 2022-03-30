import Cookies from 'js-cookie'

const TokenKey = 'B-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(access_token, token_type) {
  const token = token_type + ' ' + access_token
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(TokenKey)
}
