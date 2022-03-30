import request from '@/utils/request'

// 公告分页查询
export function page(params) {
  return request({
    url: '/subject/messageAnnouncement/page',
    params
  })
}

// 公告已读
export function readAnnouncement(data) {
  return request({
    url: '/subject/messageAnnouncement/readMessage',
    method: 'post',
    data
  })
}

// 更新是否置顶
export function updateTop(data) {
  return request({
    url: '/subject/messageAnnouncement/updateTop',
    method: 'post',
    data
  })
}

// 更新公告状态
export function updateStatus(data) {
  return request({
    url: '/subject/messageAnnouncement/updateStatus',
    method: 'post',
    data
  })
}

// 新增或编辑公告
export function addOrUpdate(data) {
  return request({
    url: '/subject/messageAnnouncement/addOrUpdate',
    method: 'post',
    data
  })
}

// 公告详情
export function getDetail(id) {
  return request({
    url: `/subject/messageAnnouncement/${id}`,
    skipOssCheck: true
  })
}

// 待办分页查询
export function backlogPage(params) {
  return request({
    url: `/subject/messageBacklog/page`,
    params
  })
}

// 通知分页查询
export function noticePage(params) {
  return request({
    url: `/subject/messageNotice/page`,
    params
  })
}

// 系统消息未读数量
export function unReadNum() {
  return request({
    url: `/subject/messageNotice/unReadNum`
  })
}

// 变更通知为已读
export function readNotification(data) {
  return request({
    url: `/subject/messageNotice/readNotification`,
    method: 'post',
    data
  })
}

// 变更待办为已读
export function readBacklogfication(data) {
  return request({
    url: `/subject/messageBacklog/readNotification`,
    method: 'post',
    data
  })
}

// 刷新消息列表
export function refreshMessage(data) {
  return request({
    url: `/subject/messageNotice/refreshMessage`,
    method: 'post',
    data
  })
}
