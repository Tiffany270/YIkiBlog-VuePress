
# Q&A

::: tip :)
Do u wanna know how it works?
:::
## component 标签
- is 是导入的组件！
``` 
        <component
         :is="currentTab">
         </component>

import ManuaBill from './manualBill'
 ....
  data() {
    return {
      currentTab: ManuaBill,
    }
  }
```


## vue的生命周期 
- `beforeCreate` 组件的data和DOM都没有初始化，你啥都不做就行
- `created` 实例创建完并完成data观测、属性和方法的运算以及事件回调，但是没有挂载（data可用，methods可用，页面还没渲染。）**多用于AJAX请求**
- `beforeMount` 相关render首次调用，正在把内存的模板逐步渲染到页面
- `mounted` 页面渲染完成，可以运行并且**第三方插件可以被初始化**（Here init)
- `beforeUpdate` 根据data来更新
- `updated` 最新的data
- `beforeDestroy` 销毁之前调用，所有东西正常可用
- `destroyed` 解绑和移除监听以及销毁实例 所有东西都不可用了

## about @click
``` js
@click = "handle"
handle(data){
  console.log(data) // data is a click event
}
@click = "handle2()"
handle2(data){
  console.log(data) // undefined
}
```

## 嵌套的生命周期
``` bash
fa_beforeCreate
fa_created
fa_beforeMount

son_beforeCreate
son_Create
son_beforeMount
son_mounted

fa_mounted

```

## watch 和 computed 和 methods
### computed
  - `func`
  - They `don’t` accept `arguments`
  - They are `cached`, that’s mean that the function will run only `once` until the values `don’t` change again also if it’s `called many times` in the same template
  - knows if the values used in the function `changed` so they `don’t` need to run everytime to check, only once
  - Handy for composing new data from `existing` sources and get `dynamic` values based on `other` properties
### when computed
- You need to compose `new` data from `existing data` sources
- You need to `reference` a value directly in your template
- You call the same function `more than once` in your template
- You need to `sort` or `manipulate` a large group of data
---
### watch
- `val` `oldval` and pls to avoid use `()=>` inside `handler`
  ``` js
  obj:{
      handler: function (val, oldVal) { 
      console.log("obj 变了")
      ...
    },
  ```
- Watchers allow you to listen to the data object and run whenever `a specific property changes`
- This is most useful when you want to perform `asynchronous` or expensive `operations` in response to `changing` data
### when watch
- You want to `listen` when a data property changes
- You want to watch a data property `until` it reaches some specific value and then do sth
---
### methods
  - don’t know if the values used in the function changed so they need to run `everytime` to check
### when methods
- To call a function when an event happen in the DOM `methods`
- To call a function from the `computed` or `watchers` when something happens in your component `methods`
- You need to pass parameters `methods`
---

## 同组件/父子组件如何通信的？
- `props`/`$emit` 父子
- 父`$refs`/`$children`/`$parent` 从`dom`属性里获取
- `$attrs`/`$listeners`嵌套的时候，从作用域里取
- 跨组件`new vue` `$emit`/`$on`
- 父`provide`/后代n个`inject`
- `vuex`

## 父子传值的双向绑定
- `v-model`
- `.sync`
## 前端路由有没有用过 
- q:你在项目中怎么实现路由的嵌套？
- a:children
- vue-router
- :id冒号传参
- #hash
    - 更新视图但不重新请求页面
    - `http://oursite.com/#/user/id`如重新请求只会发送`http://oursite.com/`
- history
    - History interface
    - history模式则会将URL修改得就和正常请求后端的URL一样 `http://oursite.com/user/id`
## nextTick情况下用到？
- nextick dom更新后触发的回调
- 因为数据的更新是异步的
## 响应式原理你知道是怎么实现的吗？
## 数据更新页面不更新的场景和解决
- 响应式一定要写在data
- 对象里放对象不更新
    - 动态维护assign
    - vm.$set
- 数组索引直接更改不行/长度获取不了
    - 用数组原生方法  
    - vm.$set
- 超出数组长度的索引不更新
    - 数组原生方法
- 异步之前dom获取不了
    - nexttick
    - settimeout=0
- 路由参数变化引用同一组件
    - 给key
    - watch路由变化
- 见[参考](https://www.cnblogs.com/houxianzhou/p/13645294.html)

## vue 和 react的 区别
### 相同点
- 都是组件化开发和`virtual dom`
- 支持数据驱动视图，不操作真是dom，更新状态数据页面自动更新
- 支持服务端渲染
- 单向数据流（和数据绑定无关）
### 不同点
- `react`是单向的数据绑定
- `react`中`state`不可改变，需要手动`setstate`
- `vue` 的 `state` 不是必须的，由`data`管理
- `vue`会跟踪依赖，不会重新渲染整个组件
- `react` 每当状态改变的时候组件会重新渲染，需要别的方法控制

## defineproperty和proxy对比
- proxy对整个对象代理并返回新对象，单一原则
- dfp对每个属性重复劫持，也不能对数组有操作

### 三大框架侦测机制的区别
- `Angular` 脏值检查
- `React` 对比虚拟 `DOM`
- `Vue` 嗯~ o(*￣▽￣*)o
