// OSS标识符
import { isArrayOrObject } from './misc'
import { OSS_FILE_ID_IDENTIFIER } from '@/maps/constant'

/**
 * 深度优先搜索对象
 * @param source
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

/**
 * 把oss相关的字段都找出来
 * @param source
 * @return {{ key: string, fileId: string }[]}
 * @example [{ key: 'a.b.c', 'fs://xxx' }]
 */
export function findOssValues(source) {
  const result = []
  const map = deepFirstSearch(source)
  for (const i in map) {
    if (Object.prototype.hasOwnProperty.call(map, i)) {
      if (OSS_FILE_ID_IDENTIFIER.test(map[i])) {
        result.push({
          key: i,
          fileId: map[i]
        })
      }
    }
  }
  return result
}
