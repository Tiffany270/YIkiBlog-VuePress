import { findOssTempAccessUrl } from '@/api/oss'
/**
 *
 * @param { {internalUrl:string}[] } fieldList 从响应中找出的oss相关字段组合成的列表
 * @returns { Promise<{internalUrl:string, url: string}[]> }
 */

export function getUrlByInternalUrl(list) {
  if (list.length) {
    return new Promise(resolve => {
      findOssTempAccessUrl({
        internalUrls: list.map(item => item.internalUrl)
      }).then(({ data: filesObj }) => {
        list.forEach(item => {
          if (filesObj[item.internalUrl]) {
            item.url = filesObj[item.internalUrl].url
          }
        })
        resolve(list)
      })
    })
  }
}
