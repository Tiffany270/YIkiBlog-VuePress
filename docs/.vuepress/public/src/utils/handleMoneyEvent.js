/**
 * 处理金额输入款后面小数点限制两位
 * @param val
 * @returns {*}
 */
export function handleMoneyInputDecimal(val) {
  return val
    .replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
    .replace(/^\./g, '') // 验证第一个字符是数字
    .replace(/\.{2,}/g, '.') // 有连续多个.时只保留第一个, 清除多余的
    .replace('.', '$#$') // 把第一个.转化为$#$
    .replace(/\./g, '') // 把剩余的.全都干掉
    .replace('$#$', '.') // 把$#$变回.
    .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
}
