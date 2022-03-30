import { getOssTempAccessUrl } from '@/apis/oss'
/**
 * 根据fileId或者url
 * @param fileIds [] [111,2222]
 * @returns [] [xxx.jpg,yyy.jpg....]
 */
export const getOssFileListByIds = (fileIds, cb) => {
  const promise = fileIds.map(async item => {
    const res = await getOssTempAccessUrl([item])
    return res[0]
  })
  Promise.all(promise).then(res => {
    cb(res)
  })
}
