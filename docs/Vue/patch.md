# vue源码 patch

## patch/diff算法
负责首次渲染和后续更新或者销毁组件
- 如果旧vnode是真实元素，表示是`首次渲染`，创建整棵node树，插入body，移除老的模版节点
- 如果旧vnode不是真实元素，新的vnode也存在，表示是`更新阶段`，执行 patchvnode
  - 全量更新所有的属性
  - 如果新旧vnode都有子节点，递归执行updatechildren，进行diff
    - 同层比较 降低时间复杂度
    - 深度优先递归
    - 
  - 如果新vnode都有子节点，旧无，新增新节点
  - 如果旧vnode都有子节点，新无，删除旧节点
  - 更新文本节点
- 新vnode不存在，旧的存在，调用destroy摧毁旧节点

## 入口
- 当组件更新时，实例化渲染 watcher 时传递的 updateComponent
- `/src/core/instance/lifecycle.js`
``` js

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
 ...
  }
  callHook(vm, 'beforeMount')
  let updateComponent
  if (...) {
    updateComponent = () => {
     ...
    }
  } else {
    updateComponent = () => {
      // render函数渲染出虚拟dom，虚拟dom渲染成真实dom
      vm._update(vm._render(), hydrating)
    }
  }
  // 注意这里有个watcher!
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
...
```

## vm._update
``` js
export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el // 真实挂载点
    const prevVnode = vm._vnode // 旧vnode
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode // 新vnode
    if (!prevVnode) { // 旧vnode不存在，表示初次渲染
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates，响应式数据更新时
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    restoreActiveInstance()
   ...
```
## vm.__patch__
- `/src/platforms/web/runtime/index.js`
``` js
/ 在 Vue 原型链上安装 web 平台的 patch 函数
Vue.prototype.__patch__ = inBrowser ? patch : noop
```
## createPatchFunction
- `/src/platforms/web/runtime/patch.js`
``` js
// patch 工厂函数，为其传入平台特有的一些操作，然后返回一个 patch 函数
export const patch: Function = createPatchFunction({
  nodeOps,
  modules,
  LONG_LIST_THRESHOLD: 10
})
```
## nodeOps和modules
- `src/platforms/web/runtime/node-ops.js`
``` js
/**
 * web 平台的 DOM 操作 API
 */
//创建标签名为 tagName 的元素节点
export function createElement (tagName: string, vnode: VNode): Element {
  // 创建元素节点
  const elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // 如果是 select 元素，则为它设置 multiple 属性
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}
// 创建带命名空间的元素节点 document.createElementNS
// 创建文本节点 document.createTextNode
// 创建注释节点 document.createCommen(text)
// 在指定节点前插入节点 insertBefore
//移除指定子节点removeChild
//添加子节点 appendChild
...
```
- modules 同理 向外暴露一些api

## createPatchFunction
- `src/core/vdom/patch.js`
- import { createPatchFunction } from 'core/vdom/patch' in web/runtime/patch
``` js
...
// 工厂函数 返回patch函数
export function createPatchFunction (backend) {
  let i, j
  const cbs = {}
  const { modules, nodeOps } = backend
  // 遍历钩子，从modules里找到对应的方法放进cb[hook]，如 cb.creat = [fn1,fn2...]
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }
...
...
return function patch
```
## function patch
- 这很迷啊 不知道在说啥
``` js
 return function patch (oldVnode, vnode, hydrating, removeOnly) {
    // 如果没有新节点，只有旧节点，摧毁旧节点
    if (isUndef(vnode)) { // vnode === undefied || null 
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }
  ...
    /**
     *  没有旧的了，只有新的
     * find，初次渲染
     */
    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue)
    } else {
      // 判断旧节点是不是真实元素
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {// 旧不是真实的，但是新=旧，更新阶段
        // patch更新节点
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      } else {
        // 旧的是真实节点，初次渲染
        if (isRealElement) {
         //走一些服务器渲染的逻辑
         ...
          // either not server-rendered, or hydration failed. 说明不是服务器渲染
          // create an empty node and replace it 创建一个取代它
          oldVnode = emptyNodeAt(oldVnode)
        }
        // replacing existing element
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)
        // create new node  dom树开始
        createElm(
          vnode,
          insertedVnodeQueue,
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )
        // 遍历更新
        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          let ancestor = vnode.parent
          const patchable = isPatchable(vnode)
          while (ancestor) {
           ...
            ancestor = ancestor.parent
          }
        }
        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode)
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
```

