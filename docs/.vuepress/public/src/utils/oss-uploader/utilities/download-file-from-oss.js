import { getOssTempAccessUrl } from '@/apis/oss'
import { getUploadFileName } from './get-upload-file-name'
import { getExtNameFromUrl } from './get-ext-name-from-url'
import request from '@/utils/request'

/**
 * 从OSS下载文件 - 单条
 * 同时支持新旧模式的地址
 *
 * @param {string} fileIdOrUrl 文件ID/临时链接/永久链接
 * @param {string} [fileName] 重命名文件
 */
export async function downloadFileFromOss(fileIdOrUrl, fileName) {
  // 获取最新的临时链接
  const tempUrls = await getOssTempAccessUrl([fileIdOrUrl])
  const url = tempUrls[0]

  return request({
    url,
    method: 'get',
    responseType: 'blob',
    withCredentials: false
  }).then(({ data }) => {
    const objUrl = URL.createObjectURL(data)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = objUrl
    let downloadFileName // 下载的文件名
    if (fileName) {
      downloadFileName = fileName + getExtNameFromUrl(url)
    } else {
      try {
        downloadFileName = getUploadFileName(url)
      } catch (e) {
        downloadFileName = '文件名'
      }
    }
    a.setAttribute('download', downloadFileName)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => {
      URL.revokeObjectURL(objUrl) // 强制清理缓存
    }, 5000)
  })
}
