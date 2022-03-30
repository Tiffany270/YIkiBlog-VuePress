import { getExtNameFromUrl } from './get-ext-name-from-url'
import { UPLOAD_FILE_KEY } from '@/static/constant'
/**
 * 根据构建后的oss文件url获取文件名
 * @param {string} url 构建后的文件地址
 * @returns {string} 文件名
 */
export const getUploadFileName = url => {
  try {
    url = new URL(url)
    if (url.searchParams.has(UPLOAD_FILE_KEY)) {
      const filename = url.searchParams.get(UPLOAD_FILE_KEY)
      if (filename) {
        // 判断是否有后缀名，没有就拼一个，要是再没有就没办法了
        if (!~filename.indexOf('.')) {
          return filename + getExtNameFromUrl(url)
        }
        return filename
      }
      return ''
    }
    const urlArray = decodeURI(url.pathname).split('/')
    return urlArray[urlArray.length - 1]
  } catch (e) {
    console.error('不是合法的URL: ' + url)
    return ''
  }
}
