import { FILE_ID_KEY } from '@/static/constant'
const handler = string => {
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
 * 根据临时oss文件地址获取文件id
 * @param {string[] | string} stringListOrJustString  文件链接
 * @returns {string} 文件id - fileId
 */
export const getFileIdFromUrl = stringListOrJustString => {
  if (Array.isArray(stringListOrJustString)) {
    return stringListOrJustString.map(handler)
  } else if (typeof stringListOrJustString === 'string') {
    return handler(stringListOrJustString)
  }
  return stringListOrJustString
}
