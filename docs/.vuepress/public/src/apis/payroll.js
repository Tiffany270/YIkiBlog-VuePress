import request from '@/utils/request'
import { toFormData } from '@/utils/transformRequest'
// 获取佣金代发列表接口
export const queryPayrollList = params => {
  return request({
    url: '/payroll/tollBatch/list',
    method: 'get',
    params
  })
}
// 删除发放数据
export const deletePayrollData = batchNo => {
  return request({
    url: `payroll/tollBatch/del/${batchNo}`,
    method: 'delete'
  })
}
// 重发
export const rePay = data => {
  return request({
    url: '/payroll/tollBatch/repeat',
    method: 'post',
    data
  })
}
// 重发确认数据
export const confirmRepay = params => {
  return request({
    url: '/payroll/tollBatch/repeat/list',
    method: 'get',
    params
  })
}
// 取消重发
export const cancelRepay = batchNo => {
  return request({
    url: `/payroll/tollBatch/repeatEnd/${batchNo}`,
    method: 'delete'
  })
}
// 检测当前项目导入发放数据校验状态
export const checkImportPayStatus = () => {
  return request({
    url: '/payroll/tollBatch/status',
    method: 'get'
  })
}
// 下载导入模板
export const downloadTemplate = () => {
  return request({
    url: '/payroll/tollBatch/template',
    method: 'get'
  })
}
// 导入发放数据
export const exportPayroll = data => {
  data = toFormData(data)
  return request({
    url: '/payroll/tollBatch/upload',
    method: 'post',
    data
  })
}
// 获取导入发放批次数据导入进度
export const queryImportPayrollProgress = params => {
  return request({
    url: '/payroll/tollBatch/upload/status',
    method: 'get',
    params
  })
}
// 获取当前导入账号信息
export const queryPayAmountAndAccountInfo = batchNo => {
  return request({
    url: `/payroll/preview/${batchNo}`,
    method: 'get'
  })
}

// 获取导入后成功和失败订单数据
export const queryImportResultData = data => {
  return request({
    url: '/payroll/tollBatch/upload/order',
    method: 'post',
    data
  })
}

// 编辑导入后发放批次订单
export const editPayOrder = data => {
  return request({
    url: '/payroll/tollBatch/order/update',
    method: 'post',
    data
  })
}
// 删除导入后发放批次订单
export const deletePayOrder = data => {
  return request({
    url: '/payroll/tollBatch/order/del',
    method: 'delete',
    data
  })
}
// 导出失败数据
export const exportFailPayrollData = params => {
  return request({
    url: '/payroll/tollBatch/download/failOrder',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
// 导入更正数据
export const importEditPayrollData = data => {
  data = toFormData(data)
  return request({
    url: '/payroll/tollBatch/fix/upload',
    method: 'post',
    data
  })
}
// 取消批次发放
export const cancelPay = batchNo => {
  return request({
    url: `/payroll/tollBatch/cancel/${batchNo}`,
    method: 'delete'
  })
}
// 预览确认待发数据
export const previewPayroll = data => {
  return request({
    url: '/payroll/preview/bill',
    method: 'post',
    data
  })
}
// 获取账单确认发放明细
export const queryPreviewPayrollDetail = data => {
  return request({
    url: '/payroll/preview/order',
    method: 'post',
    data
  })
}
// 获取详情页面订单数据
export const queryPayrollDetailOrderList = params => {
  return request({
    url: '/payroll/bill/orderList',
    method: 'get',
    params
  })
}

// 提交代发数据
export const submitPayData = data => {
  return request({
    url: '/payroll/bill/submit',
    method: 'post',
    data
  })
}
// 超时重新提交
export const timeoutReSubmit = data => {
  return request({
    url: '/payroll/tollBatch/expire/upload',
    method: 'post',
    data
  })
}
// 获取付款页面账单
export const queryPassPayBillList = batchNo => {
  return request({
    url: `/payroll/bill/detail/${batchNo}`,
    method: 'get'
  })
}
// 检查钱包是否有余额
export const checkIsEnoughForBalance = batchNo => {
  return request({
    url: `/payroll/wallet/${batchNo}`,
    method: 'get'
  })
}
// 发送支付验证码
export const sendPaySms = data => {
  return request({
    url: '/payroll/sms/pay',
    method: 'post',
    data
  })
}
// 确认支付
export const confirmPay = data => {
  return request({
    url: '/payroll/bill/pay',
    method: 'post',
    data
  })
}
// 获取批次详情
export const queryBatchDetail = batchNo => {
  return request({
    url: `/payroll/bill/detail/${batchNo}`,
    method: 'get'
  })
}
// 发放详情-下载发放明细
export const downloadPayDetail = batchNo => {
  return request({
    url: `/payroll/tollBatch/download/${batchNo}`,
    method: 'get',
    responseType: 'blob'
  })
}
// 发放明细 -下载校验失败明细
export const downloadPayFailDetail = batchNo => {
  return request({
    url: `/payroll/tollBatch/download/${batchNo}/failOrder`,
    method: 'get',
    responseType: 'blob'
  })
}
// 取消发放申请
export const cancelPayroll = batchNo => {
  return request({
    url: `/payroll/bill/cancel/${batchNo}`,
    method: 'delete'
  })
}
// 审核
export const batchApproval = data => {
  return request({
    url: '/payroll/batch/audit',
    method: 'post',
    data
  })
}
/**
 * 以下是发放明细
 * @param {*} params
 * @returns
 */

// 获取发放明细列表
export const queryPayrollDetail = params => {
  return request({
    url: '/payroll/tollOrder/list',
    method: 'get',
    params
  })
}
// 导出发放明细
export const downloadPayrollDetail = params => {
  return request({
    url: '/payroll/tollOrder/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
/** 电子回单
 *
 */
// 获取电子回单列表
export const queryEReceipt = params => {
  return request({
    url: '/settle/voucher/getVoucherListPage',
    method: 'get',
    params
  })
}
// 下载电子回单
export const downloadEReceipt = id => {
  return request({
    url: `/settle/voucher/download/${id}`,
    responseType: 'arraybuffer'
  })
}

/** 单笔发放查询 */
// 获取单笔发放查询列表
export const querySingleProvision = params => {
  return request({
    url: '/payroll/tollSingleOrder/listPage',
    method: 'get',
    params
  })
}
// 下载单笔发放查询数据
export const downLoadSinglePrivision = params => {
  return request({
    url: `/payroll/tollSingleOrder/downList`,
    method: 'get',
    params,
    responseType: 'blob'
  })
}
