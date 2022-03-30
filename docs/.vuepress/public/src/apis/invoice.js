import request from '@/utils/request'
// 获取开票列表
export const queryInvoiceList = params => {
  return request({
    // url: '/settle/invoice/invoiceList2B',
    url: '/settle/invoice/invoiceList',
    method: 'get',
    params,
    skipOssCheck: true
  })
}
// 撤销开票列表
export const revokeInvoiceRow = id => {
  return request({
    url: `/settle/invoice/delete/${id}`,
    method: 'delete'
  })
}
// 获取账单信息
export const queryInvoiceBill = params => {
  return request({
    url: '/settle/issuedBill/invoiceBillPage',
    method: 'get',
    params
  })
}
// 根据项目详情获取开票内容
export const queryInvoiceContent = id => {
  return request({
    url: `/subject/project/${id}`,
    method: 'get',
    skipOssCheck: true
  })
}
// 获取准备开票信息
export const queryPrepareIvnoice = params => {
  return request({
    // url: '/settle/invoice/prepareInfo2B',
    url: '/settle/invoice/prepareInfo',
    method: 'get',
    params,
    skipOssCheck: true
  })
}
// 计算税金
export const calculateAmount = params => {
  return request({
    url: '/settle/invoice/calculate',
    method: 'get',
    params
  })
}
// 提交开票
export const createInvoice = data => {
  return request({
    url: '/settle/invoice/create',
    method: 'post',
    data
  })
}
// 获取开票详情
export const queryInvoiceDetail = params => {
  return request({
    url: '/settle/invoice/invoiceInfo',
    method: 'get',
    params,
    skipOssCheck: true
  })
}
// 开票详情 - 申请明细
export const queryInvoiceDetailApplyInfo = params => {
  return request({
    url: '/settle/issuedBill/invoiceCheckDetailPage?',
    method: 'get',
    params
  })
}

/**
 * 获取预开票信息
 */
export const queryPreInvoiceData = () => {
  return request({
    url: '/settle/invoice/prepareInfoWithoutBills',
    method: 'get'
  })
}
/**
 * 预开票保存
 */
export const createPreInvoiceInfo = data => {
  return request({
    url: '/settle/invoice/createWithoutBills',
    method: 'post',
    data
  })
}
/**
 * 判断是否可以进行预开票
 */
export const queryCanPreInvoice = () => {
  return request({
    url: '/settle/invoice/canCreateWithoutBills',
    method: 'get'
  })
}
/**
 * 获取负数账单数据
 */
export const queryNegativeInvoiceAmount = () => {
  return request({
    url: '/settle/issuedBill/negativeInvoiceAmount',
    method: 'get'
  })
}
