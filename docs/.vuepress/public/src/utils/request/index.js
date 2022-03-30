import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import RespCode from '@/maps/respCode'
import { AxiosLockPool } from '@/utils/axiosLockPool'
import { decryptResponse, encryptRequest, handleHeader, isEncryptedData, isNeedToEncrypt } from './crypto'
import qs from 'qs'
import { findOssValues } from './oss-handler/find-oss-values'
import { requestForOssTempUrl } from './oss-handler/request-for-oss-temp-url'
import { setOssValue } from './oss-handler/set-oss-values'
export const lockPool = new AxiosLockPool(200) // 存入当前请求的url
const CancelToken = axios.CancelToken

let popupLock = false // 全局弹窗的锁
// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/api',
  timeout: 120000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  withCredentials: false,
  showMessage: true, // 默认展示反馈消息
  paramsSerializer(params) {
    // 全局使用paramSerializer
    return qs.stringify(params, { indices: false })
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    const source = CancelToken.source()
    config.cancelToken = source.token
    if (config.method !== 'get') {
      config.key = lockPool.add(config)
      if (!config.key) {
        if (config.method !== 'get') {
          Message.warning('数据正在处理，请勿重复提交')
        }
        source.cancel('重复请求: ' + config.url)
      }
    }

    if (getToken()) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // 判断接口是否需要加密
    if (isNeedToEncrypt(config)) {
      handleHeader(config)
      config.data = encryptRequest(config.data)
    }
    return config
  },
  error => {
    // Do something with request error
    console.error(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  async response => {
    lockPool.delete(response.config.key)
    let res = response.data
    // 判断接口是否需要解密
    if (isEncryptedData(res)) {
      res = decryptResponse(res)
    }
    // 失败 -status === 200 &&  code ！== 0
    if (res.code) {
      switch (res.code) {
        case RespCode.FORCED_LOGOUT:
        case RespCode.LOGIN_EXPIRED:
          if (!popupLock) {
            popupLock = true
            MessageBox({
              title: '提示',
              message: res.message,
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              closeOnHashChange: false
            }).then(() => {
              router.push({ name: 'Login' }).catch(() => {})
              removeToken()
            })
          }
          break
        default:
          // 除上述抛错以外，其他都当错误消息来抛出
          if (res.message && response.config.showMessage) {
            Message({
              message: res.message,
              type: 'error',
              duration: 3 * 1000
            })
          }
          throw res
      }
    } else if (res.code === RespCode.SUCCESS) {
      // 成功  status === 200 &&  code === 0
      if (res.message && response.config.showMessage) {
        Message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
      }
      // 查询替换oss相关的值
      if (!response.config.skipOssCheck) {
        try {
          const fieldList = findOssValues(res)
          if (fieldList.length) {
            // 当找到url时才进行处理
            const urlList = await requestForOssTempUrl(fieldList)
            setOssValue(res, fieldList, urlList)
          }
        } catch (e) {
          console.error('资源替换失效:', e)
        }
      }
      return res
    } else {
      return response
    }
  },
  error => {
    if (error.response && error.response.status) {
      lockPool.delete(error.config.key)
      switch (error.response.status) {
        case 401:
          // 第一个401弹框，后面的就不弹了
          if (!getToken()) {
            // 401 时候 没有token那就直接跳到登录页
            location.href = '/login'
            return
          }
          // 清空token
          removeToken()
          // 清空用户信息
          store.commit('GET_USER_INFO', {})
          MessageBox({
            title: '提示',
            message: error.response.data.message || '登录已过期，请重新登录',
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false
          }).then(() => {
            // router.push({ name: 'Login' }).catch(() => {})
            location.href = '/login'
          })
          break
        case 500:
          Message({
            message: error.response.data.message,
            type: 'error',
            duration: 3 * 1000
          })
          break
      }
    } else {
      if (!navigator.onLine) {
        Message({
          message: '网络异常请检查',
          type: 'error',
          duration: 3 * 1000
        })
      }
    }
    return Promise.reject(error)
  }
)

export default service
