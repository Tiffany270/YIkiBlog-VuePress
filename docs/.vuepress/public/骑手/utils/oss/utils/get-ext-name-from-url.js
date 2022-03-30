/**
 * 获取oss文件扩展名
 * @param {string} link 文件链接
 * @returns {string}
 */
export const getExtNameFromUrl = link => {
  try {
    const url = new URL(link)
    const strArray = url.pathname.split('.')
    if (strArray.length >= 2) {
      // 判断是不是能切那么多，不然就当作没有后缀名
      return '.' + strArray[strArray.length - 1]
    }
    return ''
  } catch (e) {
    return ''
  }
}
