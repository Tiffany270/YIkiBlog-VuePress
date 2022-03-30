import request from '@/utils/request/index'
const baseUrl =
  process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/api'

/**
 * 投稿列表
 */
export const getList = params => {
  return request({
    url: `${baseUrl}/contribution/list`,
    method: 'get',
    params
  })
}

// 获取所有主题集合
export const getAllTopic = () => {
  return request({
    url: `${baseUrl}/contribution/getAllTopic`,
    method: 'get'
  })
}

// 获取当前主题集合
export const getTopic = () => {
  return request({
    url: `${baseUrl}/contribution/getTopic`,
    method: 'get'
  })
}

// 添加主题
export const addTopic = data => {
  return request({
    url: `${baseUrl}/contribution/topic/add`,
    method: 'post',
    data
  })
}

// 投稿审核
export const approvalContribution = data => {
  return request({
    url: `${baseUrl}/contribution/edit`,
    method: 'post',
    data
  })
}

// 删除投稿
export const deleteContributionById = id => {
  return request({
    url: `${baseUrl}/contribution/delete/${id}`,
    method: 'post'
  })
}

// 删除主题
export const deleteTopicById = id => {
  return request({
    url: `${baseUrl}/contribution/topic/delete/${id}`,
    method: 'post'
  })
}
