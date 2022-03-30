import request from '@/utils/request/index'
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_DYNAMIC_API
    : '/api'

export const changeUserStatusById = id => {
  return request({
    url: `${baseUrl}/contribution/delete/${id}`,
    method: 'post'
  })
}
