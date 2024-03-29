# vue源码 new Vue

## instance
- `vue` 是一个 `function` but not `class`
- src/core/instance/index.js
    ``` js
    // yiki1 打包后的源码是遵从UMD规范的，它是commonjs和amd的整合。
    // 而Vue的本质是一个构造器,并且它保证了只能通过new实例的形式去调用，而不能直接通过函数的形式使用
    function Vue (options) {
    if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
    ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options)//执行顺序3
    }
    // 定义Vue原型上的init方法(内部方法)
    initMixin(Vue) // 执行顺序1 传入vue执行 function vue为执行顺序2 
    // 定义原型上跟数据相关的属性方法
    stateMixin(Vue)
    //定义原型上跟事件相关的属性方法
    eventsMixin(Vue)
    // 定义原型上跟生命周期相关的方法
    lifecycleMixin(Vue)
    // 定义渲染相关的函数
    renderMixin(Vue)

    export default Vue
    ```

## initMixin 
-  `Vue` 只能通过 `new` 关键字初始化，然后会调用` this._init` 方法
- 原型上的`_init`方法
``` js
Vue.prototype._init = function (options?: Object)
...
 vm.$options = mergeOptions(// 合并选项（这是用我们写的option）
        resolveConstructorOptions(vm.constructor),// 返回构造函数自身的配置项
        options || {},
        vm
      )
...
if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)// 响应式拦截代理
    } else {
      vm._renderProxy = vm
    }
...
 // expose real self
    vm._self = vm
    initLifecycle(vm) //$parent $childeren
    initEvents(vm) // 自定义事件
    initRender(vm) // 插槽相关 vm.$slot
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm) // 响应式
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
/*

判断用户是否传入了el选项.
如果传入了则调用$mount函数进入模板编译与挂载阶段.
如果没有传入el选项，则不进入下一个生命周期阶段，需要用户手动执行vm.$mount方法才进入下一个生命周期阶段

*/
    if (vm.$options.el) { //挂载
      vm.$mount(vm.$options.el)
    }
  }
```
- 选项合并 `mergeOptions` from `src/core/util/options.js `
``` js
vm.$options = mergeOptions(// 合并选项（ 这是用我们写的option.from initGlobalAPI(Vue) ）
resolveConstructorOptions(vm.constructor),// 返回构造函数自身的配置项
options || {},
vm
)
```

