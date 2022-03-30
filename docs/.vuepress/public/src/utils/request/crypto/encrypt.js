import { JSEncrypt } from 'jsencrypt'
import encUtf8 from 'crypto-js/enc-utf8'
import AES from 'crypto-js/aes'
import ECB from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'
import { PUBLIC_KEY } from '@/utils/request/crypto/config'

/**
 * 加密方法
 * @param data 请求参数
 * @param seed 随机种子
 * @returns {string}
 */
export const encryptData = (data, seed) => {
  // 随机数种子
  const seedParsed = encUtf8.parse(seed)
  // 请求参数
  const dataString = typeof data === 'string' ? data : JSON.stringify(data)
  const dataParsed = encUtf8.parse(dataString)

  const encryptedData = AES.encrypt(dataParsed, seedParsed, {
    mode: ECB,
    padding: Pkcs7
  })

  return encryptedData.toString()
}

/**
 * 生成AES加密密钥
 * @param seed
 * @returns {string}
 */
export const genAesKey = seed => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(PUBLIC_KEY)
  return encryptor.encrypt(seed)
}
