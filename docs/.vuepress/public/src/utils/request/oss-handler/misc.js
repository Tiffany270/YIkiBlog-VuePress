/**
 * 判断是否为数组或对象
 * @param {any} val
 * @return {boolean}
 */
export function isArrayOrObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]' || Array.isArray(val)
}