## invokeDestroyHook
- `src/core/vdom/patch.js`
``` js
/**
 * 销毁节点：
 *   执行组件的 destroy 钩子，即执行 $destroy 方法 
 *   执行组件各个模块(style、class、directive 等）的 destroy 方法
 *   如果 vnode 还存在子节点，则递归调用 invokeDestroyHook
 */
function invokeDestroyHook(vnode) {
  let i, j
  const data = vnode.data
  if (isDef(data)) {
    if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode)
    for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
  }
  if (isDef(i = vnode.children)) {
    for (j = 0; j < vnode.children.length; ++j) {
      invokeDestroyHook(vnode.children[j])
    }
  }
}
```
## createElm
- `src/core/vdom/patch.js`
``` js
  // 创建dom树, 并插入到父节点上
  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm, // 父
    refElm,
    nested,
    ownerArray,
    index
  ) {
   ...
    // 如果是一个组件，要去走init钩子创建组件实例并挂载，不往下走了
    vnode.isRootInsert = !nested // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }
    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    if (isDef(tag)) {
     ...
      // 新节点
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode)
      setScope(vnode)

      if (__WEEX__) {...
      } else {
        // 遍历
        createChildren(vnode, children, insertedVnodeQueue)
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue)
        }
        // 插入父节点
        insert(parentElm, vnode.elm, refElm)
      }
        ...
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text) // 创建注释
      insert(parentElm, vnode.elm, refElm)
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    }
  }
```

## createComponent
- `src/core/vdom/patch.js`
``` js
/**
 * 如果 vnode 是一个组件，则执行 init 钩子，创建组件实例，并挂载
 * 然后为组件执行各个模块的 create 方法
 * @param {*} vnode 组件新的 vnode
 * @param {*} insertedVnodeQueue 数组
 * @param {*} parentElm oldVnode 的父节点
 * @param {*} refElm oldVnode 的下一个兄弟节点
 * @returns 如果 vnode 是一个组件并且组件创建成功，则返回 true，否则返回 undefined
 */
function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
  // 获取 vnode.data 对象
  let i = vnode.data
  if (isDef(i)) {
    // 验证组件实例是否已经存在 && 被 keep-alive 包裹
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    // 执行 vnode.data.init 钩子函数，该函数在讲 render helper 时讲过
    // 如果是被 keep-alive 包裹的组件：则再执行 prepatch 钩子，用 vnode 上的各个属性更新 oldVnode 上的相关属性
    // 如果是组件没有被 keep-alive 包裹或者首次渲染，则初始化组件，并进入挂载阶段
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }
    if (isDef(vnode.componentInstance)) {
      // 如果 vnode 是一个子组件，则调用 init 钩子之后会创建一个组件实例，并挂载
      // 这时候就可以给组件执行各个模块的的 create 钩子了
      initComponent(vnode, insertedVnodeQueue)
      // 将组件的 DOM 节点插入到父节点内
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        // 组件被 keep-alive 包裹的情况，激活组件
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
```
## patchVnode(diff入口)
``` js
  /** 
   * 新老都有孩子，递归执行diff
   * 新有，旧无，直接新增
   * 新没有，旧有，直接删除老的
  */
  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) { // 新老相同不用比了
      return
    }
    ...
    const elm = vnode.elm = oldVnode.elm

    // 异步占位符节点
   ...

    // reuse element for static trees. 跳过静态节点的更新
    if (isTrue(vnode.isStatic) &&
     ...
      return
    }

    let i
    const data = vnode.data
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode)// 执行组件prepatch钩子
    }

    const oldCh = oldVnode.children // 老节点的孩子
    const ch = vnode.children // 新节点的孩子
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
    }
    if (isUndef(vnode.text)) {//不是文本节点的话
      if (isDef(oldCh) && isDef(ch)) { // 都有孩子，递归
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) { // 只有新节点的孩子
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch)
        }
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        // 直接创建就行啦
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {//只有老的，没有新节点的孩子，直接都给我删了
        removeVnodes(oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {// 文本置空
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text)
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
    }
  }
```