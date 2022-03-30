import { getOssTempAccessUrl } from '@utils/oss'
/**
 *
 * @param { {filed:string, key?:string}[] } fieldList 从响应中找出的oss相关字段组合成的列表
 * @returns { Promise<string[]> }
 * @example ['https://anxinbao-bucket-stage.oss-cn-shenzhen.aliy…5143120634.pdf.pdf&internalUrl=xbfs://xb-accounts-ticket/14666853502780375060.pdf']
 */
export const getTempUrlFromOssFiled = async fieldList => {
  const internalUrls = fieldList.map(item => item.internalUrl)
  return await getOssTempAccessUrl(internalUrls)
}
