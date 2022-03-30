import request from '@/utils/request/index'
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_DYNAMIC_API
    : '/api'

export const suggestiondelete = data => {
  return request({
    url: `${baseUrl}/manage/content/feedback/delete`,
    method: 'post',
    data
  })
}

export const findSuggestion = params => {
  return request({
    url: `${baseUrl}/manage/content/feedback/page`,
    method: 'get',
    params
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
