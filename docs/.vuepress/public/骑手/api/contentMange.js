import request from '@/utils/request/index'
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_DYNAMIC_API
    : '/api'

/**--------------内容管理-列表 --------------*/

//内容管理-分页列表
export const getContentMangeList = data => {
  return request({
    url: `${baseUrl}/manage/content/page`,
    method: 'post',
    data
  })
}
// 内容管理-内容设置
export const getContentSetting = params => {
  return request({
    url: `${baseUrl}/manage/content/setting`,
    method: 'put',
    params
  })
}
// 内容管理-获取内容审核状态是否开启，data返回true表示开启
export const getAuditStatus = () => {
  return request({
    url: `${baseUrl}/manage/content/setting`,
    method: 'get'
  })
}

// 内容管理-内容更新（包括上下架，注：审核通过状态改为已发布）
export const getContentUpdate = data => {
  return request({
    url: `${baseUrl}/manage/content/update`,
    method: 'put',
    data
  })
}
//内容管理-查看编辑
export const getContentEdit = data => {
  return request({
    url: `${baseUrl}/manage/content/edit`,
    method: 'post',
    data
  })
}
//内容管理-查看详情
export const getContentMangeDetail = id => {
  return request({
    url: `${baseUrl}/manage/content/${id}`,
    method: 'get'
  })
}

/** ------------ 评论管理 ---------------- */
//评论管理-分页列表
export const getCommentManageList = data => {
  return request({
    url: `${baseUrl}/manage/content/comment/page`,
    method: 'post',
    data
  })
}
//评论管理-详情页
export const getCommentMangeDetail = id => {
  return request({
    url: `${baseUrl}/manage/content/comment/get/${id}`,
    method: 'get'
  })
}
// 评论管理-评论更新（包括上下架，注：审核通过状态改为已发布）
export const getCommentEdit = data => {
  return request({
    url: `${baseUrl}/manage/content/comment/edit`,
    method: 'post',
    data
  })
}
