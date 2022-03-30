import md5 from 'md5'
import { generateSeed, sign } from '@/utils/request/crypto/utils'
import { encryptData, genAesKey } from '@/utils/request/crypto/encrypt'
import { decryptData, getAesKey } from '@/utils/request/crypto/decrypt'
import { APP_KEY, APP_SECRET } from '@/utils/request/crypto/config'

/**
 * 加密请求
 * @param data
 * @returns {{encrypted: string, requestData: string}}
 */
export const encryptRequest = data => {
  const seed = generateSeed(16)

  const requestData = encryptData(data, seed)
  const encrypted = genAesKey(seed)

  return {
    requestData,
    encrypted
  }
}

/**
 * 处理请求头
 * @param {object} config.headers
 * @param {object} config.data
 */
export const handleHeader = config => {
  const timestamp = +Date.now()
  const signedData = sign(
    {
      ...config.data,
      timestamp
    },
    APP_KEY,
    APP_SECRET
  )
  const md5edSignedData = md5(signedData)
  config.headers.timestamp = timestamp
  config.headers.signature = md5edSignedData.toUpperCase()
}

/**
 * 解密请求
 * @param {string} data.requestData 请求参数
 * @param {string} data.encrypted 密匙
 * @returns {{}}
 */
export const decryptResponse = data => {
  const key = getAesKey(data.encrypted)

  return decryptData(data.requestData, key)
}

/**
 * 判断是否需要解密
 * @param {string} data.requestData
 * @param {string} data.encrypted
 */
export const isEncryptedData = data => {
  return !!(data && data.requestData && data.encrypted)
}

/**
 * 判断是否需要加密
 * @param {boolean} [config.needToEncrypt] axios config里额外的参数
 * @param {object|FormData} config.data
 * @returns {boolean}
 */
export const isNeedToEncrypt = config => {
  return config.needToEncrypt && !(config.data instanceof FormData)
}
