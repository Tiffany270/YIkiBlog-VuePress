import { findDownloadFileFromOss } from '@/api/oss'
import { getExtNameFromUrl } from './get-ext-name-from-url'
import { getUploadFileName } from './get-upload-file-name'
import { getOssTempAccessUrl } from '@utils/oss'
import Vue from 'vue'
let $loadingInstance = null
// 开启loading
const showLoading = () => {
  $loadingInstance = Vue.prototype.$loading({ text: '下载中...请耐心等待' })
}
/**
 * 从oss下载文件 - 单个
 * @param {string} internalUrls 文件internalUrl/临时链接/永久链接 列表
 * @param {string} fileName 自定义下载后的文件名
 */
export const downloadFileFromOss = async (internalUrls, fileName) => {
  showLoading()
  // 获取最新的临时链接
  const tempUrls = await getOssTempAccessUrl(internalUrls)
  const url = tempUrls[0]
  const { data } = await findDownloadFileFromOss(url)
  // 关闭loading
  $loadingInstance.close()
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
}
