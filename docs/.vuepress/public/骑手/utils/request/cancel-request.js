import qs from 'qs'
import { transformParamsToObj } from '@/utils/util'
class CancelRequest {
  constructor() {
    this.pendingRequest = new Map()
  }
  // 根据请求信息生成唯一标识key
  geterateReqKey(config) {
    const { url, method } = config
    const params = config.params ? qs.stringify(config.params) + '&' : ''
    const data = config.data
      ? qs.stringify(this.formatConfigData(config)) + '&'
      : ''
    return url + '&' + method + '&' + params + data
  }
  // 检查是否是重复请求，如果是取消第二次
  checkoutPendingRequest(config, CancelToken) {
    // 为每个请求添加cancelToken,同时拿到source获取到对每个请求取消请求的能力（cancel方法）
    let source = null
    if (config.cancelToken) {
      source = config.source
    } else {
      source = CancelToken.source()
      config.cancelToken = source.token
    }
    const requestKey = this.geterateReqKey(config)
    // console.log('requestKey1', requestKey)
    // console.log('this.pendingRequest', this.pendingRequest)
    if (this.pendingRequest.has(requestKey)) {
      // 取消重复请求（第二次）
      source.cancel('double request：' + requestKey)
    } else {
      // 没重复就添加
      this.pendingRequest.set(requestKey, source)
    }
  }
  // 从请求列表中删除
  removeRequestKey(config) {
    // const tempConfig = config
    // tempConfig.data = this.formatConfigData(config)
    // 延迟一点是为了避免用户快速多次点击提交，而第一次请求成功立刻清除掉，第二次请求不会被取消
    setTimeout(() => {
      const requestKey = this.geterateReqKey(config)
      // console.log('requestKey2', requestKey)
      this.pendingRequest.delete(requestKey)
      // console.log('this.pendingRequest2', this.pendingRequest)
    }, 200)
  }
  // 处理不同类型的config.data转换为对象
  formatConfigData(config) {
    let data = {}
    // 处理请求参数为Formdata
    if (config.data && config.data instanceof FormData) {
      config.data.forEach((value, key) => {
        data[key] = value
      })
    } else if (typeof config.data === 'string') {
      // 处理'Content-Type': 'application/x-www-form-urlencoded'时，请求参数为拼接字符串，将拼接字符串参数转化为对象
      // 处理响应response.config.data返回为datda字符串时需要转换为对象
      data =
        config.data.indexOf('&') > -1
          ? transformParamsToObj(config.data)
          : JSON.parse(config.data)
    } else if (
      // 普通对象
      Object.prototype.toString.call(config.data) === '[object Object]' ||
      Object.prototype.toString.call(config.data) === '[object Array]'
    ) {
      data = config.data
    }
    return data
  }
}
export default new CancelRequest()
