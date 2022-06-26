# vue源码 异步更新

- [掘金-异步更新](https://juejin.cn/post/6951568091893465102)

## q:异步更新机制
- 利用浏览器异步任务队列（微任务/宏任务）
- `dep.notify` -> 通知 `dep[watchers].update` ->将 `watcher` 自己放进 全局的队列queue数组
- `nextTick` 将一个刷新这个队列的方法 `flushchedulerqueue` 放进全局的 `flushcallbacks回调数组` 中
- `flushcallbacks` 负责执行数组里所有的 `flushchedulerqueue`
- 浏览器执行 `timefunc` -> 将 `flushcallbacks` 放入`异步队列`中，执行它
- `flushchedulerqueue` 负责刷新 watcher队列 -> `watcher.run`

## nextTick 的实现
- try-catch 包裹回调放入callbacks数组
- timefunc，在浏览器异步任务队列放入刷新callbacks数组的函数

## dep.notify
- `Object.defineProperty` - set阶段 - `dep.notify()`
- `src/core/observer/dep.js`
``` js
export default class Dep {
  static target: ?Watcher; // dep里面放的是watcher
  id: number;
  subs: Array<Watcher>;
  ....
  ....
/**
 * yiki: 通知dep[watchers]执行update()
 */
  notify () { 
    const subs = this.subs.slice()
    ...
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update() // 遍历后更新
    }
  }
}
{}
```
## wathcer.update
- `/src/core/observer/watcher.js`
``` js
export default class Watcher {
  vm: Component; // 实例
  ...
  ...
/**
   * yiki: 根据watcher配置往下走，一般走queueWatcher
   */
  update () {
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
  ...
```
## queueWatcher
- `/src/core/observer/scheduler.js`
``` js
/**
 * Push a watcher into the watcher queue.
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)// 入队列
    } else {
    ...
    }
   ...
   ...
      /**
       * 熟悉的 nextTick => vm.$nextTick、Vue.nextTick
       *   1、将 回调函数（flushSchedulerQueue） 放入 callbacks 数组
       *   2、通过 pending 控制向浏览器任务队列中添加 flushCallbacks 函数
       */
      nextTick(flushSchedulerQueue)
    }
  }
}
```
- `flushSchedulerQueue`
``` js
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  ...
    watcher.run()

}
```

## nextTick
- `/src/core/util/next-tick.js`
``` js
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => { // 把cb放进数组里
    if (cb) {   // cb = flushSchedulerQueue
      try {     // try-catch会有错误捕捉
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) { // pengding 保证浏览器任务队列只有一个flushcallback数组
    pending = true
    timerFunc() // 在浏览器的任务队列中（首选微任务队列）放入 flushCallbacks 函数
  }
}
```
## timerFunc
- 一些优雅降级
``` js
/**
 * yiki : js循环机制中，怎么执行异步队列捏
 */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()  // 首选promise，微任务
  timerFunc = () => {
    p.then(flushCallbacks) // 微任务中放 flushCallbacks
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x 
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {// 兼容一下当promise不可用 用MutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  ...
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks) // 宏任务了，但也比settimeout好
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0) // 实在不行只能这样了
  }
}
```
## flushCallbacks
``` js

function flushCallbacks () {
  pending = false // 执行一次会重置一次让下个flushCallbacks可以进入任务队列
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]() // 遍历 看这里执行了
  }
}
```
## 执行flushcallbacks之后，watcher.run
- 当js主线程开始抓异步队列来用啦，这时候就会执行到flushallbacks里的东西
- 什么东西放进去，肯定就是watcher啦
``` js
 run () {
    if (this.active) {
      const value = this.get() // 重新依赖收集
      if (
        value !== this.value ||
        isObject(value) ||
        this.deep
      ) {
        // set new value 值更新
        const oldValue = this.value
        this.value = value
        if (this.user) {
          const info = `callback for watcher "${this.expression}"`
          invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info)
        } else {
          this.cb.call(this.vm, value, oldValue) // 更新旧值
        }
      }
    }
  }
```
## watcher.get
``` js
  /**
   * 执行 this.getter，并重新收集依赖
   * this.getter 是实例化 watcher 时传递的第二个参数，一个函数或者字符串，比如：updateComponent 或者 parsePath 返回的函数
   * 为什么要重新收集依赖？
   *   因为触发更新说明有响应式数据被更新了，但是被更新的数据虽然已经经过 observe 观察了，但是却没有进行依赖收集，
   *   所以，在更新页面时，会重新执行一次 render 函数，执行期间会触发读取操作，这时候进行依赖收集
   */
  get () {
    // 打开 Dep.target，Dep.target = this
    pushTarget(this)
    // value 为回调函数执行的结果
    let value
    const vm = this.vm
    try {
      // 执行回调函数，比如 updateComponent，进入 patch 阶段
      value = this.getter.call(vm, vm)
    } catch (e) {
    ...
    } finally {
      if (this.deep) {
        traverse(value)
      }
      // 关闭 Dep.target，Dep.target = null
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

```
