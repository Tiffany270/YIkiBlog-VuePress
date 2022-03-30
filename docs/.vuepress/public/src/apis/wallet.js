import request from '@/utils/request'
import { downloadBlobFile } from '@/utils/download-blob-file'
import md5 from 'md5'

/**
 * 服务商B端: 钱包流水(B端)分页查询
 * @param params
 * @return {AxiosPromise}
 */
export function getWalletFlowPage(params) {
  return request({
    url: '/finance/walletFlow/page',
    params
  })
}

/**
 * 服务商B端: 导出钱包流水
 * @param data
 * @return {AxiosPromise}
 */
export function downloadWalletFlow(data) {
  return request({
    url: '/finance/walletFlow/download',
    method: 'post',
    responseType: 'arraybuffer',
    data
  }).then(response => {
    downloadBlobFile(response)
  })
}

/* -- 提现相关 -- */
/**
 * 服务商B端: 提现记录表新增
 * @param data
 * @return {AxiosPromise}
 */
export function createNewWithdraw(data) {
  return request({
    url: '/finance/walletWithdraw/insert',
    method: 'post',
    data
  })
}
/**
 * 服务商B端: 提现获取验证码
 * @param data
 * @return {AxiosPromise}
 */
export function getWithdrawSmsCode(data) {
  return request({
    url: '/finance/walletWithdraw/getWithdraw2PubCode',
    method: 'post',
    data
  })
}

/**
 * 服务商B端: 确认提现-验证密码
 * @param data
 * @return {AxiosPromise}
 */
export function confirmPassword(data) {
  data = { ...data, password: md5(data.password) }

  return request({
    url: '/finance/walletWithdraw/confirmPassword',
    method: 'post',
    data
  })
}

/**
 * 服务商B端：提现进度查询(不分页)
 * @param params
 * @return {AxiosPromise}
 */
export function getWithdrawProgress(params) {
  return request({
    url: '/finance/walletWithdraw/progress/bar',
    params
  })
}

/* -- 子钱包列表 -- */
/**
 * 服务商B端: 子钱包列表
 * @return {AxiosPromise}
 */
export function getSubWalletList() {
  return request({
    url: '/finance/subWallet/sub/list'
  })
}

/**
 * 服务商B端: 获取钱包可提现余额
 * @param params
 * @return {AxiosPromise}
 */
export function getSubWalletBalanceView(params) {
  return request({
    url: '/finance/subWallet/subWalletBalanceView',
    params
  })
}

/**
 * 服务商B端: 交易类型查询
 * @param params
 * @return {AxiosPromise}
 */
export function walletCustomTypeList(params) {
  return request({
    url: '/finance/walletCustomType/findList',
    params
  })
}
