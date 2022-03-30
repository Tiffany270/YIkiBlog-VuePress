import request from '@/utils/request'

// 结算帐单列表
export const settlementBillToBListPage = params => {
  return request({
    url: '/settle/issuedBill/settlementBillToBListPage',
    method: 'get',
    params
  })
}

// 列表全量下载
export const settlementBillToBDownloadAll = data => {
  return request({
    url: '/settle/issuedBill/settlementBillToBDownloadAll',
    method: 'post',
    responseType: 'arraybuffer',
    data
  })
}

// 列表批量下载
export const settlementBillToBDownload = data => {
  return request({
    url: '/settle/issuedBill/settlementBillToBDownload',
    method: 'post',
    responseType: 'arraybuffer',
    data
  })
}

// 详情结算帐单列表
export const settlementBillDetailListPage = (id, params) => {
  return request({
    url: `/settle/billDetail/settlementBillDetailListPage/${id}`,
    method: 'get',
    params
  })
}

// 详情列表下载
export const settlementBillDetailToBDownload = data => {
  return request({
    url: '/settle/billDetail/settlementBillDetailToBDownload',
    method: 'post',
    responseType: 'arraybuffer',
    data
  })
}
// 结款
export const postPayBill = data => {
  return request({
    url: '/settle/issuedBill/pay',
    method: 'post',
    data
  })
}

export const verifyMsg = () => {
  return request({
    url: '/settle/issuedBill/verifyMsg'
  })
}
