import { UPLOAD_FILE_KEY } from '@/maps/constant'
import { getExtNameFromUrl } from './get-ext-name-from-url'

/**
 * 获取上传的名字（从handleDownload.js中移出来）
 *
 * 注：原来是在uploadFile.js文件里的，因为要引入获取后缀名的方法，所以可能会造成：
 * downloadFileFromUrl[handleDownload.js] -> getUploadFileName[uploadFile.js] -> getExtNameFromUrl[handleDownload.js]
 * 的循环引用，所以挪过来了。
 * @param url
 * @returns {string}
 *
 */
export function getUploadFileName(url) {
  try {
    url = new URL(url)
    if (url.searchParams.has(UPLOAD_FILE_KEY)) {
      const filename = url.searchParams.get(UPLOAD_FILE_KEY)
      if (filename) {
        // 判断是否有后缀名，没有就拼一个，要是再没有就没办法了
        if (!~filename.indexOf('.')) {
          return filename + getExtNameFromUrl(url)
        } else {
          return filename
        }
      } else {
        return ''
      }
    } else {
      const urlArray = decodeURI(url.pathname).split('/')
      return urlArray[urlArray.length - 1]
    }
  } catch (e) {
    console.error('不是合法的URL: ' + url)
    return ''
  }
}