- 响应式数据拦截 `initProxy(vm)`
``` js
 if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)// 响应式拦截代理
    } else {
      vm._renderProxy = vm
  }

  // ----- in proxy.js
  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      const options = vm.$options
      const handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler
      vm._renderProxy = new Proxy(vm, handlers)// 代理vm实例到vm属性
    } else {
      vm._renderProxy = vm
    }
  }
```
- 生命周期回调 `callHook(..)` from `lifecycle.js`
``` js
export function callHook (vm: Component, hook: string) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget()
  const handlers = vm.$options[hook] // yiki: get hander what u define
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      // yiki : triggle every hook in array
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
  popTarget()
}
```
- `initInjections(vm)` from `/core/instance/inject.js`
```js
/**
 * yiki: `inject`- initInjections with `provide`- initProvide
 * allow father_c inject to inject f_descendants_c a dependency,
 * whatever how deep level between them (依赖注入/嵌套传值)
 * note : pass data this way is NOT Reactive
 */
export function initInjections (vm: Component) {
  const result = resolveInject(vm.$options.inject, vm) // yiki: key - value
  if (result) {
    toggleObserving(false) // yiki: shouldObserve = false - not reacitve
    Object.keys(result).forEach(key => {
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], () => { // yiki: add to cur instance
          ...
          )
        })
      } else {
        defineReactive(vm, key, result[key])
      }
    })
    toggleObserving(true)
  }
}
```
- `initState(vm)` from  `/core/instance/state.js`
- 响应式！
``` js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props) // props
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)//响应式的入口
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

## stateMixin
- 跟数据相关的属性方法
``` js
Object.defineProperty(Vue.prototype, '$data', dataDef)
Object.defineProperty(Vue.prototype, '$props', propsDef)
Vue.prototype.$set = set
Vue.prototype.$delete = del
Vue.prototype.$watch = function (...)
```

## eventsMixin
- 对原型上的事件相关方法 from `/instance/events.js`
``` js
Vue.prototype.$on = function (...)
Vue.prototype.$once = function (...)
Vue.prototype.$off = function()
Vue.prototype.$emit = function(
  ...
  let cbs = vm._events[event]
    if (cbs) {
      ...
)
```
- `initEvents`
``` js
export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
```
- vue在实例上用了一个`vm_events`属性来存储管理事件的派发和更新，并暴露了这些api给外鼓管理和派发
- 理解`$emit`通信原理就是事件监听的回调写在了父组件中
- `updateComponentListeners`
``` js
export function updateComponentListeners ( // well, do nothing
  vm: Component,
  listeners: Object,
  oldListeners: ?Object
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
  target = undefined
}

```
- `updateListeners` from `src/vdom/helpers/update-listeners.js`
``` js
/**
 * 对比listeners和oldListeners的不同，
 并调用参数中提供的add和remove进行相应的注册事件和移除事件
 */
export function updateListeners (
  on: Object,
  oldOn: Object,
  add: Function,
  remove: Function,
  createOnceHandler: Function,
  vm: Component
) {
  let name, def, cur, old, event
  for (name in on) {
    def = cur = on[name]
    old = oldOn[name]
    event = normalizeEvent(name)
   ...
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm)
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture)
      }
      add(event.name, cur, event.capture, event.passive, event.params)
    } else if (cur !== old) {
      old.fns = cur
      on[name] = old
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name)
      remove(event.name, oldOn[name], event.capture)
    }
  }
}
```

## lifecycleMixin
- 生命周期相关 from `src/core/instance/lifecycle.js`
``` js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean)
Vue.prototype.$forceUpdate = function ()
Vue.prototype.$destroy = function () 
```
- `initLifecycle` 
```js
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    /* 向上查找当前组件父级的父级，
    直到找到第一个不是抽象类型的父级时，将其赋值vm.$parent，
    同时把该实例自身添加进找到的父级的$children属性中
    */
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    //确保在子组件的$parent属性上能访问到父组件实例，
    //在父组件的$children属性上也能访问子组件的实例
    parent.$children.push(vm) 
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}
```

## renderMixin
- /instance/render.js
- 渲染相关
``` js
Vue.prototype.$nextTick = function()
Vue.prototype._render = function (): VNode 
```

## initProxy
- 仅代理实例 `initProxy(vm)` 不是数据响应式啊啊啊啊
- `/src/core/instances/proxy.js`
``` js
  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      const options = vm.$options
      const handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler
      vm._renderProxy = new Proxy(vm, handlers)// 代理vm实例到vm属性
    } else {
      vm._renderProxy = vm
    }
  }
```
- `vm._renderProxy`
  - vue内部在js和真实dom之间有一个中间层 `virtual dom`，调用render的时候，`vm._renderProxy`对象会被访问到
  - /src/core/instence/render.js
  ``` js
    vnode = render.call(vm._renderProxy, vm.$createElement)
  ```
- `handlers`数据过滤
  - `has`钩子(reflect里有，执行`with`语句时候被触发，这里涉及到了`render`生命周期)
  ``` js
  const hasHandler = {
      has (target, key) {
      const has = key in target
      // 模版上的变量是否合法
      const isAllowed = allowedGlobals(key) ||
          (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data))
      if (!has && !isAllowed) {
          if (key in target.$data) warnReservedPrefix(target, key)
          else warnNonPresent(target, key) // 这里进去都是模版数据不合法的警告
      }
      return has || !isAllowed
      }
  }
  const getHandler = {
      get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
          if (key in target.$data) warnReservedPrefix(target, key)
          else warnNonPresent(target, key)
      }
      return target[key]
      }
  }
  ```


## new vue 过程
- 初始化，合并选项option ，定义原型上的属性方法 
- 初始化组件实例的关系 $parent 
- 自定义事件 生命周期
- 数据响应式 
- 配置上有el 调用$mount挂载
