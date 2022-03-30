import request from '@/utils/request'
/** ------------- 结算函 ------------- */
/**
 * 【结算函】
 * 结算函分页查询-主列表
 * @param {*} params
 * @returns
 */
export const findLetter = params => {
  return request({
    url: '/settle/letter/page',
    method: 'get',
    params
  })
}
// 结算函（主列表）-导出数据（未勾选）
export const exportClientLetter = params => {
  return request({
    url: '/settle/letter/export',
    method: 'post',
    params,
    responseType: 'arraybuffer'
  })
}
// 结算函（主列表）-导出数据（复选框勾选）
export const exportClientLetterSelected = params => {
  return request({
    url: '/settle/letter/export',
    method: 'post',
    params,
    responseType: 'arraybuffer'
  })
}
