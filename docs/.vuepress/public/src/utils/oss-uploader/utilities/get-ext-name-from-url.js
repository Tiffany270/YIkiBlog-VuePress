/**
 * 获取后缀名（从handleDownload.js中移出来）
 * @param link
 * @return {string}
 */
export function getExtNameFromUrl(link) {
  try {
    const url = new URL(link)
    const strArray = url.pathname.split('.')
    if (strArray.length >= 2) {
      // 判断是不是能切那么多，不然就当作没有后缀名
      return '.' + strArray[strArray.length - 1]
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}
