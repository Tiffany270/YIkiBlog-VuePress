import { FILE_ID_KEY } from '@/maps/constant'

function handler(string) {
  try {
    const url = new URL(string)
    const fileId = url.searchParams.get(FILE_ID_KEY)
    if (fileId) {
      return fileId // 能拿得到fileId就输出
    }
  } catch (e) {
    //
  }
  return string // 拿不到就原封不动输出
}

/**
 * 从构建好的临时资源URL中，取回fileId
 *
 * 如果能正常找到，就输出fileId，否则输出原始值
 *
 *
 * @return {string[]|string}
 * @param {string[]|string} stringListOrJustString 同时支持数组和字符串，其他情况下原封不动送出来
 */
export function getFileIdFromUrl(stringListOrJustString) {
  if (Array.isArray(stringListOrJustString)) {
    return stringListOrJustString.map(handler)
  } else if (typeof stringListOrJustString === 'string') {
    return handler(stringListOrJustString)
  } else {
    console.log('处理不来啊: ', stringListOrJustString)
    return stringListOrJustString
  }
}
