import { buildRenewableTempUrl } from '@/utils/oss-uploader/utilities/build-renewable-temp-url'
import request from '@/utils/request'
import { FILE_ID_KEY } from '@/maps/constant'
import { isOSSFileTypeEnumOrFail } from '@/maps/enums/OSSFileType'

/**
 * @description
 * 请求获取临时链接(数组)
 *
 * 超时的时候，可以把fileId传进来，再次申请新的临时链接
 *
 * 注：传入临时链接时，一定要带上"fileId"字段，否则会当成是老的链接
 *
 * @param {string[]} fileIdsOrUrlList 传入 文件id 或者 构建好的临时链接（用于重新申请）
 * @returns {Promise<string[]>} 类似 ['https://static.xinshuiguanjia.com/resource/xxxxxx.jpg?filename=XX.jpg&fileId=123321123321']
 */
export async function getOssTempAccessUrl(fileIdsOrUrlList) {
  const fileIds = []
  /**
   * 记录一下每个要匹配的id - index对
   */
  const urlList = fileIdsOrUrlList.map(urlOrId => {
    try {
      // 假如传入的是临时地址
      const url = new URL(urlOrId)
      const fileId = url.searchParams.get(FILE_ID_KEY)
      if (fileId) {
        fileIds.push(fileId)
        return fileId
      } else {
        // 万一真的没有，还是原封不动放出去好一点
        return urlOrId
      }
    } catch (e) {
      // 默认都是文件id
      fileIds.push(urlOrId)
      return urlOrId
    }
  })

  if (fileIds.length) {
    // 当有fileId时，发起请求
    const { data: error } = await request({
      url: '/base/file/buildAccessUrl/fileIds',
      method: 'post',
      data: { fileIds },
      skipOssCheck: true
    })
    return urlList.map(urlOrId => {
      const data = error[urlOrId]
      if (error[urlOrId]) {
        return buildRenewableTempUrl(data.url, data.originalName, data.fileId)
      } else {
        return urlOrId
      }
    })
  } else {
    // 没有的话原封不懂输出
    return urlList
  }
}

/**
 * 获取Oss的单次上传配置
 * @param data
 * @param {OSSFileTypeEnum|string} data.fileType OSS文件类型 - 对应enums/OSSFileType.js里的枚举
 * @param {string} data.fileName 文件名字
 * @param {string} [data.suffix] 文件后缀名，可以主动修改文件后缀名
 * @param {number} [data.projectId] 项目ID，区分用旧桶还是新桶 - 在安薪宝好像没啥用
 */
export function getOssAccessAuthInfo(data) {
  // 参数校验
  isOSSFileTypeEnumOrFail(data.fileType)

  return request({
    url: '/base/file/generatePolicy',
    method: 'post',
    data,
    skipOssCheck: true
  })
}

/**
 * 根据fileIds 请求oss的文件地址
 * @param data
 * @param [string]，fileId
 */
export async function getUrls(fileIds) {
  const { data } = await request({
    url: '/base/file/buildAccessUrl/fileIds',
    method: 'post',
    data: { fileIds },
    skipOssCheck: true
  })
  return data
}
