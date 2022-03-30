import request from '@/utils/request/index'
const baseUrl =
  process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/api'
/**
 * 获取oss上传签名信息
 * @param { Object } data { fileType: 文件类型；fileName： 文件名称 }
 * @returns { Promise<{}>}
 */
export const findOssSignatureInfo = data => {
  return request({
    url: `${baseUrl}/oss/getFileUploadPolicy`,
    method: 'post',
    data
  })
}
/**
 * 上传文件
 * @param {string} url 根据签名获取到的上传url
 * @param  {Object } data 上传文件信息
 * @returns { Promise<{}>}
 */
export const updateUploadOssFile = (url, data) => {
  return request({
    url,
    method: 'post',
    data,
    withCredentials: false,
    skipOssCheck: true
  })
}
/**
 * 根据oss文件fileId获取oss临时文件信息
 * @param {object} data { fileIds: [xx,xxx]} 文件id列表
 * @returns  {Promise<{}>} oss文件信息，包含url、文件名等
 */
export const findOssTempAccessUrl = data => {
  return request({
    url: `${baseUrl}/oss/buildAccessUrl/internalUrl`,
    method: 'post',
    data,
    skipOssCheck: true
  })
}
/**
 * 从oss下载文件
 * @param {string} url 下载文件地址
 * @returns { Stream } 流文件
 */
export const findDownloadFileFromOss = url => {
  return request({
    url,
    method: 'get',
    responseType: 'blob',
    withCredentials: false
  })
}
