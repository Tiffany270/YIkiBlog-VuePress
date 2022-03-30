import { isArrayOrObject } from './misc'

/**
 * 设置值（单条） - 会改变到原始值
 * @param {object|Array} target
 * @param {string} key 'a.b.c.d'形式的键
 * @param {any} value
 */
function setValue(target, key, value) {
  // 记录一下
  const rawTarget = JSON.stringify(target)
  // 数据校验
  if (typeof key !== 'string' || !key) {
    throw new TypeError(`传入的key: ${key} 不符合数据类型`)
  }
  if (!isArrayOrObject(target)) {
    throw new TypeError(`传入的target: ${rawTarget} 不符合数据类型`)
  }

  const dep = key.split('.')
  while (dep.length > 1) {
    const name = dep.shift()
    target = target[name]
    if (!isArrayOrObject(target)) {
      throw new Error(`${rawTarget}中，不包含对应键"${key}"`)
    }
  }
  target[dep[0]] = value
}

/**
 * 把接口替换成oss对应的临时地址
 * @param {object|Array} target 目标响应对象
 * @param {{key: string, fileId: string}[]} fieldList 找寻出来的原始字段匹配列表
 * @param {string[]} urlList 从后端查回来的url列表
 */
export function setOssValue(target, fieldList, urlList) {
  // 数据校验
  if (!Array.isArray(fieldList)) throw new TypeError('传入的fieldList不为数组')
  if (!Array.isArray(urlList)) throw new TypeError('传入的urlList不为数组')
  if (urlList.length !== fieldList.length) {
    throw new RangeError('fieldList和urlList的长度不匹配')
  }

  const len = urlList.length
  for (let i = 0; i < len; i++) {
    setValue(target, fieldList[i].key, urlList[i])
  }
}
