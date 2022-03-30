function paramsStrSort(paramsStr, kAppKey, kAppSecret) {
  const url = paramsStr + '&appKey=' + kAppKey + '&key=' + kAppSecret
  return url.split('&').sort().join('&').toLocaleUpperCase()
}

/**
 * 获取随机字符串种子
 * @param {number} len 位数
 * @returns {string} 随机种子
 */
export const generateSeed = len => {
  len = len || 32
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const _chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = _chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += _chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
 * 签名请求
 * @param params 请求参数
 * @param kAppKey
 * @param kAppSecret
 * @returns {*}
 */
export const sign = (params, kAppKey, kAppSecret) => {
  const arr = []
  for (const i in params) {
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty(i)) {
      arr.push(i + '=' + params[i])
    }
  }
  return paramsStrSort(arr.join('&'), kAppKey, kAppSecret)
}
