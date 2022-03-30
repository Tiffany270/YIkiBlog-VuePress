import { FILE_INTERNAL_URL_KEY, OSS_FILE_IDENTIFIER } from '@/static/constant'
import { findOssTempAccessUrl } from '@/api/oss'
import { buildRenewableTempUrl } from '../index'
/**
 * 根据internalUrl或者超时url获取最新的url
 * @param {string[]} internalUrlsOrTempUrlList internalUrl列表或者构建好的临时url
 * @returns {string[]}  返回最新的临时url eg：['https://static.xinshuiguanjia.com/resource/xxxxxx.jpg?filename=XX.jpg&internalUrl="xbfs://xb-accounts-ticket/14666853502780375060.pdf"']
 */
export const getOssTempAccessUrl = async internalUrlsOrTempUrlList => {
  const internalUrls = []
  // 记录下每个id（没有id记录url）位置，用于请求返回数据的匹配
  const fileList = internalUrlsOrTempUrlList.map(tempUrlOrInterUrl => {
    try {
      // 传入的时临时url
      const url = new URL(tempUrlOrInterUrl) // 如果传入的不是url会抛异常
      const internalUrl = url.searchParams.get(FILE_INTERNAL_URL_KEY)
      if (internalUrl) {
        internalUrls.push(internalUrl)
        return internalUrl
      }
      // 如果传入的是internalUrl，直接返回internalUrl
      if (tempUrlOrInterUrl.indexOf(OSS_FILE_IDENTIFIER) > -1) {
        internalUrls.push(tempUrlOrInterUrl)
      }
      // 如果传入的url没有internalUrl,直接返回url
      return tempUrlOrInterUrl
    } catch (error) {
      console.log('error')
    }
  })
  if (internalUrls.length) {
    // 发起请求，获取url
    const { data: result } = await findOssTempAccessUrl({
      internalUrls,
      showDetailTip: true
    })
    return fileList.map(tempUrlOrInterUrl => {
      // id匹配上了就返回对应的url
      if (result[tempUrlOrInterUrl]) {
        return buildRenewableTempUrl(
          result[tempUrlOrInterUrl].url,
          result[tempUrlOrInterUrl].originalName,
          result[tempUrlOrInterUrl].internalUrl
        )
      }
      // 没匹配上的就返回原始数据
      return tempUrlOrInterUrl
    })
  }
  // 如果没有fileId就原样返回
  return fileList
}
