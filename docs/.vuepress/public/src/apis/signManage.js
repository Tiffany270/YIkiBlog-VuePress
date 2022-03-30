import request from '@/utils/request'
import { toFormData } from '@/utils/transformRequest'

// 签约账号表分页查询
export const getSignPage = params => {
  return request({
    url: '/sign/account/page',
    method: 'get',
    params,
    skipOssCheck: true
  })
}

// 签约合同作废
export const contractInvalid = id => {
  return request({
    url: `/sign/contract/invalid/${id}`,
    method: 'post'
  })
}

// 签约合同注销
export const contractCancellation = id => {
  return request({
    url: `/sign/contract/cancellation/${id}`,
    method: 'post'
  })
}

// 发送短信催签
export const contractUrgeBySms = data => {
  return request({
    url: `/sign/contract/urgeBySms`,
    method: 'post',
    data
  })
}

// 统计当前项目待签约人数
export const contractUrgeTimes = params => {
  return request({
    url: '/sign/contract/urgeTimes',
    method: 'get',
    params
  })
}

// 导入excel
export const signUpload = data => {
  data = toFormData(data)
  return request({
    url: `/sign/tem/upload`,
    method: 'post',
    data
  })
}

// 获取当前导入批量签约名单的进度  旧
export const getProcess = projectId => {
  return request({
    url: `/sign/tem/getProcess/${projectId}`,
    method: 'get'
  })
}

// 获取当前导入批量签约名单的进度  新
export const getSignProcess = projectId => {
  return request({
    url: `/sign/getProcess/SIGN_EXCEL_IMPORT/${projectId}`,
    method: 'get'
  })
}

// 确认完成签约名单提交
export const endSubmit = data => {
  return request({
    url: `/sign/tem/endSubmit`,
    method: 'post',
    data
  })
}

// 签约名单导入临时表详情查询
export const getSignTem = params => {
  return request({
    url: `/sign/tem/page`,
    method: 'get',
    params
  })
}

// 签约名单导入-获取附加信息
export const getExtraMessage = projectId => {
  return request({
    url: `/sign/tem/getExtraMessage/${projectId}`,
    method: 'get',
    skipOssCheck: true
  })
}

// 根据项目id获取协议数据
export const getByProject = projectId => {
  return request({
    url: `/subject/project/sign/getByProject/${projectId}`,
    method: 'post'
  })
}

// 批量删除
export const delSignTem = data => {
  return request({
    url: `/sign/tem/delSignTem`,
    data,
    method: 'post'
  })
}

// 签约名单导入临时表编辑
export const updateTem = data => {
  return request({
    url: `/sign/tem/update`,
    data,
    method: 'post'
  })
}

// 签约名单导入-导入更正数据
export const importEditSignTem = data => {
  const projectId = data.projectId
  data = toFormData(data)
  return request({
    url: `/sign/tem/importEditSignTem/${projectId}`,
    method: 'post',
    data
  })
}

// 签约名单导入-导出失败数据
export const exportSignTem = projectId => {
  return request({
    url: `/sign/tem/exportSignTem/${projectId}`,
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 签约名单导入--取消导入
export const cancelSignTem = projectId => {
  return request({
    url: `/sign/tem/cancel/${projectId}`,
    method: 'post'
  })
}

// 签约名单导入--最终提交签约名单数据
export const addSignAccount = data => {
  return request({
    url: `/sign/tem/addSignAccount`,
    method: 'post',
    data
  })
}

// 根据账号id获取合同列表
export const getContractBySignAccount = signAccountId => {
  return request({
    url: `/sign/contract/getContractBySignAccount/${signAccountId}`,
    method: 'get'
  })
}

// 电子签约信息导出
export const exportList = data => {
  return request({
    url: `/sign/account/export`,
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

// 下载签约名单导入模板
export const downloadTemplate = () => {
  return request({
    url: `/sign/tem/download/template`,
    method: 'post'
  })
}

// 证件审核信息分页查询
export const getNonMainlandList = params => {
  return request({
    url: `/sign/authAudit/page`,
    params,
    skipOssCheck: true
  })
}

// 证件审核信息新增
export const insertNonMainland = data => {
  return request({
    url: `/sign/authAudit/insert`,
    method: 'post',
    data
  })
}

// 证件审核信息修改
export const updateNonMainland = data => {
  return request({
    url: `/sign/authAudit/update`,
    method: 'post',
    data
  })
}

// 证件审核信息详情
export const getNonMainlandDetail = id => {
  return request({
    url: `/sign/authAudit/${id}`,
    skipOssCheck: true
  })
}

// 证件审核信息导出
export const exportNonMainlandList = params => {
  return request({
    url: `/sign/authAudit/export`,
    responseType: 'arraybuffer',
    params
  })
}
