/**
 * 下载文件流
 * @param {{headers: {'content-disposition': string}, data: ArrayBuffer}} axiosResponse 文件流地址
 * @param [options]
 * @param {string} [options.fileName] 指定的文件名(不带后缀名！)
 * @param {string} [options.mimeType] 当文件流地址上不包含后缀名时，可以指定一种文件类型进行下载（fallback作用）
 */
export const downloadBlobFile = (axiosResponse, options = {}) => {
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
