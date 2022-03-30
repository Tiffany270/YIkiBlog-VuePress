import request from '@/utils/request'
import { toFormData } from '@/utils/transformRequest'
// 获取工作室列表
export const queryStudioList = params => {
  return request({
    url: '/sign/studioToB/page',
    method: 'get',
    params
  })
}
// 发送信息
export const smsNotice = data => {
  return request({
    url: '/sign/studioToB/sendMessage',
    method: 'post',
    data
  })
}
// 导出工作室数据
export const exportStudioData = data => {
  return request({
    url: '/sign/studioToB/download',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 下载导入模板
export const downloadImportTemplate = data => {
  return request({
    url: '/sign/studioToB/downloadModel',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 批量导入
export const uploadStudios = data => {
  data = toFormData(data)
  return request({
    url: '/sign/studioToB/batchUpload',
    method: 'post',
    data
  })
}
// 导出导入失败数据
export const exportUploadFailData = () => {
  return request({
    url: '/sign/studioToB/downloadFailStudio',
    method: 'post',
    responseType: 'blob'
  })
}
// 新增工作室
export const updateStudio = data => {
  return request({
    url: '/sign/studioToB/singleUpload',
    method: 'post',
    data
  })
}
// 新增时获取行业和经营范围
export const queryStudioConnetProjectInfo = () => {
  return request({
    url: '/sign/studioToB/singleShow',
    method: 'get'
  })
}
// 获取工作室详情
export const queryStudioDetail = params => {
  return request({
    url: '/sign/studioToB/detail',
    method: 'get',
    skipOssCheck: true,
    params
  })
}
// 工作室详情-申请注销
export const applyLogOff = data => {
  return request({
    url: '/sign/studioToB/update',
    method: 'post',
    data
  })
}

// 判断当前是否有在导入的数据
export const queryCurrentProcress = (processType, projectId) => {
  return request({
    url: `/sign/getProcess/${processType}/${projectId}`,
    method: 'get'
  })
}
// 获取导入失败数据
export const queryStudioImportFailData = params => {
  return request({
    url: '/sign/studioToB/getBatchUploadFailList',
    method: 'get',
    params
  })
}
// 获取导入成功数据
export const queryStudioImportSuccessData = params => {
  return request({
    url: '/sign/studioToB/getBatchUploadSuccessList',
    method: 'get',
    params
  })
}
// 清除导入失败数据
export const clearFailData = () => {
  return request({
    url: '/sign/studioToB/deleteFailStudioList',
    method: 'post'
  })
}
