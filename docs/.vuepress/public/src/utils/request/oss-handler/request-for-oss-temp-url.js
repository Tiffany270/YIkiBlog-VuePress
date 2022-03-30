import { getOssTempAccessUrl } from '@/apis/oss'

/**
 *
 * @param {{key: string, fileId: string}[]} fieldList 找寻出来的原始字段匹配列表
 * @returns {Promise<string[]>}
 */
export async function requestForOssTempUrl(fieldList) {
  const fileIds = fieldList.map(item => item.fileId)
  return await getOssTempAccessUrl(fileIds)
}
