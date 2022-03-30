import { isArrayOrObject } from '@utils/util'
/**
 * 把响应相关oss字段值由id替换成url
 * @param {object} target 请求响应对象
 * @param { {key: string, fileId: string}[] } fieldList 找出来的oss相关字段
 * @param { string[] } urlList 获取到的oss相关字段的url列表
 */
export const setResOssFiledToUrl = (target, fieldList, urlList) => {
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
/**
 *替换单个字段url
 * @param {object} target 响应对象
 * @param { string } key 组合的key  eg：data.attachment.0.fileId
 * @param { string } value  对应字段获取到的url
 */
const setValue = (target, key, value) => {
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
