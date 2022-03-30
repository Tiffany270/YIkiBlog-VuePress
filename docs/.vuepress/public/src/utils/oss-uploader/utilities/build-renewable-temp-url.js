import { FILE_ID_KEY, OSS_FILE_ID_IDENTIFIER, UPLOAD_FILE_KEY } from '@/maps/constant'

/**
 * 构建可以重复请求的OSS URL
 * @param {string} url 文件地址
 * @param {string} [fileName] 文件名
 * @param {string} [fileId] 文件id
 */
export function buildRenewableTempUrl(url, fileName, fileId) {
  const urlObj = new URL(url)
  if (fileName && typeof fileName === 'string') {
    urlObj.searchParams.set(UPLOAD_FILE_KEY, fileName)
  }
  if (OSS_FILE_ID_IDENTIFIER.test(fileId)) {
    urlObj.searchParams.set(FILE_ID_KEY, fileId)
  }
  return urlObj.toString()
}
