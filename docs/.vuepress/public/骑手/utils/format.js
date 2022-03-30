/**
 * 格式化请求数据
 * @param {Object} data
 * @returns
 */
export const transRequestData = data => {
  const formData = new FormData()
  try {
    for (const i in data) {
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        if (Array.isArray(data[i])) {
          data[i].forEach(item => {
            formData.append(i, item)
          })
        } else {
          formData.append(i, data[i])
        }
      }
    }
  } catch (e) {
    console.warn('请传入键值对格式的对象')
  }
  return formData
}
