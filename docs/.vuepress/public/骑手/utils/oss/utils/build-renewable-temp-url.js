import {
  FILE_INTERNAL_URL_KEY,
  UPLOAD_FILE_KEY,
  OSS_FILE_IDENTIFIER
} from '@/static/constant'

/**
 * 构建可以重复请求的OSS URL
 * @param {string} url 文件地址
 * @param {string} [fileName] 文件名
 * @param {string} [internalUrl] 文件永久地址
 */
export function buildRenewableTempUrl(url, fileName, internalUrl) {
  const urlObj = new URL(url)
  if (fileName && typeof fileName === 'string') {
    urlObj.searchParams.set(UPLOAD_FILE_KEY, fileName)
  }
  if (internalUrl.indexOf(OSS_FILE_IDENTIFIER) > -1) {
    urlObj.searchParams.set(FILE_INTERNAL_URL_KEY, internalUrl)
  }
  return urlObj.toString()
}
