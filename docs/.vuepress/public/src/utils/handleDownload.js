import JSZip from 'jszip'

/**
 * 压缩包形式下载
 * @param {{name: string, url: string}[]} source      下载配置
 * @param {string}    source[].name                   下载文件的文件名
 * @param {string}    source[].url                    下载文件的链接
 * @param {string}    fileName                        压缩包名字
 */
export async function downloadZIP(source, fileName) {
  const zip = new JSZip()
  try {
    handleFileName(source) // 处理同名文件
    const result = await Promise.all(source.map(item => downloadFileStream(item.url)))
    result.forEach((blob, index) => {
      // 获取后缀名
      let fileUrlPath
      try {
        fileUrlPath = new URL(source[index].url).pathname
      } catch (e) {
        throw new Error(`第${index}条，无法正常解析URL: ${source[index].url}`)
      }
      const fileNameExtension = fileUrlPath.substring(fileUrlPath.lastIndexOf('.'))
      // 压缩文件
      zip.file(source[index].name + fileNameExtension, blob)
    })
  } catch (e) {
    throw e.toString()
  }
  // 生成zip文件
  const content = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.style.display = 'none'
  a.setAttribute('download', fileName)
  a.href = URL.createObjectURL(content)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * 获取文件流
 * @param url
 * @return {}
 */
function downloadFileStream(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(xhr.response)
      } else {
        reject(`文件${url}导出错误[HttpStatus:${xhr.status}]`)
      }
    }
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}

/**
 * 处理文件名，防止重名
 * @param {{name: string, url: string}[]} source
 * @param {string} source[].name  文件名
 * @param {string} source[].url  下载文件的链接
 * @return {{name: string, url: string}[]}
 */
function handleFileName(source) {
  const map = {}
  for (const item of source) {
    if (map[item.name]) {
      const oldName = item.name
      item.name = `${oldName} (${map[item.name]})`
      map[oldName]++
    } else {
      map[item.name] = 1
    }
  }
}

/**
 * 直接下载URL
 * @param {string}    url           下载的地址
 * @param {string}    [filename]    自定义文件名
 */
export function downloadFileFromUrl(url, filename) {
  const xhr = new XMLHttpRequest()
  xhr.open('get', url)
  xhr.responseType = 'blob'
  xhr.send()
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 304) {
      const objUrl = URL.createObjectURL(xhr.response)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = objUrl
      if (filename) {
        a.setAttribute('download', filename)
      } else {
        a.setAttribute('download', getExtNameFromUrl(url))
      }
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}

/**
 * 获取后缀名
 * @param link
 * @return {string}
 */
function getExtNameFromUrl(link) {
  try {
    const url = new URL(link)
    const strArray = url.pathname.split('.')
    return '.' + strArray[strArray.length - 1]
  } catch (e) {
    return ''
  }
}
/**
 * 下载文件流
 * @param {{headers: {'content-disposition': string}, data: ArrayBuffer}} axiosResponse 文件流地址
 * @param [options]
 * @param {string} [options.fileName] 指定的文件名(不带后缀名！)
 * @param {string} [options.mimeType] 当文件流地址上不包含后缀名时，可以指定一种文件类型进行下载（fallback作用）
 */
export function downloadBlobFile(axiosResponse, options = {}) {
  // 参数处理
  const contentDisposition = axiosResponse.headers['content-disposition']
  let fileName = ''
  let blobOptions = null
  if (options.fileName && typeof options.fileName === 'string') {
    // 自定义文件名
    let suffix = ''
    if (contentDisposition) {
      const arr = contentDisposition.split('.')
      if (arr.length >= 2) {
        suffix = '.' + arr[arr.length - 1]
      }
    }
    fileName = options.fileName + suffix
  } else if (contentDisposition) {
    const matcher = contentDisposition.match(/filename=.*/)
    if (matcher) {
      fileName = decodeURIComponent(matcher[0]).slice(9)
    }
  }
  // 自定义MIME
  if (options.mimeType && typeof options.mimeType === 'string') {
    blobOptions = {
      type: options.mimeType
    }
  }

  // 生成Blob地址
  const blob = new Blob([axiosResponse.data], blobOptions)

  // 下载Blob
  const link = document.createElement('a')
  link.style.display = 'none'
  const objUrl = window.URL.createObjectURL(blob)
  link.href = objUrl
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => {
    window.URL.revokeObjectURL(objUrl)
  }, 5000)
}
