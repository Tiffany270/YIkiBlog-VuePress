/**
 * 校验传入值是否合法
 * @param value
 */
export const isValidValue = value => {
  if (typeof value === 'boolean') {
    return true
  } else if (typeof value === 'number' && !Number.isNaN(value)) {
    return true
  } else if (typeof value === 'string' && value) {
    return true
  } else return !!value
}
/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}
/*
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, format, type) => {
  const d = new Date(timeStamp || 0)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const day = getHandledValue(d.getDate())
  const hour = getHandledValue(d.getHours())
  const minute = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  if (!type) {
    type = '/'
  }
  switch (format) {
    case 'yyyymmdd':
      return [year, month, day].map(formatNumber).join(type)
    case 'yyyymm':
      return [year, month].map(formatNumber).join(type)
    case 'mmdd':
      return [month, day].map(formatNumber).join(type)
    case 'yyyy':
      return year
    case 'mm':
      return [month].map(formatNumber)
    case 'dd':
      return [day].map(formatNumber)
    case 'yyyymmddhhmmss':
      return [year, month, day].map(formatNumber).join(type) + ' ' + [hour, minute, second].map(formatNumber).join(':')
    case 'yyyymmddhhmm':
      return [year, month, day].map(formatNumber).join(type) + ' ' + [hour, minute].map(formatNumber).join(':')
    case 'hhmmss':
      return [hour, minute, second].map(formatNumber).join(':')
    case 'hhmm':
      return [hour, minute].map(formatNumber).join(':')
    case 'hh':
      return [hour].map(formatNumber)
    case 'mi':
      return [minute].map(formatNumber)
    default:
      return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}
export function toThousands(value, keep) {
  if (keep) {
    return value
  }
  if (typeof value === 'string') {
    const flag = value.includes('%') || value.includes('/')
    if (flag) {
      return value
    }
    value = parseFloat(value)
  }
  if (!value) {
    return '0.00'
  }
  return value.toLocaleString('zh', { minimumFractionDigits: 2 })
}
export function formatMoney(value) {
  if (Number.isNaN(parseFloat(value))) {
    return '0.00'
  } else {
    const num = parseFloat(value).toFixed(2)
    const re = /(\d{1,3})(?=(\d{3})+(?:\.))/g
    return num.replace(re, '$1,')
  }
}
/**
 * 判断是否图片
 * @param url
 * @returns {Promise<any>}
 */
export function isImage(url) {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('error', () => {
      resolve(false)
    })
    image.addEventListener('load', () => {
      resolve(true)
    })
    image.src = url
  })
}

/** 防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  // eslint-disable-next-line prettier/prettier
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  // eslint-disable-next-line prettier/prettier
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
