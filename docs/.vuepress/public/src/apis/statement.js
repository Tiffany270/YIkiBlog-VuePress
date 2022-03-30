import request from '@/utils/request'
/** ------------- 结算对账单 ------------- */

/**
 * 结算对账单-列表
 * @param {*} params
 * @returns
 */
export const findListClientPlatform = params => {
  return request({
    url: '/settle/settleStatement/listClientPlatform',
    method: 'get',
    params
  })
}
/**
 * 结算对账单-统计
 * @param {*} params
 * @returns
 */
export const queryStatisticsListClientPlatform = params => {
  return request({
    url: '/settle/settleStatement/statisticsClientPlatform',
    method: 'get',
    params
  })
}
/**
 * 结算对账单-导出数据（未勾选）
 * @param ids
 * @return {AxiosPromise}
 */
export const exportClientPlatformExport = data => {
  return request({
    url: '/settle/settleStatement/listClientPlatformExport',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
/**
 * 结算对账单-导出数据（复选框勾选）
 * @param ids
 * @return {AxiosPromise}
 */
export function exportClientPlatformSelected(data) {
  return request({
    url: '/settle/settleStatement/listClientPlatformExport',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

/** ------------- 结算对账单-详情 ------------- */
/**
 * 结算对账单-详情列表
 * @param params
 * @return {AxiosPromise}
 */
export const findSettleBillStatisticsDetailPage = params => {
  return request({
    url: '/payroll/orderFlow/findSettleBillStatisticsDetailPage',
    method: 'get',
    params
  })
}

/**
 * 结算对账单-详情-导出数据（未勾选）
 * @param ids
 * @return {AxiosPromise}
 */
export const downLoadSettleBillStatisticsDetail = data => {
  return request({
    url: '/payroll/orderFlow/settleBillStatisticsDetailDownload',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
/**
 * 结算对账单-详情-导出数据（未勾选）
 * @param ids
 * @return {AxiosPromise}
 */
export const downloadSettleBillStatisticsDetailSelected = data => {
  return request({
    url: '/payroll/orderFlow/settleBillStatisticsDetailDownload',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
