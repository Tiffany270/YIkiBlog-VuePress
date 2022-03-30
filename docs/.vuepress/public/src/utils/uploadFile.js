import store from '@/store'
import { Message } from 'element-ui'
import md5 from 'md5'

export const KEY = 'filename'

/**
 *
 * 分片上传，查看文档
 * https://help.aliyun.com/document_detail/111268.html?spm=a2c4g.11186623.2.10.581169fbotYMFC#concept-hgg-3vb-dhb
 * @param file
 * @param fileName
 * @param {object}options
 * @returns {Promise<any>}
 */
export function uploadFile(file, fileName, options) {
  return new Promise((resolve, reject) => {
    let md5ifyName = ''
    try {
      // 生成md5之后的名字
      md5ifyName = generateFilename(fileName).output
    } catch (e) {
      reject(e)
    }

    if (file.size <= 100 * 1024 * 1024) {
      store.getters.client
        .put(md5ifyName, file)
        .then(res => {
          resolve(appendFileNameSearchParam(res.url, fileName))
        })
        .catch(err => {
          reject(err)
        })
    } else {
      // 大于100M的需要分片上传
      store.getters.client
        .multipartUpload(md5ifyName, file, options)
        .then(response => {
          const urls = response.res.requestUrls
          const rawUrl = urls[0]

          resolve(appendFileNameSearchParam(rawUrl.split('?')[0], fileName))
        })
        .catch(err => {
          Message.error('上传失败，请重新再试')
          console.error('分片', err)
          reject(err)
        })
    }
  })
}

/**
 * 生成文件名
 * @param url 上传的地址
 * @param fileName 目标文件名
 * @returns {string}
 */
function appendFileNameSearchParam(url, fileName) {
  // url = new URL(url)
  // url.searchParams.set(KEY, fileName)
  return url + `?${KEY}=${fileName}`
}

/**
 * 生成文件名
 * @param filename
 * @param specific
 * @returns {String|Ident|string}
 */
const generateFilename = filename => {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos !== -1) {
    suffix = filename.substring(pos)
  }

  let output = ''
  let timestamp = new Date().getTime()
  timestamp += Math.random().toString(36).substr(2, 6)
  timestamp += suffix
  output = md5(timestamp).substr(0, 20)
  if (suffix) {
    output += suffix
  }
  return {
    output,
    suffix
  }
}
