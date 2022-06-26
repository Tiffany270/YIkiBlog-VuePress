## vue源码 diff算法
- 关于这个麻麻👩我头好痛
- 但是要找到差异最小dom部分去更新嗷
- vue 只会比较vnode，不会比较dom
- 并且diff只作用于 **同级+同一个父节点** 才会比较，不是则pass
- 双端比较
## sameVnode
- diff前提就是比较两个节点是不是相等
``` js
function sameVnode (a, b) {
  return (
    a.key === b.key && 
    a.asyncFactory === b.asyncFactory && (
      (
        a.tag === b.tag && // key 和 标签 是否相等
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```
## updateChildren(diff)
- 新老节点是同一个，并且都有孩子，递归比较
- 通过四个指针比较
- 不会就画个图
``` js
/**
 * diff过程
 * 新老节点开头和结尾是相同的，patch后++
 * 首位轮指针
 * 
 * 没有命中假设，执行遍历，从老节点中找到新开始节点，然后找到相同节点，则直接patchvnode将老节点插入到正确的位置
 * 
 * 老节点先遍历结束，剩余新节点执行更新操作
 * 新节点先遍历结束，剩余老节点执行删除操作
 */
  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0] // 第一个老节点
    let oldEndVnode = oldCh[oldEndIdx] //最后一个老节点
    let newEndIdx = newCh.length - 1 // 最后一个新节点索引
    let newStartVnode = newCh[0] // 第一个新节点
    let newEndVnode = newCh[newEndIdx] // 最后一个新节点
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm
    const canMove = !removeOnly
    // 检查key重复
    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh)
    }

    // 新老两组开始遍历，只要有一组结束了就会跳出循环
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {// 没有定义

        // 旧的节点 不存在，等于调整索引
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) { // 也是调整索引
        oldEndVnode = oldCh[--oldEndIdx]

      // --- same比较开始 ----- 
      //老起始vs新起始
      } else if (sameVnode(oldStartVnode, newStartVnode)) { 
        // 是同一个，走patchvnode(createelm)
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        // patch后 新老开始节点索引 +1
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]

        //新结束vs老结束
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        // 是同一个，也是走patchvnode
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        // patch后 新老结束节点索引 -1
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } 
      // 老开始vs新结束
      else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right  
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        // 处理被transtion-group包裹的组件时使用
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        // 老开始节点索引 +1，新结束节点索引 -1
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]

      }
      // 老结束vs新开始
       else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]

      } else {// 以上四种假设都不成立，通过遍历找 新开始节点 在 老节点 中的索引位置
        // 映射
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        // 在映射中找到新开始节点 在 老节点 中的索引位置
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) { // New element，没找到，执行创建
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else { // 找到了
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) { // 是同一个，执行patch，将相同的节点做个更新
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined // 老节点置为undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {//找到了发现两个节点不是同一个，视为新元素直接创建
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        // 新节点向后移动
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) {
      // 新节点剩余
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      //老节点剩余
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }
```