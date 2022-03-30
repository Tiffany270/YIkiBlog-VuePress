import request from '@/utils/request'
import { toFormData } from '@/utils/transformRequest'

// 获取任务管理列表
export const getPage = params => {
  return request({
    url: '/sign/task/page',
    params
  })
}

// 新建任务
export const insert = data => {
  return request({
    method: 'post',
    url: '/sign/task/insert',
    data
  })
}

// 新建任务
export const updateTask = data => {
  return request({
    method: 'post',
    url: '/sign/task/update',
    data
  })
}

// 撤回任务
export const withDrawTask = id => {
  return request({
    method: 'delete',
    url: `/sign/task/delete/${id}`
  })
}

// 任务详情
export const getDetail = id => {
  return request({
    url: `/sign/task/${id}`
  })
}

// 任务人员列表
export const getUserList = data => {
  return request({
    url: `/sign/taskUser/userList`,
    method: 'post',
    data
  })
}

// 导出任务人员列表
export const exportExcel = data => {
  return request({
    url: `/sign/taskUser/exportExcel`,
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

// 移除任务人员
export const removeTaskUser = id => {
  return request({
    url: `/sign/taskUser/delete/${id}`
  })
}

// 任务人员详情
export const getTaskUserDetail = params => {
  return request({
    url: `/sign/taskUserResult/detail`,
    params,
    skipOssCheck: true
  })
}

// 批量导入名单
export const batchUpload = data => {
  data = toFormData(data)
  return request({
    method: 'post',
    url: `/sign/taskUserUpload/batchUpload`,
    data
  })
}

// 批量导入模板
export const downloadTemplate = () => {
  return request({
    url: `/sign/taskUserUpload/download/template`
  })
}

// 批量导入名单进度
export const batchUploadProcess = params => {
  return request({
    url: `/sign/taskUserUpload/batchUploadProcess`,
    params
  })
}

// 导出失败数据
export const exportFailedExcel = params => {
  return request({
    url: `/sign/taskUserUpload/exportExcel`,
    params,
    responseType: 'arraybuffer'
  })
}

// 校验数据查询
export const getCheckPage = params => {
  return request({
    url: `/sign/taskUserUpload/page`,
    params
  })
}

// 确认提交/放弃上传
export const operateUploadResult = data => {
  return request({
    method: 'post',
    url: `/sign/taskUserUpload/operateUploadResult`,
    data
  })
}

// 移除名单
export const deleteUser = id => {
  return request({
    method: 'delete',
    url: `/sign/taskUser/delete/${id}`
  })
}

// 查询校验数据统计
export const uploadCount = params => {
  return request({
    url: `/sign/taskUserUpload/count`,
    params
  })
}

// 完成任务
export const verifyUsetTaskResult = data => {
  return request({
    url: `/sign/taskUser/verifyUserTaskResult`,
    method: 'post',
    data
  })
}

// 根据协议编号获取协议数据
export const getSignByAgreementId = id => {
  return request({
    url: `/subject/project/sign/${id}`,
    method: 'post'
  })
}

// 清空任务名单
export const deleteByTaskId = data => {
  return request({
    url: `/sign/taskUserUpload/deleteByTaskId`,
    method: 'post',
    data
  })
}

// 获取已经使用过的协议
export const usedAgreementId = () => {
  return request({
    url: `/sign/task/usedAgreementId`,
    method: 'get'
  })
}
