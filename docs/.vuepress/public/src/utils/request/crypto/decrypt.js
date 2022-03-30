import { JSEncrypt } from 'jsencrypt'
import { PRIVATE_KEY } from '@/utils/request/crypto/config'
import encUtf8 from 'crypto-js/enc-utf8'
import AES from 'crypto-js/aes'
import ECB from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'

/**
 * 解密数据
 * @param {string} data 加密后的字符串
 * @param {string} key aes密钥
 * @returns {object}
 */
export const decryptData = (data, key) => {
  // aes密匙
  const keyParsed = encUtf8.parse(key)
  // 获取流
  const decryptedData = AES.decrypt(data, keyParsed, {
    mode: ECB,
    padding: Pkcs7
  })
  const stringData = encUtf8.stringify(decryptedData)
  return JSON.parse(stringData) // 必须解两次
}

/**
 * 获取AES密钥
 * @param {string} encrypted
 * @returns {string}
 */
export const getAesKey = encrypted => {
  const decryptor = new JSEncrypt()
  decryptor.setPrivateKey(PRIVATE_KEY)
  return decryptor.decrypt(encrypted)
}
