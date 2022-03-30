/**
 * 判断是否为对象或者数组
 * @param {any} val 任意数据类型
 * @returns { boolean }
 */
export const isArrayOrObject = val => {
  return (
    Object.prototype.toString.call(val) === '[object Object]' ||
    Array.isArray(val)
  )
}
/**
 * 按照千分位显示金额
 * @param {string | number} value 传入金额
 * @returns { string } 格式化后按千分位显示的金额
 */
export const moneyConvert = value => {
  // string 百分比和分数，保证精度
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
/**
 * 节流函数
 * @param {Function} func 执行函数
 * @param {number} delay 控制时间,毫秒
 * @returns
 */
export const throttle = (func, delay) => {
  let timer = null
  // eslint-disable-next-line prettier/prettier
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments)
        // 或者直接 func()
        timer = null
      }, delay)
    }
  }
}
/**
 * 防抖
 * @param {Function} fn 执行函数
 * @param {number} wait 防抖时间,毫秒
 */
export const debounce = (fn, wait) => {
  let timeout = null
  // eslint-disable-next-line prettier/prettier
  return function() {
    if (timeout !== null) clearTimeout(timeout) // 如果多次触发将上次记录延迟清除掉
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
      // 或者直接 fn()
      timeout = null
    }, wait)
  }
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
/** 时间转换
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
      return (
        [year, month, day].map(formatNumber).join(type) +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
      )
    case 'yyyymmddhhmm':
      return (
        [year, month, day].map(formatNumber).join(type) +
        ' ' +
        [hour, minute].map(formatNumber).join(':')
      )
    case 'hhmmss':
      return [hour, minute, second].map(formatNumber).join(':')
    case 'hhmm':
      return [hour, minute].map(formatNumber).join(':')
    case 'hh':
      return [hour].map(formatNumber)
    case 'mi':
      return [minute].map(formatNumber)
    default:
      return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
      )
  }
}
/**
 * 将url参数转化为对象
 * @param {string} url  传入url参数字符串
 * @returns Object
 */
export const transformParamsToObj = url => {
  let obj = {}
  let arr = url.split('&')
  arr.map(item => {
    let tempArr = item.split('=')
    obj[tempArr[0]] = tempArr[1]
  })
  return obj
}
/**
 * 判断两个对象是否相同
 * @param {Object} obj1 对象1
 * @param {Object} obj2 对象2
 * @returns Boolean
 */
export const isEqualObj = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) {
    return false
  } else if (keysArr1.length === 0 && keysArr2.length === 0) {
    return true
  }
  return !keysArr1.some(key => obj1[key] !== obj2[key])
}
/**
 * 判断是否图片
 * @param url
 * @returns {Promise<any>}
 */
export const isImage = url => {
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

/**
 * 扁平化数组
 * @param {*} arr
 * @returns
 */
export const flattenArr = arr => {
  let result = []

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArr(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

/**
 * JavaScript 将数组中具有相同值的对象 取出组成新的数组
 * @param arr 数组  str某个相同属性
 * @returns new Array
 */

export const sortArr = (arr, str) => {
  let _arr = [],
    _t = [],
    _tmp
  // eslint-disable-next-line prettier/prettier
  arr = arr.sort(function(a, b) {
    let s = a[str],
      t = b[str]
    return s < t ? -1 : 1
  })

  if (arr.length) {
    _tmp = arr[0][str]
  }
  for (let i in arr) {
    if (arr[i][str] === _tmp) {
      _t.push(arr[i])
    } else {
      _tmp = arr[i][str]
      _arr.push(_t)
      _t = [arr[i]]
    }
  }
  _arr.push(_t)
  return _arr
}

/**
 * JavaScript  数组对象去重
 * @param arr 数组  attr哪个属性去重
 * @returns new Array
 */

export const deWeightArray = (arr, attr) => {
  let map = new Map()
  for (let item of arr) {
    if (!map.has(item[attr])) {
      map.set(item[attr], item)
    }
  }
  return [...map.values()]
}

/**
 * datepicker 组件设置禁用月份方法
 */
export const setDatePickerDisabledMonth = (time, settingDate) => {
  const date = new Date(settingDate) // 获取2021-01的时间基本信息，值是这样的： Tue Dec 01 2020 08:00:00 GMT+0800 (中国标准时间)
  const year = date.getFullYear() // 获取年份，值是这样的： 2021
  let month = date.getMonth() + 1 // 获取月份，值是这样的： 6   getMonth()方法返回值是0-11，也就是1月份到12月份，所以要加上1，才是当前月份
  if (month >= 1 && month <= 9) {
    // 如果是1月到9月就要在前面补上一个0   比如：02、07    月份这样表示
    month = '0' + month
  }
  const timeSetting = year.toString() + month.toString() // 转换成字符串拼接，最终得到年和月，比如此时的时间是2021年7月20号，所以nowDate的值是：202107

  // 获取时间选择器的月份信息
  const timeyear = time.getFullYear() // 获取时间选择器的年份（有很多）
  let timemonth = time.getMonth() + 1 // 与上面同理
  if (timemonth >= 1 && timemonth <= 9) {
    timemonth = '0' + timemonth
  }
  const elTimeData = timeyear.toString() + timemonth.toString()
  return elTimeData <= timeSetting
}
