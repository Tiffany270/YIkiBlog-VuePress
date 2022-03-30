import { OSS_FILE_IDENTIFIER } from '@/static/constant'
import { isArrayOrObject } from '@utils/util'
/**
 * 把请求返回的涉及oss文件的字段都找出来
 * @param {object} source 响应数据
 * @returns {{ key: string, fileId: string }[]}
 * @example [{fileId: "56101452521651676672002",key: "data.attachment.0.fileId"}]
 */
export const getResOssFileds = source => {
  const result = []
  const map = deepFirstSearch(source)
  for (const i in map) {
    if (Object.prototype.hasOwnProperty.call(map, i)) {
      if (map[i] && String(map[i]).indexOf(OSS_FILE_IDENTIFIER) > -1) {
        result.push({
          key: i,
          internalUrl: map[i]
        })
      }
    }
  }
  return result
}
/**
 * 深度优先搜索对象
 * @param {object} source 响应数据
 * @returns { object } 把所有字段扁平化
 * @example { code: 0, data.current:'1', data.records.0.clientName: "李xxx",...}
 */
function deepFirstSearch(source) {
  source = JSON.parse(JSON.stringify(source))
  const result = {}
  /**
   * @type {{value: any, path: string[]}[]}
   */
  const nodes = []
  nodes.push({ value: source, path: [] })
  while (nodes.length) {
    const node = nodes.pop()
    if (isArrayOrObject(node.value)) {
      // 确保可迭代
      for (const i in node.value) {
        if (Object.prototype.hasOwnProperty.call(node.value, i)) {
          const item = node.value[i]
          if (isArrayOrObject(item)) {
            const tempNode = {
              value: item,
              path: [...node.path, i]
            }
            nodes.push(tempNode)
          } else {
            // 基础类型
            const path = [...node.path, i].join('.')
            result[path] = item
          }
        }
      }
    }
  }
  return result
}
