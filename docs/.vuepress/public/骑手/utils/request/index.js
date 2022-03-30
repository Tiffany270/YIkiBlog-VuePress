import axios from 'axios'
import cancelRequest from './cancel-request.js'
import qs from 'qs'
import { getToken, removeToken } from '@utils/auth'
import { Message, MessageBox } from 'element-ui'
import { RESPONSE_CODE } from '@/static/constant'
// import {
//   getResOssFileds,
//   getTempUrlFromOssFiled,
//   setResOssFiledToUrl
// } from './oss-handler/index'

const instance = axios.create({
  baseURL: '',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  // 跨域请求时是否需要使用凭证
  withCredentials: false,
  // 对params参数进行序列化处理,如：ids: [1, 2, 3] => ids=1&ids=2&id=3
  paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 检查之前是否存在相同的请求，如果存在则取消。不存在就记录
    cancelRequest.checkoutPendingRequest(config, axios.CancelToken)
    // 获取token并让所有请求在请求头携带
    if (getToken() && config.url !== '/accounts-admin/voucher/health') {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  err => {
    Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  async response => {
    // 移除成功请求记录
    cancelRequest.removeRequestKey(response.config)
    const res = response.data
    if (res.code || res.code === 0) {
      // 处理成功
      if (res.code === RESPONSE_CODE.SUCCESS) {
        // 需要时弹框提示
        if (res.message && response.config.showMessage) {
          Message({
            message: res.message,
            type: 'success',
            duration: 3 * 1000
          })
        }
        // 有oss附件时用url替换id
        // if (!response.config.skipOssCheck) {
        //   try {
        //     // 找到相关oss字段
        //     const fieldList = getResOssFileds(res)
        //     if (fieldList.length) {
        //       // 把相关字段值替换为url
        //       const tempUrlList = await getTempUrlFromOssFiled(fieldList)
        //       // 获取的url和相关字段比对，把url设置给对应字段
        //       setResOssFiledToUrl(res, fieldList, tempUrlList)
        //     }
        //   } catch (error) {
        //     console.log('资源替换不成功:' + error)
        //   }
        // }
      } else {
        // 处理异常
        if (res.message) {
          Message({
            message: res.message,
            type: 'error',
            duration: 3 * 1000
          })
        }
      }
      return res
    }
    // 下载流文件时直接返回response 或者没有code返回时
    return response
  },
  error => {
    if (error.response && error.response.status) {
      // 失败时也移除记录
      cancelRequest.removeRequestKey(error.config)
      switch (error.response.status) {
        case 401:
          // 多个接口401只提示一次
          if (!getToken()) {
            return
          }
          removeToken()
          MessageBox({
            title: '提示',
            message: '登录已过期，请重新登录',
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false
          }).then(() => {
            // 跳登录时候最好用这种方式reload一下，避免通过路由跳转一些状态没有初始化
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

export default instance
